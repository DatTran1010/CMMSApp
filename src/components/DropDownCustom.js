import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import colors from "../Common/colors";
import { heightTextInput, windowHeight } from "../Common/dimentions";

const DropDownCustom = ({ zindex = 999, label = "" }) => {
    const [show, setShow] = useState(false);

    const data = [
        { value: 1, name: "Javascrip" },
        { value: 2, name: "PHP" },
        { value: 3, name: "React" },
        { value: 4, name: "C#" },
        { value: 5, name: "C#" },
        { value: 6, name: "C#" },
        { value: 7, name: "C#" },
        { value: 8, name: "C#" },
        { value: 9, name: "C#" },
        { value: 10, name: "C#" },
    ];

    const handleShowDropDown = () => {
        setShow(!show);
    };

    const DropDownContainer = () => {
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 5,
                    shadowColor: colors.gray,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.25,
                    shadowRadius: 0.5,
                    elevation: 5,
                    backgroundColor: colors.width,
                }}
            >
                <ScrollView>
                    {data.map((item) => {
                        return (
                            <View key={item.value}>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                        marginVertical: 10,
                                        marginHorizontal: 5,
                                    }}
                                >
                                    <Checkbox label={item.name} size={20} />
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: heightTextInput - 10,
                        borderWidth: 0.5,
                        borderColor: colors.border,
                    }}
                >
                    <Text>Chọn</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    height: windowHeight / 18,
                    borderRadius: 5,
                    borderColor: colors.border,
                    alignItems: "flex-start",
                    paddingHorizontal: 10,
                    justifyContent: "center",
                }}
                onPress={handleShowDropDown}
            >
                <Text
                    style={{
                        color: colors.gray,
                        fontSize: 14,
                        fontWeight: "400",
                    }}
                >
                    {label}
                </Text>
            </TouchableOpacity>
            {show && (
                <View
                    style={{
                        position: "absolute",
                        top: windowHeight / 17,
                        bottom: -200,
                        backgroundColor: colors.white,
                        right: 0,
                        left: 0,
                        zIndex: zindex,
                    }}
                >
                    <DropDownContainer />
                </View>
            )}
        </View>
    );
};

export default DropDownCustom;
