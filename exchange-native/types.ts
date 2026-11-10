import type { PressableStateCallbackType } from "react-native";

export type Currency = {
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  hasLogo: boolean;
};

export type PressState = PressableStateCallbackType & { hovered?: boolean };