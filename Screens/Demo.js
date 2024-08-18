import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react-native'




const Demo = ({ navigation }) => {

  const [loading, setLoading] = useState(false)



  // const listDatas =({item,index})=>{
  //   return(
  //     <View>
  //       {/* <Text key={index}>{item.id}</Text> */}
  //      { console.log(item.id)}
  //     </View>
  //   )
  // }
  useEffect(()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Dashboard")
  }, 3000);
  },[])


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>


      <Lottie source={require('./Assets/analiseDoctor.json')} autoPlay style={{ height: "80%", width: "80%" }}  />
      

      {/* <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "#6AC035", borderRadius: 10, padding: 15 }} onPress={() => navigation.navigate("Dashboard")}>
        <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Back to dashboard</Text>
      </TouchableOpacity> */}

      {loading ? (
        <Text style={{fontSize:16,fontWeight:"bold"}}>Your test result is bing prepared....</Text>
      ) : (
      //   <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "#6AC035", borderRadius: 10, padding: 15 }} onPress={() => navigation.navigate("Dashboard")}>
      //   <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Back to dashboard</Text>
      // </TouchableOpacity>
      <Text style={{fontSize:16,fontWeight:"bold"}}>Your test result submited successfuly....</Text>
      )}
    </View>
  )
}

export default Demo