import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Loggin from './Loggin'
import Splash from './Splash'
import BottomTabs from './BottomTabs';
import Signup from './Signup'
import Profiles from './Profiles';
import Textspeech from './Textspeech'
import Hookpage from './Hookpage'
import Animation from './Animation'
import Testscreen from './Testscreen'
import Result from './Result'
import CircularProgressBar from './CircularProgress'
import Dashboard from './Dashboard'
import FirstTest from './FirstTest'

const Stack = createStackNavigator();

const HandelLogg = () => {
    return (



        <Stack.Navigator initialRouteName='Splash'>

            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Loggin' component={Loggin} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='Profiles' component={Profiles} options={{ headerShown: true }} />
            <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
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

export default HandelLogg