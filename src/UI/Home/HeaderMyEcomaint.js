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
import { windowHeight } from "../../Common/dimentions";

const HeaderMyEcomaint = ({ dataDiaDiem, dataMachine }) => {
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
                <View style={styles.controlHeader}>
                    {hideArrow && (
                        <>
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
                                <CalendarCustom placeholder={"Đến ngày"} />
                            </View>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

export default HeaderMyEcomaint;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
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
});
