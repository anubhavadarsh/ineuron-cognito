import { StyleSheet, TouchableOpacity } from "react-native";

import HealthFamily from "../assets/images/healthfamily.svg";
import { View } from "../components/Themed";
import { GantariText } from "../components/StyledText";
import { RootTabScreenProps } from "../types";
import size from "../constants/Layout";

export default function SplashScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const handleHelpPress = () => {
    navigation.navigate("Root2");
  };

  return (
    <View style={styles.container}>
      <GantariText>Family health and wellness</GantariText>
      <View style={styles.svgCont}>
        <HealthFamily width="100%" height="100%" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  svgCont: {
    width: size.window.width,
    height: 500,
  },
});
