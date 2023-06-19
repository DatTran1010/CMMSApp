import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import colors from "../../Common/colors";
import CustomTextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import CalendarCustom from "../../components/Calendar";
import { heightTextInput } from "../../Common/dimentions";
import callApi from "../../ConText/api";
import { MainConText } from "../../ConText/MainContext";

const HeaderMyEcomaint = () => {
  const dispatch = useDispatch();

  const [hideArrow, setHideArrow] = useState(false);
  const spinArrowValue = useRef(new Animated.Value(0)).current;
  const { token } = useContext(MainConText);
  const [dataDiaDiem, setDataDiaDiem] = useState([{}]);

  const getCombo = async () => {
    const endpoint = "/api/home/get-location";
    const method = "GET";
    const params = {
      UName: "admin",
      NNgu: 0,
      CoAll: 1,
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      token,
      params
    );
    console.log(response);
    setDataDiaDiem(response.data.responseData);
  };

  useEffect(() => {
    getCombo();
  }, []);

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
    <View style={styles.container}>
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
      <View style={styles.filterCenter}>
        {hideArrow && (
          <View style={styles.controlHeader}>
            <View style={styles.filter}>
              <DropDown
                placeholder={"Địa điểm"}
                data={dataDiaDiem}
                labelField={"teN_N_XUONG"}
                valueField={"mS_N_XUONG"}
              />
            </View>
            <View style={styles.filter}>
              <DropDown placeholder={"Thiết bị"} data={dataDiaDiem} />
            </View>
            <View style={styles.filter}>
              <CalendarCustom placeholder={"Đến ngày"} />
            </View>
          </View>
        )}
        <View style={styles.searchView}>
          <CustomTextInput placeholder={""} height={heightTextInput} />
          <TouchableOpacity style={[styles.barcodeView]}>
            <Image
              style={styles.barcode}
              source={require("../../../assets/barcode.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderMyEcomaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  filterCenter: {
    flex: 1,
  },
  filter: {},
  arrowView: {
    justifyContent: "center",
    alignItems: "center",
  },

  controlHeader: {
    flex: 1,
    marginHorizontal: 10,
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
    top: 3,
  },
  barcode: {
    width: 40,
    height: 40,
  },
});
