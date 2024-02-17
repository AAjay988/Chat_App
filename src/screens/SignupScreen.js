import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import TextClick from '../components/TextclickButton';
import {IconButton, TextInput} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProfileImage, WhatsappLogoo} from '../components/ImageLinks';
import auth from '@react-native-firebase/auth';
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = () => {
  const navigation = useNavigation();
  const handlebutton = () => {
    navigation.navigate('Dashboard');
  };
  const handleIconButton = () => {
    setModalVisible(true);
    setSelectedImage();
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(ProfileImage);

  const userSignup = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(responce => {
          database().ref(`/users/${responce.user.uid}`).set({
            // uid: responce.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
          });
          console.log(responce);
        });
    } catch (error) {
      console.error('Error', error.message);
    }
  };
  const OpenCamera = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'back',
      saveToPhotos: true,
    };
    const cameraPermission = await PermissionsAndroid.request(
      'android.permission.CAMERA',
      {
        title: 'App Permission',
        message: 'App needs Acess to your Camera',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
        buttonNeutral: 'Cancel',
      },
    );
    if (cameraPermission === 'granted') {
      launchCamera(options, image => {
        if (
          image &&
          image.assets &&
          image.assets.length > 0 &&
          image.assets[0].uri
        ) {
          setSelectedImage(image.assets[0].uri);
        }
        //console.log(image.assets[0].uri);
      });
    } else {
      console.log('Camera permission Denied');
    }
    setModalVisible(false);
  };
  const OpenGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.9,
      cameraType: 'back',
      saveToPhotos: true,
    };
    const galleryPermission = await PermissionsAndroid.request(
      'android.permission.READ_EXTERNAL_STORAGE',
      {
        title: 'App Permission',
        message: 'App needs Acess to your Galley',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
        buttonNeutral: 'Cancel',
      },
    );
    if (galleryPermission === 'granted') {
      launchImageLibrary(options, image => {
        if (
          image &&
          image.assets &&
          image.assets.length > 0 &&
          image.assets[0].uri
        ) {
          setSelectedImage(image.assets[0].uri);
        }
        //console.log(image.assets[0].uri);
      });
    } else {
      console.log('Gallery permission Denied');
    }
    setModalVisible(false);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <Text style={styles.textStyle}>Signup</Text>
        <Image source={{uri: selectedImage}} style={styles.imgStyle} />
        <AppButton
          title={'Select Photo'}
          buttonPress={() => setModalVisible(true)}
          colour={'green'}
        />

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: 'orange',
              width: '60%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'black',
              }}>
              Select Source
            </Text>
            <AppButton
              title={'Camera'}
              colour={'blue'}
              buttonPress={OpenCamera}
            />
            <AppButton
              title={'Gallery'}
              colour={'blue'}
              buttonPress={OpenGallery}
            />
            <TextClick
              title={'Cancel'}
              colors={'blue'}
              pressButton={() => setModalVisible(false)}
            />
          </View>
        </Modal>

        <View style={styles.inputTextStyle}>
          <TextInput
            label="First Name"
            mode="outlined"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            label="Phone Number"
            mode="outlined"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            label="email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <AppButton title={'Signup'} colour={'green'} buttonPress={userSignup} />

        {/* <IconButton  icon={'camera'} iconColor='black' size={40} onPress={handleIconButton}/> */}
        <View style={styles.textClickStyle}>
          <TextClick
            title={'Already have an account'}
            pressButton={() => navigation.goBack()}></TextClick>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    height: '50%',
    // backgroundColor: 'white',
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    //paddingBottom:20,
    marginBottom: 20,
  },
  fontStyle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
    marginBottom: 60,
  },
  buttonStyle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
    marginTop: 50,
    marginBottom: 30,
  },
  inputTextStyle: {
    borderBottomWidth: 2,
    fontSize: 25,
    width: 340,
    paddingHorizontal: 10,
    //borderBottomColor: 'green',
    borderColor: 'green',
  },
  imgStyle: {
    height: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 75,
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
  textClickStyle: {
    alignItems: 'center',
  },
});
