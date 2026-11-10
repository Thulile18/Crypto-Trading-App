import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CoinIcon from "./CoinIcon";
import { colors, spacing } from "../theme";
import { formatNumber } from "../utils/numbers";
import type { Currency } from "../types";

type Props = {
  currency: Currency;
  amountSize: number;
};

export default function CurrencyRow({ currency, amountSize }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.currency}>
        <CoinIcon currency={currency} />
        <Text style={styles.name}>{currency.name}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.muted} />
      </View>

      <Text
        style={[styles.amount, { fontSize: amountSize }]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
      >
        {formatNumber(currency.amount, currency.decimals)}
      </Text>

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