import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import colors from "../../Common/colors";
import CustomTextInput from "../../components/TextInput";
import { heightTextArea } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";

const Request = () => {
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
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.labelDevice}>
                    <Text style={styles.textCodeDevice}>AIC-0003</Text>
                    <Text style={styles.textNameDevice}>Máy lạnh 3</Text>
                </View>
                <View style={styles.line}></View>
            </View>
            <View style={styles.input}>
                <View style={styles.viewInput}>
                    <CustomTextInput
                        placeholder={"Mô tả tình trạng"}
                        multiline
                        height={heightTextArea}
                    />
                </View>
                <View style={styles.viewInput}>
                    <CustomTextInput
                        placeholder={"Yêu cầu"}
                        multiline
                        height={heightTextArea}
                    />
                </View>
                <View style={styles.viewInput}>
                    <DropDown
                        placeholder={"Mức độ khẩn cấp"}
                        data={dataDiaDiem}
                    />
                </View>
                <View style={styles.viewInput}>
                    <DropDown placeholder={"Nguyên nhân"} data={dataDiaDiem} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Request;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        marginHorizontal: 10,
    },
    header: {
        marginBottom: 10,
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
    },

    line: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    input: {
        flex: 1,
    },
    viewInput: {},
});
