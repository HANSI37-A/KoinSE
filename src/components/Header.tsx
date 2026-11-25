import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  onScanPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScanPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.eyebrow}>KOIN</Text>
        <Text style={styles.title}>Expenses</Text>
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={onScanPress}
        activeOpacity={0.8}
        accessibilityLabel="Scan bill"
        accessibilityRole="button"
      >
        <Feather name="plus" size={16} color="#FFFFFF" style={styles.plusIcon} />
        <Text style={styles.scanButtonText}>Scan Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.emerald,
    letterSpacing: 1.2,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: -0.5,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  plusIcon: {
    marginRight: 4,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

