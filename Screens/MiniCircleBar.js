// CircularProgressBar.js
import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const MiniCircleBar = ({ progress, strokeWidth, backgroundColor, progressColor }) => {
  // Increase the value of the radius to make the progress circle larger
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;
  const textAnchor = 'middle';
  const fontSize = radius / 2.5;
  const fontSize1 = radius / 3;
  

  // Calculate the strokeDashoffset
  const strokeDashoffset = progress === 100 ? 0 : circumference - progressValue;

  return (
    <View>
      <Svg height={radius * 2} width={radius * 2} style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />

        {/* Percentage Text */}
        <SvgText
          x={radius + fontSize / 4}
          y={radius + fontSize / 10} // Adjust the y position based on the font size
          textAnchor={textAnchor}
          fontSize={fontSize}
          fill="#000" // Text color
          transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
        >
          {`${progress}%`}

        </SvgText>
        <SvgText
          x={radius + fontSize / 5}
          y={radius + fontSize / 1} // Adjust the y position based on the font size
          textAnchor={textAnchor}
          fontSize={fontSize1}
          fill="#7E7C7C" // Text color
          transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
        >
          Accuracy

        </SvgText>
      </Svg>
    </View>
  );
};

export default MiniCircleBar;
