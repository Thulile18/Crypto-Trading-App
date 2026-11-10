import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: {
    color: colors.muted,
    fontSize: 15,
  },
  value: {
    color: colors.text,
    fontSize: 15,
  },
});