/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Animated,
} from 'react-native';
import {
  CustomScreenContainer,
  HeaderContainer,
  CustomTextInput,
  CustomText,
  CustomButton,
  FullButtonComponent,
} from './lib';

import {colors} from './common';

import Icon from 'react-native-vector-icons/FontAwesome';

function LoginScreen(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [press, setPress] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [visibleToast, setVisibleToast] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [toastMessages, setToastMessages] = useState('');
  const [toastColor, setToastColor] = useState('green');
  const [modalShown, setModalShown] = useState(false);
  const [message, setMessage] = useState('Success!');

  const setToastType = (messages = 'Success!', type = 'success') => {
    let color;
    if (type === 'error') {
      color = colors.mitra_seller_collor;
    }
    if (type === 'warning') {
      color = colors.orange;
    }
    if (type === 'success') {
      color = 'green';
    }
      setToastColor(color);
      setMessage(messages);
  };

  const showToast = (messages, type) => {
    if (modalShown) {
      return;
    }

    setToastType(messages, type);

    setModalShown(true);

    fadeIn();
  };

  const validateForm = () => {
    if (!email || !password) {
      showToast('Please input your email and password', 'warning');
      return false;
    } else {
      return true;
    }
  };

  const _login = async () => {
    props.navigation.navigate('Authentication');
  };

  const onSubmit = async () => {
    if (validateForm()) {
      _login();
    }
  };

  useEffect(() => {
  });

  const onPressshowPass = () => {
    if (press === false) {
      setShowPass(false);
      setPress(true);
    } else {
      setShowPass(true);
      setPress(false);
    }
  };

  const closeToast = () => {
    setTimeout(() => {
      setModalShown(false);
      fadeOut();
    }, 5000);
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(closeToast());
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <CustomScreenContainer>
        <Toast visible={visibleToast} message={toastMessages} />
            <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderContainer
            title="  Welcome Back To Mitraku"
            subTitle="Login menggunakan akun mu untuk bisa mengakses dan berbelanja di Mitraku"
            style={styles.headerContainer}
          />
          <View style={styles.toastWrape}>
            <Animated.View
                style={[
                styles.toastAnimatedView,
                {
                    borderColor: toastColor,
                    backgroundColor:toastColor,
                    opacity: fadeAnim, // Bind opacity to animated value
                },
                ]}
            >
                <CustomText style={styles.toastMessage}>{message}</CustomText>
                <CustomButton
                    type={'link'}
                    buttonStyle={[]}
                    textStyle={[styles.toastCloseTextStyle]}
                    disabled={false}
                    onPress={fadeOut}
                    text={'x'}/>
            </Animated.View>
        </View>
          <View style={styles.contentContainer}>
            <CustomTextInput
              title="Email"
              containerStyle={[styles.customeTextInput]}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setEmail(text)}
              defaultValue={email}
            />
            <CustomTextInput
              title="Password"
              containerStyle={[styles.customeTextInput]}
              placeholder="Enter your password"
              secureTextEntry={showPass}
              autoCapitalize="none"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setPassword(text)}
              RightComponent={
                <TouchableOpacity
                  style={styles.eyeIconStyle}
                  onPress={()=>onPressshowPass()}>
                  <Icon name={press === true ? 'eye' : 'eye-slash'} color={colors.secondary} size={15} />
                </TouchableOpacity>
              }
              value={password}
            />
          </View>
          <View style={styles.bottomStyle}>

            <FullButtonComponent
              type={'fill'}
              buttonStyle={[styles.signUpBtn]}
              textStyle={[styles.textStyle]}
              disabled={false}
              onPress={onSubmit}
              text={'Sign In'}/>
            <View style={styles.socmedContainer}>
                <View style={styles.socmedTitleWrap}>
                <CustomButton
                    type={'link'}
                    buttonStyle={[styles.socmedTitleContainer]}
                    textStyle={[styles.socmedTitleStyle]}
                    disabled={false}
                    onPress={()=>{}}
                    text={'Or Sign In With'}/>
                </View>

                <CustomButton
                    type={'default'}
                    buttonStyle={[styles.btnSocialMedia]}
                    textStyle={[styles.socmedTextStyle]}
                    disabled={false}
                    onPress={() => {}}
                    text={'Google'}
                    LeftComponent={
                        <Icon name={'google'} color={colors.RED} size={15} />
                    }/>
                <CustomButton
                    type={'default'}
                    buttonStyle={[styles.btnSocialMedia]}
                    textStyle={[styles.socmedTextStyle]}
                    disabled={false}
                    onPress={() => {}}
                    text={'Facebook'}
                    LeftComponent={
                        <Icon name={'facebook'} color={colors.BLUE} size={15} />
                    }/>
            </View>

            <FullButtonComponent
              type={'link'}
              buttonStyle={[]}
              textStyle={[styles.registerTextStyle]}
              disabled={false}
              onPress={()=>{props.navigation.navigate('Register');}}
              text={'Don’t have Mitraku account'}/>
            {/* <View style={styles.bottomLine} /> */}
          </View>
        </ScrollView>
    </CustomScreenContainer>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
    toastWrape:{
        flex:1,
        backgroundColor: 'transparent',
      },
      toastAnimatedView:{
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 25,
        borderWidth: 0,
        borderRadius: 10,
        minHeight: 50,
        maxWidth: 300,
        justifyContent: 'space-between',
        zIndex: 10000,
      },
      toastMessage:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Ionicons',
        marginHorizontal: 30,
        borderWidth: 0,
        borderColor: 'grey',
      },
      toastCloseTextStyle:{
        color:colors.white,
      },
    socmedTitleStyle:{color:colors.secondary, fontFamily:'Ionicons', fontWeight:'bold'},
    socmedTitleContainer:{alignSelf:'center', backgroundColor:colors.white},
    socmedTitleWrap:{flex:1, alignSelf:'stretch', position:'absolute', top:-17, borderWidth:0, width:'100%'},
    socmedContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:2,
        borderColor:colors.secondary3,
        paddingTop:30,
        marginTop:30,
        marginBottom:30,
    },
    btnSocialMedia: {
        backgroundColor: colors.secondary3,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginHorizontal:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderColor: colors.secondary3,
        width: 180,
        height: 40,
      },
    socmedTextStyle:{
        fontSize: 14,
        textTransform: 'capitalize',
        fontFamily: 'Ionicons',
        color: colors.black,
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft:5,
    },
  headerContainer:{paddingTop:100, flex:0.15},
  eyeIconStyle:{paddingVertical: 10},
  bottomLine:{width:'100%', borderWidth:1, borderColor:colors.shadow_background, marginHorizontal:15, marginVertical:5},
  red:{color:'red'},
  formTitle: {
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
  formLbl:{
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 5,
    fontFamily: 'Ionicons',
    color: colors.black,
    paddingHorizontal: 15,
  },
  customeTextInput: {
    backgroundColor: colors.primary_background,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textbox,
    marginHorizontal:12,
    marginVertical:5,
    paddingVertical:5,
    height: 50,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Ionicons',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  registerTextStyle: {
    color: colors.mitra_seller_collor,
    fontFamily: 'Ionicons',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    width: '100%',
    height: 50,
    borderRadius: 5,
  },
  bottomStyle:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    paddingHorizontal:15,
    paddingVertical:10,
    marginTop:15,
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
    fontFamily: 'Ionicons',
    top:0,
    marginHorizontal:15,
  },
  signUpBtn:{marginBottom:10, backgroundColor:colors.ORANGE, borderRadius:30},
  signInBtn:{marginTop:10, borderWidth:2, borderColor:'skyblue', marginBottom:50},
});

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      10
    );
    return null;
  }
  return null;
};
