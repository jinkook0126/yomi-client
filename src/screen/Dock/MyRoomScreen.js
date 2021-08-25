import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {openModal} from '../../reducers/modal';
import {initFurnitureRequest} from '../../reducers/furniture'
import { View,Image,ImageBackground,TouchableWithoutFeedback,Dimensions, SafeAreaView } from 'react-native';
import StyleText from '../../components/UI/StyleText';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;
const windowHeight = (fullWidth*0.3) * 415 / 622;
const deskHeight = (fullWidth*0.48) * 485 / 734;
const bookCaseHeight = (fullWidth*0.33) * 847 / 510;
const calcHeight = (fullWidth*0.27) * 296 / 431;
const fridgeHeight = (fullWidth*0.3) * 837 / 460;
const yomiHeight = (fullWidth*0.32) * 767 / 489;

const halfPosition = (fullHeight*0.5);

export default ({navigation,route})=>{
    const dispatch = useDispatch();
    const furniture = useSelector(state => state.furniture.furnitures);
    const coin = useSelector(state => state.auth.userInfo.coin);

    useEffect(()=>{
        dispatch(initFurnitureRequest());
    },[])

    const openModalTest=(target)=>{
        dispatch(openModal(target));
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../img/home_bg.png")} style={{width: '100%', height: '100%'}}>
                <View style={{flexDirection:"row",alignItems:'center',position: 'absolute',top:"2%",right: '5%'}}>
                    <Image source={require("../../img/common/coin.png")} style={{width: 41,height:34,marginRight:10}}/>
                    <StyleText type='bold' style={{fontSize:20}}>{coin}</StyleText>
                </View>
                {
                    furniture.FT05 !== '' ?
                    <TouchableWithoutFeedback onPress={()=>{navigation.navigate("BookMain")}}>
                        <ImageBackground source={{uri:img_prefix+furniture.FT05}} resizeMode="stretch" style={{position:"absolute",left:'25%',top:'8%',width:117,height:86}}>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    :
                    null
                }
                {
                    furniture.FT02 !== '' && furniture.FT04 !== '' ?
                    <View style={{position:"absolute",position:"absolute",right:'20%',top:halfPosition-120}}>
                        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Diary")}}>
                            <ImageBackground source={{uri:img_prefix+furniture.FT04}} resizeMode="stretch" style={{width:81.25,height:37.5,zIndex:10,left:25,top:25}}>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>openModalTest("desk")}>
                            <ImageBackground source={{uri:img_prefix+furniture.FT02}} resizeMode="stretch" style={{width:130,height:102}}>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </View>
                    :
                    null
                }
                {
                    furniture.FT01 !== '' ?
                    <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Calorie")}}>
                        <ImageBackground source={{uri:img_prefix+furniture.FT01}} resizeMode="stretch" style={{position:"absolute",left:'6%',top:halfPosition-130,width:92,height:168}}>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    :
                    null
                }
                {
                    furniture.FT03 !== ""?
                    <TouchableWithoutFeedback onPress={()=>openModalTest("health")}>
                        <ImageBackground source={{uri:img_prefix+furniture.FT03}} resizeMode="stretch" style={{position:"absolute",right:'3%',bottom:"10%",width:120,height:168}}>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    :
                null
                }
                <View style={{position:"absolute",left:"20%",bottom:'16%',width:'32%',height:yomiHeight,display: 'flex',flexDirection:'row',alignItems:"flex-end"}}>
                    <Image source={require("../../img/munji.png")} resizeMode="stretch" style={{width:55,height:42,marginRight:10}}/>
                    <Image source={require("../../img/yomi.png")} resizeMode="stretch" style={{width:76,height:82}}/>
                </View>
            </ImageBackground>    
        </SafeAreaView>
    )
}