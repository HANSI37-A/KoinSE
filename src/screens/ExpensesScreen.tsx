import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/theme';
import { Header } from '../components/Header';
import { UploadCard } from '../components/UploadCard';
import { TransactionItem } from '../components/TransactionItem';
import { BottomNavBar, TabType } from '../components/BottomNavBar';
import { ScanningModal } from '../components/ScanningModal';
import { useExpenses } from '../context/ExpenseContext';

interface ExpensesScreenProps {
  onNavigateToReview: () => void;
}

export const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ onNavigateToReview }) => {
  const insets = useSafeAreaInsets();
  const { recentExpenses, isScanning, scanProgressText, scanReceipt } = useExpenses();
  const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<TabType>('expenses');

  // Launch device camera
  const handleCameraCapture = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Camera Permission',
          'Camera access is needed to scan receipts, or choose a sample preset.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Use Sample Bill', onPress: () => handleSamplePreset(0) },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImageUri(asset.uri);
        await scanReceipt({
          imageUri: asset.uri,
          imageBase64: asset.base64 || undefined,
        });
        onNavigateToReview();
      }
    } catch (err) {
      console.warn('Camera error:', err);
      handleSamplePreset(0);
    }
  };

  // Pick image from gallery
  const handleGalleryPick = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Photo Library Permission',
          'Photo access is needed to select receipts, or choose a sample preset.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Use Sample Bill', onPress: () => handleSamplePreset(0) },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImageUri(asset.uri);
        await scanReceipt({
          imageUri: asset.uri,
          imageBase64: asset.base64 || undefined,
        });
        onNavigateToReview();
      }
    } catch (err) {
      console.warn('Gallery pick error:', err);
      handleSamplePreset(0);
    }
  };

  // Preset extraction (Cafe Kumbuk, Keells, etc.)
  const handleSamplePreset = async (presetIndex: number = 0) => {
    setSelectedImageUri(undefined);
    await scanReceipt({ presetIndex });
    onNavigateToReview();
  };

  const handleScanBillAction = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library', 'Load Sample Cafe Kumbuk'],
          cancelButtonIndex: 0,
        },
        (buttonIndex: number) => {
          if (buttonIndex === 1) handleCameraCapture();
          else if (buttonIndex === 2) handleGalleryPick();
          else if (buttonIndex === 3) handleSamplePreset(0);
        }
      );
    } else {
      Alert.alert('Scan Bill', 'Select receipt source', [
        { text: 'Camera', onPress: handleCameraCapture },
        { text: 'Gallery', onPress: handleGalleryPick },
        { text: 'Load Sample Preset', onPress: () => handleSamplePreset(0) },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      {/* Top Header */}
      <Header onScanPress={handleScanBillAction} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload or Snap a Bill Hero Card */}
        <UploadCard
          onCameraPress={handleCameraCapture}
          onGalleryPress={handleGalleryPick}
        />

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.sectionBadge}>This week</Text>
          </View>

          {/* Clean Transaction List directly on cream background */}
          <View style={styles.transactionsList}>
            {recentExpenses.map((expense) => (
              <TransactionItem
                key={expense.id}
                expense={expense}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Docked Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Scanning Modal */}
      <ScanningModal
        visible={isScanning}
        imageUri={selectedImageUri}
        statusText={scanProgressText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  activitySection: {
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: -0.3,
  },
  sectionBadge: {
    fontSize: 13,
    color: COLORS.secondaryText,
    fontWeight: '500',
  },
  transactionsList: {
    backgroundColor: 'transparent',
  },
});
