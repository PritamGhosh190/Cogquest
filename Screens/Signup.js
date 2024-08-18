import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { signups } from './Api/Global_Api';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width

const Signup = ({ navigation }) => {

    const [selectedGender, setSelectedGender] = useState(null);

    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [password, setPassword] = useState()
    const [conPassword, setConPassword] = useState()
    const [loading, setLoading] = useState(false);


    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [mergedDate, setMergedDate] = useState('');


    const handleGenderPress = (gender) => {
        setSelectedGender(gender);
        console.log(gender);
    }


    function isDate65YearsOlder(targetDate) {     // Get the current date
        const currentDate = new Date();     // Calculate the date 65 years ago from the current date
        const sixtyFiveYearsAgo = new Date(currentDate);
        sixtyFiveYearsAgo.setFullYear(currentDate.getFullYear() - 65);     // Convert the target date to a Date object if it's not already
        const parsedTargetDate = new Date(targetDate);     // Compare the target date with 65 years ago
        return parsedTargetDate <= sixtyFiveYearsAgo;
    }
    // Usage example:



    const handlePush = async () => {
        try {
            setLoading(true)

            if (!name || !lastname || !address || !contact || !day || !month || !year || !email || !password || !selectedGender) {
                // Display an alert if any mandatory field is missing
                alert("Please fill in all mandatory fields.");
                setLoading(false)
            }
            if (password !== conPassword) {
                alert("Password Missmatch");
                setLoading(false);
            }


            const formattedDate = `${year}-${month}-${day}`;
            const targetDate = formattedDate; // Replace with your target date in YYYY-MM-DD format
            const result = isDate65YearsOlder(targetDate)
            if (result) {
                setMergedDate(formattedDate);
                // console.log("your_format==>",formattedDate);


                const data = {
                    "firstName": name,
                    "lastname": lastname,
                    "dob": formattedDate,
                    "contact": contact,
                    "email": email,
                    "address": address,
                    "gender": selectedGender,
                    "password": password
                }
                // console.log("Your_data==>", data)

                const response = await signups(data);
                // console.log("your_push_responce==>", response.status)

                if (response.status === 200) {

                    navigation.navigate("Loggin")
                    setLoading(false)
                } else {

                    alert(response.data.message)
                    setLoading(false)
                }
            }else{
                alert("Age must be 65 years or more than  that")
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
            console.log("Error_hear==>", error)
        }

    }



    return (
        <ScrollView style={{ flex: 1, height: deviceHight, marginVertical: 10, width: deviceWidth }}>
            <View style={styles.container}>

                <View style={{ marginVertical: 10 }}>
                    <Image source={require("./Assets/cogquest-logo.png")} style={styles.logo} />
                </View>


                <TextInput placeholder='Enter your first name' style={styles.input} onChangeText={(text) => setName(text)} />
                <TextInput placeholder='Enter your last name' style={styles.input} onChangeText={(text) => setLastname(text)} />
                <TextInput placeholder='Address' style={styles.inputAddress} onChangeText={(text) => setAddress(text)} />

                <View style={{ flexDirection: "row", right: 5, marginVertical: 10 }}>
                    <TextInput style={{
                        width: 50, height: 41, borderWidth: 1, marginHorizontal: 10, textAlign: "center", borderRadius: 2,
                        borderColor: "#8F8F8F"
                    }} value='+1' />

                    <TextInput placeholder='Enter Phone number' keyboardType='numeric' style={styles.inputPhone} onChangeText={(text) => setContact(text)} maxLength={10} />
                </View>


                <View style={styles.inputContainer}>

                    <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 14, color: "#717171", fontWeight: 400, left: 5 }}>Date of birth</Text>

                    <TextInput
                        style={styles.dataInput}
                        placeholder="Day"
                        keyboardType="numeric"
                        maxLength={2}
                        value={day}
                        onChangeText={(text) => setDay(text)}
                    />
                    <TextInput
                        style={styles.dataInput}
                        placeholder="Month"
                        keyboardType="numeric"
                        maxLength={2}
                        value={month}
                        onChangeText={(text) => setMonth(text)}
                    />
                    <TextInput
                        style={styles.dataInput}
                        placeholder="Year"
                        keyboardType="numeric"
                        maxLength={4}
                        value={year}
                        onChangeText={(text) => setYear(text)}
                    />

                </View>


                <TextInput placeholder='Enter email id' keyboardType="email-address" style={styles.input} onChangeText={(text) => setEmail(text)} />
                <TextInput placeholder='Enter password' keyboardType="email-address" style={styles.input} onChangeText={(text) => setPassword(text)} />
                <TextInput placeholder='Confirm password' keyboardType="email-address" style={styles.input}
                    onChangeText={(text) => setConPassword(text)}
                />




                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ marginHorizontal: 5, marginVertical: 3 }}>
                        <Text style={{ fontSize: 14, color: '#717171', fontWeight: 400 }}>Gender</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            marginHorizontal: 5,
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: "#0274C6",
                            backgroundColor: selectedGender === 'Male' ? '#0274C6' : 'transparent',
                            width: 80,
                            height: 28,
                        }}
                        onPress={() => handleGenderPress('Male')}
                    >
                        <Text style={{ textAlign: 'center', color: selectedGender === 'Male' ? '#FFFFFF' : '#0274C6', marginVertical: 3 }}>
                            Male
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginHorizontal: 5,
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: "#0274C6",
                            backgroundColor: selectedGender === 'Female' ? '#0274C6' : 'transparent',
                            width: 80,
                            height: 28,
                        }}
                        onPress={() => handleGenderPress('Female')}
                    >
                        <Text style={{ textAlign: 'center', color: selectedGender === 'Female' ? '#FFFFFF' : '#0274C6', marginVertical: 3 }}>
                            Female
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginHorizontal: 5,
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: "#0274C6",
                            backgroundColor: selectedGender === 'Others' ? '#0274C6' : 'transparent',
                            width: 80,
                            height: 28,
                        }}
                        onPress={() => handleGenderPress('Others')}
                    >
                        <Text style={{ textAlign: 'center', color: selectedGender === 'Others' ? '#FFFFFF' : '#0274C6', marginVertical: 3 }}>
                            Others
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ height: 45, borderWidth: 1, borderColor: "#0274C6", backgroundColor: "#0274C6", width: deviceWidth / 1.2, borderRadius: 25, paddingTop: 10, marginVertical: 10 }} onPress={handlePush}>
                    <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 16, color: "#FFFFFF" }}>SIGNUP</Text>
                </TouchableOpacity>



                <View style={{ flexDirection: "row", bottom: 0 }}>
                    <Text style={{ fontWeight: "400", fontSize: 14, marginHorizontal: 5 }}>Already have an account</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Loggin")}>
                        <Text style={{ fontWeight: "600", fontSize: 14, color: "#0274C6", marginHorizontal: 5 }} >LOGIN</Text>
                    </TouchableOpacity>
                </View>

                <SpinnerOverlay visible={loading} color='#0E87A1' />
            </View>
        </ScrollView>
    )
}

export default Signup;



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: 0.2 * Dimensions.get('window').width,
        width: 0.6 * Dimensions.get('window').width,
        marginVertical: 10,
        resizeMode: 'contain',
    },

    input: {
        borderWidth: 1,
        width: 321,
        height: 41,
        marginVertical: 5,
        borderRadius: 2,
        borderColor: "#8F8F8F",
        paddingLeft: 10
    },

    inputAddress: {
        borderWidth: 1,
        width: 321,
        height: 110,
        marginVertical: 5,
        borderRadius: 2,
        borderColor: "#8F8F8F",
        paddingBottom: "20%",
        paddingLeft: 10
    },

    inputPhone: {
        borderWidth: 1,
        width: 260,
        height: 41,
        borderRadius: 2,
        borderColor: "#8F8F8F",
        paddingLeft: 10

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginVertical: 5,
        marginHorizontal: 10
    },

    dataInput: {
        width: 62,
        height: 40,
        borderWidth: 1,
        borderColor: "#8F8F8F",
        textAlign: 'center',
        marginHorizontal: 10,
        borderRadius: 2,

    },


})