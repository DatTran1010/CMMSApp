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

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import IconButton from "../../../components/IconButton";
import OEEChart from "./OEEChart";
import CalendarComponent from "../../../components/CalendarComponent";

const OEEMain = () => {
    //#region  State

    const [data, setData] = useState([
        {
            date: "07/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "08/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "09/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "10/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "11/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "12/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
        {
            date: "13/10",
            DAT: 60,
            KHONG_DAT: 25,
            KHONG_HD: 20,
            colorDAT: colors.primary,
            colorKHONG_DAT: colors.primarySecond,
            colorKHONG_HD: colors.gray,
        },
    ]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateToFrom, setDateToFrom] = useState({
        startDate: "2023-08-12",
        endDate: "2023-08-12",
    });

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
                    <Text style={styles.textTitle}>Chỉ số OEE</Text>
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
                {data && <OEEChart data={data} />}

                <View style={styles.legendContainer}>
                    <View style={styles.legendContent}>
                        <View
                            style={[
                                styles.iconLegend,
                                { backgroundColor: data[0].colorDAT },
                            ]}
                        ></View>
                        <Text style={styles.textLegend}>OEE đạt</Text>
                    </View>

                    <View style={styles.legendContent}>
                        <View
                            style={[
                                styles.iconLegend,
                                { backgroundColor: data[0].colorKHONG_DAT },
                            ]}
                        ></View>
                        <Text style={styles.textLegend}>OEE chưa đạt</Text>
                    </View>

                    <View style={styles.legendContent}>
                        <View
                            style={[
                                styles.iconLegend,
                                { backgroundColor: data[0].colorKHONG_HD },
                            ]}
                        ></View>
                        <Text style={styles.textLegend}>Không hoạt động</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OEEMain;

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
    textLegend: {
        color: colors.black,
        fontSize: 12,
        fontWeight: "400",
        marginHorizontal: 5,
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
