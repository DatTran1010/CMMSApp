import React from "react";
import { View, Text } from "react-native";
import colors from "../Common/colors";
import {
  heightTextInput,
  heightTextMedium,
  windowHeight,
} from "../Common/dimentions";
import IconButton from "./IconButton";

const TreeNode = ({ data }) => {
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor, // Màu cam
        marginLeft: 20,
      }}
    >
      {data.map((item, index) => (
        <View key={index}>
          {Object.keys(item).map((key) => {
            const value = item[key];
            if (key.startsWith("TEN_")) {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.primaryArgb,
                    borderRadius: 5,
                    height: heightTextInput,
                    marginVertical: 5,
                    justifyContent: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  key={key}
                >
                  <IconButton
                    nameicon={"add-outline"}
                    border={false}
                    size={30}
                  />
                  <Text
                    style={{
                      color: colors.black, // Màu chữ trắng
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {value}
                  </Text>
                </View>
              );
            } else if (Array.isArray(value)) {
              return <TreeNode key={key} data={value} />;
            }
            return null;
          })}
        </View>
      ))}
    </View>
  );
};

export default TreeNode;
