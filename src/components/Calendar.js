import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";
const CalendarCustom = () => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          width: "100%",
          height: windowHeight / 18,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 25,
          borderRadius: 5,
        }}
      >
        <TextInput
          placeholder="Đến ngày"
          editable={true}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        >
          <Text>Đến ngày</Text>
        </TextInput>
      </View>

      {focus && (
        <View
          style={{
            display: "flex",
            position: "relative",
            top: 5,
            left: 0,
            right: 0,
            flex: 1,
          }}
        >
          <Calendar
            style={{
              flex: 1,
              position: "absolute",
              left: 0,
              top: 0,
              borderRadius: 5,
              borderColor: colors.primary,
              borderWidth: 1,
            }}
            onDayPress={(day) => {
              setVisiblecadelar(true);
            }}
            initialDate={"2023-05-30"}
          />
        </View>
      )}
    </>
  );
};

export default CalendarCustom;
