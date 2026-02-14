import ExpoModulesCore
import UIKit

public class ExpoCheckInstalledAppsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoCheckInstalledApps")

    AsyncFunction("checkAppsInstalled") { (packageNames: [String]) -> [String: Bool] in
      var result: [String: Bool] = [:]

      for packageName in packageNames {
        let scheme = packageName.contains("://") ? packageName : "\(packageName)://"
        if let url = URL(string: scheme) {
          result[packageName] = UIApplication.shared.canOpenURL(url)
        } else {
          result[packageName] = false
        }
      }

      return result
    }.runOnQueue(.main)
  }
}
