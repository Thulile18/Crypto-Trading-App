// All the numbers live here, nothing is typed into the HTML
const market = {
  rate: 3461.02,     // 1 ETH in USD
  feeRate: 0.0001,   // fee is 0.01% of the USD value
  spread: 0.2,       // shown as a percentage
  gasFee: 0.0045     // paid in ETH
};

const coin = { name: "ETH", symbol: "Ξ", balance: 293.0187, decimals: 4 };
const cash = { name: "USD", symbol: "$", balance: 12987.21, decimals: 2 };

// The top box is what you get, the bottom box is what you pay with
let topCurrency = coin;
let bottomCurrency = cash;

// Grab the elements we need
const topAmount = document.getElementById("top-amount");
const bottomAmount = document.getElementById("bottom-amount");
const swapButton = document.getElementById("swap-button");
const actionButton = document.getElementById("action-button");
const message = document.getElementById("message");

function toNumber(text) {
  const number = Number(text.replace(/,/g, ""));
  if (isNaN(number)) {
    return 0;
  }
  return number;
}

function formatNumber(number, decimals) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

function convert(amount, from, to) {
  if (from === coin && to === cash) {
    return amount * market.rate;
  }
  return amount / market.rate;
}

function showCurrencies() {
  document.getElementById("top-symbol").textContent = topCurrency.symbol;
  document.getElementById("top-name").textContent = topCurrency.name;
  document.getElementById("top-balance").textContent = formatNumber(topCurrency.balance, topCurrency.decimals);

  document.getElementById("bottom-symbol").textContent = bottomCurrency.symbol;
  document.getElementById("bottom-name").textContent = bottomCurrency.name;
  document.getElementById("bottom-balance").textContent = formatNumber(bottomCurrency.balance, bottomCurrency.decimals);

  document.getElementById("rate-text").textContent =
    "1 " + coin.name + " = " + formatNumber(market.rate, 2) + " " + cash.name;

  if (topCurrency === coin) {
    actionButton.textContent = "Buy " + coin.name;
  } else {
    actionButton.textContent = "Sell " + coin.name;
  }

  document.getElementById("spread-text").textContent = market.spread + "%";
  document.getElementById("gas-text").textContent = market.gasFee + " " + coin.name;
}

function showDetails() {
  const topValue = toNumber(topAmount.value);
  const bottomValue = toNumber(bottomAmount.value);

  // work out how much of this trade is in USD
  let usdValue = bottomValue;
  if (topCurrency === cash) {
    usdValue = topValue;
  }

  const fee = usdValue * market.feeRate;

  // the fee comes out of the USD, so only subtract it when we receive USD
  let receive = topValue;
  if (topCurrency === cash) {
    receive = topValue - fee;
  }

  document.getElementById("fee-text").textContent = formatNumber(fee, 2) + " " + cash.name.toLowerCase();
  document.getElementById("receive-text").textContent =
    formatNumber(receive, topCurrency.decimals) + " " + topCurrency.name;
}

topAmount.addEventListener("input", function () {
  const result = convert(toNumber(topAmount.value), topCurrency, bottomCurrency);
  bottomAmount.value = formatNumber(result, bottomCurrency.decimals);
  message.textContent = "";
  showDetails();
});

bottomAmount.addEventListener("input", function () {
  const result = convert(toNumber(bottomAmount.value), bottomCurrency, topCurrency);
  topAmount.value = formatNumber(result, topCurrency.decimals);
  message.textContent = "";
  showDetails();
});

swapButton.addEventListener("click", function () {
  const oldTop = topCurrency;
  topCurrency = bottomCurrency;
  bottomCurrency = oldTop;

  // keep the amount the user typed on top, and recalculate the bottom
  const result = convert(toNumber(topAmount.value), topCurrency, bottomCurrency);
  bottomAmount.value = formatNumber(result, bottomCurrency.decimals);

  message.textContent = "";
  showCurrencies();
  showDetails();
});

actionButton.addEventListener("click", function () {
  const topValue = toNumber(topAmount.value);
  const bottomValue = toNumber(bottomAmount.value);

  if (topValue <= 0) {
    message.textContent = "Enter an amount first.";
    return;
  }

  if (bottomValue > bottomCurrency.balance) {
    message.textContent = "Your " + bottomCurrency.name + " balance is too low.";
    return;
  }

  message.textContent = "";
  alert(actionButton.textContent + ": " + topAmount.value + " " + topCurrency.name +
        " for " + bottomAmount.value + " " + bottomCurrency.name);
});

// Start
topAmount.value = "1";
bottomAmount.value = formatNumber(convert(1, topCurrency, bottomCurrency), bottomCurrency.decimals);
showCurrencies();
showDetails();