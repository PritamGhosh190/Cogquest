import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native'
import Tts from 'react-native-tts';
import AnimationTypingText from './AnimationTypingText';


const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width

const sentencesArray = [
    { id: 1, text: 'Hello, how are you?' },
    { id: 2, text: 'I hope you are doing well.' },
    { id: 3, text: 'This is an example sentence.' },
    // Add more objects as needed
];

const Animation = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [showYesImage, setShowYesImage] = useState(false);
    const [showNoImage, setShowNoImage] = useState(false);
    const [imagess, setImagess] = useState(false)
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false); // Track TTS speaking state



    // useEffect(() => {

    //     setTimeout(() => setImagess(true), 3000);


    //     const speakCurrentSentence = async () => {
    //         const sentenceObject = sentencesArray[currentSentenceIndex];
    //         if (sentenceObject) {

    //             setTimeout(() => Tts.speak(sentenceObject.text), 3000)
    //             // Tts.speak(sentenceObject.text);
    //         }

    //     setTimeout(() => navigation.navigate("BottomTabs"), 15000);


    //     };

    //     // Speak the current sentence when the component mounts
    //     speakCurrentSentence();

    //     // Move to the next sentence after 5 seconds
    //     const timeoutId = setTimeout(() => {
    //         setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
    //     }, 5000);

    //     // Cleanup function to clear the timeout when the component unmounts
    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, [currentSentenceIndex]);


    useEffect(() => {
        setTimeout(() => setImagess(true), 3000);

        const speakCurrentSentence = async () => {
            const sentenceObject = sentencesArray[currentSentenceIndex];
            if (sentenceObject) {
                setTimeout(() => Tts.speak(sentenceObject.text), 3000);
            }else{null}
        };

        speakCurrentSentence();

        const timeoutId = setTimeout(() => {
            setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        }, 5000);

        setTimeout(() => navigation.navigate("BottomTabs"), 15000);

        return () => {
            // Cleanup function to stop TTS when the component unmounts or navigates away
            console.log("Cleanup function executed");
            setImagess(false)
            Tts.stop();
            clearTimeout(timeoutId);
        };
    }, [currentSentenceIndex]);

    const handleContinue = () => {
        // Stop TTS when navigating to the next page
        Tts.stop();
        navigation.navigate("BottomTabs");
    };


    return (





        <View style={{ flex: 1, }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                {imagess ? <View style={styles.circleContainer}>
                    <Lottie source={require('./Assets/doctor.json')} autoPlay style={{ height: "180%", width: "180%", top: '40%' }} loop />
                </View>

                    :
                    <View style={styles.circleContainer}>
                        {/* <Lottie source={require('./Assets/doctor.json')}  style={{ height: "180%", width: "180%", top: '40%' }}/> */}
                        <Image
                            source={require("./Assets/doctorpic.png")}
                            style={{ height: 170, width: 80, top: '40%' }}
                        />
                    </View>
                }

                <TouchableOpacity style={{ top: '10%', marginHorizontal: 10 }} onPress={handleContinue}>
                    <Text>SKIP</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.textContainer}>



                {imagess ? <View style={{ height: 60, width: "100%", backgroundColor: "#3EA0D7", justifyContent: "center", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 20, top: 20 }}>
                    <Text style={{ fontWeight: 400, fontSize: 16, color: "#FFFFFF" }}>{sentencesArray[currentSentenceIndex]?.text}</Text>
                    {/* 
                    <AnimationTypingText
                        text={sentencesArray[currentSentenceIndex]?.text}
                    /> */}
                </View> : null}





            </View>



            <View style={styles.bottomAnimationContainer}>

                <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "#0274C6", justifyContent: "center", alignItems: "center", borderRadius: 30 }} onPress={handleContinue}>
                    <Text style={{ color: "white" }}>continue</Text>
                </TouchableOpacity>


                {imagess ? <Lottie source={require('./Assets/doctorsign.json')} autoPlay style={{ height: 250, width: 220, marginHorizontal: 10, marginVertical: 10, bottom: 100, right: 30 }} loop /> : null}

            </View>

        </View>








    );
};




export default Animation;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "#303030",
        height: deviceHight,
        width: deviceWidth
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        width: 311,
        height: 172
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#0274C6",
        width: 80,
        height: 38,
    },
    buttonText: {
        color: '#0274C6',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7
    },
    circleContainer: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginHorizontal: 10
    },

    bottomAnimationContainer: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        deviceWidth: deviceWidth,
        top: "60%"
    },

    textContainer: {
        marginHorizontal: 50,
    }

});