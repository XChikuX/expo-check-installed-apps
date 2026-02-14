# CLAUDE.md - Development Guide

## Project Overview

`expo-check-installed-apps` is an Expo native module + config plugin that detects installed apps on Android and iOS devices.

## Architecture

```
src/index.ts                    → JS API exports (checkInstalledApps)
src/ExpoCheckInstalledAppsModule.ts → requireNativeModule bridge
plugin/src/index.ts             → Config plugin (modifies AndroidManifest.xml & Info.plist)
ios/ExpoCheckInstalledAppsModule.swift → iOS native (UIApplication.canOpenURL)
android/.../ExpoCheckInstalledAppsModule.kt → Android native (PackageManager.getPackageInfo)
android/.../AndroidManifest.xml → Broad intent query for package visibility
```

## Build Commands

```bash
npm run build       # Compile TypeScript (src/ → build/, plugin/src/ → plugin/build/)
npm run clean       # Remove build artifacts
npm run lint        # ESLint with expo universe preset
npm run test        # Run tests
npm run prepare     # Prepare for development
```

## Key Design Decisions

- **Android**: Works out of the box. The library's `AndroidManifest.xml` includes a broad `<queries>` intent for `android.intent.action.MAIN`, giving visibility to all installed apps. No config plugin setup needed.
- **iOS**: Uses `UIApplication.shared.canOpenURL()` with URL schemes. **Requires** schemes in `LSApplicationQueriesSchemes` (Info.plist) — this is what the config plugin sets up.
- **Config Plugin**: Primarily needed for iOS. Adds URL schemes to `LSApplicationQueriesSchemes` in Info.plist during `expo prebuild`. Also supports an optional `android` key for adding specific `<queries><package>` entries.

## Platform Differences

| Aspect | Android | iOS |
|--------|---------|-----|
| Identifier | Package name (`com.tinder`) | URL scheme (`tinder`) |
| Config needed | None (broad intent query built-in) | Yes (`LSApplicationQueriesSchemes`) |
| Declaration | Built-in via library manifest | Config plugin or manual Info.plist |
| Detection | `PackageManager.getPackageInfo` | `UIApplication.canOpenURL` |
| Limit | None | 50 schemes max (iOS restriction) |

## iOS URL Scheme Format

The library normalizes scheme input: passing `"tinder"` or `"tinder://"` both work at runtime.
Config plugin values should be bare scheme names (e.g., `"tinder"`, not `"tinder://"`).

## Why Android Needs No Config

The library's `android/src/main/AndroidManifest.xml` declares:
```xml
<queries>
   <intent>
     <action android:name="android.intent.action.MAIN" />
   </intent>
</queries>
```
This broad intent query gives the app visibility to all installed apps with a launcher activity on Android 11+, so individual `<package>` declarations are unnecessary.

## Known Issues Fixed

1. **iOS silent failure**: Native code did not append `://` to bare scheme names, causing `URL(string:)` to return nil and all checks to return false
2. **Config plugin crash**: Missing `android`/`ios` keys in plugin options caused errors instead of being silently skipped
3. **Config plugin removing third-party packages**: The Android plugin removed all packages not in its own list, interfering with other plugins
4. **Thread safety**: iOS `canOpenURL` now dispatched on main queue for UIKit safety

## Status: All fixes applied
