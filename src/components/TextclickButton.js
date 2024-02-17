import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const TextClick = ({colors, title,pressButton = () =>{}}) => {
    return(
        <TouchableOpacity onPress={pressButton}>
            <Text style={{color:colors,...styles.textstyle}}></Text>
            <Text style={styles.textstyle}>{title}</Text>
        </TouchableOpacity>
    )
}
export default TextClick

const styles = StyleSheet.create({
    textstyle: {
        //color:'grey',
        fontSize:16,
        //fontWeight:'bold',
        alignItems:'center',justifyContent:'center'
    }
})