import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TouchableNativeFeedback,
    ScrollView,
    Animated,
    LayoutAnimation,
    Image,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import { windowHeight } from "../../Common/dimentions";
import HeaderMyEcomaint from "./HeaderMyEcomaint";
const GridView = ({ data }) => {
    const [refreshing, setRefreshing] = useState(false);

    const columnsName = () => (
        <View style={{ flex: 1 }}>
            <HeaderMyEcomaint />
            <View
                style={{
                    flex: 1,
                    zIndex: -1,
                    flexDirection: "row",
                    alignContent: "center",
                    height: windowHeight / 25,
                    borderBottomWidth: 1,
                    backgroundColor: colors.backgroundColor,
                }}
            >
                <TouchableOpacity
                    style={{ ...styles.columnHeader, flex: 3 }}
                    onPress={() => sortTable()}
                >
                    <Text style={styles.columnHeaderTxt}>Mã thiết bị</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flex: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        style={{ ...styles.columnHeader, flex: 1 }}
                        onPress={() => sortTable()}
                    >
                        <Text style={styles.columnHeaderTxt}>Yêu cầu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.columnHeader, flex: 1 }}
                        onPress={() => sortTable()}
                    >
                        <Text style={styles.columnHeaderTxt}>Bảo trì</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.columnHeader, flex: 1 }}
                        onPress={() => sortTable()}
                    >
                        <Text style={styles.columnHeaderTxt}>Giám sát</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    const handleRowGrid = (event, index, item) => {
        const { pageX, pageY } = event.nativeEvent;
        setTooltipPosition({ x: pageX, y: pageY });
        setVisibleToolTip(true);
        setFocusIndex(index);
        setContentToolTip(item.GHI_CHU);
    };

    const unHandleRowGrid = () => {
        setFocusIndex(-1);
        setVisibleToolTip(false);
    };

    //#region toolTip
    const [visibleToolTip, setVisibleToolTip] = useState(false); //set ẩn hiện tooltip
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // lấy vị trí của tooltip (không sử dụng nữa)
    const [contentToolTip, setContentToolTip] = useState("");

    //#endregion

    //focus vào dòng đổi màu, lấy index
    const [focusIndex, setFocusIndex] = useState(-1);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(false);
                }}
                data={data}
                stickyHeaderHiddenOnScroll={[0]}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={columnsName}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index, event }) => {
                    return (
                        <TouchableNativeFeedback
                            onPress={(event) =>
                                handleRowGrid(event, index, item)
                            }
                            style={{ flex: 1 }}
                        >
                            <View
                                style={{
                                    ...styles.styleRows,
                                    backgroundColor:
                                        focusIndex === index
                                            ? "#ff870f40"
                                            : index % 2 == 1
                                            ? "#f2f2f2"
                                            : "white",
                                }}
                            >
                                <View style={{ flex: 4 }}>
                                    {focusIndex === index && visibleToolTip && (
                                        <TouchableOpacity
                                            style={[
                                                styles.tooltipContainer,
                                                {
                                                    top: -10,
                                                    left: 5,
                                                    position: "relative",
                                                    backgroundColor: "#113186",
                                                    width: "100%",
                                                    borderRadius: 10,
                                                    padding: 5,
                                                },
                                            ]}
                                            onPress={() => {
                                                setVisibleToolTip(false);
                                            }}
                                        >
                                            <Text
                                                style={{ color: colors.white }}
                                            >
                                                {contentToolTip}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <Text
                                        style={{
                                            ...styles.columnRowTxt,
                                        }}
                                    >
                                        {item.MA}
                                    </Text>
                                </View>
                                <View style={styles.columnValue}>
                                    <TouchableOpacity style={{ flex: 1 }}>
                                        <Text style={styles.columnRowTxt}>
                                            {item.YEU_CAU === 1 && (
                                                <Ionicons
                                                    name={"checkmark"}
                                                    size={20}
                                                    color={colors.primary}
                                                />
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.columnRowTxt}>
                                            {item.PHIEU_BR === 1 && (
                                                <Ionicons
                                                    name={"checkmark"}
                                                    size={20}
                                                    color={colors.primary}
                                                />
                                            )}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={{ flex: 1 }}>
                                        <Text style={styles.columnRowTxt}>
                                            {item.GSTT === 1 && (
                                                <Ionicons
                                                    name={"checkmark"}
                                                    size={20}
                                                    color={colors.primary}
                                                />
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    );
                }}
            />
        </View>
    );
};

export default GridView;
const styles = StyleSheet.create({
    container: {
        paddingTop: windowHeight / 40,
        flex: 1,
    },
    columnHeader: {
        alignItems: "center",
        justifyContent: "center",
    },
    styleRows: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    columnRowTxt: {
        paddingLeft: 10,
        fontSize: 12,
        textAlign: "left",
        fontWeight: "400",
    },

    columnValue: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 5,
    },
    columnHeaderTxt: {
        textAlign: "center",
        fontWeight: "400",
    },
});
