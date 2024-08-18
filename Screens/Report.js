import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { reports } from './Api/Global_Api';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import React, { useState } from 'react'


const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width

const Report = () => {

  const [data, setData] = useState([]);
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(false);

  useFocusEffect(

    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await reports();
          console.log("User_Reports_accuracy==>", response.data.result)
          setData(response.data.result);

          {
            response.data.result.map((e) => {
              let datesss = e.timestamp.split(' ')[1]
              setDate(datesss.split('.')[0])
              // console.log("30==>",datesss.split('.')[0])

            }

            )
          }


          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };

      fetchData();
    }, [])
  );



  return (
    <View style={styles.container}>

      <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("./Assets/arrow.png")} style={{ width: 20, height: 20, justifyContent: "flex-start" }} />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", left: 10, color: "black", fontFamily: "Poppins-Regular" }}>All Reports</Text>
      </View>


      {data.length === 0 ? (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontFamily: "Poppins-Regular" }}>NO DATA FOUND</Text>
        </View>
      ) : (


        <FlatList
          data={data}
          renderItem={({ item }) => {

            const datePart = item.timestamp.split(' ')[0]; 
            // console.log("77==>",item.timestamp)
            return (
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20, }}>
                  <View style={styles.dataContainer}>

                    <View style={{ marginVertical: 10 }}>
                      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 10, }}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Test ID: </Text>
                            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>{item.testNumber}</Text>
                          </View>
                          <View>
                            <Text style={{ fontSize: 20, color: '#0274c6', fontWeight: 'bold', fontFamily: "Poppins-Regular" }}>{`Score : ${item.MOCA_Score}%`}</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ fontFamily: "Poppins-Regular" }}>Date: </Text>
                            <Text style={{ fontFamily: "Poppins-Regular" }}>{datePart}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ fontFamily: "Poppins-Regular" }}>Time: </Text>
                            <Text style={{ fontFamily: "Poppins-Regular" }}>{date}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row", justifyContent: 'space-around', borderTopWidth: 1, paddingTop: 10, borderTopColor: '#dedbdb', paddingTop: 10, paddingBottom: 10, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#dedbdb', marginBottom: 10 }}>
                        <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                          <Text style={styles.textHolder}>Accuracy: </Text>
                          <Text style={styles.textHolder1}>{`${item.Accuracy}%`}</Text>
                        </View>

                        <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                          <Text style={styles.textHolder}>Speed:</Text>
                          <Text style={styles.textHolder1}>{`${item.Speed}%`}</Text>
                        </View>

                        <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                          <Text style={styles.textHolder}>ICA_Index:</Text>
                          <Text style={styles.textHolder1}>{`${item.ICA_Index}%`}</Text>
                        </View>
                      </View>
                    </View>




                  </View>

                </View>

              </ScrollView>
            )
          }}
        />
      )}
      <SpinnerOverlay visible={loading} color='#0E87A1' />
    </View>
  )
}

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",

  },
  dataContainer: {
    borderColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",

    // Add shadow properties for 3D effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5, // Android only
  },
  textHolder: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
  },
  textHolder1: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#000',
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
  },
  text: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },
});
