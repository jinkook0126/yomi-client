import React from 'react';
import { TextInput,StyleSheet } from 'react-native';


export default ({children,style,...rest})=>{
    return (
        <TextInput
          style={[styles.default,style]}
          {...rest}
        />
    )
}
const styles = StyleSheet.create({
  default:{fontFamily:"Namu_Regular"}
})