import Modal from 'react-native-modal';
import React,{useState,useEffect, useRef} from 'react';
import { View,TouchableOpacity,ImageBackground,TouchableWithoutFeedback,StyleSheet } from 'react-native'
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../UI/StyleInput';
import {DashedFormatDate,isEmpty} from '../../modules/common';
import send from '../../modules/send';
import { useSnackbarContext } from '@dooboo-ui/snackbar';
import Feelset from '../../screen/Diary/Feelset.json';

export default ({display,closeModal,inputDiary,diaryDate,feels,callback,today,updateNo,})=>{
    const snackbar = useSnackbarContext();
    const textarea = useRef(null);
    const [contents,setContents] = useState("");
    const [headerDate,setHeaderDate] = useState("");
    const [feel,setFeel] = useState("FE01");

    useEffect(()=>{
        setContents(inputDiary)
    },[inputDiary]);

    useEffect(()=>{
        setHeaderDate(diaryDate)
    },[diaryDate]);

    useEffect(()=>{
        setFeel(feels? feels : 'FE01')
    },[feels]);

    const handleModalSave = async()=>{
        let flag = false;
        
        if(isEmpty(today) && updateNo === "" && contents !== "") { //신규
            const {success} = await send.post('/contents/diary',{diary:contents,feel:feel,date:headerDate||null});
            flag = success;
        } else if(isEmpty(today) !== 0 && contents !== ""){ // 수정
            const {success} = await send.put('/contents/diary',{diary:contents,feel:feel,index:updateNo||today.IDX});
            flag = success;
        } else if(contents === ""){ // 삭제
            const {success} = await send.delete('/contents/diary',{params:{index:updateNo||today.IDX}});
            flag = success;
        }
        if(flag) {
            closeModal();
            snackbar.show({text:"저장되었습니다."});
            if(callback) callback();
        }
        setContents("");
        setFeel("FE01");
    }

    const feelOpacity = (feeling) => feel === feeling ? 1 : 0.3;

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
            onBackButtonPress={closeModal}
        >
            <ImageBackground resizeMode='stretch' source={require('../../img/diary/modal_bg.png')} style={{paddingHorizontal:26,paddingVertical:26}}>
                <View style={{justifyContent:'center',alignItems:"center"}}>
                    <StyleText style={{fontSize:17}}>{DashedFormatDate(headerDate)}</StyleText>
                </View>
                <View style={{marginTop:12,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>setFeel("FE01")} style={[styles.feelWrap,{marginLeft:0}]}>
                        <StyleText style={{fontSize:18,opacity: feelOpacity("FE01")}}>{Feelset["FE01"]}</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setFeel("FE04")} style={styles.feelWrap}>
                        <StyleText style={{fontSize:18,opacity: feelOpacity("FE04")}}>{Feelset["FE04"]}</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setFeel("FE03")} style={styles.feelWrap}>
                        <StyleText style={{fontSize:18,opacity: feelOpacity("FE03")}}>{Feelset["FE03"]}</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setFeel("FE02")} style={styles.feelWrap}>
                        <StyleText style={{fontSize:18,opacity: feelOpacity("FE02")}}>{Feelset["FE02"]}</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setFeel("FE05")} style={styles.feelWrap}>
                        <StyleText style={{fontSize:18,opacity: feelOpacity("FE05")}}>{Feelset["FE05"]}</StyleText>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={()=>textarea.current.focus()}>
                    <View style={{marginTop:22,height:286}}>
                        <StyleInput
                            aref={textarea}
                            value={contents}
                            onChangeText={(value)=>setContents(value)}
                            multiline={true}
                            placeholder={'일기를 입력해주세요.'}
                            style={{fontSize:18}}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{marginTop:40,flexDirection:"row", justifyContent:"flex-end",}}>
                    <TouchableOpacity onPress={closeModal}>
                        <StyleText style={{color:"#8C6C51",fontSize:18}} type='bold'>취소</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleModalSave}>
                        <StyleText style={{color:"#8C6C51",marginLeft:30,fontSize:18}} type='bold'>저장</StyleText>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Modal>
    )
}

const styles = StyleSheet.create({
    feelWrap:{width:30,height:30,justifyContent:'center',alignItems:'center',marginLeft:6}
})