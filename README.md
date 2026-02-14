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
  - [Config Plugin (Recommended)](#config-plugin-recommended)
  - [Manual Configuration](#manual-configuration)
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

### Config Plugin (Recommended)

Add the plugin to your `app.json` or `app.config.js`. You must declare which apps you want to query on each platform:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-check-installed-apps",
        {
          "android": ["com.facebook.katana", "com.twitter.android"],
          "ios": ["fb", "twitter"]
        }
      ]
    ]
  }
}
```

Then run `npx expo prebuild` to apply the changes to your native projects.

**Important notes:**

- **Android** values are package names (e.g., `com.facebook.katana`). These get added as `<queries><package>` entries in `AndroidManifest.xml`, required by Android 11+ for package visibility.
- **iOS** values are URL scheme names (e.g., `fb`, `twitter`). These get added to `LSApplicationQueriesSchemes` in `Info.plist`. iOS limits this to 50 schemes.
- Both keys are **optional**. Omitting a key skips configuration for that platform. You do not need to pass empty arrays.
- The plugin only **adds** entries. It will not remove entries added by other plugins.

### Manual Configuration

If you are not using the config plugin, update your native project files directly.

#### Android

Add package names to `AndroidManifest.xml`:

```xml
<manifest>
    <queries>
        <package android:name="com.facebook.katana"/>
        <package android:name="com.twitter.android"/>
    </queries>
</manifest>
```

#### iOS

Add URL schemes to `Info.plist`:

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

Uses `PackageManager.getPackageInfo()` to check if a package is installed. Requires the package to be declared in `<queries>` on Android 11+.

### iOS

Uses `UIApplication.canOpenURL()` to check if a URL scheme is registered. The library automatically appends `://` to bare scheme names, so both `"fb"` and `"fb://"` work as input. The scheme must be declared in `LSApplicationQueriesSchemes` or the check will always return `false`.

**Finding iOS URL schemes:** Each app registers its own URL schemes. You can find them in the app's `Info.plist` under `CFBundleURLSchemes`, or search online for "[app name] URL scheme".

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
