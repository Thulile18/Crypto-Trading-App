import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CoinIcon from "./CoinIcon";
import { colors, spacing } from "../theme";
import { formatNumber } from "../utils/numbers";

export default function CurrencyRow({ currency, value, onChangeText, amountSize }) {
  return (
    <View style={styles.row}>
      <View style={styles.currency}>
        <CoinIcon currency={currency} />
        <Text style={styles.name}>{currency.name}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.muted} />
      </View>

      <TextInput
        style={[styles.amount, { fontSize: amountSize }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        selectionColor={colors.accent}
        accessibilityLabel={currency.name + " amount"}
      />

      <View style={styles.balanceRow}>
        <Text style={styles.balanceText}>Balance</Text>
        <Text style={styles.balanceText}>
          {formatNumber(currency.balance, currency.decimals)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.medium,
  },
  currency: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: colors.text,
    fontSize: 22,
    marginRight: 6,
  },
  amount: {
    color: colors.text,
    fontWeight: "300",
    paddingVertical: 0,
    marginVertical: spacing.small,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    color: colors.muted,
    fontSize: 16,
  },
});