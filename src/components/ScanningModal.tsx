import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface ScanningModalProps {
  visible: boolean;
  imageUri?: string;
  statusText?: string;
}

export const ScanningModal: React.FC<ScanningModalProps> = ({
  visible,
  imageUri,
  statusText = 'Analyzing receipt with AI...',
}) => {
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanAnim.setValue(0);
    }
  }, [visible, scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 190],
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Receipt Preview Box with Scanning Line */}
          <View style={styles.previewBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
            ) : (
              <View style={styles.placeholderReceipt}>
                <MaterialCommunityIcons name="receipt-text-outline" size={48} color={COLORS.emerald} />
                <Text style={styles.placeholderText}>Receipt Document</Text>
              </View>
            )}

            {/* Glowing Laser Scan Bar */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY }],
                },
              ]}
            >
              <View style={styles.scanGlow} />
            </Animated.View>
          </View>

          {/* Status and Spinner */}
          <View style={styles.statusRow}>
            <Feather name="zap" size={18} color={COLORS.emerald} style={{ marginRight: 8 }} />
            <Text style={styles.statusTitle}>Scanning & Extracting</Text>
          </View>

          <Text style={styles.statusSubtitle}>{statusText}</Text>

          <ActivityIndicator size="small" color={COLORS.emerald} style={{ marginTop: 14 }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  previewBox: {
    width: 200,
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: COLORS.emeraldBorder,
    marginBottom: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderReceipt: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginTop: 8,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.emerald,
    zIndex: 10,
  },
  scanGlow: {
    position: 'absolute',
    top: -4,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.35)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  statusSubtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
});

