import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SketchCanvas } from '@kichiyaki/react-native-sketch-canvas';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import Lottie from 'lottie-react-native'

import { namingTest, attentionTest, languageTest, abstractionTest, delayRecall, getDrawing,substractionTest } from './Api/Global_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';

const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width


const Testscreen = ({ navigation }) => {



    const sketchRef = useRef(null);
    const viewShotRef = useRef(null);
    const [capturedImagePath, setCapturedImagePath] = useState(null);
    const [nextScreen, setNextScreen] = useState(0)
    const [loading, setLoading] = useState(false);
    const [isloading, seIstLoading] = useState(false);


    const [secondsLeft, setSecondsLeft] = useState(240);
    // const [attentionSecondsLeft, setAttentionSecondsLeft] = useState(80)
    // const [languageSecondsLeft, setLanguageSecondsLeft] = useState(90)



    const [finished, setFinished] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);

    const [inputValues, setInputValues] = useState(['', '', '']); // Initialize with empty values
    const [recallInput, setRecallInput] = useState(['', '', '']); // Initialize with empty values
    const [substractionInput, setSubstractionInput] = useState(['', '', '','','']); // Initialize with empty values
    const [attention1, setAttention1] = useState()
    const [attention2, setAttention2] = useState()
    const [languageInput, setLanguageInput] = useState()
    const [abstraction, setAbstraction] = useState()




    // useEffect(() => {
    //     let interval;
    //     setCountdownStarted(true)
    //     if (countdownStarted) {
    //         interval = setInterval(() => {
    //             if (secondsLeft > 0) {
    //                 setSecondsLeft(secondsLeft - 1);
    //             }
    //             // if (attentionSecondsLeft > 0) {
    //             //     setAttentionSecondsLeft(attentionSecondsLeft - 1);
    //             // }
    //             // if (languageSecondsLeft > 0) {
    //             //     setLanguageSecondsLeft(languageSecondsLeft - 1);
    //             // }
    //             else {
    //                 setFinished(true);
    //                 clearInterval(interval);
    //             }
    //         }, 1000);
    //     }

    //     return () => clearInterval(interval);
    // }, [nextScreen, secondsLeft])


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
    }, [secondsLeft, nextScreen]);

    const handleNextScreen = () => {
        setNextScreen(nextScreen + 1)
    }




    // const handleDrawScreen = async() => {
    //     // setCountdownStarted(true)
    //     // setNextScreen(nextScreen + 1)
    //     try {
    //         if (viewShotRef.current) {
    //           const uri = await viewShotRef.current.capture();
    //         //   setCapturedImagePath(uri);
    //           console.log('Captured Image Path:', uri);
    //         }
    //       } catch (error) {
    //         console.error('Error capturing drawing:', error);
    //       }
    // }

    const handleDrawScreen = async () => {
        // setNextScreen(nextScreen + 1)
        setLoading(true)
        try {
            if (viewShotRef.current) {
                const uri = await viewShotRef.current.capture();
                const filename = uri.substring(uri.lastIndexOf('/') + 1);

                const testIds = await AsyncStorage.getItem("userId")
                console.log("urisssss=>", testIds)
                // const testId = testIds;


                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                let formData = new FormData();
                formData.append('res1_files', {
                    uri: uri,
                    type: type,
                    name: filename,
                });

                formData.append('testId', testIds);

                console.log("fromData", JSON.stringify(formData))
                const response = await getDrawing(formData);

                console.log('API Response:', response.status);
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }
                setLoading(false)
                // setCapturedImagePath(uri);
                // console.log('Captured Image Path:', uri);
            }
        } catch (error) {
            setLoading(false)
            console.error('Error capturing drawing:', error);
            alert("Retry")
        }
    };



    const handleInputChange = (text, index) => {
        // Update the array with the new value at the specified index
        const newInputValues = [...inputValues];
        newInputValues[index] = text;
        setInputValues(newInputValues);
    };

    const handleRecallChange = (text, index) => {
        // Update the array with the new value at the specified index
        const newInputValues1 = [...recallInput];
        newInputValues1[index] = text;
        setRecallInput(newInputValues1);
    };

    const handleSubstractChange = (text, index) => {
        // Update the array with the new value at the specified index
        const newsubInputValues1 = [...substractionInput];
        newsubInputValues1[index] = text;
        console.log("168==>",newsubInputValues1)
        setSubstractionInput(newsubInputValues1);
    };


    const handleAtteention = async () => {

        try {
            // const remainingSeconds = attentionSecondsLeft > 0 ? attentionSecondsLeft : 0;
            // const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            // const formattedMinutes = Math.floor(remainingSeconds / 60);
            // const printedTimeString1 = `${formattedMinutes}.${formattedSeconds}`;
            // setNextScreen(nextScreen + 1)
            const testIds = await AsyncStorage.getItem("userId")
            setLoading(true)
            if (!attention1 || !attention2) {
                alert('Please fill in all mandatory fields.')
                setLoading(false)
            } else {

                const data = {
                    "testId": testIds,
                    "data": {
                        "key1": attention1,
                        "key2": attention2
                    }
                }
                const response = await attentionTest(data)
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }
                setLoading(false)


                // console.log("Your_datapush==>", data)
                // console.log("Attention==>", response.status)
            }
        } catch (error) {
            console.log("handleAtteention=>", error)
            setLoading(false)
        }

    };


    const handleName = async () => {

        try {

            // const remainingSeconds = secondsLeft > 0 ? secondsLeft : 0;
            // const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            // const formattedMinutes = Math.floor(remainingSeconds / 60);
            // const printedTimeString = `${formattedMinutes}.${formattedSeconds}`;
            // console.log(`Remaining time: ${printedTimeString}`);
            // setNextScreen(nextScreen + 1)

            // if(inputValues == ""){
            //     return alert("Please fill in all mandatory fields.");
            // }
            setLoading(true)
            if (inputValues.some(value => value.trim() === '')) {
                alert('Please fill in all mandatory fields.');
                setLoading(false)
            }
            else {
                setLoading(true)

                const testIds = await AsyncStorage.getItem("userId")
                const data = {
                    "testId": testIds,
                    "data": inputValues
                }
                const response = await namingTest(data)
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }
                setLoading(false)

                //     console.log("Your_datapush==>", data)
                // console.log("handleName==>", response.status)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }


    const handleLanguage = async () => {
        try {
            // const remainingSeconds = languageSecondsLeft > 0 ? languageSecondsLeft : 0;
            // const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            // const formattedMinutes = Math.floor(remainingSeconds / 60);
            // const printedTimeString2 = `${formattedMinutes}.${formattedSeconds}`;
            // setNextScreen(nextScreen + 1)
            const testIds = await AsyncStorage.getItem("userId")
            setLoading(true)

            if (!languageInput) {
                alert('Please fill in all mandatory fields.');
                setLoading(false)
            }
            else {
                const data = {
                    "testId": testIds,
                    "data": languageInput
                }

                const response = await languageTest(data)
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }
                setLoading(false)

                //     console.log("Your_datapush==>", data)
                // console.log("handleLanguage==>", response.status)
            }
        } catch (error) {
            setLoading(false)
            console.log("handleAtteention=>", error)
        }
    }


    const handleAbstraction = async () => {

        try {
            // const remainingSeconds = languageSecondsLeft > 0 ? languageSecondsLeft : 0;
            // const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            // const formattedMinutes = Math.floor(remainingSeconds / 60);
            // const printedTimeString2 = `${formattedMinutes}.${formattedSeconds}`;
            // setNextScreen(nextScreen + 1)
            const testIds = await AsyncStorage.getItem("userId")
            setLoading(true)
            if (!abstraction) {
                alert('Please fill in all mandatory fields.')
                setLoading(false)
            }
            else {
                const data = {
                    "testId": testIds,
                    "data": abstraction
                }
                const response = await abstractionTest(data)
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }

                setLoading(false)

                //     console.log("Your_datapush==>", data)
                // console.log("Attention==>", response.status)
            }

        } catch (error) {
            setLoading(false)
            console.log("handleAtteention=>", error)
        }
    }


    const handleDelayRecall = async () => {

        try {
            const remainingSeconds = secondsLeft > 0 ? secondsLeft : 0;
            const formattedSeconds = (remainingSeconds % 60).toFixed(2);
            const formattedMinutes = Math.floor(remainingSeconds / 60);
            const printedTimeString = `${formattedMinutes}.${formattedSeconds}`;
            console.log(`Remaining time: ${printedTimeString}`);
            // setNextScreen(nextScreen + 1)
            const testIds = await AsyncStorage.getItem("userId")

            setLoading(true)
            if (recallInput.some(value => value.trim() === '')) {
                alert('Please fill in all mandatory fields.');
                setLoading(false)
            }
            else {
                const data = {
                    "time": printedTimeString,
                    "testId": testIds,
                    "data": recallInput
                }
                const response = await delayRecall(data)
                { response.status === 200 ? await AsyncStorage.removeItem("userId") || navigation.navigate("Demo") : alert("retry") }
                setLoading(false)


                console.log("Your_datapush==>", data)
                // console.log("Attention==>", response.status)
            }

        } catch (error) {
            setLoading(false)
            console.log("handleAtteention=>", error)
        }
    }


    const handleSubstRecall = async () => {

        try {
            
            const testIds = await AsyncStorage.getItem("userId")

            setLoading(true)
            if (substractionInput.some(value => value.trim() === '')) {
                alert('Please fill in all mandatory fields.');
                setLoading(false)
            }
            else {
                const data = {
                    
                    "testId": testIds,
                    "data": substractionInput
                }
                const response = await substractionTest(data)
                { response.status === 200 ? setNextScreen(nextScreen + 1) : alert("retry") }
                setLoading(false)


                console.log("Your_SubstRecall==>", data)
                console.log("SubstRecall==>", response.data)
            }

        } catch (error) {
            setLoading(false)
            console.log("handleAtteention=>", error)
        }
    }


    // const handleSubmit = () => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         navigation.navigate('Dashboard')
    //         setLoading(false)
    //     }, 2000)
    //     // navigation.navigate('Result')

    // }



    // const handlePrintSeconds = () => {
    //     const remainingSeconds = secondsLeft > 0 ? secondsLeft : 0;
    //     const formattedSeconds = (remainingSeconds % 60).toFixed(2);
    //     const formattedMinutes = Math.floor(remainingSeconds / 60);
    //     const times=`${formattedMinutes}.${formattedSeconds}`

    //     setTimer(times)
    //     // console.log(`Remaining time: ${formattedMinutes}.${formattedSeconds}`);
    //     console.log("consssss==>",timer);

    // };


    // const handlePrintSeconds = () => {
    //     const remainingSeconds = secondsLeft > 0 ? secondsLeft : 0;
    //     const formattedSeconds = (remainingSeconds % 60).toFixed(2);
    //     const formattedMinutes = Math.floor(remainingSeconds / 60);
    //     const printedTimeString = `${formattedMinutes}.${formattedSeconds}`;
    //     setTimer(printedTimeString);
    //     console.log(`Remaining time: ${printedTimeString}`);
    //     console.log("hgchgchgc==>", timer);

    // };

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    // const minutes1 = Math.floor(attentionSecondsLeft / 60);
    // const seconds1 = attentionSecondsLeft % 60;


    // const minutes2 = Math.floor(languageSecondsLeft / 60);
    // const seconds2 = languageSecondsLeft % 60;



    return (
        <KeyboardAvoidingView style={styles.Maincontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexDirection: "row", justifyContent:'center', paddingTop:20, paddingBottom:10,paddingRight:10,paddingLeft:10}}>

                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 0 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 0.2
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 0 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 1.5
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 1 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 2
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 1 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 2

                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 2 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 2
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 2 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 2.3
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 3 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 2.6
                        }}
                    ></View>



                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 3 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 2.8
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 4 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 3
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 4 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 3.3
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 5 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 3
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 5 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 3.4
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            height: 6,
                            width: "5%",
                            backgroundColor: nextScreen > 6 ? "green" : "#CCC9C9",
                            top: 12,
                            right: 3.7
                        }}
                    ></View>


                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: nextScreen > 6 ? "green" : "#CCC9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 4
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 20,
                                backgroundColor: "white",
                            }}
                        ></View>
                    </View>

                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text></Text>

                    <View style={{ height: 50, width: 50, borderRadius: 50, borderWidth: 2, justifyContent: "center", alignItems: "center", marginHorizontal: 20, borderColor: "#C3C0C0" }}>

                        <View>
                            {finished ? (
                                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Time's up!</Text>
                            ) : (
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                    {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                                </Text>
                            )}
                        </View>

                    </View>
                </View>


                {nextScreen === 0 ? (
                    <View style={styles.pageContainer}>

                        <View style={styles.headerContaine}>
                            <Text
                                style={{
                                    fontSize: 25,
                                    fontWeight: "bold"
                                }}

                            >MEMORY TEST</Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold"
                                }}
                            >
                                Remember following names with order Banana Milk Deer</Text>
                        </View>


                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30 }}>


                            <View style={styles.itemContainer}>
                                <Image source={require("./Assets/banana.png")} style={{ height: 50, width: 50, marginVertical: 8 }} />
                                <Text style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginBottom: 5,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>Banana</Text>
                            </View>

                            <View style={styles.itemContainer}>
                                <Image source={require("./Assets/milk.png")} style={{ height: 50, width: 50, marginVertical: 8 }} />
                                <Text style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginBottom: 5,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>Milk</Text>
                            </View>

                            <View style={styles.itemContainer}>
                                <Image source={require("./Assets/deer.png")} style={{ height: 50, width: 50, marginVertical: 8 }} />
                                <Text style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginBottom: 5,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>Deer</Text>
                            </View>
                        </View>
                    </View>
                ) :
                    nextScreen === 1 ? (

                        <View style={styles.pageContainer}>
                            <View style={styles.headerContaine}>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: "bold"
                                    }}

                                >VISUOSPATIAL ABILITY TEST</Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Draw a cube according to the image which was{"\n"}given below

                                </Text>
                            </View>

                            <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginHorizontal: 40 }}>
                                <Image source={require("./Assets/box.png")} style={{ height: 80, width: 80 }} />
                                <Lottie source={require('./Assets/cube-v2.json')} autoPlay style={{ height: 110, width: 110, }} loop />
                            </View>

                            <View style={{ marginHorizontal: 20 }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}
                                >Draw it below</Text>
                            </View>


                            <ViewShot
                                ref={viewShotRef}
                                options={{ format: 'jpg', quality: 0.9 }}
                                style={{ flex: 1, display: capturedImagePath ? 'none' : 'flex' }}
                            >
                                <SketchCanvas
                                    ref={sketchRef}
                                    style={{ flex: 1, height: 300 }}
                                    strokeColor={'red'}
                                    strokeWidth={7}
                                />
                            </ViewShot>
                            {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
                        </View>

                    ) :
                        nextScreen === 2 ? (
                            <View style={styles.pageContainer}>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={styles.headerContaine}>
                                        <Text
                                            style={{
                                                fontSize: 25,
                                                fontWeight: "bold"
                                            }}

                                        >NAMING TEST</Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Name the following pictures:

                                        </Text>
                                    </View>


                                    {/* <View style={{ height: 50, width: 50, borderRadius: 50, borderWidth: 2, justifyContent: "center", alignItems: "center", marginHorizontal: 20, borderColor: "#C3C0C0" }}>

                                    <View>
                                        {finished ? (
                                            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Time's up!</Text>
                                        ) : (
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                                            </Text>
                                        )}
                                    </View>

                                </View> */}

                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", padding:10,width:deviceWidth}}>
                                    <Image source={require("./Assets/lionnew.jpg")} style={styles.handelImages} />
                                    <Image source={require("./Assets/camelnew.jpg")} style={styles.handelImages} />
                                    <Image source={require("./Assets/rhinonew.jpg")} style={styles.handelImages} />

                                </View>

                                <ScrollView style={{ marginVertical: 30 }}>


                                    <TextInput placeholder='Enter Your 1st Showing Image Name' style={styles.inputContainer}
                                        onChangeText={(text) => handleInputChange(text, 0)}
                                    />

                                    <TextInput placeholder='Enter Your 2nd Showing Image Name' style={styles.inputContainer}
                                        onChangeText={(text) => handleInputChange(text, 1)}
                                    />

                                    <TextInput placeholder='Enter Your 3rd Showing Image Name' style={styles.inputContainer}
                                        onChangeText={(text) => handleInputChange(text, 2)}
                                    />

                                </ScrollView>
                                {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
                            </View>
                        ) :
                            nextScreen === 3 ? (
                                <View style={styles.pageContainer}>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                        <View style={styles.headerContaine}>
                                            <Text
                                                style={{
                                                    fontSize: 25,
                                                    fontWeight: "bold"
                                                }}

                                            >ATTENTION TEST</Text>

                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "bold"
                                                }}
                                            >I am going to give you a list of digits{'.\n'}Repeat this in following order</Text>
                                        </View>

                                        {/* <View style={{ height: 50, width: 50, borderRadius: 50, borderWidth: 2, justifyContent: "center", alignItems: "center", marginHorizontal: 20, borderColor: "#C3C0C0" }}>

                                        <View>
                                            {finished ? (
                                                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Time's up!</Text>
                                            ) : (
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                    {`${minutes1}:${seconds1 < 10 ? `0${seconds1}` : seconds1}`}
                                                </Text>
                                            )}
                                        </View>

                                    </View> */}

                                    </View>

                                    <View style={{ marginVertical: 40 }}>

                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>Repeat this in forward order</Text>

                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}> 2 1 5 9 8 3 6 </Text>
                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} onChangeText={(text) => setAttention1(text)} maxLength={7} keyboardType="number-pad" />
                                        </View>



                                        <View>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>Repeat this in backward order</Text>

                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}> 7 0 4 3 5 2 </Text>
                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} onChangeText={(text) => setAttention2(text)} maxLength={7} keyboardType="number-pad" />
                                        </View>



                                    </View>



                                    {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
                                </View>
                            ) :
                                nextScreen === 4 ? (
                                    <View style={styles.pageContainer}>


                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                            <View style={styles.headerContaine}>
                                                <Text
                                                    style={{
                                                        fontSize: 25,
                                                        fontWeight: "bold"
                                                    }}

                                                >LANGUAGE TEST </Text>

                                                {/* <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold"
                                                    }}
                                                >Repeat the sentences what you see{'.\n'}on the screen or hear</Text> */}
                                            </View>

                                            {/* <View style={{ height: 50, width: 50, borderRadius: 50, borderWidth: 2, justifyContent: "center", alignItems: "center", marginHorizontal: 20, borderColor: "#C3C0C0" }}>

                                                <View>
                                                    {finished ? (
                                                        <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Time's up!</Text>
                                                    ) : (
                                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                            {`${minutes2}:${seconds2 < 10 ? `0${seconds2}` : seconds2}`}
                                                        </Text>
                                                    )}
                                                </View>

                                            </View> */}
                                        </View>

                                        <View style={{ bottom: 10 }}>

                                            {/* <View style={{ marginVertical: 2 }}>

                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>Technology has become a daily part of our life</Text>
                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} />
                                        </View> */}



                                            {/* <View>
                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>I would like you to complete the task provided to</Text>

                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} />
                                        </View> */}


                                            <View style={{ marginVertical: 50 }}>
                                                <Text style={{
                                                    marginVertical: 10,
                                                    fontSize: 16,
                                                    fontWeight: "bold",
                                                    marginHorizontal: 20,
                                                }}>Name maximum number of words in one minute that begin with the letter C</Text>

                                                <TextInput placeholder='Write the maximum number of words in one minute' style={styles.inputContainer1} onChangeText={(text) => setLanguageInput(text)} />
                                            </View>


                                        </View>



                                        {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
                                    </View>
                                ) :
                                    nextScreen === 5 ? (
                                        <View style={styles.pageContainer}>


                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                                <View style={styles.headerContaine}>
                                                    <Text
                                                        style={{
                                                            fontSize: 25,
                                                            fontWeight: "bold"
                                                        }}

                                                    >ATTENTION TEST </Text>

                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: "bold"
                                                        }}
                                                    >Serial & substraction starting at 100</Text>
                                                </View>


                                            </View>

                                            <View style={{ bottom: 10 }}>

                                                {/* <View style={{ marginVertical: 2 }}>

                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>Technology has become a daily part of our life</Text>
                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} />
                                        </View> */}



                                                {/* <View>
                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                marginHorizontal: 20,
                                            }}>I would like you to complete the task provided to</Text>

                                            <TextInput placeholder='Write it properly' style={styles.inputContainer} />
                                        </View> */}


                                                <View style={{ marginVertical: 50 }}>
                                                    <Text style={{
                                                        marginVertical: 10,
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        marginHorizontal: 20,
                                                    }}>Substract the following individual from 100</Text>

                                                    {/* <TextInput placeholder='Write the maximum number of words in one minute' style={styles.inputContainer1} onChangeText={(text) => setLanguageInput(text)} /> */}

                                                    <View style={{justifyContent:"center",alignItems:"center"}}>

                                                        <View style={{ flexDirection: "row",justifyContent:"center" }}>
                                                            <Text style={{marginVertical: 20}}>100 - 93</Text>
                                                            <TextInput placeholder='Enter your number' style={styles.inputContainer} maxLength={2} keyboardType="number-pad" onChangeText={(text) => handleSubstractChange(text, 0)}/>
                                                        </View>

                                                        <View style={{ flexDirection: "row",justifyContent:"center" }}>
                                                            <Text style={{marginVertical: 20}}>100 - 86</Text>
                                                            <TextInput placeholder='Enter your number' style={styles.inputContainer} maxLength={2} keyboardType="number-pad" onChangeText={(text) => handleSubstractChange(text, 1)}/>
                                                        </View>


                                                        <View style={{ flexDirection: "row",justifyContent:"center" }}>
                                                            <Text style={{marginVertical: 20}}>100 - 79</Text>
                                                            <TextInput placeholder='Enter your number' style={styles.inputContainer} maxLength={2} keyboardType="number-pad" onChangeText={(text) => handleSubstractChange(text, 2)}/>
                                                        </View>

                                                        <View style={{ flexDirection: "row",justifyContent:"center" }}>
                                                            <Text style={{marginVertical: 20}}>100 - 72</Text>
                                                            <TextInput placeholder='Enter your number' style={styles.inputContainer} maxLength={2} keyboardType="number-pad" onChangeText={(text) => handleSubstractChange(text, 3)}/>
                                                        </View>

                                                        <View style={{ flexDirection: "row",justifyContent:"center" }}>
                                                            <Text style={{marginVertical: 20}}>100 - 65</Text>
                                                            <TextInput placeholder='Enter your number' style={styles.inputContainer} maxLength={2} keyboardType="number-pad" onChangeText={(text) => handleSubstractChange(text, 4)}/>
                                                        </View>
                                                    </View>
                                                </View>


                                            </View>



                                            {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
                                        </View>
                                    ) :
                                        nextScreen === 6 ? (
                                            <View style={styles.pageContainer}>

                                                <View style={styles.headerContaine}>
                                                    <Text
                                                        style={{
                                                            fontSize: 25,
                                                            fontWeight: "bold"
                                                        }}

                                                    >ABSTRACTION TEST</Text>

                                                </View>

                                                <View style={{ marginVertical: 40 }}>

                                                    <View style={{ marginVertical: 2 }}>

                                                        <Text style={{
                                                            marginVertical: 10,
                                                            fontSize: 16,
                                                            fontWeight: "bold",
                                                            marginHorizontal: 20,
                                                        }}>What is the similarity between grapes and mango?</Text>
                                                        <TextInput placeholder='Write it properly' style={styles.inputContainer} value='Fruit' />
                                                    </View>



                                                    <View>
                                                        <Text style={{
                                                            marginVertical: 10,
                                                            fontSize: 16,
                                                            fontWeight: "bold",
                                                            marginHorizontal: 20,
                                                        }}>What is the similarity between car and bus?</Text>

                                                        <TextInput placeholder='Write it properly' style={styles.inputContainer} onChangeText={(text) => setAbstraction(text)} />
                                                    </View>


                                                    {/* <View>
                                                    <Text style={{
                                                        marginVertical: 10,
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        marginHorizontal: 20,
                                                    }}>What is the similarity between carrot and cabbage?</Text>

                                                    <TextInput placeholder='Write it properly' style={styles.inputContainer} />
                                                </View> */}
                                                    {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}

                                                </View>




                                            </View>
                                        ) :
                                            nextScreen === 7 ? (
                                                <View style={styles.pageContainer}>

                                                    <View style={styles.headerContaine}>
                                                        <Text
                                                            style={{
                                                                fontSize: 25,
                                                                fontWeight: "bold"
                                                            }}

                                                        >DELAYED RECALL </Text>

                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: "bold"
                                                            }}
                                                        >I told you to remember some words before{".\n"}Write them down one by one. </Text>

                                                    </View>

                                                    <View style={{ marginVertical: 40 }}>
                                                        <TextInput placeholder='Write the 1st word' style={styles.inputContainer} onChangeText={(text) => handleRecallChange(text, 0)} />
                                                        <TextInput placeholder='Write the 2nd word' style={styles.inputContainer} onChangeText={(text) => handleRecallChange(text, 1)} />
                                                        <TextInput placeholder='Write the 3rd word' style={styles.inputContainer} onChangeText={(text) => handleRecallChange(text, 2)} />
                                                    </View>



                                                    {/* <SpinnerOverlay visible={loading} color='#0E87A1' textContent='Your test result is being prepared' textStyle={styles.text} animation='none' /> */}
                                                </View>
                                            ) :
                                                // nextScreen === 7 ? (
                                                //     <View style={styles.pageContainer}>

                                                //         <View style={styles.headerContaine}>
                                                //             <Text
                                                //                 style={{
                                                //                     fontSize: 25,
                                                //                     fontWeight: "bold"
                                                //                 }}

                                                //             >ORIENTATION TEST</Text>

                                                //             <Text
                                                //                 style={{
                                                //                     fontSize: 16,
                                                //                     fontWeight: "bold"
                                                //                 }}
                                                //             >I told you to remember some words before{".\n"}Write them down one by one. </Text>

                                                //         </View>

                                                //         <View style={{ marginVertical: 40 }}>
                                                //             <TextInput placeholder='Write the 1st word' style={styles.inputContainer} />
                                                //             <TextInput placeholder='Write the 2nd word' style={styles.inputContainer} />
                                                //             <TextInput placeholder='Write the 3nd word' style={styles.inputContainer} />
                                                //         </View>



                                                //         {/* <SpinnerOverlay visible={loading} color='#0E87A1' textContent='Your test result is being prepared' textStyle={styles.text} animation='none' /> */}

                                                //     </View>
                                                // ) 
                                                // :
                                                null

                }

                <View style={styles.container}>
                    {
                        nextScreen === 0 ?
                            // <TouchableOpacity onPress={handleSubmit} style={styles.handleButton}>
                            //     <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>SUBMIT</Text>
                            // </TouchableOpacity>
                            <TouchableOpacity onPress={handleNextScreen} style={styles.handleButton}>
                                <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                            </TouchableOpacity>

                            :
                            nextScreen === 1 ?
                                <TouchableOpacity onPress={handleDrawScreen} style={styles.handleButton}>
                                    <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                </TouchableOpacity>

                                :

                                nextScreen === 2 ?
                                    <TouchableOpacity onPress={handleName} style={styles.handleButton}>
                                        <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                    </TouchableOpacity>

                                    :

                                    nextScreen === 3 ?
                                        <TouchableOpacity onPress={handleAtteention} style={styles.handleButton}>
                                            <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                        </TouchableOpacity>

                                        :

                                        nextScreen === 4 ?
                                            <TouchableOpacity onPress={handleLanguage} style={styles.handleButton}>
                                                <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                            </TouchableOpacity>

                                            :

                                            nextScreen === 5 ?
                                                <TouchableOpacity onPress={handleSubstRecall} style={styles.handleButton}>
                                                    <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                                </TouchableOpacity>

                                                :
                                                nextScreen === 6 ?
                                                    <TouchableOpacity onPress={handleAbstraction} style={styles.handleButton}>
                                                        <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>NEXT</Text>
                                                    </TouchableOpacity>

                                                    :

                                                    nextScreen === 7 ?
                                                        <TouchableOpacity onPress={handleDelayRecall} style={styles.handleButton}>
                                                            <Text style={{ textAlign: "center", color: "#F2F0F0", fontSize: 14, fontWeight: "600" }}>SUBMIT</Text>
                                                        </TouchableOpacity>



                                                        :

                                                        null
                    }
                </View>
                <SpinnerOverlay visible={loading} color='#0E87A1' />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Testscreen;

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,


    },
    handleButton: {
        position: "absolute",
        bottom: 0,
        height: 50,
        width: deviceWidth / 1.4,
        backgroundColor: "#0274C6",
        justifyContent: "center",
        borderRadius: 30
    },
    pageContainer: {
        
    
        // marginVertical: 20,
    },
    itemContainer: {
        height: 90,
        width: 80,
        // borderWidth: 1,
        // borderColor: "green",
        marginVertical: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
        overflow: 'hidden', // This is important to clip the shadow within the borders
        elevation: 5, // Add elevation for a shadow effect on Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 3, // Shadow opacity
        shadowRadius: 2,
    },
    headerContaine: {
        left: 15,
        marginVertical: 5
    },
    handelImages: {
        height: 120,
        width: 120
    },
    inputContainer: {
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#C3C0C0",
        borderRadius: 10,
        padding: 10
    },
    inputContainer1: {
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#C3C0C0",
        borderRadius: 10,
        paddingBottom: 100,
        paddingLeft: 10,
        height: 150,
    },
    text: {
        color: "white"
    }

})