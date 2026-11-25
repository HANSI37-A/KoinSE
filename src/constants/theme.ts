export const COLORS = {
  background: '#F4F1EA', // Warm off-white/cream
  surface: '#FFFFFF',    // Pure white cards
  primaryText: '#0F172A', // Deep navy
  secondaryText: '#64748B', // Muted slate gray
  emerald: '#10B981',    // Vibrant emerald primary accent
  emeraldDark: '#059669',
  emeraldLight: '#E6F7F0',
  emeraldBorder: '#A7F3D0',
  cardBorder: '#E2E8F0',
  divider: '#F1F5F9',
  inputBackground: '#F8FAFC',
  inputBorder: '#E2E8F0',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  inactiveTab: '#94A3B8',
};

export const CATEGORY_METADATA: Record<
  string,
  { label: string; icon: string; bg: string; color: string }
> = {
  'Food & Dining': {
    label: 'Food & Dining',
    icon: 'coffee',
    bg: '#E6F7F0',
    color: '#059669',
  },
  Groceries: {
    label: 'Groceries',
    icon: 'shopping-cart',
    bg: '#F3E8FF',
    color: '#9333EA',
  },
  Transport: {
    label: 'Transport',
    icon: 'car',
    bg: '#E0F2FE',
    color: '#0284C7',
  },
  Shopping: {
    label: 'Shopping',
    icon: 'shopping-bag',
    bg: '#FFEDD5',
    color: '#EA580C',
  },
  Entertainment: {
    label: 'Entertainment',
    icon: 'film',
    bg: '#FCE7F3',
    color: '#DB2777',
  },
  Utilities: {
    label: 'Utilities',
    icon: 'zap',
    bg: '#FEF3C7',
    color: '#D97706',
  },
  Other: {
    label: 'Other',
    icon: 'more-horizontal',
    bg: '#F1F5F9',
    color: '#475569',
  },
};

