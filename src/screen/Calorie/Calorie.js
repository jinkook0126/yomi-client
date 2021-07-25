import React,{useState,useEffect} from 'react';
import { View,SafeAreaView,Image,StyleSheet,TouchableOpacity,ScrollView,ImageBackground } from 'react-native'
import send from '../../modules/send';
import Modal from 'react-native-modal';
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../../components/UI/StyleInput';
import { validNumber } from '../../modules/common';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

export default ({navigation,route})=>{
    const [visible,setVisible] = useState(false);
    const snackbar = useSnackbarContext();
    const [foods,setFoods] = useState({});
    const [goalKcal,setGoalKcal] = useState(0);
    const [intakeKcal,setIntakeKcal] = useState(0);
    const [changeKcal,setChangeKcal] = useState('');
    const [modalMsg,setModalMsg] = useState("");
    const navigateInfo = (type,lists)=>{
        navigation.navigate('CalorieSearch',{
            type:type,
            lists:lists,
            date:route.params?route.params.date:null
        })
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async() => {
            const {lists,intake,goal} = await send.get("/contents/food",{params:{date:route.params?route.params.date:null}});
            setFoods(lists);
            setIntakeKcal(intake);
            setGoalKcal(goal);
        });
        return unsubscribe;
    },[navigation]);

    const renderFood = (food) => {
        return (
            <View style={styles.foodItemWrap} key={food.id}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <StyleText style={{fontSize:17}}>{food.desc}</StyleText>
                    <StyleText style={{fontSize:17,marginLeft:12,color:"#757575"}}>{food.cnt}</StyleText>
                </View>
                <StyleText style={{fontSize:17}}>{`${Number(food.kcal)*Number(food.cnt)} kcal`}</StyleText>
            </View>
        )
    };

    const onSaveKcal = async() => {
        if(changeKcal === '') {
            setModalMsg("목표 칼로리를 작성해주세요.");
            return;
        }
        if(!validNumber(changeKcal)) {
            setModalMsg("숫자만 입력가능합니다.");
            return;
        }
        const {success} = await send.put("/info/kcal",{goal:changeKcal});
        if(success) {
            setVisible(false);
            setGoalKcal(changeKcal);
            setChangeKcal("");
            setModalMsg("");
            snackbar.show({text:"목표 칼로리가 변경되었습니다."});
        }
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <StyleText style={{fontSize:20,paddingLeft:50}} type='bold'>냉장고</StyleText>
                <TouchableOpacity style={{position: 'absolute',height:50,width:50,justifyContent:'center',alignItems:"center"}} onPress={()=>{
                    if(route.params && route.params.onGoBack) {
                        route.params.onGoBack();
                    }
                    navigation.goBack();
                }}>
                    <Image source={require('../../img/common/ico_back.png')}  />
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:16,paddingHorizontal:26,flex:1}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",paddingBottom:17}}>
                    <StyleText style={{fontSize:18}} type='bold'>목표 칼로리</StyleText>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <StyleText style={{fontSize:18}}>{`${intakeKcal?intakeKcal:0}/${goalKcal} kcal`}</StyleText>
                        {
                            !route.params? 
                            (
                                <TouchableOpacity onPress={()=>setVisible(true)} style={{justifyContent:'center',alignItems:'center',width: 25,height:25}}>
                                    <Image source={require("../../img/common/ico_edit.png")}/>
                                </TouchableOpacity>
                            ) :
                            null
                        }
                        
                    </View>
                </View>
                <ImageBackground source={require("../../img/common/dash2.png")} style={{width:'100%',height:4}} resizeMode={'stretch'}/>
                <ScrollView style={{marginTop:22,flex:1}}>
                    <StyleText style={{fontSize:18}}>오늘 먹은 음식</StyleText>
                    <View style={{marginTop:15}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} resizeMode={'stretch'} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>아침</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M01",foods["M01"])} >
                                <View style={styles.foodNext}>
                                    <Image source={require("../../img/common/ico_forward.png")}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        {
                            foods["M01"] ? foods["M01"].map((item)=>renderFood(item)) : null
                        }
                    </View>
                    <View style={{marginTop:10}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} resizeMode={'stretch'} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>점심</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M02",foods["M02"])} >
                                <View style={styles.foodNext}>
                                    <Image source={require("../../img/common/ico_forward.png")}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        {
                            foods["M02"] ? foods["M02"].map((item)=>renderFood(item)) : null
                        }
                    </View>
                    <View style={{marginTop:10}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} resizeMode={'stretch'} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>저녁</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M03",foods["M03"])}  >
                                <View style={styles.foodNext}>
                                    <Image source={require("../../img/common/ico_forward.png")}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        {
                            foods["M03"] ? foods["M03"].map((item)=>renderFood(item)) : null
                        }
                    </View>
                    <View style={{marginTop:10}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} resizeMode={'stretch'} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>야식</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M04",foods["M04"])} >
                                <View style={styles.foodNext}>
                                    <Image source={require("../../img/common/ico_forward.png")}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        {
                            foods["M04"] ? foods["M04"].map((item)=>renderFood(item)) : null
                        }
                    </View>
                    <View style={{marginTop:10}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} resizeMode={'stretch'} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>간식</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M05",foods["M05"])} >
                                <View style={styles.foodNext}>
                                    <Image source={require("../../img/common/ico_forward.png")}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        {
                            foods["M05"] ? foods["M05"].map((item)=>renderFood(item)) : null
                        }
                    </View>
                </ScrollView>
            </View>
            <Modal useNativeDriver isVisible={visible} onBackButtonPress={()=>setVisible(false)}>
                <View style={{backgroundColor:"white",padding:16}}>
                    <ImageBackground source={require("../../img/calorie/search_border.png")} resizeMode={'stretch'} style={{width:"100%"}}>
                        <StyleInput style={{paddingHorizontal:12}} placeholder={"목표 칼로리를 입력해주세요."} keyboardType={"numeric"} onChangeText={(text)=>setChangeKcal(text)}/>
                    </ImageBackground>
                    <StyleText style={{fontSize:14,marginTop:8,color:"#FA7373"}} type='bold'>{modalMsg}</StyleText>
                    <View style={{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={()=>{
                            setVisible(false);
                            setChangeKcal("");
                            setModalMsg("");
                        }} style={{flex:1}}>
                            <ImageBackground style={{width:'100%',height:50,justifyContent:'center',alignItems:"center"}}
                                source={require('../../img/common_modal/modal_cancel.png')} resizeMode={'stretch'}>
                                <StyleText style={styles.btnText} type='bold'>취소</StyleText>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSaveKcal} style={{flex:1}}>
                            <ImageBackground source={require('../../img/common_modal/modal_confirm.png')} resizeMode={'stretch'}
                                style={{width:'100%',height:50,justifyContent:'center',alignItems:"center"}}>
                                <StyleText style={styles.btnText} type='bold'>저장</StyleText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    foodHeaderText: {
        fontSize:16,paddingLeft:12
    },
    btnText:{
        fontSize:20,
        color:"#ffffff"
    },
    foodHeaderWrap:{
        borderRadius:2,
        borderColor:"#EEEEEE",
        overflow:"hidden",
        borderWidth:1
    },
    foodHeader:{
        height:50,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
    },
    foodNext:{
        height:36,
        width:36,
        justifyContent:"center",
        paddingRight:12,
        alignItems:"flex-end"
    },
    foodItemWrap:{
        paddingHorizontal:12,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:'#FFFFFF'
    },
    modalContents:{
        backgroundColor:'#FFFBE9',
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:26
    }
});