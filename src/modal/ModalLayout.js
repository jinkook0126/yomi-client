import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import BookModalContents from './BookModalContents';
import BookRgModalContents from './BookRgModalContents';
import DeskodalContents from './DeskModalContents';
import HealthModalContents from './HealthModalContents';

export default ()=>{
    const stat = useSelector(state => state.modal.stat)
    const contents = useSelector(state => state.modal.contents)
    const zIndex = useRef(0);

    const getContents = ()=>{
        switch(contents) {
            case 'book' :
                return <BookModalContents />;
            case 'bookRg' :
                return <BookRgModalContents />;
            case 'desk' :
                return <DeskodalContents />;
            case 'health' :
                return <HealthModalContents />;
            default:
                return null;
        }
    }
    const getStyle = ()=>{
        return {
            flex:1,
            height:stat ? height = "100%" : zIndex.current = 0,
            backgroundColor:'rgba(0,0,0,0.8)',
            justifyContent:"center",
            alignItems:"center",
            zIndex:100,
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