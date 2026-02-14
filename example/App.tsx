import { Platform, StyleSheet, Text, View } from "react-native";
import { checkInstalledApps } from "expo-check-installed-apps";
import { useEffect, useState } from "react";

export default function App() {
  const [result, setResult] = useState<Record<string, boolean>>({});
  const packageNames: string[] =
    Platform.select({
      android: [
        "com.google.android.apps.fitness",
        "com.android.chrome",
        "com.expo.flash.qr",
      ],
      ios: ["fb", "twitter"],
    }) || [];

  useEffect(() => {
    const checkInstalled = async () => {
      const checkInstalledAppsResult = await checkInstalledApps(packageNames);
      setResult(checkInstalledAppsResult);
      console.log("Installed apps check result:", checkInstalledAppsResult);
    };
    checkInstalled();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Installed Apps Check</Text>
      <Text style={styles.resultText}>
        {JSON.stringify(result, null, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  resultText: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 20,
  },
});
