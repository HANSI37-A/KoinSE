import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { Feather, Ionicons } from '@expo/vector-icons';
import { KoinReceiptIcon } from './KoinReceiptIcon';

interface UploadCardProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  onCameraPress,
  onGalleryPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Dashed outer white card */}
      <View style={styles.dashedCard}>
        {/* Mint Rounded Receipt Icon Badge */}
        <View style={styles.iconCircle}>
          <KoinReceiptIcon size={26} color={COLORS.emerald} linesColor={COLORS.emerald} />
        </View>

        {/* Headings */}
        <Text style={styles.heading}>Upload or Snap a Bill</Text>
        <Text style={styles.subtitle}>Less typing. More living.</Text>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onCameraPress}
            activeOpacity={0.7}
          >
            <Feather name="camera" size={17} color={COLORS.primaryText} style={styles.btnIcon} />
            <Text style={styles.actionButtonText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onGalleryPress}
            activeOpacity={0.7}
          >
            <Ionicons name="image-outline" size={17} color={COLORS.primaryText} style={styles.btnIcon} />
            <Text style={styles.actionButtonText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 20,
  },
  dashedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderStyle: 'dashed',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#E6F7F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: 22,
    textAlign: 'center',
    fontWeight: '400',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    maxWidth: 136,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  btnIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
});
