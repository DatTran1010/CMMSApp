import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";

const DropDown = ({ data, placeholder }) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ flex: 1, height: windowHeight / 18 }}>
      <Dropdown
        style={[
          styles.dropdownStyle,
          {
            borderColor: focus ? colors.primary : colors.black,
          },
        ]}
        data={data}
        placeholderStyle={styles.placeholderDropDown}
        selectedTextStyle={styles.selectedDropDown}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconDropDownStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
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
    height: windowHeight / 18,
    borderWidth: 1,
    borderRadius: 5,
  },
  placeholderDropDown: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  selectedDropDown: { fontSize: 16 },
});
