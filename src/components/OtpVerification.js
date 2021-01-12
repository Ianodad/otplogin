/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useRef,useEffect} from 'react';
import RNOtpVerify from 'react-native-otp-verify';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import colors from '../common/colors';
import PropTypes from 'prop-types';
import {
  FullButtonComponent,
  CustomButton,
  CustomTextInput,
  CustomText,
  NavigationHeader,
  CustomScreenContainer,
} from '../lib';
import ErrorBoundary from '../common/ErrorBoundary';
import {GenericStyles} from '../styles/GenericStyles';
import {isAndroid, logErrorWithMessage} from '../utilities/helperFunctions';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

// OTPVerification Screen
const OtpVerification = function(props) {
  const {otpRequestData, attempts} = props;

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fiveTextInputRef = useRef(null);
  const sixTextInputRef = useRef(null);

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT,
  );
  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);

  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  useEffect(() => {
    // autoSubmitOtpTime value will be set after otp is detected,
    // in that case we have to start auto submit timer
    autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
  });

  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      // submit OTP
      onSubmitButtonPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendButtonDisabledTime]);

  useEffect(() => {
    // docs: https://github.com/faizalshap/react-native-otp-verify

    RNOtpVerify.getOtp()
      .then(p =>
        RNOtpVerify.addListener(message => {
          try {
            if (message) {
              console.log(message);
              const messageArray = message.split('\n');
              if (messageArray[2]) {
                const otp = messageArray[2].split(' ')[0];
                if (otp.length === 6) {
                  setOtpArray(otp.split(''));

                  // to auto submit otp in 4 secs
                  setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
                  startAutoSubmitOtpTimer();
                }
              }
            }
          } catch (error) {
            logErrorWithMessage(
              error.message,
              'RNOtpVerify.getOtp - read message, OtpVerification',
            );
          }
        }),
      )
      .catch(error => {
        logErrorWithMessage(
          error.message,
          'RNOtpVerify.getOtp, OtpVerification',
        );
      });

    // remove listener on unmount
    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const startAutoSubmitOtpTimer = () => {
    if (autoSubmitOtpTimerInterval) {
      clearInterval(autoSubmitOtpTimerInterval);
    }
    autoSubmitOtpTimerInterval = setInterval(() => {
      autoSubmitOtpTimerIntervalCallbackReference.current();
    }, 1000);
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        console.log('idx-', index);
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fiveTextInputRef.current.focus();
          setSubmittingOtp(true);
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fiveTextInputRef.current.focus();
        } else if (index === 4) {
          sixTextInputRef.current.focus();
        } else if (index === 5) {
          setSubmittingOtp(false);
        }
      }
    };
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '', '', '']);
      firstTextInputRef.current.focus();
    }

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
  };

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const onSubmitButtonPress = () => {
    // API call
    // todo
    console.log('todo: Submit OTP');
  };

  return (
    <CustomScreenContainer>
      <NavigationHeader
        title={'Go back'}
        leftIconAction={() => props.goBack()}
        leftIconType={'back'}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: colors.SILVER,
        }}
      />
      <ErrorBoundary screenName={'OtpVerification'}>
        <View style={styles.container}>
          <CustomText>
            Enter OTP sent to your{' '}
            {otpRequestData.email_id ? 'email' : 'mobile number'}{' \n\n'}
            {otpRequestData.username}{' \n'}
          </CustomText>
          <View style={[{flex:0.5, alignItems:'center', justifyContent:'center'},GenericStyles.row, GenericStyles.mt12]}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
              fiveTextInputRef,
              sixTextInputRef,
            ].map((textInputRef, index) => (
              <CustomTextInput
                containerStyle={[styles.optInputStyle]}
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                keyboardType={'numeric'}
                maxLength={1}
                style={[{paddingLeft:22}]}
                autoFocus={index === 0 ? true : undefined}
                refCallback={refCallback(textInputRef)}
                key={index}
              />
            ))}
          </View>
          {errorMessage ? (
            <CustomText
              style={[
                GenericStyles.negativeText,
                GenericStyles.mt12,
                GenericStyles.centerAlignedText,
              ]}>
              {errorMessage}
            </CustomText>
          ) : null}
          {resendButtonDisabledTime > 0 ? (
            <TimerText text={'Resend OTP in'} time={resendButtonDisabledTime} />
          ) : (
            <CustomButton
              type={'link'}
              text={'Resend OTP'}
              buttonStyle={styles.otpResendButton}
              textStyle={styles.otpResendButtonText}
              onPress={onResendOtpButtonPress}
            />
          )}
          <View style={GenericStyles.fill} />
          {submittingOtp && <ActivityIndicator />}
          {autoSubmitOtpTime > 0 &&
          autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
            <TimerText text={'Submitting OTP in'} time={autoSubmitOtpTime} />
          ) : null}
          <CustomText
            style={[GenericStyles.centerAlignedText, GenericStyles.mt12]}>
            {attemptsRemaining || 0} Attempts remaining
          </CustomText>
          <FullButtonComponent
            type={'fill'}
            text={'Submit'}
            textStyle={styles.submitButtonText}
            buttonStyle={[{height:50, backgroundColor:colors.mitra_seller_collor, borderRadius:30, justifyContent:'center'}, GenericStyles.mt24]}
            onPress={onSubmitButtonPress}
            disabled={submittingOtp}
          />
        </View>
      </ErrorBoundary>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  submitButtonText: {
    color: colors.WHITE,
  },
  otpResendButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  otpResendButtonText: {
    color: colors.ORANGE,
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  otpText: {
    paddingLeft:22,
  },
  optInputStyle:{marginHorizontal:5, borderWidth:0, height:50, width:50, borderColor:colors.secondary,borderRadius:30, backgroundColor:colors.secondary3},
});

OtpVerification.defaultProps = {
  attempts: 5,
  otpRequestData: {
    username: 'varunon9',
    email_id: false,
    phone_no: true,
  },
};

OtpVerification.propTypes = {
  otpRequestData: PropTypes.object.isRequired,
  attempts: PropTypes.number.isRequired,
};

const TimerText = props => {
  const {text, time} = props;

  return (
    <CustomText
      style={[
        GenericStyles.centerAlignedText,
        styles.resendOtpTimerText,
        GenericStyles.mt24,
      ]}>
      {text}
      <CustomText style={GenericStyles.bold}>{' ' + time}s</CustomText>
    </CustomText>
  );
};


OtpVerification.defaultProps = {
    attempts: 5,
    otpRequestData: {
      username: 'varunon9',
      email_id: false,
      phone_no: true,
    },
  };

  OtpVerification.propTypes = {
    otpRequestData: PropTypes.object.isRequired,
    attempts: PropTypes.number.isRequired,
  };

export default OtpVerification;
