import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "gantari-extra-light": require("../assets/fonts/gantari/Gantari-ExtraLight.ttf"),
          gantari: require("../assets/fonts/gantari/Gantari-Regular.ttf"),
          "gantari-medium": require("../assets/fonts/gantari/Gantari-Medium.ttf"),
          "gantari-light": require("../assets/fonts/gantari/Gantari-Light.ttf"),
          "gantari-bold": require("../assets/fonts/gantari/Gantari-Bold.ttf"),
          "gantari-semi-bold": require("../assets/fonts/gantari/Gantari-SemiBold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
