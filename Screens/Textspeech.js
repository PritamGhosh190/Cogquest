import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Tts from 'react-native-tts';

const Textspeech = () => {
  const [textToRead, setTextToRead] = useState('Hello, kartick blind');


  // useEffect(() => {
  //   // Set the default language to English with a male voice
  //   Tts.setDefaultLanguage('en-US-male');
  // }, []);

  const speak = async () => {
    try {
      // Use await to make sure Tts.speak is complete before moving to the next statement
      await Tts.speak(textToRead);
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{textToRead}</Text>
      <Button title="Speak" onPress={speak} />
    </View>
  );
};

export default Textspeech;
