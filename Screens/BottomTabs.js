import { View, Text,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from './Dashboard'
import Report from './Report'
import Information from './Information'
import Profiles from './Profiles'

const Bottomstack = createBottomTabNavigator()

const BottomTabs = () => {
  return (
      <Bottomstack.Navigator
      initialRouteName='Dashboard'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Dashboard') {
              iconSource = focused
                ? require('./Assets/dashboard.png')
                : require('./Assets/dashboard1.png');
            } else if (route.name === 'Report') {
              iconSource = focused
                ? require('./Assets/report2.png')
                : require('./Assets/report.png');
            }else if (route.name === 'Information') {
              iconSource = focused
                ? require('./Assets/info.png')
                : require('./Assets/info1.png');
            }else if (route.name === 'Profiles') {
              iconSource = focused
                ? require('./Assets/profile1.png')
                : require('./Assets/profile2.png');
            }

            return <Image source={iconSource} style={{ width: 24, height: 24}} />;
          },
        })}
        // tabBarOptions={{
        //   activeTintColor: '#0274C6',
        //   inactiveTintColor: 'gray',
        // }}
      >


            <Bottomstack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false,tabBarLabel:'Dashboard' }}/>
            <Bottomstack.Screen name='Report' component={Report} options={{ headerShown: false }} />
            <Bottomstack.Screen name='Information' component={Information} options={{ headerShown: false }} />
            <Bottomstack.Screen name='Profiles' component={Profiles} options={{ headerShown: false }} />


        </Bottomstack.Navigator>
  )
}

export default BottomTabs;