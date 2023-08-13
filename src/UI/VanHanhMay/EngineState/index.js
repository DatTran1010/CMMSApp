import { View, Text, StyleSheet } from "react-native";
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
        { x: "Cats", y: 20, color: colors.primary },
        { x: "Dogs", y: 20, color: colors.primarySecond },
        { x: "Birds", y: 50, color: colors.gray },
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
                    padAngle={1}
                    // innerRadius={20}
                    theme={VictoryTheme.material}
                    width={windowHeight / 2}
                    height={windowHeight / 2}
                    data={data}
                    animate={{
                        easing: "exp",
                        duration: 2000,
                    }}
                    colorScale={({ datum }) => {
                        console.log(datum);
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
                    labels={({ datum }) => datum.y}
                />
            </View>
            <View style={styles.fotter}>
                <View style={styles.legendContainer}>
                    {data.map((item) => {
                        return (
                            <View key={item.x} style={styles.legendDetal}>
                                <View
                                    style={[
                                        styles.iconLegend,
                                        { backgroundColor: item.color },
                                    ]}
                                ></View>
                                <Text style={styles.labelLegend}>
                                    {item.x} ({item.y})
                                </Text>
                            </View>
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
        justifyContent: "space-around",
    },
    legendDetal: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    iconLegend: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    labelLegend: {
        fontSize: 16,
        fontWeight: "400",
    },
});
