import React,{useState,useEffect} from 'react';
import { View,SafeAreaView,Image,StyleSheet,TouchableOpacity,ScrollView,ImageBackground } from 'react-native'
import send from '../../modules/send';
import Modal from 'react-native-modal';
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../../components/UI/StyleInput';

export default ({navigation,route})=>{
    const [visible,setVisible] = useState(false);
    const [foods,setFoods] = useState({});
    const [goalKcal,setGoalKcal] = useState(0);
    const [intakeKcal,setIntakeKcal] = useState(0);
    const [changeKcal,setChangeKcal] = useState('');
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
                    <StyleText style={{fontSize:12}}>{food.desc}</StyleText>
                    <StyleText style={{fontSize:12,marginLeft:12,color:"#757575"}}>{food.cnt}</StyleText>
                </View>
                <StyleText style={{fontSize:14}}>{`${Number(food.kcal)*Number(food.cnt)} kcal`}</StyleText>
            </View>
        )
    };

    const onSaveKcal = async() => {
        const {success} = await send.put("/info/kcal",{goal:changeKcal});
        if(success) {
            alert("저장되었습니다.");
            setVisible(false);
            setGoalKcal(changeKcal);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/common/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <StyleText style={{paddingLeft:20,fontSize:16}}>냉장고</StyleText>
            </View>
            <View style={{paddingVertical:16,paddingHorizontal:26,flex:1}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",paddingBottom:17}}>
                    <StyleText style={{fontSize:15}}>목표 칼로리</StyleText>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <StyleText style={{fontSize:15}}>{`${intakeKcal?intakeKcal:0}/${goalKcal} kcal`}</StyleText>
                        {
                            !route.params? 
                            (
                                <TouchableOpacity onPress={()=>setVisible(true)}>
                                    <Image source={require("../../img/common/ico_edit.png")} style={{marginLeft:6}}/>
                                </TouchableOpacity>
                            ) :
                            null
                        }
                        
                    </View>
                </View>
                <ImageBackground source={require("../../img/common/dash2.png")} style={{width:'100%',height:4}} resizeMode={'stretch'}/>
                <ScrollView style={{marginTop:22,flex:1}}>
                    <StyleText style={{fontSize:15}}>오늘 먹은 음식</StyleText>
                    <View style={{marginTop:15}}>
                        <ImageBackground source={require('../../img/calorie/header.png')} style={styles.foodHeader}>
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
                        <ImageBackground source={require('../../img/calorie/header.png')} style={styles.foodHeader}>
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
                        <ImageBackground source={require('../../img/calorie/header.png')} style={styles.foodHeader}>
                            <StyleText style={styles.foodHeaderText}>저녁</StyleText>
                            <TouchableOpacity onPress={()=>navigateInfo("M03",foods["M03"])} >
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
                        <ImageBackground source={require('../../img/calorie/header.png')} style={styles.foodHeader}>
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
                        <ImageBackground source={require('../../img/calorie/header.png')} style={styles.foodHeader}>
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
                    <StyleInput placeholder={"목표 칼로리를 입력해주세요."} keyboardType={"numeric"} onChangeText={(text)=>setChangeKcal(text)}/>
                    <View style={{marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
                            <View style={{width:134,height:40,backgroundColor:'#C7B6A0',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                                <StyleText style={styles.btnText}>취소</StyleText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSaveKcal}>
                            <View style={{width:134,height:40,backgroundColor:'#8C6C51',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                                <StyleText style={styles.btnText}>저장</StyleText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    foodHeaderText: {
        fontSize:14,paddingLeft:12
    },
    btnText:{
        fontSize:14,color:"#ffffff"
    },
    foodHeaderWrap:{
        borderRadius:2,
        borderColor:"#EEEEEE",
        overflow:"hidden",
        borderWidth:1
    },
    foodHeader:{
        height:39,
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