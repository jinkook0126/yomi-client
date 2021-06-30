import Modal from 'react-native-modal';
import React,{useState,useEffect} from 'react';
import { View,TouchableOpacity,Image,Alert } from 'react-native'
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../UI/StyleInput';
import {DashedFormatDate,isEmpty} from '../../modules/common';
import send from '../../modules/send';
export default ({display,closeModal,inputDiary,diaryDate,callback,today,updateNo,})=>{
    const [contents,setContents] = useState("");
    const [headerDate,setHeaderDate] = useState("");

    useEffect(()=>{
        setContents(inputDiary)
    },[inputDiary]);

    useEffect(()=>{
        setHeaderDate(diaryDate)
    },[diaryDate]);

    const handleModalSave = async()=>{
        let flag = false;
        
        if(isEmpty(today) && updateNo === "" && contents !== "") { //신규
            const {success} = await send.post('/contents/diary',{diary:contents,date:headerDate||null});
            flag = success;
        } else if(isEmpty(today) !== 0 && contents !== ""){ // 수정
            const {success} = await send.put('/contents/diary',{diary:contents,index:updateNo||today.IDX});
            flag = success;
        } else if(contents === ""){ // 삭제
            const {success} = await send.delete('/contents/diary',{params:{index:updateNo||today.IDX}});
            flag = success;
        }
        if(flag) {
            Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                closeModal();
                if(callback) callback();
            }}])
        }
    }

    return (
        <Modal
            useNativeDriver
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            isVisible={display}
            hideModalContentWhileAnimating={true}
            onBackdropPress={closeModal}
        >
            <View style={{backgroundColor:'#FFFBE9',borderRadius:8,paddingHorizontal:16,paddingVertical:26}}>
                <View style={{justifyContent:'center',alignItems:"center"}}>
                    <StyleText style={{fontSize:16}}>{DashedFormatDate(headerDate)}</StyleText>
                </View>
                <View style={{marginTop:12,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../img/emoji_01.png')} />
                </View>
                <View style={{marginTop:22,height:286}}>
                    <StyleInput
                        value={contents}
                        onChangeText={(value)=>setContents(value)}
                        multiline={true}
                    />
                </View>
                <View style={{marginTop:40,flexDirection:"row", justifyContent:"flex-end",}}>
                    <TouchableOpacity onPress={closeModal}>
                        <StyleText style={{color:"#8C6C51"}}>취소</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleModalSave}>
                        <StyleText style={{color:"#8C6C51",marginLeft:30}}>저장</StyleText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}