/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { AuthStackParamList, RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList & AuthStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root2: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Info: "Info",
      Login: "Login",
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
