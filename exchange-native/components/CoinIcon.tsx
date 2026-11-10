import { View, Text, StyleSheet } from "react-native";
import EthLogo from "./EthLogo";
import { colors, spacing } from "../theme";
import type { Currency } from "../types";

const size = 40;

type Props = {
  currency: Currency;
};

export default function CoinIcon({ currency }: Props) {
  let background = colors.cardLight;
  if (currency.hasLogo) {
    background = colors.background;
  }

  return (
    <View style={[styles.circle, { backgroundColor: background }]}>
      {currency.hasLogo ? (
        <EthLogo size={size} />
      ) : (
        <Text style={styles.symbol}>{currency.symbol}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.small,
  },
  symbol: {
    color: colors.text,
    fontSize: 20,
  },
});