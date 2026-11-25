import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ExpenseCategory } from '../types/expense';
import { COLORS, CATEGORY_METADATA } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

interface CategoryPickerModalProps {
  visible: boolean;
  selectedCategory: ExpenseCategory;
  onSelectCategory: (category: ExpenseCategory) => void;
  onClose: () => void;
}

const CATEGORIES: ExpenseCategory[] = [
  'Food & Dining',
  'Groceries',
  'Transport',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Other',
];

export const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
  visible,
  selectedCategory,
  onSelectCategory,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Select Category</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Feather name="x" size={20} color={COLORS.secondaryText} />
                </TouchableOpacity>
              </View>

              <View style={styles.listContainer}>
                {CATEGORIES.map((category) => {
                  const isSelected = category === selectedCategory;
                  const meta = CATEGORY_METADATA[category];

                  return (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryItem,
                        isSelected && styles.selectedCategoryItem,
                      ]}
                      onPress={() => {
                        onSelectCategory(category);
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.badge, { backgroundColor: meta.bg }]}>
                        <View style={[styles.badgeDot, { backgroundColor: meta.color }]} />
                      </View>
                      <Text
                        style={[
                          styles.categoryName,
                          isSelected && styles.selectedCategoryName,
                        ]}
                      >
                        {category}
                      </Text>
                      {isSelected && (
                        <Feather name="check" size={18} color={COLORS.emerald} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  closeBtn: {
    padding: 4,
  },
  listContainer: {
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.emeraldLight,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  selectedCategoryName: {
    color: COLORS.emeraldDark,
    fontWeight: '700',
  },
});

