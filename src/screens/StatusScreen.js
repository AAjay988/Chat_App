import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AppButton from '../components/AppButton';

const StatusScreen = () => {
  const [statusVideo, setStatusVideo] = useState([]);

  const selectVideoFromDevice = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        saveToPhotos: true,
        quality: 0.9,
      },
      video => {
        if (video && video.assets && video.assets.length > 0) {
          const source = video.assets[0].uri;
          alert('ImagePicker Error')
          console.log('source:', source,);
        } else if (video.errorCode) {
          console.log('ImagePicker Error: ', video.errorMessage);
        } //else {
          // Successfully selected a video
          // const source = {uri: response.assets[0].uri, fileName: response.assets[0].fileName ? response.assets[0].fileName : 'video.mp4'};
          // return (source)
          // console.log('source:',source);
        //}
      },
    );
  };
  return (
    <View style={styles.container}>
      <Text>StatusScreen</Text>
      <AppButton
        title={'upload Status Video'}
        colour={'green'}
        buttonPress={() => selectVideoFromDevice()}
      />

      <View
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <IconButton
          icon={'camera'}
          iconColor="grey"
          size={40}
          onPress={() => console.log('Camera')}
        />
      </View>
    </View>
  );
};
export default StatusScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});
