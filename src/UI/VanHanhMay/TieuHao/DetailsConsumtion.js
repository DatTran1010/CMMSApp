import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import colors from "../../../Common/colors";
import CalendarComponent from "../../../components/CalendarComponent";
import IconButton from "../../../components/IconButton";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import callApi from "../../../ConText/api";
import { useEffect } from "react";

const DetailsConsumtion = () => {
  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();

  const [data, setData] = useState([{}]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã động cơ" },
    { id: 1, COLNAME: "Mã máy" },
    { id: 1, COLNAME: "Công suất,kW" },
    { id: 1, COLNAME: "Tổng tiêu hao,kWh" },
  ]);

  const getData = async () => {
    const endpoint = "/api/motorwatch/databieudo1";
    const method = "GET";
    const params = {
      dNgay: dateTNgay,
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
      setData(response.data);
    }
  };

  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    getData();
  }, [dateTNgay]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <CalendarCustom
              date={dateTNgay}
              //   setDateDNgay={setDateDNgay}
              placeholder={"Ngày"}
              setDateDNgay={handleNgay}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <IconButton
              nameicon={"information-circle-outline"}
              size={30}
              border={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          // columnRemove={{ id: true }}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsConsumtion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
  },

  headerContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    marginVertical: 10,

    backgroundColor: colors.white,
    flex: 15,
  },
  footer: {},
});
