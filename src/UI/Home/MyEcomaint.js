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

import colors from "../../Common/colors";
import { windowHeight, heightTextInput } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";

import CustomTextInput from "../../components/TextInput";
import GridView from "./GridView";

import CalendarCustom from "../../components/Calendar";
import callApi from "../../ConText/api";
import { useDispatch } from "react-redux";
import { MainConText } from "../../ConText/MainContext";
import HeaderMyEcomaint from "./HeaderMyEcomaint";

const MyEcomaint = () => {
    const dispatch = useDispatch();
    const { token } = useContext(MainConText);

    const [dataDiaDiem, setDataDiaDiem] = useState([{}]);
    const [dataMachine, setDataMachine] = useState([{}]);
    const [date, setDate] = useState(new Date());

    const setDateDNgay = (date) => {
        setDate(date);
    };
    const getComboLocation = async () => {
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
        setDataDiaDiem(response.data.responseData);
    };

    const getComboMachine = async () => {
        const endpoint = "/api/home/get-machine";
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
        setDataMachine(response.data.responseData);
    };

    const getDataGridView = async () => {
        const endpoint = "/api/home/get-myecomaint";
        const method = "GET";
        const params = {
            username: "admin",
            languages: 0,
            dngay: "06/16/2023",
            ms_nx: -1,
            mslmay: -1,
            xyly: 1,
            pageIndex: 0,
            pageSize: 0,
        };

        const response = await callApi(
            dispatch,
            endpoint,
            method,
            null,
            token,
            params
        );
        setTableData(response.data.responseData);
        console.log(response.data.responseData);
    };
    useEffect(() => {
        getComboLocation();
        getComboMachine();
        getDataGridView();
    }, []);
    const [tableData, setTableData] = useState([{}]);
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
        <View
            style={{ flex: 1, backgroundColor: colors.backgroundColor }}
            // onStartShouldSetResponder={() => {
            //     Keyboard.dismiss();
            // }}
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
                <Ionicons
                    onPress={handleArrow}
                    name="chevron-up-outline"
                    size={25}
                />
            </Animated.View>
            {hideArrow && (
                <View style={styles.filterCenter}>
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
                            <DropDown
                                placeholder={"Thiết bị"}
                                data={dataMachine}
                                valueField={"mS_LOAI_MAY"}
                                labelField={"teN_LOAI_MAY"}
                            />
                        </View>
                        <View
                            style={[
                                styles.filter,
                                { marginBottom: windowHeight / 60 },
                            ]}
                        >
                            <CalendarCustom
                                date={date}
                                setDateDNgay={setDateDNgay}
                                placeholder={"Đến ngày"}
                            />
                        </View>
                    </View>
                </View>
            )}
            <View
                style={[styles.filter, { marginHorizontal: 10, marginTop: 5 }]}
            >
                <CustomTextInput placeholder={""} height={heightTextInput} />
                <TouchableOpacity style={[styles.barcodeView]}>
                    <Image
                        style={styles.barcode}
                        source={require("../../../assets/barcode.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.gridView}>
                <GridView data={tableData} />
            </View>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
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
        </View>
    );
};

export default MyEcomaint;

const styles = StyleSheet.create({
    filterCenter: {
        flex: 4,
        marginHorizontal: 10,
    },
    arrowView: {
        justifyContent: "center",
        alignItems: "center",
    },
    searchView: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
    },
});
