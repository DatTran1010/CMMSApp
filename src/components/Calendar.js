import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import React, { useState, useContext } from "react";
// import { Calendar, LocaleConfig } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";
const CalendarCustom = ({ date, setDateDNgay, placeholder, ...props }) => {
    const [focus, setFocus] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const onDateSelect = (date) => {
        setSelectedDate(date.dateString);
        toggleCalendar();
    };
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: focus ? colors.primary : colors.border,
                    },
                ]}
            >
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.black}
                    editable={true}
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        fontSize: 16,
                    }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}
                    {...props}
                    value={moment(date).format("DD/MM/YYYY")}
                    onChangeText={(value) => {}}
                ></TextInput>
            </View>

            {focus && (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {/* <Calendar
                        style={{
                            flex: 1,
                            borderRadius: 5,
                            borderColor: colors.primary,
                            borderWidth: 1,
                            top: 0,
                            marginTop: 5,
                            position: "absolute",
                        }}
                        onDayPress={(day) => {}}
                        initialDate={"2023-05-30"}
                    /> */}
                    <DateTimePickerModal
                        display="inline"
                        isVisible={focus}
                        mode="date"
                        onConfirm={(date) => {
                            setDateDNgay(date);
                            setFocus(false);
                        }}
                        onCancel={() => {
                            setFocus(false);
                        }}
                    />
                </View>
            )}
        </>
    );
};

export default CalendarCustom;
const styles = StyleSheet.create({
    container: {
        height: windowHeight / 18,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 25,
        borderRadius: 5,
        backgroundColor: colors.white,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5,
        borderWidth: 1,
    },
});
