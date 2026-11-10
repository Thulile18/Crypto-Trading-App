# Crypto Trading App – React Native UI Challenge

An exchange screen for a crypto trading app, built with React Native, Expo and TypeScript, based on the Crypto Trading App design by Bogdan Nikitin (Nixtio) on Dribbble.

## Download
Android APK: https://drive.google.com/file/d/1FeqBIOIzy2zj5mScO-ar7I83zioZOxDu/view?usp=drivesdk
- If Google shows a virus-scan warning, click "Download anyway". It appears for every large file.
- On your phone, Android may ask you to allow installs from this source. Allow it to install the app.

## Features
- Pixel-matched layout of the Crypto Trading App exchange screen
- Buttons and icons change colour when pressed or hovered
- Responsive: text size and layout adjust to the screen width
- All values come from one data file, nothing is hardcoded in the components

## Components
- Header
- IconButton (used twice)
- CurrencyRow (used twice)
- CoinIcon (used twice)
- EthLogo
- SwapDivider
- ActionButton
- DetailRow (used four times)

## Project structure
- App.tsx: the screen, state and logic
- theme.ts: colours, spacing and radius values
- data/market.ts: rate, fees and currencies
- utils/numbers.ts: conversion and formatting helpers
- types.ts: shared types
- components/: reusable components

## Run it
cd exchange-native
npm install
npx expo start

## Built with
React Native, Expo, TypeScript, StyleSheet, expo-linear-gradient, react-native-svg

Author: Thulile