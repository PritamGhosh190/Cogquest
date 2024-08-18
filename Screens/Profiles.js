// import { View, Text, TouchableOpacity,Alert } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import React from 'react'

// const Profiles = ({ navigation }) => {



//   const handleLoggss = async () => {

//     try {

//       Alert.alert('Logout', 'Do you want to Logout', [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: async() => {navigation.navigate("Loggin") ; await AsyncStorage.removeItem("token")}},
//       ]);

      

//       // const clearData = await AsyncStorage.removeItem("token")
//       // console.log("15", clearData)


//     } catch (error) {
//       console.log("profile-Error==>", error)
//     }



//   }


//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <TouchableOpacity style={{ height: 100, width: 100, borderRadius: 100, backgroundColor: "#0274C6", justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ color: "white", fontSize: 20 }} onPress={handleLoggss}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default Profiles

import { View, Text } from 'react-native'
import React from 'react'

const Profiles = () => {
  return (
    <View>
      <Text>Profiles</Text>
    </View>
  )
}

export default Profiles