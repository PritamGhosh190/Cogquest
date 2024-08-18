import { View, Text } from 'react-native'
import React from 'react'
import Signup from './Signup'
import Textspeech from './Textspeech'
import Hookpage from './Hookpage'
import Animation from './Animation'
import BottomTabs from './BottomTabs'
import Testscreen from './Testscreen'
import Result from './Result'
import CircularProgressBar from './CircularProgress'
import Dashboard from './Dashboard'
import FirstTest from './FirstTest'
// import Loggin from './Loggin'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();





const MainPage = () => {
    return (



        <Stack.Navigator initialRouteName='BottomTabs'>
            <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
            {/* <Stack.Screen name='Loggin' component={Loggin} options={{ headerShown: false }} /> */}
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='Textspeech' component={Textspeech} options={{ headerShown: false }} />
            <Stack.Screen name='Hookpage' component={Hookpage} options={{ headerShown: false }} />
            <Stack.Screen name='Animation' component={Animation} options={{ headerShown: false }} />
            <Stack.Screen name='Testscreen' component={Testscreen} options={{ headerShown: true }} />
            <Stack.Screen name='Result' component={Result} options={{ headerShown: true }} />
            <Stack.Screen name='CircularProgressBar' component={CircularProgressBar} options={{ headerShown: true }} />
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: true }} />
            <Stack.Screen name='FirstTest' component={FirstTest} options={{ headerShown: false }} />
        </Stack.Navigator>


    )
}

export default MainPage