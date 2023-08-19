import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import IconButton from "../../../components/IconButton";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";
import { useCallback } from "react";
import { windowHeight } from "../../../Common/dimentions";
import callApi from "../../../ConText/api";
const DetailsOEE = () => {
  const dispatch = useDispatch();

  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [data, setData] = useState([{}]);
  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã ĐC" },
    { id: 2, COLNAME: "Mã máy" },
    { id: 3, COLNAME: "Tình trạng" },
    { id: 4, COLNAME: "Lỗi" },
  ]);
  const [dataTinhTrangOEE, setDataTinhTrangOEE] = useState([{}]);

  const [selectedError, setSelectedError] = useState();
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
      setDataTinhTrangOEE(response.data);
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
    const endpoint = "/api/motorwatch/databieudo3";
    const method = "GET";
    const params = {
      iTT: selectedTinhTrang,
      iLOI: -1,
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
  }, [selectedTinhTrang, selectedError]);

  // xử lý handle load lại dữ liệu
  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  const handleTinhTrang = (item) => {
    setSelectedTinhTrang(item.value);
  };
  //#endregion

  const HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <CalendarCustom
              date={dateTNgay.startDate}
              //   setDateDNgay={setDateDNgay}
              placeholder={"Ngày"}
              mode="datetime"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.filterControl}>
          <View style={styles.fillTinhTrang}>
            <DropDown
              value={selectedTinhTrang}
              data={dataTinhTrangOEE}
              labelField="name"
              valueField={"value"}
              placeholder="Tình trạng"
              handleValue={handleTinhTrang}
            />
          </View>
          <View style={[styles.fillTinhTrang, { marginLeft: 10 }]}>
            {/* <DropDown
              data={dataTinhTrang}
              labelField="TEN_TT"
              valueField={"id"}
              placeholder="Lỗi"
              handleValue={() => {}}
              multiselected={true}
            /> */}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          columnRemove={{ id: true, color: true }}
          HeaderComponent={HeaderComponent}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsOEE;

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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  body: {
    marginVertical: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  footer: {},
  filterControl: {
    marginVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  fillTinhTrang: {
    flex: 1,
  },
});
