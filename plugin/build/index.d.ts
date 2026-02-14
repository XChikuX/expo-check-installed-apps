import { ConfigPlugin } from "@expo/config-plugins";
interface PluginOptions {
    android?: string[];
    ios?: string[];
}
declare const withExpoCheckInstalledApps: ConfigPlugin<PluginOptions>;
export default withExpoCheckInstalledApps;
