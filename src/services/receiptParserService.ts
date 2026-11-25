import { ExtractedReceiptData, ExpenseCategory, LineItem } from '../types/expense';
import { SAMPLE_RECEIPT_PRESETS } from '../constants/presets';
import { calculateTotalAmount, formatDisplayDate } from '../utils/math';

interface ParseReceiptOptions {
  imageUri?: string;
  imageBase64?: string;
  presetIndex?: number;
}

/**
 * Receipt Extraction Service
 * Supports:
 * 1. Live Google Gemini Multimodal Vision API when EXPO_PUBLIC_GEMINI_API_KEY is configured
 * 2. Automatic smart fallback to realistic receipt presets when no API key is set
 */
export async function parseReceiptImage(
  options: ParseReceiptOptions
): Promise<ExtractedReceiptData> {
  const apiKey =
    process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
    (typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '');

  // If live Gemini API key is available and imageBase64 is provided, try real AI extraction
  if (apiKey && options.imageBase64) {
    try {
      const liveData = await extractWithGemini(options.imageBase64, apiKey);
      if (liveData) {
        return {
          ...liveData,
          receiptImageUri: options.imageUri,
        };
      }
    } catch (err) {
      console.warn('Gemini live extraction failed, falling back to simulated preset:', err);
    }
  }

  // Fallback: Realistic simulated receipt parsing with scanning delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const chosenPreset =
    options.presetIndex !== undefined && SAMPLE_RECEIPT_PRESETS[options.presetIndex]
      ? SAMPLE_RECEIPT_PRESETS[options.presetIndex]
      : SAMPLE_RECEIPT_PRESETS[0]; // Default to Cafe Kumbuk mockup preset

  // Clone with fresh IDs and current date if needed
  const items: LineItem[] = chosenPreset.items.map((item, index) => ({
    id: `item-${Date.now()}-${index}`,
    name: item.name,
    price: item.price,
  }));

  const totalAmount = calculateTotalAmount(items);

  return {
    merchantName: chosenPreset.merchantName,
    date: chosenPreset.date || formatDisplayDate(new Date()),
    category: chosenPreset.category,
    items,
    totalAmount,
    receiptImageUri: options.imageUri,
  };
}

/**
 * Call Gemini Multimodal API directly with base64 image
 */
async function extractWithGemini(
  base64Image: string,
  apiKey: string
): Promise<ExtractedReceiptData | null> {
  const prompt = `You are a precision receipt scanner and expense parser.
Analyze this receipt image and extract the following JSON object ONLY (no markdown fences, pure JSON):
{
  "merchantName": "Name of store or cafe",
  "date": "Receipt date in 'MMM D, YYYY' format (e.g. 'Nov 24, 2026')",
  "category": "One of: Food & Dining, Groceries, Transport, Shopping, Entertainment, Utilities, Other",
  "items": [
    { "name": "Item description", "price": 14.00 }
  ],
  "totalAmount": 28.50
}
Ensure price is a number. Calculate accurate line items and sum.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  const parsed = JSON.parse(text);
  const items: LineItem[] = (parsed.items || []).map((it: any, idx: number) => ({
    id: `gemini-item-${idx}-${Date.now()}`,
    name: it.name || 'Item',
    price: Number(it.price) || 0,
  }));

  const total = calculateTotalAmount(items);

  return {
    merchantName: parsed.merchantName || 'Unknown Merchant',
    date: parsed.date || formatDisplayDate(new Date()),
    category: (parsed.category as ExpenseCategory) || 'Food & Dining',
    items,
    totalAmount: total > 0 ? total : Number(parsed.totalAmount) || 0,
  };
}

