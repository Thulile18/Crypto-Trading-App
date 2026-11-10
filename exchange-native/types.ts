import type { PressableStateCallbackType } from "react-native";

export type Currency = {
  name: string;
  symbol: string;
  amount: number;
  balance: number;
  decimals: number;
  hasLogo: boolean;
};

export type PressState = PressableStateCallbackType & { hovered?: boolean };