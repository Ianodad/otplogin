/* eslint-disable prettier/prettier */
import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import colors from '../common/colors';

const CustomScreenContainer = (props) => {
  const {children} = props;

  return (
    <>
      <StatusBar backgroundColor={colors.secondary_background} barStyle="dark-content" />
      <SafeAreaView style={styles.whiteBackgroundContainer}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default CustomScreenContainer;

const styles = StyleSheet.create({
  whiteBackgroundContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
});
