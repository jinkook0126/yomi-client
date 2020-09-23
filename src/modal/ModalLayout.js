import * as React from 'react';
import { View,Text,Button } from 'react-native';
import { useSelector } from 'react-redux';
import TestModalContents from './TestModalContents';

export default ()=>{
    const height = useSelector(state => state.modal.stat) === true ? "100%" : 0
    const contents = useSelector(state => state.modal.contents)
    const getContents = ()=>{
        switch(contents) {
            case 'test' :
                return <TestModalContents/>
            default:
                return null;
        }
    }
    return (
        <View style={{flex:1,height:height,backgroundColor:'rgba(0,0,0,0.8)',justifyContent:"center",alignItems:"center",zIndex:2,position:"absolute",top:0,left:0,right:0,bottom:0}}>
            {
                getContents()
            }
        </View>
    )
}