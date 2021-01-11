/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {
    CustomScreenContainer,
    CustomButton,
  } from './lib';
import {SlideComp} from './components/splashscreen';
import {colors} from './common';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line no-unused-vars
const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  // eslint-disable-next-line no-unused-vars
  const [splashsts, setSplashsts] = useState('show');

  const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('splashscreen');
        // const value = splashsts;
      // value previously stored
      return value;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const loginScreen = () => {
    return navigation.navigate('Login');
  };

  useEffect(() => {
    async function fetchSplashStatus() {
      const response = await getData();
      console.log('splash-screen-status: ', response);
      response !== 'hide' ? loginScreen() : setSplashsts(response);
    }

    fetchSplashStatus();
  });

  const storeData = async (value) => {
    try {
    //   setSplashsts(value);
      await AsyncStorage.setItem('splashscreen', value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  function skipSplash(sts) {
    async function pushSplashStatus(hide) {
      await storeData(hide);
      loginScreen();
    }
    pushSplashStatus(sts);
  }

  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <SlideComp />
        <CustomButton
            type={'default'}
            buttonStyle={[styles.btnSkip]}
            textStyle={[styles.txtBtnSkip]}
            disabled={false}
            onPress={() => skipSplash('hide')}
            text={'Skip'}/>
      </View>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: height,
  },
  btnSkip: {
    position: 'absolute',
    right: 20,
    bottom: height - (height - 100 + 30),
    backgroundColor: colors.secondary,
    borderRadius: 5,
    borderColor:colors.secondary3,
  },
  txtBtnSkip: {
    color: colors.secondary_background,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

export default WelcomeScreen;
