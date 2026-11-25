# 🪙 Koin — Receipt Scan & Expense Review Flow

> **Koin Engineering Challenge: Take-Home Assignment**  
> A production-grade mobile expense review flow built with React Native (Expo SDK 58+), TypeScript, and precision design-to-code implementation.

---

## 🎥 Demo Video (45–60 Seconds)

<!-- ======================================================== -->
<!-- 📹 DEMO VIDEO LINK PLACEHOLDER                            -->
<!-- Replace the link below with your Loom or uploaded video   -->
<!-- ======================================================== -->

[![Watch Demo Video](https://img.shields.io/badge/Demo%20Video-Watch%20on%20Loom%20%2F%20MP4-10B981?style=for-the-badge&logo=loom&logoColor=white)](YOUR_LOOM_OR_VIDEO_URL_HERE)

> **Direct Video Link:** [Click here to view the 45–60s Demo Video](YOUR_LOOM_OR_VIDEO_URL_HERE)  
> *(Or view `./demo.mp4` included in this repository)*

### What the Demo Video Covers:
- [x] **Receipt Upload & Capture**: Snapping with camera, choosing from device gallery, or loading presets.
- [x] **AI Scanning & Extraction**: Visual laser scanning overlay while extracting merchant, date, and line items.
- [x] **Interactive Line-Item Editing**: Live price modifications and adding/deleting line items.
- [x] **Real-Time Dynamic Recalculation**: Watching the Total Amount recalculate in real time using floating-point-safe cent math.
- [x] **Edge Case Handling**: Input validation preventing empty merchant names or zero/negative totals.
- [x] **Confirmation & Feed Update**: Saving expense and verifying it immediately prepends to the top of Recent Activity.

---

## 📱 Easy Testing & Preview

### Option A: Expo Go (Instant Mobile Testing)
1. Install **Expo Go** from Google Play (Android) or the App Store (iOS).
2. Start the local server with `npm start` and scan the terminal QR code.
3. Or test via EAS Update / Expo preview:
```
exp://<your-expo-deployment-url>
```

### Option B: Local Android Emulator / iOS Simulator
```bash
# Android (Pixel / any AVD)
npm run android

# iOS Simulator (macOS)
npm run ios

# Web Browser
npm run web
```

---

## 🎨 Design-to-Code Precision (Figma Implementation)

The application replicates the provided Figma design mockups (`Koin · Expenses.png` & `Koin · Review receipt.png`) with pixel-level accuracy:

| Design Element | Specification | Implementation in Code |
| :--- | :--- | :--- |
| **Theme Background** | Warm off-white / cream | `#F4F1EA` across all screens |
| **Elevated Cards** | Pure white with subtle borders | `#FFFFFF`, rounded 24px, subtle border & shadow |
| **Primary Typography** | Deep navy | `#0F172A` bold headings and titles |
| **Secondary Typography** | Muted slate gray | `#64748B` timestamps, labels, and notes |
| **Primary Accent** | Vibrant emerald green | `#10B981` / `#059669` CTA buttons and active tab |
| **Numeric Typography** | Monospaced / Tabular figures | `fontVariant: ['tabular-nums']` for column alignment |
| **Pastel Category Badges** | Soft tinted rounded squircles | Coffee: `#E1F5ED`, Groceries: `#F1E9FA`, Transport: `#E1F0FA`, Shopping: `#F7EBE1` |

---

## ⚡ Key Feature Flows

### 1. Upload & Capture Flow (`ExpensesScreen.tsx`)
- **Header**: Eyebrow label `KOIN`, bold `Expenses` title, and emerald `+ Scan Bill` pill button.
- **Hero Upload Card**: Dashed emerald border container (`#A7F3D0`), centered ticket receipt icon, and dual action buttons: `[ 📷 Camera ]` and `[ 🖼️ Gallery ]`.
- **Recent Activity Feed**: Sits directly on the cream background with thin divider lines (`#EAE5DC`), showing initial transactions:
  - *Cafe Kumbuk* — Today, 10:42 AM — **$28.50**
  - *Keells Super* — Yesterday, 6:18 PM — **$64.20**
  - *Uber* — Nov 22, 2026 — **$12.80**
  - *The Good Market* — Nov 21, 2026 — **$35.00**
- **Docked Bottom Navigation**: 4 tabs (`Home`, `Expenses` active with authentic Koin ticket icon, `Insights`, `Profile`) and iOS home indicator bar.

### 2. Dual-Engine Extraction Pipeline (`receiptParserService.ts`)
- **Live Gemini 1.5 Flash Multimodal Vision**: When `EXPO_PUBLIC_GEMINI_API_KEY` is provided in `.env`, receipts photographed by the user are sent directly to Google Gemini's multimodal vision endpoint, returning structured JSON with merchant, date, category, and items.
- **Resilient Offline Preset Fallback**: When no API key is present or when offline, Koin seamlessly falls back to realistic receipt presets (*Cafe Kumbuk*, *Keells Super*, *Blue Bottle Coffee*) so reviewers can test all interactive capabilities immediately.
- **Scanning Animation**: Displays a receipt preview with an animated vertical laser scan bar during extraction.

### 3. Interactive Review & Dynamic Recalculation (`ReviewReceiptScreen.tsx`)
- **Top Bar**: Back navigation (`←`), `"Review Receipt"` title, and dark receipt thumbnail preview (`#2D3748`).
- **Editable Metadata**:
  - Merchant Name text input with inline pencil edit icon.
  - Date field with calendar icon and `DatePickerModal` supporting one-tap presets (*Today*, *Yesterday*, custom).
  - Category dropdown pill opening `CategoryPickerModal` with pastel badges and checkmarks.
- **Line Items Management**:
  - Editable item description and boxed white tabular price inputs (`$ 14.00`).
  - Delete trash action (`🗑️`) with minimum row count guards.
  - `+ Add Item` button to dynamically append new rows.
  - Helper note: `"✓ All set? Give your items a quick check."`.
- **Floating-Point Bug Prevention**:
  ```typescript
  // All price calculations convert values to integer cents:
  const totalCents = items.reduce((sum, item) => sum + Math.round(Number(item.price) * 100), 0);
  return totalCents / 100;
  ```
  Prevents JavaScript precision bugs (e.g., `14.00 + 6.50 + 8.00 = 28.500000000000004`).
- **Validation & Persistence**:
  - Validates merchant name and non-zero total amounts.
  - Displays immediate UI feedback alert on save.
  - Appends finalized expense directly to the top of Recent Activity.
- **Mobile Polish**: Uses `KeyboardAvoidingView` to keep inputs and the sticky summary bar visible during editing.

---

## 📂 Project Architecture

```
KoinSE/
├── App.tsx                          # App root with SafeAreaProvider & screen switcher
├── app.json                         # Expo configuration, permissions & asset metadata
├── package.json                     # Dependencies and npm scripts
├── tsconfig.json                    # Strict TypeScript configuration (0 errors)
├── .env.example                     # Environment template for Gemini API key
├── README.md                        # Project documentation & assignment brief
└── src/
    ├── types/
    │   └── expense.ts               # Core domain models (Expense, LineItem, Categories)
    ├── constants/
    │   ├── theme.ts                 # Colors, category tokens & typography rules
    │   └── presets.ts               # Initial activity feed & mock receipt datasets
    ├── utils/
    │   └── math.ts                  # Cent-based math & currency/date formatters
    ├── services/
    │   └── receiptParserService.ts  # Gemini Vision AI + offline preset fallback engine
    ├── context/
    │   └── ExpenseContext.tsx       # Central state provider for expenses & draft receipts
    ├── components/
    │   ├── Header.tsx               # Top brand header with "+ Scan Bill" pill
    │   ├── UploadCard.tsx           # Dashed upload hero card with Camera & Gallery
    │   ├── TransactionItem.tsx      # Activity row with pastel squircle badge & tabular price
    │   ├── BottomNavBar.tsx         # Docked bottom navigation with ticket icon & home indicator
    │   ├── KoinReceiptIcon.tsx      # Custom ticket receipt icon matching Figma design
    │   ├── ScanningModal.tsx        # Animated scanning laser overlay
    │   ├── CategoryPickerModal.tsx  # Bottom sheet category selector
    │   └── DatePickerModal.tsx      # Date picker modal with quick presets
    └── screens/
        ├── ExpensesScreen.tsx       # Screen 1 (Upload hero, camera/gallery, recent activity)
        └── ReviewReceiptScreen.tsx  # Screen 2 (Editable merchant, line items, sticky total)
```

---

## 🚀 Setup & Installation Instructions

### 1. Prerequisites
- **Node.js**: v20.x or v22.x (Node v22.16+ recommended for Expo SDK 58)
- **Package Manager**: `npm`
- **Device / Simulator**: Expo Go on iOS/Android, Android Studio Emulator, or iOS Simulator

### 2. Clone & Install
```bash
git clone https://github.com/your-username/koin-expense-tracker.git
cd koin-expense-tracker
npm install
```

### 3. Environment Variables (Optional)
If you wish to test live AI extraction with Google Gemini Vision:
```bash
cp .env.example .env
```
Inside `.env`:
```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```
*(If omitted, Koin automatically uses realistic offline presets).*

### 4. Run the App
```bash
# Start Metro Dev Server
npm start

# Run directly on Android
npm run android

# Run directly on iOS Simulator
npm run ios

# Run TypeScript Typecheck
npm run typecheck
```

---

## 🤖 Note on AI Tooling

In accordance with Koin's engineering philosophy of embracing modern AI tools as force multipliers:

- **AI-Native Pair Programming**: Used AI tooling (Antigravity with Gemini 3.8 Flash) to translate the 5-page PDF specification and high-resolution Figma mockups into production-grade React Native components.
- **Multimodal AI Integration**: Integrated Google Gemini 1.5 Flash Vision via REST API for multimodal receipt parsing, coupled with an automatic fallback mechanism for zero-config offline testing.
- **Debugging & Resolution**:
  - Identified and resolved dependency engine incompatibilities between Expo SDK 58 and Node versions by leveraging the machine's Node v22.16 runtime.
  - Resolved icon library peer dependency conflicts by adopting `@expo/vector-icons` with custom SVG ticket vectors for native cross-platform fidelity.
  - Eliminated JavaScript floating-point arithmetic errors by implementing an integer cent algorithm for all price sums.
