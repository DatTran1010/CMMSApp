import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../../Common/colors";
import globalstyle from "../../Common/globalstyle";
import TextInput from "../../components/TextInput.js";
import { windowWidth, windowHeight } from "../../Common/dimentions";
const Login = ({ navigation }) => {
    const handleLogin = () => {
        navigation.navigate("Home");
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={35}
        >
            <SafeAreaView
                style={globalstyle.droidSafeArea}
                onStartShouldSetResponder={() => {
                    Keyboard.dismiss();
                }}
            >
                <View style={styles.container}>
                    <View style={styles.textLoginView}>
                        <Image
                            style={{
                                width: windowWidth,
                                height: windowHeight / 3,
                            }}
                            source={require("../../../assets/Logo.png")}
                        />
                    </View>
                    <View style={styles.containerLogin}>
                        <View style={styles.loginCenter}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <TextInput
                                    placeholder={"Email"}
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    placeholder={"Password"}
                                    keyboardType="visible-password"
                                    secureTextEntry
                                />
                                <TouchableOpacity style={styles.forgotPassword}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Checkbox
                                            value={true}
                                            color={colors.primary}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "300",
                                                paddingLeft: 10,
                                            }}
                                        >
                                            Remember
                                        </Text>
                                    </View>
                                    <Text style={styles.textForgot}>
                                        Forgot your password ?
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.btnLogin}
                                    onPress={handleLogin}
                                >
                                    <Text style={styles.textbtnLogin}>
                                        LOGIN
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.moreLogin}>
                            <Text style={styles.textMoreLogin}>
                                Or Login with social account
                            </Text>
                            <View style={styles.social}>
                                <TouchableOpacity style={styles.iconSoial}>
                                    <Ionicons
                                        name="logo-google"
                                        size={40}
                                        color="#de4d41"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconSoial}>
                                    <Ionicons
                                        name="logo-facebook"
                                        size={40}
                                        color="#4867aa"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
    },
    areaStyle: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 8,
        width: window,
    },
    textLoginView: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    textLogin: {
        fontWeight: "bold",
        fontSize: 30,
        paddingTop: 10,
        paddingBottom: 100,
    },
    containerLogin: {
        flex: 8,
    },

    loginCenter: {
        flex: 1,
    },
    forgotPassword: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 40,
        flexDirection: "row",
    },

    textForgot: {
        fontWeight: "300",
        fontSize: 16,
    },

    btnLogin: {
        width: "100%",
        height: 50,
        backgroundColor: colors.buttoncolor,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    textbtnLogin: {
        color: colors.white,
        fontWeight: "400",
        fontSize: 16,
    },
    moreLogin: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textMoreLogin: {
        fontSize: 16,
        fontWeight: "300",
    },

    social: {
        flexDirection: "row",
    },
    iconSoial: {
        padding: 20,
    },
});
