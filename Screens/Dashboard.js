import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Dimensions, TouchableOpacity, Image, StatusBar, ScrollView, Modal, TouchableWithoutFeedback, Alert } from 'react-native';


import { LineChart } from "react-native-chart-kit";
import { userDetails, testId, graph } from './Api/Global_Api';
import CircularProgress from './CircularProgress';
import { useFocusEffect } from '@react-navigation/native';

import MiniCircleBar from './MiniCircleBar';
import MiniCircleSpeed from './MiniCircleSpeed';
import MiniCircleIndex from './MiniCircleIndex';


import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width


const Dashboard = ({ navigation }) => {

  var array = [0, 0, 0, 0, 0, 0, 0]


  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(60);
  const [loading, setLoading] = useState(false);


  const [acuracys, setAcuracys] = useState([]);
  const [scores, setScores] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [index, setIndex] = useState([]);
  const [gender, setGender] = useState([]);
  const [graph1, setGraph1] = useState(array);
  const [score1, setscore1] = useState(array);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');


  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await userDetails();
      const responseGraph = await graph();

      // console.log("User_details_accuracy==>", response.data.result)
      // setTimeout(()=>{console.log("User_details_accuracy==>")},1000)
      // console.log("User_ICA_Score==>",response.data.testResult.ICA_Score)
      // console.log("User_scoreArr==>",responseGraph.data.result.scoreArr)
      // console.log("User_timeArr==>",responseGraph.data.result.timeArr)


      // setGraph(responseGraph.data.result)

      //  await AsyncStorage.setItem("userDetailss",JSON.stringify(response.data.result));

      //  const asyncDetails = await AsyncStorage.getItem("userDetailss",JSON.parse(response.data.result))

      // console.log("66=>",asyncDetails)

      setData(response.data.result);
      // console.log("66=>",response.data.result)
      setGender(response.data.result.gender)

      if (response.data.testResult !== undefined) {

        if (response.data.testResult.ICA_Score === 0) {
          setScores(0)
        } else {

          setScores(response.data.testResult.ICA_Score)

        }
      }

      if (responseGraph.data.result !== undefined) {
        setGraph1(responseGraph.data.result.scoreArr)
        setscore1(responseGraph.data.result.timeArr)

      }

      if (response.data.testResult === undefined) {
        setScores(0)

      }

      if (response.data.testResult !== undefined) {
        // setScores(response.data.testResult2.MOCA_Score)
        setAcuracys(response.data.testResult.Accuracy)
        setSpeed(response.data.testResult.Speed)
        setIndex(response.data.testResult.ICA_Index)

      }
      if (response.data.testResult === undefined) {
        // setScores(response.data.testResult2.MOCA_Score)
        setAcuracys(0)
        setSpeed(0)
        setIndex(0)

      }
      setLoading(false)


    } catch (error) {
      console.log("121==>", error)
      setLoading(false)
    }
  };




  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen comes into focus


      fetchData();
      // return () => {
      //   // Code to clean up when the screen loses focus (optional)
      //   console.log('Screen is unfocused');
      //   setData([]);
      //   setAcuracys([]);
      //   setScores([]);
      //   setIndex([]);
      //   setGender([]);
      //   setSpeed([]);
      //   setscore1(array);
      //   setGraph1(array);
      // };
    }, [])
  );




  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date as per your requirement (month/day/year)
      const formattedDate = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      // Format time as per your requirement
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    // Update date and time initially
    updateDateTime();

    // Update date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);




  const handleTest = async () => {

    try {
      setLoading(true)

      const response = await testId()

      await AsyncStorage.setItem("userId", response.data.testId)



      // console.log("TestID__response===>", response.status)


      { response.status === 200 ? navigation.navigate("FirstTest") : null }
      setLoading(false)
      // setTimeout(() => {
      //   navigation.navigate("Testscreen")
      //   setLoading(false)
      // }, 2000)
    } catch (error) {
      console.log("Start_test_error==>", error)
      setLoading(false)
    }
  }

  const handleLoggss = async () => {

    try {
      setModalVisible(false)
      Alert.alert('Logout', 'Do you want to Logout', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            navigation.navigate("Loggin");
            await AsyncStorage.removeItem("token");
            setData([]);
            setAcuracys([]);
            setScores([]);
            setIndex([]);
            setGender([]);
            setSpeed([]);
            setscore1(array);
            setGraph1(array);
          }
        },
      ]);



      // const clearData = await AsyncStorage.removeItem("token")
      // console.log("15", clearData)


    } catch (error) {
      console.log("profile-Error==>", error)
    }



  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" animated={true} backgroundColor="#fff" hidden={false} />


        <View style={{ flexDirection: "row", left: 0, marginTop: 10, marginBottom: 5 }}>

          {gender === "Male" ?
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require("./Assets/male.png")} style={{ height: 50, width: 50, top: 5 }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require("./Assets/female.png")} style={{ height: 50, width: 50, top: 5 }} />
            </TouchableOpacity>
          }


          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 15,
                color: "#766F6F",
                fontFamily: "Poppins-Regular"
              }}

            >Hello!</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#000",
                fontFamily: "Poppins-Regular"
              }}

            >{`${data.firstName} ${data.lastname}`}</Text>

            <Text
              style={{
                fontSize: 14,
                color: "#766F6F",
                fontWeight: '600',
                fontFamily: "Poppins-Regular",
              }}

            >{`Age:${data.age} yrs`}</Text>
          </View>
        </View>


        <View style={{ alignItems: "center", marginVertical: 10, }}>

          <View style={{ marginBottom: 15 }}>
            <CircularProgress
              radius={50}
              progress={Math.round(scores)}
              strokeWidth={5}
              backgroundColor="#e0e0e0"
              progressColor={
                scores === 0 ? "#e0e0e0" :
                  scores >= 1 && scores <= 30
                    ? "#E53030"
                    : scores > 30 && scores <= 60
                      ? "#F0A108"
                      : "#6AC035"
              }
            />
          </View>


          <View style={{ justifyContent: "space-between", flexDirection: "row", width: '90%', marginVertical: 10 }}>

            <View style={{ flexDirection: "row", height: 40, width: 100, borderRadius: 10, borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: "#E9DFDF" }}>
              <View style={{ height: 20, width: 20, backgroundColor: "#6AC035" }}></View>
              <Text style={{ left: 5,fontFamily: "Poppins-Regular" }}>Healthy</Text>
            </View>


            <View style={{ flexDirection: "row", height: 40, width: 100, borderRadius: 10, borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: "#E9DFDF" }}>
              <View style={{ height: 20, width: 20, backgroundColor: "#F0A108" }}></View>
              <Text style={{ left: 5,fontFamily: "Poppins-Regular"}}>Medium</Text>
            </View>


            <View style={{ flexDirection: "row", height: 40, width: 100, borderRadius: 10, borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: "#E9DFDF" }}>
              <View style={{ height: 20, width: 20, backgroundColor: "#E53030" }}></View>
              <Text style={{ left: 5,fontFamily: "Poppins-Regular"}}>Danger</Text>
            </View>


          </View>




          <View style={{ marginBottom: 6, alignItems: "center", width: '100%', }}>
            <TouchableOpacity style={styles.buttonss} onPress={handleTest}>
              <Text style={{ color: "#FFFFFF", textAlign: "center", fontWeight: '600',fontFamily: "Poppins-Regular",}}>START TEST</Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* <View style={[styles.flexContainer, styles.blueSection]}>

        <TouchableOpacity style={styles.buttonss} onPress={handleTest}>
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>START TEST</Text>
        </TouchableOpacity> */}
        {/* Content for the top section (Blue)

      </View> */}




        <View style={{ flexDirection: "column", marginHorizontal: 0, backgroundColor: '#fff', padding: 10, borderRadius: 5, elevation: 5, shadowColor: '#000' }}>
          <View style={{ justifyContent: 'space-between', paddingBottom: 5, flexDirection: 'row', }}>
            <Text style={{ fontSize: 16,fontFamily: "Poppins-Regular"}}>Current Result</Text>
            <Text style={{ fontSize: 13,fontFamily: "Poppins-Regular"}}>{`Date & Time : ${currentDate} | ${currentTime}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
            <MiniCircleBar
              radius={50}
              progress={Math.round(acuracys)}
              strokeWidth={4}
              backgroundColor="#e0e0e0"
              progressColor="#00bfff"
            />
            <MiniCircleSpeed
              radius={50}
              progress={Math.round(speed)}
              strokeWidth={4}
              backgroundColor="#e0e0e0"
              progressColor="#00bfff"
            />
            <MiniCircleIndex
              radius={50}
              progress={Math.round(index)}
              strokeWidth={4}
              backgroundColor="#e0e0e0"
              progressColor="#00bfff"
            />
          </View>
        </View>





        <View style={styles.flexContainer}>
          {/* Content for the bottom section (Red) */}
          <View style={styles.lineChartContainer}>
            <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular" }}>Total Report</Text>

            {/* <Text>Bezier Line Chart</Text> */}

            <View style={{ flexDirection: "row" }}>
              <View>

                <View style={{ height: 90, width: 10, backgroundColor: "#6AC035" }}></View>
                <View style={{ height: 90, width: 10, backgroundColor: "#F0A108" }}></View>
                <View style={{ height: 90, width: 10, backgroundColor: "#E53030" }}></View>

              </View>
              <LineChart
                data={{
                  labels: [0, ...score1],
                  datasets: [
                    {
                      data: [0, ...graph1],
                    }
                  ]
                }}
                width={Dimensions.get("window").width / 1.2} // from react-native
                height={Dimensions.get("window").height / 2.4}
                yAxisLabel="% "
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(2, 116, 198, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "1",
                    stroke: "#fff",
                  }
                }}
                // bezier
                style={{
                  // marginVertical: 5,
                  marginTop: 15,


                }}
              />
            </View>

            {/* <SpinnerOverlay visible={loading} color='#0E87A1' /> */}
          </View>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                

                {/* Add other user details */}
                <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#FFA800', padding: 10, borderRadius: 5 }} onPress={handleLoggss}>
                  <Text style={{ textAlign: "center", color: "#FFFFFF", fontFamily: "Poppins-Regular", fontSize: 16, fontWeight: "600" }}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#FFA800', padding: 10, borderRadius: 5 }} onPress={() => setModalVisible(false)}>
                  <Text style={{ textAlign: "center", color: "#FFFFFF", fontFamily: "Poppins-Regular", fontSize: 16, fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>


                
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
      <SpinnerOverlay visible={loading} color='#0E87A1' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
  },
  flexContainer: {
    alignItems: "center",
    // position: 'absolute',
    // bottom: 0,
    width: '100%', // or specify a fixed width
    // height: 100, 

  },
  blueSection: {
    backgroundColor: 'white',
    marginVertical: 10
  },

  lineChartContainer: {
    // position: 'absolute',
    // bottom: 0,
    // marginBottom: 16, 
    margin: 15,
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    elevation: 6,
    shadowColor: '#000',
    position: 'relative',
  },
  // itemContainer: {
  //   height: "95%",
  //   borderRadius: 10,
  //   overflow: 'hidden', // This is important to clip the shadow within the borders
  //   elevation: 5, // Add elevation for a shadow effect on Android
  //   shadowColor: '#000', // Shadow color for iOS and Android
  //   shadowOffset: { width: 0, height: 2 }, // Shadow offset
  //   shadowOpacity: 0.8, // Shadow opacity
  //   shadowRadius: 2, // Shadow radius

  // },
  buttonss: {
    justifyContent: "center",
    height: 50,
    width: '100%',
    //width: deviceWidth / 2,
    backgroundColor: "#0274C6",
    borderRadius: 50,
    padding:5
  }
});

export default Dashboard;
