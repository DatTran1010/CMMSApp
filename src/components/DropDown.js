import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";

const DropDown = ({ data, placeholder, labelField, valueField }) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Dropdown
        style={[
          styles.dropdownStyle,
          {
            borderColor: focus ? colors.primary : colors.border,
            borderWidth: 1,
            backgroundColor: colors.white,
          },
        ]}
        data={data}
        placeholderStyle={styles.placeholderDropDown}
        selectedTextStyle={styles.selectedDropDown}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconDropDownStyle}
        search
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={() => {}}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdownStyle: {
    paddingHorizontal: 10,
    marginBottom: windowHeight / 50,
    height: windowHeight / 18,
    borderRadius: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  placeholderDropDown: {
    fontSize: 16,
    marginHorizontal: 15,
    fontWeight: "400",
  },
  selectedDropDown: { fontSize: 16 },
});
