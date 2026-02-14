import ExpoCheckInstalledAppsModule from "./ExpoCheckInstalledAppsModule";

export { defaultPlatformData } from "./datingApps";

export async function checkInstalledApps(
  packageNames: Array<string>
): Promise<Record<string, boolean>> {
  return ExpoCheckInstalledAppsModule.checkAppsInstalled(packageNames);
}
