import {
    View,
    Text,
    StyleSheet,
    LayoutAnimation,
    Animated,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import CustomTextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import CalendarCustom from "../../components/Calendar";
import { heightTextInput } from "../../Common/dimentions";

const HeaderMyEcomaint = () => {
    const [hideArrow, setHideArrow] = useState(false);
    const spinArrowValue = useRef(new Animated.Value(0)).current;

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
                <Ionicons
                    onPress={handleArrow}
                    name="chevron-up-outline"
                    size={25}
                />
            </Animated.View>
            <View style={styles.filterCenter}>
                {hideArrow && (
                    <View style={styles.controlHeader}>
                        <View style={styles.filter}>
                            <DropDown
                                placeholder={"Địa điểm"}
                                data={dataDiaDiem}
                            />
                        </View>
                        <View style={styles.filter}>
                            <DropDown
                                placeholder={"Thiết bị"}
                                data={dataDiaDiem}
                            />
                        </View>
                        <View style={styles.filter}>
                            <CalendarCustom placeholder={"Đến ngày"} />
                        </View>
                    </View>
                )}
                <View style={styles.searchView}>
                    <CustomTextInput
                        placeholder={""}
                        height={heightTextInput}
                    />
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
