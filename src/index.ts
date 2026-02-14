import ExpoCheckInstalledAppsModule from "./ExpoCheckInstalledAppsModule";

export async function checkInstalledApps(
  packageNames: Array<string>
): Promise<Record<string, boolean>> {
  return ExpoCheckInstalledAppsModule.checkAppsInstalled(packageNames);
}
