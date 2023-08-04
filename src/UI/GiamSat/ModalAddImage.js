import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight } from "../../Common/dimentions";

import Line from "../../components/Line";
import IconButton from "../../components/IconButton";

const ModalAddImage = () => {
    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="fade"
            style={styles.container}
        >
            <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
                <View style={[styles.modalContent, { height: "80%" }]}>
                    <View style={styles.headerContent}>
                        <View style={styles.nameModal}>
                            <Text style={{ fontSize: 16 }}>
                                Chọn hình cho giám sát
                            </Text>
                        </View>
                        <View style={styles.iconClose}>
                            <IconButton
                                label={"Thoát"}
                                nameicon="close"
                                size={30}
                                border={false}
                            />
                        </View>
                    </View>
                    <Line />
                    <View style={styles.bodyContent}></View>
                    <Line />
                    <View style={styles.fotterCotent}>
                        <View style={styles.iconFotter}>
                            <IconButton
                                label={"Thêm"}
                                nameicon="add"
                                size={20}
                            />
                            <IconButton
                                label={"Xóa"}
                                nameicon="trash"
                                size={20}
                            />
                            <IconButton
                                label={"Hủy"}
                                nameicon="close"
                                size={20}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalAddImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        width: "95%",

        top: windowHeight / 20,
        borderRadius: 10,
        padding: 15,
        position: "absolute",
    },

    headerContent: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    nameModal: {
        flex: 9,
    },
    iconClose: {
        flex: 1,
    },

    bodyContent: {
        flex: 0.8,
    },

    fotterCotent: {
        flex: 0.2,
    },

    iconFotter: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
});
