import { View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import { colors, spacing } from "../theme";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <View style={styles.header}>
      <IconButton name="chevron-back" color={colors.muted} label="Go back" />
      <Text style={styles.title}>{title}</Text>
      <IconButton
        name="notifications"
        color="#c9a8e6"
        showDot={true}
        label="Notifications"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.large,
  },
  title: {
    color: colors.text,
    fontSize: 18,
  },
});