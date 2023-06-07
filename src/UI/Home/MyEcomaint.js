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
    SectionList,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-modern-datepicker";

import colors from "../../Common/colors";
import { windowHeight } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";

import CustomTextInput from "../../components/TextInput";
import GridView from "./GridView";

import CalendarCustom from "../../components/Calendar";

const MyEcomaint = () => {
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
    return (
        <View
            style={{ flex: 1, alignItems: "center" }}
            // onStartShouldSetResponder={() => {
            //     Keyboard.dismiss();
            // }}
        >
            <View style={styles.gridView}>
                <GridView data={tableData} />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: colors.backgroundColor,
                    borderWidth: 1,
                    borderColor: colors.border,
                    marginVertical: 10,
                    width: "70%",
                    borderRadius: 5,
                }}
            >
                <TouchableOpacity>
                    <Ionicons name="chevron-back-outline" size={30} />
                </TouchableOpacity>
                <Text>1 of 137</Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-forward-outline" size={30} />
                </TouchableOpacity>
            </View>
        </View>
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
