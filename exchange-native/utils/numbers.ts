import { market, coin, cash } from "../data/market";
import type { Currency } from "../types";

export function toNumber(text: string): number {
  const number = Number(text.replace(/,/g, ""));
  if (isNaN(number)) {
    return 0;
  }
  return number;
}

export function formatNumber(number: number, decimals: number): string {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function convert(amount: number, from: Currency, to: Currency): number {
  if (from === coin && to === cash) {
    return amount * market.rate;
  }
  return amount / market.rate;
}