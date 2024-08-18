import React, { useEffect,useState } from 'react';
import { View, Image, StyleSheet, Text,Dimensions, SafeAreaView,Button,StatusBar  } from 'react-native';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');
const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width


const Splash = ({navigation}) => {


 

  // useEffect(() => {

  //   Tts.speak("Welcome to cogquest");
  //   setTimeout(() => {
  //    navigation.navigate("Loggin") 
  //   }, 3000); // Adjust the duration (in milliseconds) as per your requirement

  // }, []);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // User is logged in, navigate to BottomTabs
          navigation.navigate('BottomTabs');

        } else {
          // User is not logged in, navigate to Loggin
          navigation.navigate('Loggin');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        // Handle error, e.g., show Loggin screen as a fallback
        navigation.navigate('Loggin');
      }
    };

    Tts.speak('Welcome to cogquest');
    setTimeout(() => {
      checkLoginStatus();
    }, 3000); // Adjust the duration (in milliseconds) as per your requirement
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} backgroundColor="#0274C6" hidden={false}/>
      <Image
        source={require("./Assets/splashs.png")}
        style={styles.image}
      />

   </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set your desired background color
   
    
  },
  image: {
    width: deviceWidth,
    height: "100%",
    resizeMode: 'cover',
  },
});