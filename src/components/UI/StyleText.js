import React from 'react';
import { Text,StyleSheet } from 'react-native';

export default ({children,style,type,...rest})=>{
    let font = {fontFamily:"Namu_Regular"}
    if (type ==='bold') {
        font = {fontFamily:"Namu_Bold"}
    } else if (type ==='light') {
        font = {fontFamily:"Namu_light"}
    }
    return (
        <Text 
            style={[styles.default,style,font]}
            {...rest}
        >{children}</Text>
    )
}

const styles=StyleSheet.create({
    default:{
        fontSize:14,
        color:"#2B2B2B"
    }
})