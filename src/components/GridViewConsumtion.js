import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Animated,
} from "react-native";
import React, { memo } from "react";

import { windowHeight } from "../Common/dimentions";
import colors from "../Common/colors";
import GridRow from "./GridRow";

const GridViewComponent = ({
    data,
    dataHeader,
    columnRemove = "",
    onSortTable,
    HeaderComponent,
}) => {
    const HeaderGridView = () => {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {HeaderComponent && <HeaderComponent />}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignContent: "center",
                        height: windowHeight / 20,
                        backgroundColor: colors.primaryArgb,
                        paddingHorizontal: 5,
                        zIndex: -1,
                    }}
                >
                    {dataHeader &&
                        dataHeader.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    {
                                        ...styles.columnHeader,
                                        alignItems: "center",
                                    },
                                ]}
                                onPress={() => onSortTable()}
                            >
                                <Text style={styles.columnHeaderTxt}>
                                    {item.COLNAME}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
        );
    };

    return (
        <Animated.View style={styles.container}>
            <Animated.FlatList
                style={{ zIndex: -1 }}
                data={data}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={HeaderGridView}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={[0]}
                renderItem={({ item, index, event }) => (
                    <GridRow
                        data={item}
                        index={index}
                        columnRemove={columnRemove}
                    />
                )}
            />
        </Animated.View>
    );
};

export default memo(GridViewComponent);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnHeader: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
    },
    columnHeaderTxt: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
    },
});
