/* eslint-disable prettier/prettier */
import React from 'react';
import RNOtpVerify from 'react-native-otp-verify';
import OtpVerification from './components/OtpVerification';
import OtpVerify from './components/OtpVerify';

export function InputOtpScreen({navigation, route}) {
  const { phone, email } = route.params;

  let otpRequestData = {
    username: email == null ? phone : email,
    email_id: email == null ? false : true,
    phone_no: email == null ? true : false,
  };

  RNOtpVerify.getHash()
    .then(hash => {
      console.log('Use this hash to construct otp message', hash);
      console.log('A sample message -');
      console.log(`
        <#> Dear User,
        1091 is your OTP for logging into Mitraku. (Remaining Time: 10 minutes and 0 seconds)
         ${hash[0]}
      `);
    })
    .catch(error => console.log(error));
  if (1 + 1 === 2){
    return <OtpVerification attempts={5} otpRequestData={otpRequestData} {...navigation} />;
  }

  return <OtpVerify attempts={5} otpRequestData={otpRequestData} navigation={navigation} />;
}
