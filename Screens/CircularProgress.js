// CircularProgressBar.js
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const CircularProgressBar = ({ progress, strokeWidth, backgroundColor, progressColor }) => {
  // Increase the value of the radius to make the progress circle larger
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;
  const textAnchor = 'middle';
  const fontSize = radius / 2;
  const fontSize1 = radius / 5.5;
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
          x={radius + fontSize / 30}
          y={radius - strokeWidth / 2 - fontSize1 * 2.5} // Adjusted to move text to the top
          textAnchor={textAnchor}
          fontSize={fontSize1}
          fill="#8C8585" // Text color
          transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
        >
          ICA Score
        </SvgText>

        {
          progressColor === "#E53030"
            ? <SvgText
              x={radius + fontSize / 30}
              y={radius + fontSize / 0.89} // Adjust the y position based on the font size
              textAnchor={textAnchor}
              fontSize={fontSize1}
              
              fill="#E53030" // Text color
              transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
            >
              Danger
            </SvgText>
            : progressColor === "#F0A108"
              ? <SvgText
                x={radius + fontSize / 30}
                y={radius + fontSize / 0.89} // Adjust the y position based on the font size
                textAnchor={textAnchor}
                fontSize={fontSize1}
                fill="#F0A108" // Text color
                transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
              >
                Medium
              </SvgText>
              :

              progressColor === "#e0e0e0"
                ? <SvgText
                  x={radius + fontSize / 30}
                  y={radius + fontSize / 0.89} // Adjust the y position based on the font size
                  textAnchor={textAnchor}
                  fontSize={fontSize1}
                  fill="black" // Text color
                  transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
                >
                  Latest score
                </SvgText>
                : <SvgText
                  x={radius + fontSize / 30}
                  y={radius + fontSize / 0.89} // Adjust the y position based on the font size
                  textAnchor={textAnchor}
                  fontSize={fontSize1}
                  fill="#6AC035" // Text color
                  transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
                >
                  Healthy
                </SvgText>

          // Green for scores 66 to 100
        }
        {/* <SvgText
          x={radius + fontSize /15}
          y={radius + fontSize / 1.1} // Adjust the y position based on the font size
          textAnchor={textAnchor}
          fontSize={fontSize1}
          fill="#7E7C7C" // Text color
          transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
        >
          Latest Score
        </SvgText> */}
        <SvgText
          x={radius + fontSize / 15}
          y={radius + fontSize / 5} // Adjust the y position based on the font size
          textAnchor={textAnchor}
          fontSize={fontSize}
          fill="#000" // Text color
          transform={`rotate(90 ${radius} ${radius})`} // Rotate text along with the circle
        >
          {/* {`${progress}%`} */}
          {`${progress}%`}

        </SvgText>
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
