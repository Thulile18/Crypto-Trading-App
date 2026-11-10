import { ComponentProps } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import type { PressState } from "../types";

type Props = {
  name: ComponentProps<typeof Ionicons>["name"];
  color: string;
  showDot?: boolean;
  label: string;
  onPress?: () => void;
};

export default function IconButton({ name, color, showDot, label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      style={({ pressed, hovered }: PressState) => [
        styles.button,
        (pressed || hovered) && styles.active,
      ]}
    >
      <Ionicons name={name} size={24} color={color} />
      {showDot && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.card,
  },
  dot: {
    position: "absolute",
    top: 9,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
});