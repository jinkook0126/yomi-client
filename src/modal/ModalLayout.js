import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import TestModalContents from './TestModalContents';
import BookModalContents from './BookModalContents';
import CalModalContents from './CalModalContents';

export default ()=>{
    const stat = useSelector(state => state.modal.stat)
    const contents = useSelector(state => state.modal.contents)
    const zIndex = useRef(0);

    const getContents = ()=>{
        switch(contents) {
            case 'test' :
                return <TestModalContents />;
            case 'book' :
                return <BookModalContents />;
            case 'cal' :
                return <CalModalContents />;
            default:
                return null;
        }
    }
    const getStyle = ()=>{
        stat ? zIndex.current = 2 : zIndex.current = 0;
        return {
            flex:1,
            height:"100%",
            backgroundColor:'rgba(0,0,0,0.8)',
            justifyContent:"center",
            alignItems:"center",
            zIndex:zIndex.current,
            position:"absolute",
            top:0,
            left:0,
            right:0,
            bottom:0,
        }
    }
    return (
        <View style={getStyle()}>
            {
                getContents()
            }
        </View>
    )
}