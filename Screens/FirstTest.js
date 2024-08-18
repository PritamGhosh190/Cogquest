import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity,Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { preTest } from './Api/Global_Api';



const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width


const FirstTest = ({ navigation }) => {
    const [checkedItems, setCheckedItems] = useState(Array(10).fill(''));
    const [secondsLeft, setSecondsLeft] = useState(240);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        // if (countdownStarted ===)
        const interval = setInterval(() => {
            if (secondsLeft > 0) {
                setSecondsLeft(secondsLeft - 1);
            } else {
                setFinished(true);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);

    }, [secondsLeft]);



    const handleCheckboxChange = (index, isChecked) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = isChecked ? getStaticData(index) : '';
        setCheckedItems(updatedCheckedItems);
    };

    // const handleShowCheckedData = () => {
    //     const filteredCheckedItems = checkedItems.filter((item) => item !== '');
    //     console.log('Checked data array:', filteredCheckedItems);
    //     // You can use the filteredCheckedItems array as needed
    // };


    const handleShowCheckedData = async () => {
        setLoading(true)
        try {
            const remainingSeconds = secondsLeft > 0 ? secondsLeft : 0;
            const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            const formattedMinutes = Math.floor(remainingSeconds / 60);
            const printedTimeString = `${formattedMinutes}.${formattedSeconds}`;
            console.log(`Remaining time: ${printedTimeString}`);
            // setNextScreen(nextScreen + 1)
            const testIds = await AsyncStorage.getItem("userId")
            console.log("Test_id==>",testIds)


            const filteredCheckedItems = checkedItems.filter((item) => item !== '');

            if (filteredCheckedItems.length < 5) {
                setLoading(false);
                Alert.alert(
                    'Validation Error',
                    'Please check at least 5 checkboxes before submitting.',
                    [
                        {
                            text: 'OK',
                        },
                    ],
                    { cancelable: false }
                );
                return;
            }

            const data = {
                "testId" : testIds,
                "testData": filteredCheckedItems,
                "testTime": printedTimeString
            }
            console.log("Your_datapush==>", data)
            const response = await preTest(data)
            console.log("Your_datapush==>", response.data)
            { response.status === 200 && response.data.result.ICA_Index >= 50 ? 

                Alert.alert(
                    'MOCA TEST',
                    'You are eligible for the Moca Test',
                    [
                    //   {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    //   },
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate("Testscreen"),
                      },
                    ],
                    { cancelable: false }
                  )

                : 
            
                Alert.alert(
                    'You are Not-eligible for the Moca Test',
                    'Press OK for Re-Test',
                    [
                    //   {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    //   },
                      {
                        text: 'OK',
                        onPress: async() => {navigation.goBack() && await AsyncStorage.removeItem("userId")},
                      },
                    ],
                    { cancelable: false }
                  )
            
            
            
            
            }
            setLoading(false)
            // console.log("responce=>", response.data.result.ICA_Index)
            // setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Pre_test_error==>", error)
        }
    };

    const getStaticData = (index) => {
        switch (index) {
            case 0:
                return 'Non-Animal';
            case 1:
                return 'Animal';
            // Add more cases as needed
            case 2:
                return 'Animal';
            case 3:
                return 'Non-Animal';
            // Add more cases as needed
            case 4:
                return 'Non-Animal';
            // Add more cases as needed
            case 5:
                return 'Animal';
            case 6:
                return 'Animal';
            // Add more cases as needed
            case 7:
                return 'Non-Animal';
            case 8:
                return 'Non-Animal';
            // Add more cases as needed
            case 9:
                return 'Animal';
            // Add more cases as needed
            default:
                return '';
        }
    };



    const imageSources = [
        require('./Assets/apples.jpg'),
        require('./Assets/elephant.jpg'),
        require('./Assets/bear.jpg'),
        require('./Assets/raod.jpg'),
        require('./Assets/rose.jpg'),
        require('./Assets/zebra.jpg'),
        require('./Assets/blur-tiger.jpg'),
        require('./Assets/lader.jpg'),
        require('./Assets/house.jpg'),
        require('./Assets/deer-blur.jpg'),
    ];


    const renderItem = ({ item, index }) => (
        <View style={{alignItems:'center',}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item} style={{ width: 100, height: 100, margin: 9, borderRadius: 20 }} />
            </View>
            <CheckBox
                value={checkedItems[index] !== ''}
                onValueChange={(isChecked) => handleCheckboxChange(index, isChecked)}
            />
        </View>
        
    );

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                <TouchableOpacity onPress={() => navigation.goBack() &&  AsyncStorage.removeItem("userId")}>
                    <Image source={require("./Assets/arrow.png")} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: "bold",fontFamily: "Poppins-Regular" }}>Identify and check the animal from the given images</Text>
            </View>




            <View style={{ flexDirection: "row", justifyContent: "space-between", height: 30, width: deviceWidth / 2.5, borderWidth: 1, padding: 2, marginVertical: 5, borderRadius: 10 }}>

                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 5,fontFamily: "Poppins-Regular" }}>Total time : </Text>


                <View >
                    {finished ? (
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 20,fontFamily: "Poppins-Regular" }}>00:00</Text>
                    ) : (
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 20,fontFamily: "Poppins-Regular" }}>
                            {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                        </Text>
                    )}
                </View>

            </View>



           
            
            <FlatList
                data={imageSources}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
            /> 
            
            {/* <Button title="Show Checked Data" onPress={handleShowCheckedData} /> */}

            <TouchableOpacity onPress={handleShowCheckedData} style={{ height: 50, width: deviceWidth / 1.6, backgroundColor: "#0274C6", borderRadius: 30, justifyContent: "center", marginVertical: 8 }}>
                <Text style={{ textAlign: "center", fontWeight: "600", color: "#FFFFFF",fontFamily: "Poppins-Regular"}}>SUBMIT</Text>
            </TouchableOpacity>
            <SpinnerOverlay visible={loading} color='#0E87A1' textContent='Your test result is being prepared' textStyle={styles.text} animation='none' />
        </View>
    );
};

export default FirstTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:20,

    },
    Inputcontainer: {
        flexDirection: "row",
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
    text: {
        color: "white"
    }
})