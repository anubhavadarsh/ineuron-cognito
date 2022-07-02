import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

interface IProps {
  pages: number;
  current: number;
}

const CarouselIndicator: FC<IProps> = ({ pages, current }) => {
  const circles = [];
  for (let i = 0; pages > 1 && i < pages; i += 1) {
    circles.push(
      <View
        style={{
          ...styles.circle,
          width: i === current ? 25 : 7,
          backgroundColor: i === current ? "white" : "#a9b8ff",
        }}
        key={i}
      />
    );
  }

  return <View style={styles.container}>{circles}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  circle: {
    width: 7,
    height: 7,
    backgroundColor: "white",
    borderRadius: 4,
    marginRight: 8,
    overflow: "hidden",
  },
});

export default CarouselIndicator;
