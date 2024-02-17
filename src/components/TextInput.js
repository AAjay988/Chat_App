import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const TextInputButton = ({textValue,handleTextValue, title}) => {
  return (
    <View style={styles.textstyle}>
      <TextInput style={styles.inputTextStyle}
      value={textValue}
        onchangeText={handleTextValue}
         label={title}
         mode='outlined'
        //  placeholder={title}
        //  placeholderTextColor={'black'}
      />
    </View>
  );
};
export default TextInputButton;

const styles = StyleSheet.create({
  textstyle: {
    alignItems:'center',
    justifyContent:'flex-start',
    fontSize: 20,
    //height:200,
    marginBottom:10,
    width: 400,
    paddingHorizontal: 10,
  },
  inputTextStyle: {
    borderBottomWidth: 2,
    fontSize: 20,
    width: 340,
    paddingHorizontal: 10,
    //borderBottomColor: 'green',
    borderColor:'green',
  },
});
