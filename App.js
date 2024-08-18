import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './Screens/Splash';
import Textspeech from './Screens/Textspeech';
import Signup from './Screens/Signup';
import Loggin from './Screens/Loggin';
import Hookpage from './Screens/Hookpage';
import Animation from './Screens/Animation';
import BottomTabs from './Screens/BottomTabs';
import Testscreen from './Screens/Testscreen';
import Result from './Screens/Result';
import CircularProgress from './Screens/CircularProgress';
import Dashboard from './Screens/Dashboard';
import FirstTest from './Screens/FirstTest';
import Profiles from './Screens/Profiles';
import Demo from './Screens/Demo';

const Stack = createStackNavigator();

const App = () => {

// const [userLog,setUserLog] = useState(false)

//   useEffect(()=>{
//     handleUserLogg()
//   },[])



//   const handleUserLogg = async()=>{

//     try {
//       const data = await AsyncStorage.getItem("handleLoggin")
//       setUserLog(data)
//       console.log("App.js==>",data)
//     } catch (error) {
//       console.log("App.js_Error==>",error)
//     }
//   }




  return (
    
    <NavigationContainer>


      <Stack.Navigator initialRouteName='Splash'>

        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Loggin' component={Loggin} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name='Textspeech' component={Textspeech} options={{ headerShown: false }} />
        <Stack.Screen name='Hookpage' component={Hookpage} options={{ headerShown: false }} />
        <Stack.Screen name='Animation' component={Animation} options={{ headerShown: false }} />
        <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name='Testscreen' component={Testscreen} options={{ headerShown: true }} />
        <Stack.Screen name='Result' component={Result} options={{ headerShown: true }} />
        <Stack.Screen name='CircularProgress' component={CircularProgress} options={{ headerShown: true }} />
        {/* <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: true }} /> */}
        <Stack.Screen name='FirstTest' component={FirstTest} options={{ headerShown: false }} />
        <Stack.Screen name='Profiles' component={Profiles} options={{ headerShown: false }} />
        <Stack.Screen name='Demo' component={Demo} options={{ headerShown: false }} />


      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App
