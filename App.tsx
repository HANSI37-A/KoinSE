import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { ExpensesScreen } from './src/screens/ExpensesScreen';
import { ReviewReceiptScreen } from './src/screens/ReviewReceiptScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'expenses' | 'review'>('expenses');

  return (
    <SafeAreaProvider>
      <ExpenseProvider>
        <StatusBar style="dark" />
        <View style={styles.container}>
          {currentScreen === 'expenses' ? (
            <ExpensesScreen
              onNavigateToReview={() => setCurrentScreen('review')}
            />
          ) : (
            <ReviewReceiptScreen
              onBack={() => setCurrentScreen('expenses')}
              onSaved={() => setCurrentScreen('expenses')}
            />
          )}
        </View>
      </ExpenseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
