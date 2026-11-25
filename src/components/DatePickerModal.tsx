import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { formatDisplayDate } from '../utils/math';

interface DatePickerModalProps {
  visible: boolean;
  currentDate: string;
  onSaveDate: (newDate: string) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  currentDate,
  onSaveDate,
  onClose,
}) => {
  const [dateText, setDateText] = useState(currentDate);

  const handleSave = () => {
    if (dateText.trim()) {
      onSaveDate(dateText.trim());
    }
    onClose();
  };

  const setPresetToday = () => {
    setDateText(formatDisplayDate(new Date()));
  };

  const setPresetYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    setDateText(formatDisplayDate(d));
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <Feather name="calendar" size={20} color={COLORS.emerald} style={{ marginRight: 8 }} />
                  <Text style={styles.headerTitle}>Change Receipt Date</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Feather name="x" size={20} color={COLORS.secondaryText} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Date text</Text>
              <TextInput
                style={styles.input}
                value={dateText}
                onChangeText={setDateText}
                placeholder="e.g. Nov 24, 2026"
                placeholderTextColor={COLORS.secondaryText}
                autoFocus
              />

              {/* Quick helper date presets */}
              <View style={styles.presetsRow}>
                <TouchableOpacity style={styles.presetChip} onPress={setPresetToday}>
                  <Text style={styles.presetText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetChip} onPress={setPresetYesterday}>
                  <Text style={styles.presetText}>Yesterday</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.presetChip}
                  onPress={() => setDateText('Nov 24, 2026')}
                >
                  <Text style={styles.presetText}>Nov 24, 2026</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
                <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.saveBtnText}>Update Date</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  closeBtn: {
    padding: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primaryText,
    marginBottom: 12,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  presetText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.emerald,
    borderRadius: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

