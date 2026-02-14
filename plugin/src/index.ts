import {
  withAndroidManifest,
  withInfoPlist,
  ConfigPlugin,
} from "@expo/config-plugins";

interface PluginOptions {
  android?: string[];
  ios?: string[];
}

const withAndroid: ConfigPlugin<PluginOptions> = (config, { android }) => {
  if (!android) {
    return config;
  }

  config = withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    if (!manifest) {
      throw new Error("AndroidManifest.xml is invalid or missing!");
    }

    if (!manifest.queries) {
      manifest.queries = [];
    }

    let queriesBlock = manifest.queries.find((query) => query.package);

    if (!queriesBlock) {
      queriesBlock = { package: [] };
      manifest.queries.push(queriesBlock);
    }

    if (!queriesBlock.package) {
      queriesBlock.package = [];
    }

    const currentPackages = new Set(
      queriesBlock.package.map((pkg: any) => pkg.$["android:name"])
    );

    // Only add new packages, never remove existing ones (other plugins may have added them)
    for (const pkg of android) {
      if (!currentPackages.has(pkg)) {
        queriesBlock.package!.push({ $: { "android:name": pkg } });
      }
    }

    return config;
  });

  return config;
};

const withIos: ConfigPlugin<PluginOptions> = (config, { ios }) => {
  if (!ios || ios.length === 0) {
    return config;
  }

  config = withInfoPlist(config, (config) => {
    const plist = config.modResults;

    if (!plist.LSApplicationQueriesSchemes) {
      plist.LSApplicationQueriesSchemes = [];
    }

    // Normalize: strip "://" suffix so LSApplicationQueriesSchemes gets bare scheme names
    const normalized = ios.map((scheme) =>
      scheme.endsWith("://") ? scheme.slice(0, -3) : scheme
    );

    plist.LSApplicationQueriesSchemes = Array.from(
      new Set([...plist.LSApplicationQueriesSchemes, ...normalized])
    );

    return config;
  });

  return config;
};

const withExpoCheckInstalledApps: ConfigPlugin<PluginOptions> = (
  config,
  opts
) => {
  const options = opts || {};
  config = withAndroid(config, options);
  config = withIos(config, options);
  return config;
};

export default withExpoCheckInstalledApps;
