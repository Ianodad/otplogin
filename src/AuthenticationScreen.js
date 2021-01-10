/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Countries} from './Countries';
import {
  NavigationHeader,
  FullButtonComponent,
  CustomTextInput,
} from './lib';
import {GenericStyles} from './styles/GenericStyles';

export function AuthenticationScreen({navigation}) {
  let textInput = useRef(null);
  const defaultCodeCountry = '+62';
  const defaultMaskCountry = '899 999 999';

  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCodeCountry);
  const [placeholder, setPlaceholder] = useState(defaultMaskCountry);
  const [actionButtonDisabled, setActionButtonDisabled] = useState(false);

  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };

  const onChangePhone = (number) => {
    setPhoneNumber(number);

    if (number.length > 9 && number.length < 13 && number.substr(0,1) === '8' && !isNaN(number)){
      setActionButtonDisabled(true);
    } else {
      setActionButtonDisabled(false);
    }
  };

  const onPressContinue = () => {
    if (phoneNumber) {
      navigation.navigate('InputOTP', {
        codeCountry:codeCountry,
        phoneNumber:phoneNumber,
        phone:`(${codeCountry}) ${phoneNumber}`,
        email:null,
      });
    }
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const filterCountries = (value) => {
    if (value) {
      const countryData = dataCountries.filter((obj) =>
        (obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1));
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };

  const onCountryChange = (item) => {
    setCodeCountry(item.dialCode);
    setPlaceholder(item.mask);
    onShowHideModal();
  };

  let renderModall = () => {
    //   console.log(dataCountries);
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'filter'}
                focusable={true}
                style={styles.filterInputStyle}
              />
            </View>
            <FlatList
              style={{flex: 1, backgroundColor:'red'}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                    return (<TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                        <View style={styles.countryModalStyle}>
                            <View style={styles.modalItemContainer}>
                            <Text style={styles.modalItemName}>{item.en}</Text>
                            <Text style={styles.modalItemDialCode}>
                                {item.dialCode}
                            </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>);
                }}
            />
          </View>

          <TouchableOpacity
            onPress={onShowHideModal}
            style={styles.closeButtonStyle}>
            <Text style={styles.closeTextStyle}>{'CLOSE'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
            title={'Authentication'}
            leftIconAction={()=>{}}
            leftIconType={'menu'}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
            }}
          />
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>
          {'Please input your mobile phone number'}
        </Text>
          {renderModall()}
        <CustomTextInput
          containerStyle={[styles.containerInput, {width:'100%', marginTop:24, height:50}]}
          refCallback={(input) => (textInput = input)}
          style={styles.phoneInputStyle}
          placeholder={placeholder}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={onChangePhone}
          secureTextEntry={false}
          onFocus={onChangeFocus}
          onBlur={onChangeBlur}
          autoFocus={focusInput}
          LeftComponent={
            <TouchableOpacity onPress={onShowHideModal}>
              <View style={styles.openDialogView}>
                <Text>{codeCountry + ' |'}</Text>
              </View>
            </TouchableOpacity>
          }
        />
        <View style={styles.viewBottom}>
          <FullButtonComponent
            type={'fill'}
            text={'Continue'}
            textStyle={styles.textContinue}
            buttonStyle={[styles.btnContinue, GenericStyles.mt24]}
            onPress={onPressContinue}
            disabled={!actionButtonDisabled}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 15,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  viewBottom: {
    // flex: 1,
    // justifyContent: 'flex-start',
    marginBottom: 50,
    alignItems: 'center',
    marginTop:5,
    borderWidth:0,
    borderColor:'grey',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#244DB7'
  },
  textContinue: {
    color: '#ffffff',
    // alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    // color: '#424242',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemsDialogCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
