import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import CustomTextInput from "../../components/TextInput";
import { windowWidth } from "../../Common/dimentions";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const InListBaoTri = ({ data }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text>{data.TEN_MH}</Text>
                <View style={styles.input}>
                    <View style={styles.textInput}>
                        <CustomTextInput
                            value={data.value1.toString()}
                            height={35}
                        />
                    </View>
                    <View style={styles.textInput}>
                        <CustomTextInput
                            value={data.value2.toString()}
                            height={35}
                        />
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.trash,
                            {
                                marginLeft: 5,
                                height: 35,
                            },
                        ]}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={20}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default InListBaoTri;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        width: windowWidth / 7,
        marginLeft: 5,
    },
});
