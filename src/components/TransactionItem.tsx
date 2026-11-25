import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types/expense';
import { COLORS } from '../constants/theme';
import { formatCurrency } from '../utils/math';
import { Ionicons, Feather } from '@expo/vector-icons';

interface TransactionItemProps {
  expense: Expense;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ expense, onPress }) => {
  const getCategoryDetails = () => {
    switch (expense.category) {
      case 'Food & Dining':
        return {
          bg: '#E1F5ED',
          color: '#059669',
          icon: <Ionicons name="cafe-outline" size={22} color="#059669" />,
        };
      case 'Groceries':
        return {
          bg: '#F1E9FA',
          color: '#9333EA',
          icon: <Ionicons name="basket-outline" size={22} color="#9333EA" />,
        };
      case 'Transport':
        return {
          bg: '#E1F0FA',
          color: '#0284C7',
          icon: <Ionicons name="car-outline" size={22} color="#0284C7" />,
        };
      case 'Shopping':
        return {
          bg: '#F7EBE1',
          color: '#EA580C',
          icon: <Ionicons name="bag-outline" size={22} color="#EA580C" />,
        };
      default:
        return {
          bg: '#F1F5F9',
          color: '#475569',
          icon: <Feather name="more-horizontal" size={20} color="#475569" />,
        };
    }
  };

  const { bg, icon } = getCategoryDetails();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.contentRow}>
        {/* Soft Pastel Squircle Badge */}
        <View style={[styles.iconBadge, { backgroundColor: bg }]}>
          {icon}
        </View>

        {/* Merchant Name & Timestamp */}
        <View style={styles.detailsContainer}>
          <Text style={styles.merchantName} numberOfLines={1}>
            {expense.merchantName}
          </Text>
          <Text style={styles.dateText}>{expense.date}</Text>
        </View>

        {/* Price Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatCurrency(expense.totalAmount)}</Text>
        </View>
      </View>

      {/* Thin warm divider line */}
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.secondaryText,
    fontWeight: '400',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAE5DC',
    width: '100%',
  },
});
