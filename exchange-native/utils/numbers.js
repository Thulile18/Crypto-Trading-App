import { market, coin, cash } from "../data/market";

export function toNumber(text) {
  const number = Number(text.replace(/,/g, ""));
  if (isNaN(number)) {
    return 0;
  }
  return number;
}

export function formatNumber(number, decimals) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function convert(amount, from, to) {
  if (from === coin && to === cash) {
    return amount * market.rate;
  }
  return amount / market.rate;
}