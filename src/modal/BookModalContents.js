import React,{useState,useEffect} from 'react';
import { View,Image,ImageBackground,TouchableOpacity,Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';

export default ()=>{
    const dispatch = useDispatch();
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
        try {
            const {success} = await send.put("/contents/book",{...params,rate:rate,complete:complete,readPage:readPage,memo:memo,daily:true});
            if(success) {
                Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                    params.refresh();
                    dispatch(closeModal());
                }}])
            }
        } catch(error){
            alert(error.response.data.message);
        }
    }
    return (
        <View style={{width:320,padding:16,backgroundColor:'white',borderRadius:8}}>
            <View>
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
                    <StyleText style={{fontSize:12,color:"#424242"}}>읽은 페이지 수</StyleText>
                    <View style={{backgroundColor:"#EEEEEE",width:22,height:16,marginLeft:10}}>
                        <StyleInput keyboardType={"number-pad"} value={String(readPage)} onChangeText={(text)=>setReadPage(text)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                    </View>
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <StyleText style={{fontSize:12,color:"#424242"}}>별점</StyleText>
                    <Rating
                        fractions={2}
                        ratingCount={5}
                        minValue={0.5}
                        jumpValue={0.5}
                        imageSize={14}
                        startingValue={parseFloat(rate)}
                        style={{marginLeft:16,backgroundColor:'red'}}
                        onFinishRating={value=>setRate(value)}
                    />
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <View>
                        <StyleText style={{fontSize:12,color:"#424242"}}>메모</StyleText>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                        <StyleText style={{fontSize:12,color:"#424242"}}>완독</StyleText>
                        <CheckBox
                            style={{marginLeft:10}}
                            disabled={false}
                            value={complete}
                            onValueChange={(newValue) => setComplete(newValue)}
                        />
                    </View>
                </View>
                <ImageBackground resizeMode={"contain"} source={require("../img/bg_memo.png")} style={{marginTop:10,height:100,borderRadius:2,overflow:"hidden",elevation:2}}>
                    <StyleInput
                        multiline={true}
                        value={memo}
                        onChangeText={(value)=>setMemo(value)}
                    />
                </ImageBackground>
                <View style={{marginTop:40,flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={handleClose}>
                        <View style={{width:134,height:40,backgroundColor:'#C7B6A0',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#ffffff"}}>취소</StyleText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        <View style={{width:134,height:40,backgroundColor:'#8C6C51',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#ffffff"}}>저장</StyleText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}