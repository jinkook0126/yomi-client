import React from 'react';
import { Text,StyleSheet } from 'react-native';

export default ({children,style,...rest})=>{
    return (
        <Text 
            style={[styles.default,style]}
            {...rest}
        >{children}</Text>
    )
}

const styles=StyleSheet.create({
    default:{
        fontSize:14,color:"#2B2B2B",fontFamily:"Namu_Regular"
    }
})