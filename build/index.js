import ExpoCheckInstalledAppsModule from "./ExpoCheckInstalledAppsModule";
export { defaultPlatformData } from "./datingApps";
export async function checkInstalledApps(packageNames) {
    return ExpoCheckInstalledAppsModule.checkAppsInstalled(packageNames);
}
//# sourceMappingURL=index.js.map