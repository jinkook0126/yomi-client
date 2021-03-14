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
                <Button title="책 모달" onPress={()=>openModalTest("book")} color={"pink"}></Button>
            </View>
            <View style={{paddingVertical:10}}>
                <Button title="공부 모달" onPress={()=>openModalTest("desk")} color={"grey"}></Button>
            </View>
            <View style={{paddingVertical:10}}>
                <Button title="운동 모달" onPress={()=>openModalTest("health")} color={"cyan"}></Button>
            </View>
        </View>
    )
}