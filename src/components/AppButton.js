import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AppButton = ({buttonPress, colour, title}) => {
  return (
    <TouchableOpacity onPress={buttonPress} style={{justifyContent:'flex-end'}}>
      <View style={{backgroundColor: colour, ...styles.container}}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default AppButton;
const styles = StyleSheet.create({
  container: {
    //height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    margin:10,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});
