import React,{useState,useEffect,useRef} from 'react';
import { View,Image,ImageBackground,TouchableOpacity,BackHandler,TouchableWithoutFeedback } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText  from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';
import CheckBox from '../components/UI/CheckBox';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

export default ()=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [complete, setComplete] = useState(false);
    const [memo,setMemo] = useState("");
    const [rate,setRate] = useState(2.5);
    const params = useSelector(state=> state.modal.params);
    const textarea = useRef(null);
    const backAction = () => {
        dispatch(closeModal());
        return true;
    };
    
    useEffect(()=>{
        if(params.mode === "update") {
            setRate(params.rating);
            setMemo(params.memo);
            setComplete(params.comp);
        }
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[]);
    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=async()=>{
        try {
            if(params.mode === "update") {
                const {success} = await send.put("/contents/book",{...params,rate:rate,complete:complete,memo:memo});
                if(success) {
                    snackbar.show({text:"저장되었습니다."})
                    params.refresh();
                    dispatch(closeModal());
                }
            } else {
                const {success} = await send.post("/contents/book/rg",{...params,rate:rate,complete:complete,memo:memo});
                if(success) {
                    snackbar.show({text:"저장되었습니다."})
                    dispatch(closeModal())
                }
            }
        } catch(error) {
            snackbar.show({text:error.response.data.message})
        }
    }
    return (
        <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/book/modal_bg.png')} style={{width:'90%'}}>
            <View style={{padding:16}}>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE",paddingBottom:16}}>
                    <Image source={
                        params.thumbnail !== "" ? {uri:params.thumbnail} : require('../img/emptyThumbnail.png')
                    } style={{width:67,height:84}}/>
                    <View style={{paddingLeft:8,flex:1,height:84,overflow:"hidden"}}>
                        <StyleText style={{fontSize:15}}>{params.title}</StyleText>
                        <StyleText style={{fontSize:12,color:"#757575",marginTop:2}}>{params.authors}</StyleText>
                        <StyleText numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:10,color:'#757575',lineHeight:11,marginTop:4}}>{params.contents}</StyleText>
                    </View>
                </View>
                <View style={{marginTop:25,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <StyleText style={{fontSize:18,color:"#424242"}}>별점</StyleText>
                    <Rating
                        type='custom'
                        ratingImage={require("../img/book/rating_modal_star.png")}
                        ratingColor='#D8B751'
                        ratingBackgroundColor='#FFFFFF'
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
                <TouchableWithoutFeedback onPress={()=>textarea.current.focus()}>
                    <ImageBackground resizeMode={"stretch"} source={require("../img/book/memo_bg.png")} resizeMode="stretch" style={{marginTop:10,height:106,overflow:"hidden"}}>
                        <StyleInput
                            aref={textarea}
                            multiline={true}
                            value={memo}
                            style={{fontSize:16}}
                            onChangeText={(value)=>setMemo(value)}
                            placeholder={"메모를 작성해 보세요."}
                        />
                    </ImageBackground>
                </TouchableWithoutFeedback>
                
                <View style={{marginTop:40,flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={handleClose} style={{flex:1,paddingRight:4}}>
                        <ImageBackground source={require('../img/common_modal/modal_cancel.png')} resizeMode={'stretch'} style={{width:'100%',height:50,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>취소</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={{flex:1,paddingLeft:4}}>
                        <ImageBackground source={require('../img/common_modal/modal_confirm.png')} resizeMode={'stretch'} style={{width:'100%',height:50,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>저장</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}