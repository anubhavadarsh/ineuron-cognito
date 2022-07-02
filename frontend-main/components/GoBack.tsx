import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import size from "../constants/Layout";

interface IProps {
  handler: () => void;
}

const GoBack: FC<IProps> = ({ handler }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handler}>
        <AntDesign name="back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default GoBack;
