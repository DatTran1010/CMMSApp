import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  VictoryPie,
  VictoryAxis,
  VictoryContainer,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryLegend,
  VictoryLabel,
  VictoryLine,
} from "victory-native";
import { Svg, Path } from "react-native-svg";
import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
const EngineState = () => {
  const data = [
    { id: 1, TEN_TT: "Bình thường", VALUE: 30, color: colors.primary },
    { id: 2, TEN_TT: "Bất thường", VALUE: 20, color: colors.primarySecond },
    { id: 3, TEN_TT: "Không hoạt động", VALUE: 50, color: colors.gray },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleChart}>
          <Text style={styles.textTitle}>Tình trạng động cơ</Text>
        </View>
      </View>
      <View style={styles.chartPie}>
        <VictoryPie
          //   padAngle={10}
          innerRadius={10}
          theme={VictoryTheme.material}
          width={windowHeight / 2}
          height={windowHeight / 2}
          data={data}
          x="id"
          y="VALUE"
          animate={{
            easing: "exp",
            duration: 2000,
          }}
          // colorScale={[
          //     colors.primary,
          //     colors.primarySecond,
          //     colors.gray,
          // ]}
          labelRadius={({ innerRadius }) => innerRadius + 60}
          style={{
            labels: {
              fill: "white",
              fontSize: 20,
              fontWeight: "bold",
            },
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
          labels={({ datum }) => datum.VALUE}
        />
      </View>
      <View style={styles.fotter}>
        <View style={styles.legendContainer}>
          {data.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={styles.legendDetal}>
                <View
                  style={[styles.iconLegend, { backgroundColor: item.color }]}
                ></View>
                <Text style={styles.labelLegend}>
                  {item.TEN_TT} ({item.VALUE})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EngineState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  header: {
    flex: 0.1,
    padding: 10,
  },
  textTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },

  chartPie: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  fotter: {
    flex: 0.1,
    paddingVertical: 10,
  },
  legendContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendDetal: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconLegend: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  labelLegend: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.black,
    flexShrink: 1,
  },
});
