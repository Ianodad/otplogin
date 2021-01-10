/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const OtpVerify = function(props) {
    // console.log(props);
  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 5;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const onChangeText = (val) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
        props.navigation.navigate('Home');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  }, []);

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeNumber = () => {
    setInternalVal('');
  };

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.titleStyle}>
          {'Input your OTP code sent via SMS'}
        </Text>
        <View>
          <TextInput
            ref={(input) => (textInput = input)}
            style={styles.phoneInputStyle}
            keyboardType="numeric"
            value={internalVal}
            onChangeText={onChangeText}
            maxLength={lengthInput}
            returnKeyType="done"
          />

          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  style={[
                    styles.cellView,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7',
                    },
                  ]}
                  key={index}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change Number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color: enableResend ? '#234DB7' : 'grey',
                  },
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  containerInput: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent:'flex-end',
    marginBottom: 50,
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 16,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
  },
});

OtpVerify.defaultProps = {
    attempts: 5,
    otpRequestData: {
      username: 'varunon9',
      email_id: false,
      phone_no: true,
    },
  };

  OtpVerify.propTypes = {
    otpRequestData: PropTypes.object.isRequired,
    attempts: PropTypes.number.isRequired,
  };


export default OtpVerify;
