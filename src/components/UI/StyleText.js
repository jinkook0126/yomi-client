import React from 'react';
import { Text,StyleSheet } from 'react-native';

export default (props)=>{
    return (
        <Text style={[styles.default,props.style]}>{props.children}</Text>
    )
}

const styles=StyleSheet.create({
    default:{
        fontSize:14,color:"#2B2B2B",fontFamily:"Cafe24Oneprettynight"
    }
})