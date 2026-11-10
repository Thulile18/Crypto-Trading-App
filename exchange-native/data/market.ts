import type { Currency } from "../types";

export const market = {
  rate: 3461.02,
  feeRate: 0.0001,
  spread: 0.2,
  gasFee: 0.0045,
};

export const coin: Currency = {
  name: "ETH",
  symbol: "Ξ",
  balance: 293.0187,
  decimals: 4,
  hasLogo: true,
};

export const cash: Currency = {
  name: "USD",
  symbol: "$",
  balance: 12987.21,
  decimals: 2,
  hasLogo: false,
};