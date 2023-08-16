import { StyleSheet, Platform } from "react-native";
import colors from "./colors";
import { windowHeight, windowWidth } from "../Common/dimentions";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: colors.backgroundColor,
  },
  theme: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});
