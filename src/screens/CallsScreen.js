import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';


const CallsScreen = () => {
 
  
  return (
    <View style={styles.container}>
      <View  style={{
          flex: 1,
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: 10, 
        }}>
          <IconButton icon={'phone-plus'}
          iconColor="grey"
          size={40}
          onPress={() => console.log('phone')}/>
        </View>
    </View>
  );
};
export default CallsScreen;
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
