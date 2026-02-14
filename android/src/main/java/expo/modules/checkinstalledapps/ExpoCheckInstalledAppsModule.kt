package expo.modules.checkinstalledapps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.pm.PackageManager

class ExpoCheckInstalledAppsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoCheckInstalledApps")

    AsyncFunction("checkAppsInstalled") { packageNames: List<String> ->
      val pm: PackageManager = requireNotNull(appContext.reactContext).packageManager
      val result = mutableMapOf<String, Boolean>()

      for (packageName in packageNames) {
        result[packageName] = try {
          pm.getPackageInfo(packageName, 0)
          true
        } catch (e: PackageManager.NameNotFoundException) {
          false
        }
      }

      result
    }
  }
}
