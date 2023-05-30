import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import globalstyle from "../../Common/globalstyle";
import colors from "../../Common/colors";
const Visual = () => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const flastListRef = useRef();
    const currentIndexRef = useRef(0);
    const [data, setData] = useState([
        require("../../../assets/fashion1.jpg"),
        require("../../../assets/fashion2.jpg"),
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndexRef.current + 1) % data.length; // lấy current hiện tại nếu null thì = 0

            if (nextIndex === data.length) {
                flastListRef.current?.scrollToOffset({
                    offset: 0,
                    animated: false,
                });
            } else {
                flastListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                    viewPosition: 0,
                });
            }

            // cập nhật lại số index hiện tại
            currentIndexRef.current = nextIndex;
        }, 5000);

        return () => {
            // hủy interval khi component bị unmount
            clearInterval(interval);
        };
    }, []);

    const handleToRight = () => {
        flastListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
            viewPosition: 0,
        });
    };
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => item.key}
                horizontal
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[styles.image]}>
                            <Image
                                source={item}
                                style={{ width: width, height: height }}
                                key={index}
                            />
                        </View>
                    );
                }}
                ref={flastListRef}
            />
            <View
                style={{
                    position: "absolute",
                    right: 20,
                    backgroundColor: colors.white,
                }}
            >
                <TouchableOpacity onPress={handleToRight}>
                    <Text style={{ fontSize: 16 }}>OnRight</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Visual;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
    },
    image: {},
});
