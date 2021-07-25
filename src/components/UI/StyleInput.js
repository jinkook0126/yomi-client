import React from 'react';
import { TextInput,StyleSheet } from 'react-native';


export default ({children,style,aref,...rest})=>{
    return (
        <TextInput
          ref={aref}
          style={[styles.default,style]}
          {...rest}
        />
    )
}
const styles = StyleSheet.create({
  default:{fontFamily:"Namu_Regular"}
})