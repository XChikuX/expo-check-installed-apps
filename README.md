# Expo Check Installed Apps

<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://img.shields.io/npm/v/expo-check-installed-apps?color=orange&style=flat-square&logo=npm" alt="npm version"/>
  <img src="https://img.shields.io/npm/dt/expo-check-installed-apps?color=darkgreen&style=flat-square&logo=npm" alt="npm downloads"/>
  <img src="https://img.shields.io/npm/dw/expo-check-installed-apps?color=darkgreen&style=flat-square&logo=npm" alt="npm downloads"/>
</div>

A **config plugin** for Expo to check for installed apps on Android and iOS.

> **Note:** This library supports **Expo SDK 51 and above**.

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
  - [Android](#android)
  - [iOS](#ios)
- [API Documentation](#api-documentation)
  - [`checkInstalledApps`](#checkinstalledapps)
- [Platform Details](#platform-details)
- [Example Usage](#example-usage)
- [Contributing](#contributing)

---

## Installation

```bash
npx expo install expo-check-installed-apps
```

Or with npm:

```bash
npm install expo-check-installed-apps
```

For bare React Native projects, ensure you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before proceeding.

---

## Setup

### Android

**No configuration required.** The library's own `AndroidManifest.xml` includes a broad `<queries>` intent for `android.intent.action.MAIN`, which gives visibility to all installed apps on Android 11+. Just pass package names to `checkInstalledApps()` at runtime.

### iOS

iOS requires URL schemes to be declared in `LSApplicationQueriesSchemes` (Info.plist) before `canOpenURL` will work. Use the config plugin to set this up automatically.

Add the plugin to your `app.json` or `app.config.js` with the iOS schemes you want to query:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-check-installed-apps",
        {
          "ios": ["fb", "twitter", "tinder"]
        }
      ]
    ]
  }
}
```

Then run `npx expo prebuild` to apply the changes.

**Important notes:**

- Values are bare URL scheme names (e.g., `"fb"`, not `"fb://"`). The plugin normalizes these automatically.
- iOS limits `LSApplicationQueriesSchemes` to **50 schemes**.
- The plugin only **adds** entries — it will not remove entries added by other plugins.
- The `android` key is also supported if you want to add specific `<queries><package>` entries, but this is typically unnecessary.

#### Manual iOS Configuration

If you are not using the config plugin, add URL schemes to `Info.plist` directly:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>fb</string>
    <string>twitter</string>
</array>
```

---

## API Documentation

### `checkInstalledApps`

Checks whether specific apps are installed on the device.

```typescript
import { checkInstalledApps } from "expo-check-installed-apps";
```

#### Parameters

- **`packageNames`** (`Array<string>`): An array of identifiers to check.
  - **Android**: Package names (e.g., `"com.facebook.katana"`)
  - **iOS**: URL schemes, with or without `://` suffix (e.g., `"fb"` or `"fb://"`)

#### Returns

- **`Promise<Record<string, boolean>>`**: Object mapping each input identifier to `true` (installed) or `false` (not installed).

---

## Platform Details

### Android

Uses `PackageManager.getPackageInfo()` to check if a package is installed. The library's manifest already declares a broad intent query, so no additional configuration is needed.

### iOS

Uses `UIApplication.canOpenURL()` to check if a URL scheme is registered. The library automatically appends `://` to bare scheme names, so both `"fb"` and `"fb://"` work as input. The scheme **must** be declared in `LSApplicationQueriesSchemes` or the check will always return `false`.

**Finding iOS URL schemes:** Each app registers its own URL schemes. You can find them in the app's `Info.plist` under `CFBundleURLSchemes`, or search online for "[app name] URL scheme iOS".

---

## Example Usage

```typescript
import { checkInstalledApps } from "expo-check-installed-apps";
import { Platform } from "react-native";

const apps = Platform.select({
  android: ["com.facebook.katana", "com.android.chrome"],
  ios: ["fb", "twitter"],
}) || [];

const result = await checkInstalledApps(apps);
console.log(result);
// Android: { "com.facebook.katana": true, "com.android.chrome": true }
// iOS: { "fb": true, "twitter": false }
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

Apache-2.0
