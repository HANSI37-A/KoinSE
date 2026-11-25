import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { ExtractedReceiptData, ExpenseCategory, LineItem } from '../types/expense';
import { calculateTotalAmount, formatCurrency } from '../utils/math';
import { useExpenses } from '../context/ExpenseContext';
import { CategoryPickerModal } from '../components/CategoryPickerModal';
import { DatePickerModal } from '../components/DatePickerModal';
import { Feather, Ionicons } from '@expo/vector-icons';

interface ReviewReceiptScreenProps {
  onBack: () => void;
  onSaved: () => void;
}

export const ReviewReceiptScreen: React.FC<ReviewReceiptScreenProps> = ({
  onBack,
  onSaved,
}) => {
  const insets = useSafeAreaInsets();
  const { currentDraft, saveExpense } = useExpenses();

  // Form local editable states
  const [merchantName, setMerchantName] = useState(currentDraft?.merchantName || 'Cafe Kumbuk');
  const [date, setDate] = useState(currentDraft?.date || 'Nov 24, 2026');
  const [category, setCategory] = useState<ExpenseCategory>(
    currentDraft?.category || 'Food & Dining'
  );
  const [items, setItems] = useState<LineItem[]>(
    currentDraft?.items && currentDraft.items.length > 0
      ? currentDraft.items
      : [
          { id: '1', name: 'Avocado toast', price: 14.0 },
          { id: '2', name: 'Cappuccino', price: 6.5 },
          { id: '3', name: 'Banana pancakes', price: 8.0 },
        ]
  );

  // Modals state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // Dynamic real-time recalculated total amount in cents
  const totalAmount = calculateTotalAmount(items);

  // Update item field (name or price)
  const handleItemChange = (id: string, field: 'name' | 'price', value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (field === 'price') {
            const cleanVal = value.replace(/[^0-9.]/g, '');
            return {
              ...item,
              price: cleanVal === '' ? 0 : parseFloat(cleanVal) || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Add new line item
  const handleAddItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      name: 'New Item',
      price: 0.0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Delete line item
  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) {
      Alert.alert('Cannot Remove', 'A receipt must have at least one line item.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Validation and submit
  const handleConfirmAndSave = () => {
    const trimmedMerchant = merchantName.trim();
    if (!trimmedMerchant) {
      Alert.alert('Missing Merchant', 'Please enter a valid merchant name.');
      return;
    }

    if (items.length === 0) {
      Alert.alert('No Items', 'Please add at least one line item.');
      return;
    }

    if (totalAmount <= 0) {
      Alert.alert(
        'Invalid Total',
        'Total amount must be greater than $0.00. Please enter item prices.'
      );
      return;
    }

    const finalizedDraft: ExtractedReceiptData = {
      merchantName: trimmedMerchant,
      date,
      category,
      items,
      totalAmount,
      receiptImageUri: currentDraft?.receiptImageUri,
    };

    saveExpense(finalizedDraft);

    Alert.alert(
      'Expense Saved!',
      `Successfully added ${trimmedMerchant} (${formatCurrency(totalAmount)}) to your recent activity.`,
      [{ text: 'Great', onPress: onSaved }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Feather name="arrow-left" size={24} color={COLORS.primaryText} />
          </TouchableOpacity>

          <Text style={styles.topBarTitle}>Review Receipt</Text>

          {/* Dark Receipt Thumbnail Preview on Top Right */}
          <View style={styles.thumbnailContainer}>
            {currentDraft?.receiptImageUri ? (
              <Image
                source={{ uri: currentDraft.receiptImageUri }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.receiptGraphic}>
                {/* Paper sheet representation */}
                <View style={styles.paperSheet}>
                  <View style={styles.paperLineLong} />
                  <View style={styles.paperLineShort} />
                  <View style={styles.paperLineMed} />
                  <View style={styles.paperLineShort} />
                  <View style={styles.paperLineLong} />
                </View>
              </View>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Metadata Card: Merchant Name, Date, Category */}
          <View style={styles.metadataCard}>
            {/* Merchant Name Input */}
            <View style={styles.merchantSection}>
              <Text style={styles.fieldLabel}>Merchant Name</Text>
              <View style={styles.merchantInputRow}>
                <TextInput
                  style={styles.merchantInput}
                  value={merchantName}
                  onChangeText={setMerchantName}
                  placeholder="Merchant name"
                  placeholderTextColor={COLORS.secondaryText}
                />
                <Feather name="edit-2" size={16} color={COLORS.secondaryText} />
              </View>
            </View>

            <View style={styles.cardDivider} />

            {/* Date and Category Row */}
            <View style={styles.twoColumnRow}>
              {/* Date Field */}
              <TouchableOpacity
                style={styles.columnField}
                onPress={() => setIsDateModalOpen(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.fieldLabel}>Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.fieldValueText}>{date}</Text>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={COLORS.secondaryText}
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </TouchableOpacity>

              {/* Category Field */}
              <View style={styles.columnField}>
                <Text style={styles.fieldLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.categoryPill}
                  onPress={() => setIsCategoryModalOpen(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryPillText}>{category}</Text>
                  <Feather name="chevron-down" size={13} color={COLORS.emeraldDark} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Extracted Items Section */}
          <View style={styles.itemsSection}>
            <View style={styles.itemsHeader}>
              <Text style={styles.itemsTitle}>Extracted Items</Text>
              <Text style={styles.itemsCountBadge}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </Text>
            </View>

            {/* Line Item Rows directly on cream background */}
            <View style={styles.itemsList}>
              {items.map((item) => (
                <View key={item.id} style={styles.itemRowWrapper}>
                  <View style={styles.itemRow}>
                    {/* Item Name Input */}
                    <TextInput
                      style={styles.itemNameInput}
                      value={item.name}
                      onChangeText={(val: string) => handleItemChange(item.id, 'name', val)}
                      placeholder="Item name"
                      placeholderTextColor={COLORS.secondaryText}
                    />

                    {/* Price Box */}
                    <View style={styles.priceBox}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <TextInput
                        style={styles.priceInput}
                        value={item.price > 0 ? item.price.toFixed(2) : ''}
                        onChangeText={(val: string) => handleItemChange(item.id, 'price', val)}
                        placeholder="0.00"
                        placeholderTextColor={COLORS.secondaryText}
                        keyboardType="decimal-pad"
                      />
                    </View>

                    {/* Delete Trash Button */}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteItem(item.id)}
                      activeOpacity={0.6}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="trash-outline" size={19} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* Thin divider line */}
                  <View style={styles.itemDivider} />
                </View>
              ))}
            </View>

            {/* + Add Item Action Button */}
            <TouchableOpacity
              style={styles.addItemButton}
              onPress={handleAddItem}
              activeOpacity={0.7}
            >
              <Feather name="plus" size={16} color={COLORS.emerald} style={{ marginRight: 6 }} />
              <Text style={styles.addItemText}>Add Item</Text>
            </TouchableOpacity>

            {/* Helper Check Note */}
            <View style={styles.helperNoteRow}>
              <Feather name="check" size={14} color="#64748B" style={{ marginRight: 6 }} />
              <Text style={styles.helperNoteText}>
                All set? Give your items a quick check.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom Summary Bar */}
        <View style={styles.bottomBarWrapper}>
          <View style={styles.bottomBarContainer}>
            {/* Top Total Amount and Count Row */}
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
              </View>

              <View style={styles.itemCountTextRow}>
                <Feather name="check" size={15} color={COLORS.emerald} style={{ marginRight: 4 }} />
                <Text style={styles.itemCountCheckText}>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>

            {/* Confirm & Save Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmAndSave}
              activeOpacity={0.85}
            >
              <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.confirmButtonText}>Confirm & Save Expense</Text>
            </TouchableOpacity>
          </View>

          {/* iOS Home Indicator Bar */}
          <View style={[styles.homeIndicatorContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            <View style={styles.homeIndicator} />
          </View>
        </View>

        {/* Category Dropdown Picker Modal */}
        <CategoryPickerModal
          visible={isCategoryModalOpen}
          selectedCategory={category}
          onSelectCategory={setCategory}
          onClose={() => setIsCategoryModalOpen(false)}
        />

        {/* Date Picker Modal */}
        <DatePickerModal
          visible={isDateModalOpen}
          currentDate={date}
          onSaveDate={setDate}
          onClose={() => setIsDateModalOpen(false)}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  keyboardContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  topBarTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: -0.3,
  },
  thumbnailContainer: {
    width: 44,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#2D3748',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  receiptGraphic: {
    width: 28,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperSheet: {
    width: '100%',
    gap: 3,
  },
  paperLineLong: {
    height: 2,
    backgroundColor: '#94A3B8',
    width: '90%',
    borderRadius: 1,
  },
  paperLineMed: {
    height: 2,
    backgroundColor: '#94A3B8',
    width: '70%',
    borderRadius: 1,
  },
  paperLineShort: {
    height: 2,
    backgroundColor: '#94A3B8',
    width: '50%',
    borderRadius: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  metadataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 24,
  },
  merchantSection: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  merchantInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  merchantInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryText,
    paddingVertical: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  columnField: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  fieldValueText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F7F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 2,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.emerald,
    marginRight: 4,
  },
  itemsSection: {
    marginBottom: 20,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: -0.3,
  },
  itemsCountBadge: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.secondaryText,
  },
  itemsList: {
    backgroundColor: 'transparent',
  },
  itemRowWrapper: {
    backgroundColor: 'transparent',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemNameInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primaryText,
    paddingVertical: 4,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 12,
    minWidth: 88,
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.secondaryText,
    marginRight: 6,
  },
  priceInput: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryText,
    fontVariant: ['tabular-nums'],
    minWidth: 46,
    padding: 0,
  },
  deleteButton: {
    padding: 4,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#EAE5DC',
    width: '100%',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 18,
    paddingVertical: 4,
  },
  addItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.emerald,
  },
  helperNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  helperNoteText: {
    fontSize: 12,
    color: '#64748B',
  },
  bottomBarWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bottomBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.primaryText,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.6,
  },
  itemCountTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemCountCheckText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.emerald,
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.emerald,
    borderRadius: 16,
    height: 52,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
