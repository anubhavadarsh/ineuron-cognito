import { Text, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function GantariLightText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "gantari-light" }]} />
  );
}

export function GantariMediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "gantari-medium" }]} />
  );
}

export function GantariText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "gantari" }]} />;
}

export function GantariBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "gantari-bold" }]} />
  );
}
export function GantariSemiBoldText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "gantari-semi-bold" }]}
    />
  );
}
