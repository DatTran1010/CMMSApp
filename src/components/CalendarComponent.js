import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { Calendar } from "react-native-calendars";
import colors from "../Common/colors";

const CalendarComponent = ({
    onClickDone,
    onClickCancel,
    startDate,
    endDate,
}) => {
    const [markedDates, setMarkedDates] = useState({});

    const [dateFromTo, setDateFromTo] = useState({
        startDate: startDate,
        endDate: endDate,
    });

    useEffect(() => {
        const updatedMarkedDates = {};

        const start = new Date(dateFromTo.startDate);
        const end = new Date(dateFromTo.endDate);

        for (
            let date = new Date(start);
            date <= end;
            date.setDate(date.getDate() + 1)
        ) {
            const dateString = date.toISOString().split("T")[0];
            if (dateString === dateFromTo.startDate) {
                updatedMarkedDates[dateString] = {
                    color: colors.primary,
                };
            } else if (dateString === dateFromTo.endDate) {
                updatedMarkedDates[dateString] = {
                    color: colors.primary,
                };
            } else {
                updatedMarkedDates[dateString] = { color: "#e2b68b" };
            }
        }

        setMarkedDates(updatedMarkedDates);
    }, [dateFromTo]);

    return (
        <Animated.View style={{ flex: 1 }}>
            <Calendar
                style={{
                    flex: 1,
                    borderRadius: 10,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    elevation: 2,
                    margin: 10,
                    paddingBottom: 30,
                }}
                current={dateFromTo.startDate}
                onDayPress={(day) => {
                    if (dateFromTo.endDate === day.dateString) {
                        setDateFromTo({
                            ...dateFromTo,
                            startDate: day.dateString,
                        });
                    } else if (dateFromTo.startDate === day.dateString) {
                        setDateFromTo({
                            ...dateFromTo,
                            endDate: day.dateString,
                        });
                    } else if (
                        new Date(dateFromTo.startDate) <
                        new Date(day.dateString)
                    ) {
                        setDateFromTo({
                            ...dateFromTo,
                            endDate: day.dateString,
                        });
                    } else if (
                        new Date(dateFromTo.startDate) >
                        new Date(day.dateString)
                    ) {
                        setDateFromTo({
                            ...dateFromTo,
                            startDate: day.dateString,
                        });
                    }
                }}
                markedDates={markedDates}
                markingType={"period"}
            />
            <View
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 10,
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity onPress={() => onClickCancel()}>
                    <Text style={{ fontSize: 16, color: colors.gray }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClickDone(dateFromTo)}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.black,
                            marginLeft: 10,
                            
                        }}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default CalendarComponent;
