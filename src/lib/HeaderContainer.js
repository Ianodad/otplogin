/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../common/colors';

const HeaderContainer = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.title ? (
        <CustomText style={[styles.formTitle, props.textStyle]}>
          {props.title}
        </CustomText>
      ) : null}

      {props.subTitle ? (
        <CustomText style={[styles.formTitleDesc, props.textStyle]}>
          {props.subTitle}
        </CustomText>
      ) : null}

      <View style={styles.bottom} />
    </View>
  );
};

export default HeaderContainer;

// To handle one plus issue, we are adding two spaces at the end of text. This will cause center alignment issue
// so in such places use Text from react-native
const CustomText = function (props) {
  return (
    <Text {...props} style={[styles.style, props.style]}>
      {props.children}
      {'  '}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  style: {
    color: colors.BLACK,
  },
  formTitle: {
    alignSelf: 'center',
    fontSize: 30,
    textTransform: 'capitalize',
    fontFamily: 'Ionicons',
    color: colors.black,
    textAlign: 'center',
    justifyContent: 'center',
  },
  formTitleDesc: {
    alignSelf: 'center',
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 5,
    fontFamily: 'Ionicons',
    color: colors.shadow_background,
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  bottom:{flex: 1},
});

CustomText.propTypes = {
  style: Text.propTypes.style,
};
