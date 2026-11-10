import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";
import { formatNumber } from "../utils/numbers";

export default function CurrencyRow({ currency, value, onChangeText, amountSize }) {
  return (
    <View style={styles.row}>
      <View style={styles.currency}>
        <View style={styles.coin}>
          <Text style={styles.coinSymbol}>{currency.symbol}</Text>
        </View>
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
  coin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.small,
  },
  coinSymbol: {
    color: colors.text,
    fontSize: 20,
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