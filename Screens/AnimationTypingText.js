import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const AnimationTypingText = ({
  text = "",
  color = "white",
  textSize = 14,
  typingAnimationDuration = 50,
  blinkingCursorAnimationDuration = 190
}) => {
  const [animatedText, setAnimatedText] = useState('');
  const [blinkingCursorColor, setBlinkingCursorColor] = useState('transparent');
  let index = 0;
  let typingTimer = -1;
  let blinkingCursorTimer = -1;

  const typingAnimation = () => {
    clearTimeout(typingTimer);
    typingTimer = -1;

    if (index < text.length) {
      setAnimatedText(prevText => prevText + text.charAt(index));
      index++;

      typingTimer = setTimeout(() => {
        typingAnimation();
      }, typingAnimationDuration);
    }
  };

  const blinkingCursorAnimation = () => {
    blinkingCursorTimer = setInterval(() => {
      setBlinkingCursorColor(prevColor =>
        prevColor === 'transparent' ? color : 'transparent'
      );
    }, blinkingCursorAnimationDuration);
  };

  useEffect(() => {
    typingAnimation();
    blinkingCursorAnimation();

    return () => {
      clearTimeout(typingTimer);
      typingTimer = -1;
      clearInterval(blinkingCursorTimer);
      blinkingCursorTimer = -1;
    };
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style={{ color: color, fontSize: textSize, textAlign: 'center' }}>
        {animatedText}
        <Text style={{ color: blinkingCursorColor }}>|</Text>
      </Text>
    </View>
  );
};

AnimationTypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textSize: PropTypes.number,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number
};

export default AnimationTypingText;
