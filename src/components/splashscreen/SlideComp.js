/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {swiperImg1, swiperImg2, swiperImg3, swiperImg4} from '../../assets';
import {colors} from '../../common';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line no-unused-vars
const {width, height} = Dimensions.get('window');

const SlideComp = (props) => {
  return (
    <View
      style={{
        height: height - 100,
      }}>
      <Swiper
        activeDotColor={colors.primary}
        dotColor={colors.secondary2}
        style={s.wrapper}
        showsButtons={true}
        loop={false}
        autoplay={true}
        buttonWrapperStyle={s.swiperBtnWrapperCustome}
        prevButton={<Text />}
        nextButton={<NextButtonCustem />}>
        <View style={s.slider}>
          <Slider
            image={swiperImg1}
            title="Barang yang anda cari semuanya ada disini"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh quis in aliquet elit consectetur blandit. Lorem ultrices lectus congue accumsan, dui vivamus turpis fermentum. Massa ac aenean porttitor velit amet eget. Odio porttitor."
          />
        </View>
        <View style={s.slider}>
          <Slider
            image={swiperImg2}
            title="Perlengkapan elektronik"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh quis in aliquet elit consectetur blandit. Lorem ultrices lectus congue accumsan, dui vivamus turpis fermentum. Massa ac aenean porttitor velit amet eget. Odio porttitor."
          />
        </View>
        <View style={s.slider}>
          <Slider
            image={swiperImg3}
            title="Perlengkapan dapur"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh quis in aliquet elit consectetur blandit. Lorem ultrices lectus congue accumsan, dui vivamus turpis fermentum. Massa ac aenean porttitor velit amet eget. Odio porttitor."
          />
        </View>
        <View style={s.slider}>
          <Slider
            image={swiperImg4}
            title="Lengkapi rumahmu dengan furniture terbaru"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum donec orci lacinia vulputate. Libero, ornare et, in eget mi nunc et odio. Nec quam blandit hendrerit ac imperdiet faucibus. Lorem orci consequat dui auctor non magna rhoncus consequat in. Pellentesque sed viverra eu diam, semper."
          />
        </View>
      </Swiper>
    </View>
  );
};

const Slider = ({image, title, desc}) => {
  return (
    <>
      <Image source={image} style={s.ill} resizeMode="contain" />
      <Text style={s.title}>{title}</Text>
      <Text style={s.desc}>{desc}</Text>
    </>
  );
};

const NextButtonCustem = () => {
  return (
    <View style={s.nextBtnWrapper}>
      <View style={s.nextBtnCustome}>
        <Icon name="arrowright" size={30} color="white" />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  slider: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  ill: {width: 346, height: 277},
  title: {
    fontSize: 24,
    width: '70%',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Ionicons',
    color: colors.primary,
  },
  desc: {
    fontSize: 14,
    width: '70%',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 5,
    fontFamily: 'Ionicons',
    color: colors.secondary,
  },
  wrapper: {
    paddingBottom: 55,
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  swiperBtnWrapperCustome: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    paddingBottom: 50,
  },
  nextBtnWrapper: {
    borderWidth: 2,
    borderRightColor: '#F47354',
    borderBottomColor: '#eee',
    borderTopColor: '#eee',
    borderLeftColor: '#eee',
    borderRadius: 30,
  },
  nextBtnCustome: {
    marginHorizontal: 8,
    marginVertical: 10,
    backgroundColor: '#F47354',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 50,
    fontSize: 25,
    color: 'white',
  },
});

export default SlideComp;
