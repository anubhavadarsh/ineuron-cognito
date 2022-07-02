import { StyleSheet, View, Button } from "react-native";

import HealthFamily from "../../assets/images/grandma.svg";
import { SafeAreaView } from "react-native-safe-area-context";
// import { View } from "../../components/Themed";
import { GantariMediumText } from "../../components/StyledText";
import { AuthStackScreenProps, RootTabScreenProps } from "../../types";
import size from "../../constants/Layout";
import CarouselIndicator from "../../components/CarouselIndicator";

export default function InfoScreen({
  navigation,
}: AuthStackScreenProps<"Info">) {
  const handlePress = () => {
    navigation.push("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
          <GantariMediumText
            style={styles.title}
          >{`Family health\nand wellness`}</GantariMediumText>
          <CarouselIndicator current={0} pages={2} />
        </View>
        <Button onPress={handlePress} title="Press Me" />
        <View style={styles.svgCont}>
          <HealthFamily width="100%" height="100%" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7a87fa",
  },
  content: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 45,
    textAlign: "justify",
    marginBottom: 30,
    letterSpacing: 1,
  },
  svgCont: {
    width: size.window.width,
    height: 360,
    backgroundColor: "#7a87fa",
  },
});
