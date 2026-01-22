const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Firebase needs it
defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.unstable_enablePackageExports = true;

const config = defaultConfig;

module.exports = withNativeWind(config, { input: "./global.css" });
