import {
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    ToastAndroid,
    ActivityIndicator,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { logginss } from './Api/Global_Api';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width

const Loggin = ({ navigation }) => {


    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);

    //Joy22@gmail.com && 12345

    const [emails, setEmails] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(true)




    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleFocus1 = () => setIsFocused1(true);
    const handleBlur1 = () => setIsFocused1(false);

    const inputStyle = {

        borderColor: isFocused ? '#16A6C5' : '#ccc',
        borderWidth: 1,
        paddingLeft: 15,
        width: "90%",
        marginVertical: 5

    };

    const inputStyle1 = {

        borderColor: isFocused1 ? '#16A6C5' : '#ccc',
        borderWidth: 1,
        paddingLeft: 15,
        width: "90%",
        marginVertical: 5

    };



    const handleSubmit = async () => {

        try {
            if (!emails || !pass) {
                ToastAndroid.show("Please fill up the input fields", ToastAndroid.LONG)
            }
            else {
                setLoading(true)
                const data = {
                    "email": emails,
                    "password": pass
                }
                console.log("Your_datapush==>", data)

                const response = await logginss(data)


                console.log("your_push_responce==>", response.data)

                if (response.status == 200) {
                    setLoading(true)
                    setTimeout(() => {
                        ToastAndroid.show('Welcome', ToastAndroid.LONG)
                        // navigation.navigate("Hookpage")
                        navigation.navigate("BottomTabs")
                       
                        setLoading(false)
                    }, 1000);
                    setLoading(false)
                }
                if (response.status == 201) {

                    ToastAndroid.show(response.data.message, ToastAndroid.LONG)
                }
                if (response.status === 202) {

                    ToastAndroid.show(response.data.message, ToastAndroid.LONG)
                }
                if (response.status === 203) {

                    ToastAndroid.show(response.data.message, ToastAndroid.LONG)
                }
                // else {
                //     Snackbar.show({
                //         text: 'Invalid Credentials',
                //         duration: Snackbar.LENGTH_SHORT,
                //     })
                // }
                await AsyncStorage.setItem("token", response.data.token)
                // console.log("user_id==>",response.data.token)
            }
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
            setLoading(false)
            console.log("Loggin_error==>", error)
        }

    }

    const showPassword = () => {
        setShowPass(!showPass)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="dark-content" animated={true} backgroundColor="transparent" hidden={false} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require("./Assets/login-bg2.jpg")} style={{ height: "100%", width: deviceWidth }}>


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require("./Assets/cogquest-logo.png")} style={{ height: 88, width: 255, marginVertical: 60, marginHorizontal: 10 }} />
                    </View>


                    <View style={styles.container}>

                        <View style={{ width: "95%", }}>
                            <Text style={{ fontSize: 30, fontWeight: "600", marginHorizontal: 10, marginVertical: 5, color: "#0E0E0E", fontFamily: "Poppins-Regular" }}>LOGIN</Text>
                            <Text style={{
                                fontSize: 15, fontWeight: "400", marginHorizontal: 10, marginBottom: 5, color: "#000000", fontFamily: "Poppins-Regular"
                            }}>Enter your user id and phone number to login </Text>
                        </View>


                        <TextInput
                            placeholder="Enter email Id"
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholderTextColor={"#B0AFAF"}
                            keyboardType="email-address"
                            value={emails}
                            onChangeText={(text) => setEmails(text)}
                        />

                        <View style={styles.Inputcontainer}>

                            <TextInput
                                placeholder="Enter password"
                                style={inputStyle1}
                                onFocus={handleFocus1}
                                onBlur={handleBlur1}
                                placeholderTextColor={"#B0AFAF"}
                                value={pass}
                                onChangeText={(text) => setPass(text)}
                                secureTextEntry={showPass}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 42, padding: 12, paddingTop: 16 }} onPress={showPassword}>

                                {showPass ? <Image source={require("./Assets/eyebrow.png")} style={{ height: 30, width: 30 }} /> : <Image source={require("./Assets/visible.png")} style={{ height: 30, width: 30 }} />}

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => alert("Forgot tap")}>
                            <Text style={{ color: '#000000', left: 117, borderBottomWidth: 1, fontFamily: "Poppins-Regular" }}>Forgot Password</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>

                            {/* <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: "Poppins-Regular" }}>
                                LOGIN
                            </Text> */}
                            {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '400', fontFamily: "Poppins-Regular", fontSize: 16 }}>
                                LOGIN
                            </Text>
                        )}

                        </TouchableOpacity>
                        


                    </View>


                    <View style={{ justifyContent: 'flex-end' }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginVertical: 30,
                            }}
                        >
                            <Text style={{ color: '#000000', fontSize: 14, fontWeight: "400", fontFamily: "Poppins-Regular" }}>Don't have an account</Text>

                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={{ fontWeight: "600", fontSize: 14, color: "#0274C6", marginHorizontal: 5, fontFamily: "Poppins-Regular" }} >SIGNUP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </ImageBackground>
                {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        marginVertical: 10

    },
    Inputcontainer: {
        flexDirection: "row",
        width: deviceWidth,
        left: 20

    },

    button: {
        borderWidth: 1,
        width: deviceWidth / 1.1,
        borderRadius: 20,
        height: 45,
        padding: 12,
        backgroundColor: '#0274C6',
        borderColor: '#0274C6',
        top: 20,
    },
})


export default Loggin;

