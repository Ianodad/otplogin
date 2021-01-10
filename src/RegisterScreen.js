/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  CustomScreenContainer,
  HeaderContainer,
  CustomTextInput,
  CustomText,
  FullButtonComponent,
} from './lib';

import {colors} from './common';

import Icon from 'react-native-vector-icons/Feather';

function RegisterScreen(props) {
  const passwordTextInputRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [press, setPress] = useState(false);
  const [pressCP, setPressCP] = useState(false);
  const [passValid, setPassValid] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [passinValidMsg, setPassinValidMsg] = useState('Password must have at least 5 characters with 1 number, 1 uppercase and 1 lowercase');
  const [passMatch, setPassMatch] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [passnotMatchMsg, setPassnotMatchMsg] = useState('current password and confirm password mush same!');
  const [nameErrorStatus, setNameErrorStatus] = useState(false);
  const [emailErrorStatus, setEmailErrorStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('Feel out this field!');
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
  const [CPErrorStatus, setCPErrorStatus] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [toastMessages, setToastMessages] = useState('');

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

  const validateForm = () => {
    // eslint-disable-next-line no-useless-escape
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validateEmail = regexEmail.test(email);
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;
    let validatePassword = regexPassword.test(password);

    console.log('validateForm:', validateEmail, validatePassword, !name, !email, !password, !confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
      const errMsg = 'Please complete your data';

      function cekFields(s) {
        if (s.length > 0) {
          return false;
        }
        return true;
      }

      setNameErrorStatus(cekFields(name));
      setEmailErrorStatus(cekFields(email));
      setPasswordErrorStatus(cekFields(password));
      setCPErrorStatus(cekFields(confirmPassword));

      showToastErrorHandler(`${errMsg}`);

      return false;
    } else if (!validateEmail) {
      const errMsg = 'Format email is incorrect';

      setNameErrorStatus(false);
      setEmailErrorStatus(true);
      setEmailErrorMsg(errMsg);
      setPasswordErrorStatus(false);
      setCPErrorStatus(false);
      showToastErrorHandler(`${errMsg}`);

      return false;
    } else if (!validatePassword) {
      const errMsg = passinValidMsg;

      setEmailErrorStatus(false);
      setEmailErrorMsg(undefined);
      setPassValid(false);
      showToastErrorHandler(`${errMsg}`);

      return false;
    } else if (password !== confirmPassword) {
      const errMsg = passnotMatchMsg;

      setPassValid(true);
      setPassMatch(false);

      showToastErrorHandler(`${errMsg}`);

      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    console.log(name, email, password, confirmPassword);
    var formData = new FormData();
    if (validateForm()) {
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      console.log('onSubmit:', formData);
    } else {
      console.log('onSubmit:', validateForm());
    }
  };

  const onPressShowConfirmPass = () => {
    if (pressCP === false) {
      setShowConfirmPass(false);
      setPressCP(true);
    } else {
      setShowConfirmPass(true);
      setPressCP(false);
    }
  };

  const showToastErrorHandler = (messages) => {
      setVisibleToast(true);
      setToastMessages(messages);
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  return (
    <>
      <CustomScreenContainer>
        <Toast visible={visibleToast} message={toastMessages} />
            <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderContainer
            title="Welcome To Mitraku"
            subTitle="Daftar menggunakan akun mu untuk bisa mengakses dan berbelanja di Mitraku"
            style={styles.headerContainer}
          />
          <View style={styles.contentContainer}>
            <CustomTextInput
              containerStyle={[styles.customeTextInput]}
              placeholder="Enter your name"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setName(text)}
              defaultValue={name}
              autoFocus={true}
              error={nameErrorStatus}
            />
            <CustomTextInput
              title="Email"
              containerStyle={[styles.customeTextInput]}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setEmail(text)}
              defaultValue={email}
              error={emailErrorStatus}
              alertMessage={emailErrorMsg}
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
                  <Icon name={press === true ? 'eye' : 'eye-off'} color={colors.secondary} size={15} />
                </TouchableOpacity>
              }
              error={passwordErrorStatus}
              style={passValid ? {} : {}}
              value={password}
              refCallback={refCallback(passwordTextInputRef)}
            />
            {!passValid ? (
              <CustomText style={[styles.errorMsg]}>{passinValidMsg}</CustomText>
            ) : null}
            <CustomTextInput
              title="Confirm Password"
              containerStyle={[styles.customeTextInput]}
              placeholder="Confirm password"
              secureTextEntry={showConfirmPass}
              autoCapitalize="none"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setConfirmPassword(text)}
              RightComponent={
                <TouchableOpacity
                  style={styles.eyeIconStyle}
                  onPress={()=>onPressShowConfirmPass()}>
                  <Icon name={pressCP === true ? 'eye' : 'eye-off'} color={colors.secondary} size={15} />
                </TouchableOpacity>
              }
              error={CPErrorStatus}
              style={passMatch ? {} : {}}
            />
            {!passMatch ? (
              <CustomText style={[styles.errorMsg]}>{passnotMatchMsg}</CustomText>
            ) : null}
          </View>
          <View style={styles.bottomStyle}>
            <FullButtonComponent
              type={'fill'}
              buttonStyle={[styles.signUpBtn]}
              textStyle={[styles.textStyle]}
              disabled={false}
              onPress={()=>onSubmit()}
              text={'Sign Up'}/>
            <View style={styles.bottomLine} />
            <FullButtonComponent
              type={'default'}
              buttonStyle={[styles.signInBtn]}
              textStyle={[styles.textStyle, {color:colors.mitra_seller_collor}]}
              disabled={false}
              onPress={() => {props.navigation.navigate('Login');}}
              text={'Sign In'}/>
          </View>
        </ScrollView>
    </CustomScreenContainer>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
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
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: colors.secondary3,
    borderRadius: 3,
    marginHorizontal:12,
    marginVertical:5,
    paddingHorizontal:10,
    paddingVertical:5,
    borderWidth: 1,
    borderColor: colors.secondary3,
    height: 50,
    shadowColor: colors.secondary3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Ionicons',
    fontSize: 20,
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
  signUpBtn:{marginBottom:10, backgroundColor:colors.ORANGE},
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
