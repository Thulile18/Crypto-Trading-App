import {
  ScrollView,
  View,
  Text,
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
import { formatNumber } from "./utils/numbers";
import { colors, spacing, radius } from "./theme";

export default function App() {
  const { width } = useWindowDimensions();

  // the amount text gets smaller on narrow phones
  const amountSize = Math.min(56, width * 0.13);

  const details = [
    { label: "Estimate fee", value: formatNumber(market.estimateFee, 2) + " usd" },
    {
      label: "You will receive",
      value: formatNumber(market.youReceive, 2) + " " + cash.name,
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
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.app}>
              <Header title="Exchange" />

              <View style={styles.card}>
                <CurrencyRow currency={coin} amountSize={amountSize} />
                <SwapDivider />
                <CurrencyRow currency={cash} amountSize={amountSize} />
              </View>

              <Text style={styles.rate}>
                1 {coin.name} = {formatNumber(market.rate, 2)} {cash.name}
              </Text>

              <ActionButton title={"Buy " + coin.name} />

              <View style={styles.details}>
                {details.map((item) => (
                  <DetailRow key={item.label} label={item.label} value={item.value} />
                ))}
              </View>
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
  details: {
    marginTop: spacing.large,
  },
});