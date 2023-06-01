import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../../Common/colors";
import { windowHeight } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-modern-datepicker";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CustomTextInput from "../../components/TextInput";
import GridView from "./GridView";

import CalendarCustom from "../../components/Calendar";

const MyEcomaint = () => {
  const [dataDiaDiem, setDataDiaDiem] = useState([
    { label: "Trong xưởng", value: 1 },
    { label: "Văn phòng", value: 2 },
    { label: "Nhà vệ sinh", value: 3 },
    { label: "Nhà Kho", value: 4 },
    { label: "Tầng Thượng", value: 5 },
    { label: "Sân Bãi", value: 6 },
    { label: "Cây dừa", value: 7 },
    { label: "Cây tre", value: 8 },
  ]);
  const [tableData, setTableData] = useState([
    {
      ID: 1,
      MA: "10-08-SEC-003-01",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GTSS: 0,
      GHI_CHU: "Máy lạnh 2",
    },
    {
      ID: 2,
      MA: "10-08-WAT-001-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 1,
      GHI_CHU: "Máy lạnh 3",
    },
    {
      ID: 3,
      MA: "10-08-LIG-003-00",
      YEU_CAU: 1,
      PHIEU_BR: 0,
      GSTT: 1,
      GHI_CHU: "Máy lạnh 4",
    },
    {
      ID: 4,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 0,
      GSTT: 0,
      GHI_CHU: "Bag filter 1",
    },
    {
      ID: 5,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 1,
      PHIEU_BR: 0,
      GSTT: 1,
      GHI_CHU: "Bag filter and system Fan Cassava",
    },
    {
      ID: 6,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 1,
      GHI_CHU: "Hệ thống lọc bụi JT05 (Máy nghiền H01)",
    },
    {
      ID: 7,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 1,
      PHIEU_BR: 0,
      GSTT: 1,
      GHI_CHU: "Tủ điện lò hơi",
    },
    {
      ID: 8,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 1,
      GHI_CHU: "Coare Grinding 502",
    },
    {
      ID: 9,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 1,
      PHIEU_BR: 1,
      GSTT: 1,
      GHI_CHU: "Máy nghiền búa HM01",
    },
    {
      ID: 10,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
    {
      ID: 11,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
    {
      ID: 12,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
    {
      ID: 13,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
    {
      ID: 14,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
    {
      ID: 15,
      MA: "10-06-OVH-003-00",
      YEU_CAU: 0,
      PHIEU_BR: 1,
      GSTT: 0,
      GHI_CHU: "Máy nghiền búa HM02",
    },
  ]);
  const [selected, setSelected] = useState(false);
  const [hideArrow, setHideArrow] = useState(false);

  const spinArrowValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(spinArrowValue, {
      toValue: hideArrow ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [hideArrow, spinArrowValue]);

  const spin = spinArrowValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleArrow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHideArrow((pre) => !pre);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View
        style={{ flex: 1 }}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
        }}
      >
        <Animated.View
          style={[
            styles.arrowView,
            {
              transform: [
                {
                  rotate: spin,
                },
              ],
            },
          ]}
        >
          <Ionicons onPress={handleArrow} name="chevron-up-outline" size={25} />
        </Animated.View>
        {hideArrow && (
          <View style={styles.filterCenter}>
            <View style={styles.dropDown}>
              <DropDown data={dataDiaDiem} placeholder="Chọn địa điểm" />
              <DropDown data={dataDiaDiem} placeholder="Loại thiết bị" />
              <CalendarCustom />
            </View>
          </View>
        )}

        <View style={styles.searchView}>
          <CustomTextInput placeholder={""} />
          <TouchableOpacity
            style={[styles.barcodeView, { top: hideArrow ? 0 : 7 }]}
          >
            <Image
              style={styles.barcode}
              source={require("../../../assets/barcode.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.gridView}>
          <GridView data={tableData} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MyEcomaint;

const styles = StyleSheet.create({
  filterCenter: {
    flex: 4,
  },
  arrowView: {
    justifyContent: "center",
    alignItems: "center",
  },

  dropDown: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  searchView: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  barcodeView: {
    position: "absolute",
    right: 10,
  },
  barcode: {
    width: 40,
    height: 40,
  },

  gridView: {
    flex: 8,
    zIndex: -1,
  },
});
