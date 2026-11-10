import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

export default function ActionButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }) => [
        styles.button,
        (pressed || hovered) && styles.active,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonLight,
    borderRadius: radius.round,
    paddingVertical: 18,
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.buttonPressed,
  },
  text: {
    color: colors.background,
    fontSize: 17,
  },
});