import React,{useState,useEffect} from 'react';
import { View,Image,ImageBackground,TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';
import CheckBox from '../components/UI/CheckBox';
import { validNumber } from '../modules/common';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

export default ()=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [complete, setComplete] = useState(false);
    const [memo,setMemo] = useState("");
    const [readPage,setReadPage] = useState(0);
    const [rate,setRate] = useState(2.5);
    const params = useSelector(state=> state.modal.params);

    useEffect(()=>{
        setRate(params.rating);
        setMemo(params.memo);
        setComplete(params.comp);
    },[]);

    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=async()=>{
        if(!validNumber(readPage)) {
            snackbar.show({text:"페이지 수는 숫자만 입력 가능합니다."});
            return;
        }
        if(readPage === '' || readPage ===0 ) {
            snackbar.show({text:"페이지 수는 공백 또는 0을 입력할 수 없습니다."});
            return;
        }
        try {
            const {success} = await send.put("/contents/book",{...params,rate:rate,complete:complete,readPage:readPage,memo:memo,daily:true,date:params.date});
            if(success) {
                snackbar.show({text:"저장되었습니다."});
                params.refresh();
                dispatch(closeModal());
            }
        } catch(error){
            snackbar.show({text:error.response.data.message});
        }
    }
    return (
        <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/book/modal_bg.png')} style={{width:'90%'}}>
            <View style={{padding:16}}>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE",paddingBottom:16}}>
                    <Image source={
                        params.thumbnail !== "" ? {uri:params.thumbnail} : require('../img/emptyThumbnail.png')
                    } style={{width:67,height:84}}/>
                    <View style={{paddingLeft:4,flex:1,height:84,overflow:"hidden"}}>
                        <StyleText>{params.title}</StyleText>
                        <StyleText style={{fontSize:10,color:"#757575"}}>{params.authors}</StyleText>
                        <StyleText numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:8,color:'#757575',lineHeight:11}}>{params.contents}</StyleText>
                    </View>
                </View>
                <View style={{marginTop:25,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <StyleText style={{fontSize:18,color:"#424242"}}>읽은 페이지 수</StyleText>
                    <ImageBackground source={require('../img/common/input_small_bg_2.png')} resizeMode="stretch" style={{marginLeft:10,width:36,height:26}}>
                        <StyleInput keyboardType={"number-pad"} value={String(readPage)} onChangeText={(text)=>setReadPage(text)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:16}}/>
                    </ImageBackground>
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <StyleText style={{fontSize:18,color:"#424242"}}>별점</StyleText>
                    <Rating
                        fractions={2}
                        ratingCount={5}
                        minValue={0.5}
                        jumpValue={0.5}
                        imageSize={14}
                        startingValue={parseFloat(rate)}
                        style={{marginLeft:16}}
                        onFinishRating={value=>setRate(value)}
                    />
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <View>
                        <StyleText style={{fontSize:18,color:"#424242"}}>메모</StyleText>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                        <StyleText style={{fontSize:18,color:"#424242"}}>완독</StyleText>
                        <CheckBox
                            style={{marginLeft:10}}
                            disabled={false}
                            value={complete}
                            onValueChange={(newValue) => setComplete(newValue)}
                        />
                    </View>
                </View>
                <ImageBackground resizeMode={"stretch"} source={require("../img/book/memo_bg.png")} resizeMode="stretch" style={{marginTop:10,height:106,overflow:"hidden"}}>
                    <StyleInput
                        multiline={true}
                        value={memo}
                        onChangeText={(value)=>setMemo(value)}
                        style={{fontSize:16}}
                        placeholder={"메모를 작성해 보세요."}
                    />
                </ImageBackground>
                <View style={{marginTop:40,flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={handleClose} style={{flex:1,paddingRight:4}}>
                        <ImageBackground source={require('../img/common_modal/modal_cancel.png')} style={{width:"100%",height:50,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#ffffff",fontSize:18}} type='bold'>취소</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={{flex:1,paddingLeft:4}}>
                        <ImageBackground source={require('../img/common_modal/modal_confirm.png')} style={{width:"100%",height:50,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#ffffff",fontSize:18}} type='bold'>저장</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}