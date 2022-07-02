import { FC } from "react";
import { StyleSheet } from "react-native";
import { GantariBoldText, GantariMediumText } from "./StyledText";

interface IProps {
  pText: string;
  s1Text: string;
  s2Text: string;
}

const BannerText: FC<IProps> = ({ pText, s1Text, s2Text }) => {
  return (
    <>
      <GantariBoldText style={[styles.text, styles.textPrimary]}>
        {pText}
      </GantariBoldText>
      <GantariMediumText style={[styles.text, styles.textSecondary]}>
        {s1Text}
      </GantariMediumText>
      <GantariMediumText style={[styles.text, styles.textSecondary]}>
        {s2Text}
      </GantariMediumText>
    </>
  );
};

export default BannerText;

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    fontSize: 35,
    lineHeight: 40,
  },
  textPrimary: {
    color: "white",
  },
  textSecondary: {
    color: "#9e9d9d",
  },
});
