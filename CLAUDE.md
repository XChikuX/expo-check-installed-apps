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

- **iOS**: Uses `UIApplication.shared.canOpenURL()` with URL schemes. Requires schemes in `LSApplicationQueriesSchemes` (Info.plist).
- **Android**: Uses `PackageManager.getPackageInfo()` with package names. Requires `<queries>` in AndroidManifest.xml (Android 11+).
- **Config Plugin**: Automatically adds required entries to native manifests during `expo prebuild`.

## Platform Differences

| Aspect | Android | iOS |
|--------|---------|-----|
| Identifier | Package name (`com.tinder`) | URL scheme (`tinder`) |
| Declaration | `<queries><package>` in manifest | `LSApplicationQueriesSchemes` in plist |
| Detection | `PackageManager.getPackageInfo` | `UIApplication.canOpenURL` |
| Limit | None | 50 schemes max (iOS restriction) |

## iOS URL Scheme Format

The library normalizes scheme input: passing `"tinder"` or `"tinder://"` both work.
Config plugin values should be bare scheme names (e.g., `"tinder"`, not `"tinder://"`).

## Known Issues Fixed

1. **iOS silent failure**: Native code did not append `://` to bare scheme names, causing `URL(string:)` to return nil
2. **Config plugin crash**: Missing `android`/`ios` keys in plugin options caused errors instead of being silently skipped
3. **Config plugin removing third-party packages**: The Android plugin removed all packages not in its own list, interfering with other plugins
4. **Thread safety**: iOS `canOpenURL` now dispatched on main queue for UIKit safety

## Status: All fixes applied
