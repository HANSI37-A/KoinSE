import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KoinReceiptIcon } from './KoinReceiptIcon';

export type TabType = 'home' | 'expenses' | 'insights' | 'profile';

interface BottomNavBarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'expenses',
  onTabChange,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Home */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabChange && onTabChange('home')}
          activeOpacity={0.7}
        >
          <Feather
            name="home"
            size={22}
            color={activeTab === 'home' ? COLORS.emerald : '#94A3B8'}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === 'home' ? COLORS.emerald : '#64748B',
                fontWeight: activeTab === 'home' ? '700' : '500',
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Expenses (Active in Emerald) */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabChange && onTabChange('expenses')}
          activeOpacity={0.7}
        >
          <KoinReceiptIcon
            size={22}
            color={COLORS.emerald}
            linesColor={COLORS.emerald}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: COLORS.emerald,
                fontWeight: '700',
              },
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>

        {/* Insights */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabChange && onTabChange('insights')}
          activeOpacity={0.7}
        >
          <Feather
            name="bar-chart-2"
            size={22}
            color={activeTab === 'insights' ? COLORS.emerald : '#94A3B8'}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === 'insights' ? COLORS.emerald : '#64748B',
                fontWeight: activeTab === 'insights' ? '700' : '500',
              },
            ]}
          >
            Insights
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabChange && onTabChange('profile')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={activeTab === 'profile' ? COLORS.emerald : '#94A3B8'}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === 'profile' ? COLORS.emerald : '#64748B',
                fontWeight: activeTab === 'profile' ? '700' : '500',
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* iOS Home Indicator Bar */}
      <View style={[styles.homeIndicatorContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 16,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 64,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  homeIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#0F172A',
  },
});
