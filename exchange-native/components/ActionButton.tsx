import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius } from "../theme";
import type { PressState } from "../types";

type Props = {
  title: string;
};

export default function ActionButton({ title }: Props) {
  return (
    <Pressable>
      {({ pressed, hovered }: PressState) => (
        <LinearGradient
          colors={
            pressed || hovered
              ? [colors.buttonPressed, colors.buttonPressed]
              : [colors.buttonLight, colors.buttonPressed]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.round,
    paddingVertical: 18,
    alignItems: "center",
  },
  text: {
    color: colors.background,
    fontSize: 17,
  },
});