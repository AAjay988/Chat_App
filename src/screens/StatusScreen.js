import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Fontisto from "react-native-vector-icons/Fontisto";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";

const StatusScreen = () => {
  const [statusVideo, setStatusVideo] = useState([])
  
  return (
    <View style={styles.container}>
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
