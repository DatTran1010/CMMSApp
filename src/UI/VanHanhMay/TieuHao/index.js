import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Animated,
    LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryLegend,
    VictoryGroup,
    VictoryContainer,
} from "victory-native";
import { Svg } from "react-native-svg";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useDispatch } from "react-redux";

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import IconButton from "../../../components/IconButton";
import ConsumtionChart from "./ConsumtionChart";
import CalendarComponent from "../../../components/CalendarComponent";
import callApi from "../../../ConText/api";
const Consumption = () => {
    //#region  State

    const [data, setData] = useState([{}]);

    const dispatch = useDispatch();

    const [showCalendar, setShowCalendar] = useState(false);
    const [dateToFrom, setDateToFrom] = useState({
        startDate: moment(new Date()).format("YYYY-MM-DD"),
        endDate: moment(new Date()).add(6, "days").format("YYYY-MM-DD"),
    });

    //#endregion
    //#region  callAPI

    const getData = async () => {
        const endpoint = "/api/motorwatch/bieudo1";
        const method = "GET";
        const params = {
            dTngay: dateToFrom.startDate,
            dDngay: dateToFrom.endDate,
        };

        const response = await callApi(
            dispatch,
            endpoint,
            method,
            null,
            "",
            params
        );
        setData(response.data);
    };
    //#endregion

    const handleShowCaledar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setShowCalendar(!showCalendar);
    };

    const handleDoneDateCalendar = (date) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDateToFrom(date);
        setShowCalendar(false);
    };

    const handlCancelDateCalendar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowCalendar(false);
    };

    useEffect(() => {
        getData();
    }, [dateToFrom]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.border,
                    shadowColor: "gray",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.85,
                    elevation: 5,
                    marginBottom: 10,
                    backgroundColor: colors.white,
                }}
            >
                <View style={styles.titleChart}>
                    <Text style={styles.textTitle}>Tiêu hao năng lượng</Text>
                    <IconButton
                        size={30}
                        nameicon="document-text-outline"
                        border={false}
                    />
                </View>
                <View style={styles.fillControl}>
                    <TouchableOpacity onPress={handleShowCaledar}>
                        <Text>
                            Tuần 30 (Ngày {dateToFrom.startDate} -{" "}
                            {dateToFrom.endDate})
                        </Text>
                    </TouchableOpacity>
                    {showCalendar && (
                        <CalendarComponent
                            onClickDone={handleDoneDateCalendar}
                            onClickCancel={handlCancelDateCalendar}
                            startDate={dateToFrom.startDate}
                            endDate={dateToFrom.endDate}
                        />
                    )}
                </View>
                {data.some((item) => Object.keys(item).length > 0) ? (
                    <ConsumtionChart data={data} />
                ) : (
                    <></>
                )}

                <View style={styles.legendContainer}>
                    <View style={styles.legendContent}>
                        <View
                            style={[
                                styles.iconLegend,
                                {
                                    backgroundColor: data[0].colorTONG_TH,
                                },
                            ]}
                        ></View>
                        <Text style={styles.textLegend}>
                            Tổng tiêu hao điện năng
                        </Text>
                    </View>

                    <View style={styles.legendContent}>
                        <View
                            style={[
                                styles.iconLegend,
                                {
                                    backgroundColor: data[0].colorTONG_CX,
                                },
                            ]}
                        ></View>
                        <Text style={styles.textLegend}>Tổng công xuất</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Consumption;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: 10,
    },
    legendContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },

    legendContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconLegend: {
        width: 20,
        height: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    textLegend: {
        color: colors.black,
        fontSize: 12,
        fontWeight: "400",
        marginHorizontal: 5,
    },

    titleChart: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
    },
    fillControl: {
        paddingHorizontal: 10,
    },
    textTitle: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
});
