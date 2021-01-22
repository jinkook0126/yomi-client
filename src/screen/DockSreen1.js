import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {openModal} from '../reducers/modal';

export default ()=>{
    const dispatch = useDispatch();
    const openModalTest=(target)=>{
        dispatch(openModal(target));
    }
    const openModalBook=()=>{
        dispatch(openModal('book'));
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#b9e450' }}>
            <Text>Dock Screen 1 입니다!!!</Text>
            <View style={{paddingVertical:10}}>
                <Button title="TEST 모달" onPress={()=>openModalTest("test")} ></Button>
            </View>
            <View style={{paddingVertical:10}}>
                <Button title="기능 모달1" onPress={()=>openModalTest("book")} color={"pink"}></Button>
            </View>
            <View style={{paddingVertical:10}}>
                <Button title="기능 모달2" onPress={()=>openModalTest("cal")} color={"grey"}></Button>
            </View>
        </View>
    )
}