import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import Header from "./components/Header";
import CurrencyRow from "./components/CurrencyRow";
import SwapDivider from "./components/SwapDivider";
import ActionButton from "./components/ActionButton";
import DetailRow from "./components/DetailRow";

import { market, coin, cash } from "./data/market";
import { toNumber, formatNumber, convert } from "./utils/numbers";
import { colors, spacing, radius } from "./theme";

export default function App() {
  const { width } = useWindowDimensions();

  const [topCurrency, setTopCurrency] = useState(coin);
  const [bottomCurrency, setBottomCurrency] = useState(cash);
  const [topValue, setTopValue] = useState("1");
  const [bottomValue, setBottomValue] = useState(
    formatNumber(convert(1, coin, cash), cash.decimals)
  );
  const [message, setMessage] = useState("");

  // the amount text gets smaller on narrow phones
  const amountSize = Math.min(56, width * 0.13);

  function handleTopChange(text) {
    setTopValue(text);
    const result = convert(toNumber(text), topCurrency, bottomCurrency);
    setBottomValue(formatNumber(result, bottomCurrency.decimals));
    setMessage("");
  }

  function handleBottomChange(text) {
    setBottomValue(text);
    const result = convert(toNumber(text), bottomCurrency, topCurrency);
    setTopValue(formatNumber(result, topCurrency.decimals));
    setMessage("");
  }

  function handleSwap() {
    const newTop = bottomCurrency;
    const newBottom = topCurrency;
    setTopCurrency(newTop);
    setBottomCurrency(newBottom);

    const result = convert(toNumber(topValue), newTop, newBottom);
    setBottomValue(formatNumber(result, newBottom.decimals));
    setMessage("");
  }

  function handleAction() {
    if (toNumber(topValue) <= 0) {
      setMessage("Enter an amount first.");
      return;
    }
    if (toNumber(bottomValue) > bottomCurrency.balance) {
      setMessage("Your " + bottomCurrency.name + " balance is too low.");
      return;
    }
    setMessage("");
    Alert.alert(
      "Order placed",
      buttonTitle + ": " + topValue + " " + topCurrency.name +
        " for " + bottomValue + " " + bottomCurrency.name
    );
  }

  const topNumber = toNumber(topValue);
  const bottomNumber = toNumber(bottomValue);

  let usdValue = bottomNumber;
  let receive = topNumber;
  if (topCurrency === cash) {
    usdValue = topNumber;
  }
  const fee = usdValue * market.feeRate;
  if (topCurrency === cash) {
    receive = topNumber - fee;
  }

  let buttonTitle = "Sell " + coin.name;
  if (topCurrency === coin) {
    buttonTitle = "Buy " + coin.name;
  }

  const details = [
    { label: "Estimate fee", value: formatNumber(fee, 2) + " usd" },
    {
      label: "You will receive",
      value: formatNumber(receive, topCurrency.decimals) + " " + topCurrency.name,
    },
    { label: "Spread", value: market.spread + "%" },
    { label: "Gas fee", value: market.gasFee + " " + coin.name },
  ];

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#34214d", colors.background, "#1d1229"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screen}
      >
        <SafeAreaView style={styles.safe}>
          <StatusBar barStyle="light-content" />
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.app}>
              <Header title="Exchange" />

              <View style={styles.card}>
                <CurrencyRow
                  currency={topCurrency}
                  value={topValue}
                  onChangeText={handleTopChange}
                  amountSize={amountSize}
                />
                <SwapDivider onPress={handleSwap} />
                <CurrencyRow
                  currency={bottomCurrency}
                  value={bottomValue}
                  onChangeText={handleBottomChange}
                  amountSize={amountSize}
                />
              </View>

              <Text style={styles.rate}>
                1 {coin.name} = {formatNumber(market.rate, 2)} {cash.name}
              </Text>

              <ActionButton title={buttonTitle} onPress={handleAction} />

              <Text style={styles.message}>{message}</Text>

              {details.map((item) => (
                <DetailRow key={item.label} label={item.label} value={item.value} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.medium,
  },
  app: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  rate: {
    color: colors.text,
    textAlign: "center",
    fontSize: 15,
    marginVertical: spacing.medium,
  },
  message: {
    color: colors.accent,
    textAlign: "center",
    fontSize: 14,
    minHeight: 20,
    marginVertical: spacing.small,
  },
});