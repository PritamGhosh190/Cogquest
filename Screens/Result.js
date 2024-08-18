import { View, Text, Button } from 'react-native'
import React from 'react'

const Result = ({navigation}) => {
  return (
    <View>
     <Button title='Go to dashboard' onPress={()=>navigation.navigate("Dashboard")}/>
    </View>
  )
}

export default Result