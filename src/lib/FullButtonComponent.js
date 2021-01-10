/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet,Text, TouchableOpacity} from 'react-native';

// import {CustomButton} from './';
import colors from '../common/colors';

const FullButtonComponent = props => {
  return (
    <CustomButton {...props} buttonStyle={[styles.button, props.buttonStyle]} />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default FullButtonComponent;

const CustomButton = function (props) {
  const style = {};
  if (props.type === 'fill') {
    style.backgroundColor = colors.BLUE;
    style.borderWidth = 0;
  } else if (props.type === 'default') {
    style.borderColor = colors.BLUE;
  } else if (props.type === 'link') {
    style.borderWidth = 0;
  }
  return (
    <TouchableOpacity
      {...props}
      style={[
        stylesCB.buttonStyle,
        style,
        props.buttonStyle,
        props.disabled ? stylesCB.disabled : {},
      ]}>
      <Text style={[stylesCB.textStyle, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const stylesCB = StyleSheet.create({
  buttonStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  textStyle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: colors.BLUE,
  },
  disabled: {
    opacity: 0.5,
  },
});

CustomButton.defaultProps = {
  type: 'default',
  disabled: false,
};
