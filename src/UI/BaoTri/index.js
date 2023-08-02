import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
    LayoutAnimation,
    KeyboardAvoidingView,
    Modal,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../Common/colors";
import CustomTextInput from "../../components/TextInput";
import { heightTextInput, heightTextMedium } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";

import CalendarCustom from "../../components/Calendar";
import HeaderApp from "../Home/HeaderApp";
import InListBaoTri from "./InListBaoTri";
import ModalListPhuTung from "./ModalListPhuTung";
const Maintenance = ({ navigation }) => {
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

    const [data, setData] = useState([
        { id: 1, TEN_PHIEU: "01.01 Bơm mỡ bạc đạn" },
        { id: 2, TEN_PHIEU: "02 Kiểm tra cánh vít & vệ sinh" },
        { id: 3, TEN_PHIEU: "03 Kiểm tra và vệ sinh motor" },
    ]);

    const [dataDetail, setDataDetail] = useState([
        { id: 1, id_MH: 1, TEN_MH: "COS-AC-011", value1: 1, value2: 2 },
        { id: 1, id_MH: 2, TEN_MH: "COS-AC-443", value1: 1, value2: 2 },
        { id: 2, id_MH: 1, TEN_MH: "COS-ST-009", value1: 1, value2: 2 },
    ]);

    const [dataPhuTung, setDataPhuTung] = useState([
        { id: 1, TEN_PT: "COS-AC-011", SO_LUONG: 1, checked: false },
        { id: 2, TEN_PT: "COS-AC-443", SO_LUONG: 1, checked: false },
        { id: 3, TEN_PT: "COS-BO-008", SO_LUONG: 1, checked: false },
        { id: 4, TEN_PT: "COS-BO-011", SO_LUONG: 1, checked: false },
        { id: 5, TEN_PT: "COS-ST-009", SO_LUONG: 1, checked: false },
    ]);

    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    const [hiddenRows, setHiddenRows] = useState([]);

    const handleItemListPBT = (index) => {
        // const updatedData = data.map((item) =>
        //     item.id === value.id
        //         ? { ...item, selected: true }
        //         : { ...item, selected: false }
        // );

        // Kiểm tra xem dòng có trong mảng hiddenRows chưa, nếu có thì ẩn đi, nếu không thì hiển thị
        if (hiddenRows.includes(index)) {
            setHiddenRows(hiddenRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setHiddenRows([...hiddenRows, index]);
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const [showModalPT, setShowModalPT] = useState(false);
    const handleAddPhuTung = () => {
        setShowModalPT(true);
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"}
            keyboardVerticalOffset={86}
        >
            <View style={{ flex: 1 }}>
                {/* <HeaderApp
                navigation={navigation}
                title="YÊU CẦU BẢO TRÌ"
                headerLeftVisible={true}
                goBack={true}
            /> */}
                <View style={styles.control}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <View style={styles.labelDevice}>
                                <Text style={styles.textCodeDevice}>
                                    BAF-3508
                                </Text>
                                <Text style={styles.textNameDevice}>
                                    Hệ thống lọc bụi JT05 (Máy nghiền HM01)
                                </Text>
                            </View>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.viewTextMachine}>
                                <Text style={styles.textMachine}>
                                    WO-202308000007
                                </Text>
                                <Text style={styles.textMachine}>
                                    03/08/2023
                                </Text>
                            </View>
                            <View style={styles.viewInput}>
                                <DropDown
                                    placeholder={"Loại bảo trì"}
                                    data={dataDiaDiem}
                                    labelField={"label"}
                                    valueField={"value"}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <DropDown
                                    placeholder={"Mức độ khẩn cấp"}
                                    data={dataDiaDiem}
                                    labelField={"label"}
                                    valueField={"value"}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <CustomTextInput
                                    placeholder={"Ghi chú"}
                                    multiline
                                    height={heightTextMedium}
                                />
                            </View>
                            <View
                                style={[
                                    styles.viewInput,
                                    {
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "row",
                                    },
                                ]}
                            >
                                <Text style={styles.textReason}>
                                    Cầu giao bị hỏng
                                </Text>
                                <TouchableOpacity style={styles.iconStyle}>
                                    <Ionicons
                                        name="save"
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line}></View>
                            <View style={styles.listPhieuBaoTri}>
                                {data.map((value, index) => (
                                    <>
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.listPBTDetail}
                                            activeOpacity={0.5}
                                            onPress={() =>
                                                handleItemListPBT(index)
                                            }
                                        >
                                            <Text> + {value.TEN_PHIEU}</Text>
                                            <Animated.View
                                                style={styles.iconListPBT}
                                            >
                                                <TouchableOpacity>
                                                    <Ionicons
                                                        name="link-outline"
                                                        size={20}
                                                        color={colors.primary}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Ionicons
                                                        name="move-outline"
                                                        size={20}
                                                        color={colors.primary}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Ionicons
                                                        name="trash-outline"
                                                        size={20}
                                                        color={colors.primary}
                                                    />
                                                </TouchableOpacity>
                                            </Animated.View>
                                        </TouchableOpacity>
                                        {hiddenRows.includes(index) && (
                                            <View style={styles.hideInList}>
                                                <View>
                                                    {dataDetail.map(
                                                        (valueDetail) =>
                                                            value.id ===
                                                                valueDetail.id && (
                                                                <InListBaoTri
                                                                    key={
                                                                        valueDetail.id_MH
                                                                    }
                                                                    data={
                                                                        valueDetail
                                                                    }
                                                                />
                                                            )
                                                    )}
                                                </View>
                                                <View
                                                    style={
                                                        styles.iconHideInList
                                                    }
                                                >
                                                    <TouchableOpacity
                                                        style={styles.iconStyle}
                                                        onPress={
                                                            handleAddPhuTung
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="add-outline"
                                                            size={20}
                                                            color={
                                                                colors.primary
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.iconStyle}
                                                    >
                                                        <Ionicons
                                                            name="save"
                                                            size={20}
                                                            color={
                                                                colors.primary
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    </>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.iconStyle}>
                        <Ionicons
                            name="add-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle}>
                        <FontAwesome5
                            name="warehouse"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle}>
                        <Ionicons
                            name="time-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle}>
                        <Ionicons
                            name="close"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle}>
                        <Ionicons
                            name="person-add-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ModalListPhuTung data={dataPhuTung} isShow={showModalPT} />
        </KeyboardAvoidingView>
    );
};

export default Maintenance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: colors.backgroundColor,
    },
    header: {
        marginBottom: 10,
        flex: 1,
    },
    labelDevice: {
        flexDirection: "row",
    },
    textCodeDevice: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
        paddingRight: 10,
    },
    textNameDevice: {
        fontSize: 16,
        fontWeight: "bold",
        flexShrink: 1,
    },

    viewTextMachine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
    },

    textMachine: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.black,
    },
    textReason: {
        fontSize: 16,
        fontWeight: "400",
    },
    listPhieuBaoTri: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    listPBTDetail: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5,
        borderColor: colors.border,
        borderWidth: 1,
        height: heightTextInput,
    },
    iconListPBT: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    hideInList: {
        flex: 1,
        display: "flex",
    },
    iconHideInList: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    line: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    body: {
        flex: 10,
    },
    viewInput: {
        marginVertical: 5,
    },
    control: {
        marginHorizontal: 10,
        flex: 9,
    },
    footer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    iconStyle: {
        borderWidth: 0.5,
        borderRadius: 5,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.primary,
        marginHorizontal: 5,
    },
});
