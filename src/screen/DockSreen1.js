import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {openModal} from '../reducers/modal';

export default ()=>{
    const dispatch = useDispatch();
    const openModalText=()=>{
        dispatch(openModal('test'));
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#b9e450' }}>
            <Text>Dock Screen 1 입니다!!!</Text>
            <Button title="Modal Open!!" onPress={openModalText}></Button>
        </View>
    )
}