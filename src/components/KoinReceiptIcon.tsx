import React from 'react';
import { View, StyleSheet } from 'react-native';

interface KoinReceiptIconProps {
  size?: number;
  color?: string;
  linesColor?: string;
}

/**
 * Pixel-accurate receipt icon matching the Koin design mockup:
 * A receipt ticket with jagged/notched edges and internal receipt lines.
 */
export const KoinReceiptIcon: React.FC<KoinReceiptIconProps> = ({
  size = 28,
  color = '#10B981',
  linesColor = '#10B981',
}) => {
  const width = size * 0.78;
  const height = size;

  return (
    <View
      style={[
        styles.receiptBody,
        {
          width,
          height,
          borderColor: color,
        },
      ]}
    >
      {/* Top jagged teeth simulation */}
      <View style={styles.topNotches}>
        <View style={[styles.notch, { backgroundColor: color }]} />
        <View style={[styles.notch, { backgroundColor: color }]} />
        <View style={[styles.notch, { backgroundColor: color }]} />
      </View>

      {/* Internal receipt lines */}
      <View style={styles.linesContainer}>
        <View style={[styles.line, { backgroundColor: linesColor, width: '65%' }]} />
        <View style={[styles.line, { backgroundColor: linesColor, width: '80%' }]} />
        <View style={[styles.line, { backgroundColor: linesColor, width: '50%' }]} />
      </View>

      {/* Bottom jagged teeth */}
      <View style={styles.bottomNotches}>
        <View style={[styles.notch, { backgroundColor: color }]} />
        <View style={[styles.notch, { backgroundColor: color }]} />
        <View style={[styles.notch, { backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receiptBody: {
    borderWidth: 1.8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 3,
    overflow: 'hidden',
  },
  topNotches: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 2,
    opacity: 0.6,
  },
  bottomNotches: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 2,
    opacity: 0.6,
  },
  notch: {
    width: 3,
    height: 2,
    borderRadius: 1,
  },
  linesContainer: {
    width: '100%',
    gap: 3,
    paddingHorizontal: 2,
    alignItems: 'flex-start',
  },
  line: {
    height: 1.8,
    borderRadius: 1,
  },
});

