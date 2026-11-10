import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import type { PressState } from "../types";

type Props = {
  onPress: () => void;
};

export default function SwapDivider({ onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <Pressable
        onPress={onPress}
        accessibilityLabel="Swap currencies"
        style={({ pressed, hovered }: PressState) => [
          styles.button,
          (pressed || hovered) && styles.active,
        ]}
      >
        <Ionicons name="swap-vertical" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#000000",
  },
  button: {
    width: 44,
    height: 36,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.card,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.cardLight,
  },
});