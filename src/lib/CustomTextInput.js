/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, ViewPropTypes, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../common/colors';
import Icon from 'react-native-vector-icons/Feather';

const CustomTextInput = function (props) {
//   const {
//     containerStyle,
//     style,
//     LeftComponent,
//     RightComponent,
//     refCallback,
//     ...remainingProps
//   } = props;

//   return (
//     <View style={[styles.containerStyle, containerStyle]}>
//       {LeftComponent}
//       <TextInput
//         {...remainingProps}
//         style={[styles.textInputStyle, styles.fill, style]}
//         ref={refCallback}
//       />
//       {RightComponent}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderColor: colors.WHITE_GREY,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  textInputStyle: {
    padding: 0,
  },
  fill: {
    flex: 1,
  },
  container:{borderWidth: 0, marginTop: 10},
  formLbl:{
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 5,
    fontFamily: 'Ionicons',
    color: colors.black,
    paddingHorizontal: 15,
  },
  textInput:{
    flex:1,
    padding: 0,
  },
  alertWrap:{
    position:'absolute',
    flexDirection:'column',
    backgroundColor:'transparent',
    borderWidth:0,
    borderColor:'grey',
    borderRadius:5,
    marginHorizontal:15,
    bottom:-20,
    right:0,
  },
  alertContent:{
    flexDirection:'row',
    borderWidth:2,
    borderTopColor:colors.secondary_background,
    borderBottomColor:colors.primary_background,
    borderLeftColor:colors.primary_background,
    borderRightColor:colors.primary_background,
    backgroundColor:colors.secondary_background,
    borderRadius:5,
    paddingVertical:2,
    paddingHorizontal:2,
  },
  alertTop:{alignSelf:'flex-end', marginRight:10,height:10, backgroundColor:'transparent'},
  alertMessage:{
    fontSize:8,
    marginTop:3,
    paddingHorizontal:3,
  },
  errorMsg:{
    fontSize:10,
    color:'red',
    fontFamily:'Ionicons',
    top:0,
  },
  alertTopText:{color:colors.secondary_background, fontWeight:'bold', fontSize:22},
  mb:{flex:1, height:10},
});

// CustomTextInput.defaultProps = {
//   LeftComponent: <></>,
//   RightComponent: <></>,
// };

  const {
    alertIcon,
    alertMessage,
    error,
    title,
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;

  return (
    <View style={styles.container}>
      {props.title ? (
        <CustomText style={props.error ? [styles.formLbl,{color:'red'}] : styles.formLbl}>{props.title}</CustomText>
      ) : null}
      <View style={props.error ? [containerStyle,{borderColor:'red'}] : containerStyle}>
        {LeftComponent}
        <TextInput
          {...remainingProps}
          style={[styles.textInput, style]}
          ref={refCallback}
        />
        {RightComponent}

        {props.error ? (
          <View style={styles.alertWrap} >
            <View style={styles.alertTop}>
              <Text style={styles.alertTopText}>{'^'}</Text>
            </View>
            <View style={styles.alertContent}
            >
              <Icon name={props.alertIcon} color={'yellow'} size={15} />
              <CustomText style={[styles.formLbl,styles.alertMessage]}>{props.alertMessage}</CustomText>
            </View>
          </View>
        ) : null}
      </View>
      {props.error ? (
        <View style={styles.mb}/>
      ) : null}
    </View>
  );
};

CustomTextInput.defaultProps = {
title:'username',
LeftComponent: <></>,
RightComponent: <></>,
alertIcon: 'alert-circle',
alertMessage:'Please fill out this field!',
};

CustomTextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  LeftComponent: PropTypes.object,
  RightComponent: PropTypes.object,
  refCallback: PropTypes.func,
};

export default CustomTextInput;

const CustomText = function(props) {
  return (
    <Text {...props} style={[{ color: colors.black }, props.style]}>
      {props.children}
      {'  '}
    </Text>
  );
};
