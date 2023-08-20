import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
} from "react-native";
import React, { useMemo, useRef, useCallback } from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDispatch } from "react-redux";

import colors from "../../Common/colors";
import Consumption from "./TieuHao";
import EngineState from "./EngineState";
import OEEMain from "./OEE";
import TreeList from "../../components/TreeList";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import { useState } from "react";
import callApi from "../../ConText/api";
import { useEffect } from "react";

const MyMotorWatch = ({ navigation }) => {
    const dispatch = useDispatch();
    // ref
    const bottomSheetRef = useRef(BottomSheet);

    // variables
    const snapPoints = useMemo(
        () => [Platform.OS === "ios" ? "10%" : "7%", "50%", "75%"],
        []
    );

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log("handleSheetChanges", index);
    }, []);

    const CustomHandleComponent = () => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                }}
                activeOpacity={0.7}
                onPress={() => {
                    bottomSheetRef.current.snapToIndex(2);
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.blackArbg,
                        width: 30,
                        height: 5,
                        borderRadius: 5,
                    }}
                ></View>
            </TouchableOpacity>
        );
    };

    //#region  load data tree nha` may'
    const [dataTreeNM, setDataTreeNM] = useState([{}]);

    const getDataTreeNM = async () => {
        const endpoint = "/api/motorwatch/treeNhaMay";
        const method = "GET";
        const params = {
            UserName: "admin",
        };

        const response = await callApi(
            dispatch,
            endpoint,
            method,
            null,
            "",
            params
        );

        if (response.status === 200) {
            setDataTreeNM(response.data);
        }
    };

    useEffect(() => {
        getDataTreeNM();
    }, []);

    //#endregion

    const updateCheckedChildren = (item) => {
        // const newData = { ...item };

        Object.keys(item).forEach((key) => {
            const value = item[key];

            if (key.startsWith("check")) {
                item[key] = !value;
            } else if (Array.isArray(value)) {
                value.forEach((child) => {
                    updateCheckedChildren(child);
                });
            } else if (typeof value === "object") {
                updateCheckedChildren(value);
            }
        });

        return item;
    };

    const handleCheckedLisItem = (item) => {
        updateCheckedChildren(item);
        // Cập nhật trạng thái check trong dataTreeNM
        setDataTreeNM([...dataTreeNM]);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <Consumption navigation={navigation} />
                    <EngineState navigation={navigation} />
                    <OEEMain navigation={navigation} />
                </ScrollView>
                <BottomSheetModalProvider>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backdropComponent={BottomSheetBackdrop}
                        handleComponent={CustomHandleComponent}
                        // enablePanDownToClose={true}
                        onClose={() => {
                            bottomSheetRef.current.snapToIndex(0);
                        }}
                        enableContentPanningGesture={
                            Platform.OS === "ios" ? true : false
                        }
                    >
                        <View
                            style={{
                                flex: 1,
                                margin: 20,
                                height: windowHeight / 2,
                            }}
                        >
                            <TreeList
                                data={dataTreeNM}
                                handleCheckedLisItem={handleCheckedLisItem}
                            />
                        </View>
                    </BottomSheet>
                </BottomSheetModalProvider>
            </View>
        </View>
    );
};

export default MyMotorWatch;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        padding: 10,
        marginBottom: 20,
    },
});
