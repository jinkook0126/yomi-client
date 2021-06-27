import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {openModal} from '../../reducers/modal';
import {initFurnitureRequest} from '../../reducers/furniture'
import { View,Image,ImageBackground,StyleSheet,TouchableWithoutFeedback,Dimensions } from 'react-native';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    wrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    window:{
        width:"100%",
        height:"100%"
    }
});
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

    useEffect(()=>{
        dispatch(initFurnitureRequest());
    },[])

    const openModalTest=(target)=>{
        dispatch(openModal(target));
    }
    return (
        <ImageBackground source={require("../../img/home_bg.png")} style={{width: '100%', height: '100%'}}>
            <TouchableWithoutFeedback onPress={()=>openModalTest("health")}>
                <View style={{position:"absolute",right:20,top:20,width:'30%',height:windowHeight}}>
                    {furniture.FT03 !== '' ? 
                    <Image source={{uri:img_prefix+furniture.FT03}} style={styles.window}/>:null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>openModalTest("desk")}>
                <View style={{position:"absolute",right:0,top: halfPosition-deskHeight,width:'48%',height:deskHeight}}>
                    
                    {furniture.FT02 !== '' ? <Image source={{uri:img_prefix+furniture.FT02}} style={styles.window}/> : null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Diary")}}>
                <View style={{position:"absolute",right:20,top:(halfPosition-deskHeight)-(calcHeight/2)-10,width:'27%',height:calcHeight}}>
                    {furniture.FT04 !== '' ? <Image source={{uri:img_prefix+furniture.FT04}} style={styles.window}/> : null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("BookMain")}}>
                <View style={{position:"absolute",right:'48%',top:halfPosition-bookCaseHeight,width:'33%',height:bookCaseHeight}}>
                    {furniture.FT05 !== '' ? <Image source={{uri:img_prefix+furniture.FT05}} style={styles.window}/> : null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Calorie")}}>
                <View style={{position:"absolute",left:0,top:halfPosition-(fridgeHeight/2),width:'30%',height:fridgeHeight}}>
                    {furniture.FT01 !== '' ? <Image source={{uri:img_prefix+furniture.FT01}} style={styles.window}/> : null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("yomi")}}>
                <View style={{position:"absolute",right:80,bottom:'10%',width:'32%',height:yomiHeight}}>
                    <Image source={require("../../img/yomi.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={()=>{alert("window!")}}>
                <View style={{position:"absolute",right:20,top:20,width:150,height:100}}>
                    <Image source={require("../img/window.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("desk")}}>
                <View style={{position:"absolute",right:0,top:200,width:182,height:120}}>
                    <Image source={require("../img/desk.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("bookcase")}}>
                <View style={{position:"absolute",right:182,top:104,width:130,height:216}}>
                    <Image source={require("../img/bookcase.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("calc")}}>
                <View style={{position:"absolute",right:20,top:200-40,width:91,height:62}}>
                    <Image source={require("../img/calc.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("fridge")}}>
                <View style={{position:"absolute",left:0,top:200,width:120,height:218}}>
                    <Image source={require("../img/fridge.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{alert("yomi")}}>
                <View style={{position:"absolute",right:80,top:'50%',width:120,height:188}}>
                    <Image source={require("../img/yomi.png")} style={styles.window}/>
                </View>
            </TouchableWithoutFeedback> */}
        </ImageBackground>
    )
}