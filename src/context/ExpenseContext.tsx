import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Expense, ExtractedReceiptData } from '../types/expense';
import { INITIAL_RECENT_EXPENSES } from '../constants/presets';
import { parseReceiptImage } from '../services/receiptParserService';

interface ExpenseContextType {
  recentExpenses: Expense[];
  currentDraft: ExtractedReceiptData | null;
  setCurrentDraft: (draft: ExtractedReceiptData | null) => void;
  isScanning: boolean;
  scanProgressText: string;
  scanReceipt: (options: { imageUri?: string; imageBase64?: string; presetIndex?: number }) => Promise<ExtractedReceiptData>;
  saveExpense: (draft: ExtractedReceiptData) => void;
  resetDraft: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>(INITIAL_RECENT_EXPENSES);
  const [currentDraft, setCurrentDraft] = useState<ExtractedReceiptData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgressText, setScanProgressText] = useState('Extracting receipt details...');

  const scanReceipt = async (options: {
    imageUri?: string;
    imageBase64?: string;
    presetIndex?: number;
  }): Promise<ExtractedReceiptData> => {
    setIsScanning(true);
    setScanProgressText('Detecting merchant and line items...');

    try {
      const extracted = await parseReceiptImage(options);
      setCurrentDraft(extracted);
      return extracted;
    } finally {
      setIsScanning(false);
    }
  };

  const saveExpense = (draft: ExtractedReceiptData) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      merchantName: draft.merchantName.trim(),
      date: draft.date || 'Today',
      category: draft.category,
      items: draft.items,
      totalAmount: draft.totalAmount,
      receiptImageUri: draft.receiptImageUri,
      createdAt: Date.now(),
    };

    // Prepend new expense so it appears right at the top of Recent Activity
    setRecentExpenses((prev) => [newExpense, ...prev]);
    setCurrentDraft(null);
  };

  const resetDraft = () => {
    setCurrentDraft(null);
  };

  return (
    <ExpenseContext.Provider
      value={{
        recentExpenses,
        currentDraft,
        setCurrentDraft,
        isScanning,
        scanProgressText,
        scanReceipt,
        saveExpense,
        resetDraft,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}

