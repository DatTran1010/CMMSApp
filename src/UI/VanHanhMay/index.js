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

    function updateCheckedData(data, targetIds, checkValue) {
        // const newData = [...data];
        for (let item of data) {
            if (targetIds.includes(item.id)) {
                item.check = !checkValue;
            }

            for (const key in item) {
                if (Array.isArray(item[key])) {
                    updateCheckedData(item[key], targetIds, checkValue);
                }
            }
        }
        return data;
    }

    function findParentAndDescendants(items, targetId, parents = []) {
        for (let item of items) {
            if (item.id === targetId) {
                const descendants = getDescendantIds(item);
                return parents.concat([item.id, ...descendants]);
            }

            for (const key in item) {
                if (Array.isArray(item[key])) {
                    const res = findParentAndDescendants(
                        item[key],
                        targetId,
                        parents.concat(item.id)
                    );
                    if (res.length > 0) {
                        return res;
                    }
                }
            }
        }
        return [];
    }

    function getDescendantIds(item) {
        let descendantIds = [];

        for (const key in item) {
            if (Array.isArray(item[key])) {
                for (let subItem of item[key]) {
                    if (typeof subItem === "object") {
                        descendantIds.push(subItem.id);
                        descendantIds = descendantIds.concat(
                            getDescendantIds(subItem)
                        );
                    }
                }
            }
        }

        return descendantIds;
    }

    const checkAndUpdateData = (data, targetIds) => {
        let updatedData = [...data]; // Create a copy of the data
        let allChecked = true;

        for (const item of updatedData) {
            for (const xu of item.dataXuong) {
                for (const may of xu.dataMay) {
                    for (const dc of may.dataDongCo) {
                        if (targetIds.includes(dc.id)) {
                            if (!dc.check) {
                                allChecked = false;
                            }
                        }
                    }
                    if (allChecked) {
                        may.check = true;
                        xu.check = true;
                    }
                }
                if (allChecked) {
                    xu.check = true;
                }
            }
        }

        return updatedData;
    };

    const handleCheckedLisItem = (item) => {
        // updateCheckedChildren(item);
        // //Cập nhật trạng thái check trong dataTreeNM
        // setDataTreeNM([...dataTreeNM]);

        const result = findParentAndDescendants(dataTreeNM, item.id);

        const newData = updateCheckedData(dataTreeNM, result, item.check);

        setDataTreeNM([...dataTreeNM]);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <ScrollView style={styles.container}>
                    <Consumption navigation={navigation} />
                    <EngineState navigation={navigation} />
                    <OEEMain navigation={navigation} />
                </ScrollView> */}
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
