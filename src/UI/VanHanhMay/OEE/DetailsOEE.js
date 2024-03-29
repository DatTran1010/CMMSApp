import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import IconButton from "../../../components/IconButton";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";
import callApi from "../../../ConText/api";
import { useEffect } from "react";

const DetailsEngineState = () => {
  const dispatch = useDispatch();

  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [isAscending, setIsAscending] = useState(false);

  const [data, setData] = useState([{}]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã máy" },
    { id: 2, COLNAME: "OEE% (Ngày)" },
    { id: 3, COLNAME: "OEE mục tiêu" },
    { id: 4, COLNAME: "% đạt" },
    { id: 5, COLNAME: "OEE% (7 ngày)" },
  ]);

  const [dataTinhTrang, setDataTinhTrang] = useState([{}]);

  const handleSort = () => {
    const columnToSortBy = "DAT";

    const newData = [...data].sort((a, b) => {
      if (isAscending) {
        return a.DAT - b.DAT; // Sort ascending
      } else {
        return b.DAT - a.DAT; // Sort descending
      }
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setData(newData);
    setIsAscending(!isAscending);
  };

  //#region  get Data Combo TinhTrang\

  const getDataDropdownTinhTrang = async () => {
    const endpoint = "/api/motorwatch/tinhtrangdc";
    const method = "GET";
    const params = null;

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      "",
      params
    );

    if (response.status === 200) {
      setDataTinhTrang(response.data);
    }
  };

  useEffect(() => {
    getDataDropdownTinhTrang();
  }, []);
  //#endregion

  //#region  get Data lưới

  //state
  const [selectedTinhTrang, setSelectedTinhTrang] = useState("-1");

  const getDataDetails = async () => {
    const endpoint = "/api/motorwatch/databieudo2";
    const method = "GET";
    const params = {
      dNgay: dateTNgay,
      iITOEE: selectedTinhTrang,
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

  useEffect(() => {
    getDataDetails();
  }, [dateTNgay, selectedTinhTrang]);

  // xử lý handle load lại dữ liệu
  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  const handleTinhTrang = (item) => {
    setSelectedTinhTrang(item.value);
  };
  //#endregion

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
          <View style={{ flex: 1, alignItems: "flex-end", marginLeft: 10 }}>
            <View style={{ flex: 1, width: "100%" }}>
              <DropDown
                data={dataTinhTrang}
                labelField="name"
                valueField={"value"}
                placeholder="Tình trạng"
                handleValue={handleTinhTrang}
                value={selectedTinhTrang}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          columnRemove={{ id: true, tt: true }}
          onSortTable={handleSort}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsEngineState;

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
