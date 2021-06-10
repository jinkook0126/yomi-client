import React,{useState} from 'react';
import {TextInput,Text,View,SafeAreaView,Image,StyleSheet,TouchableOpacity, ImageBackground, FlatList,Alert} from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import send from '../../modules/send';

const api_url = "https://api.myfitnesspal.com/public/nutrition"
export default ({navigation,route})=>{
    const dispatch = useDispatch();
    const userNo = useSelector(state => state.auth.userInfo.userNo);
    const [isVisible,setIsVisible] = useState(false);
    const [extraView,setExtraView] = useState(false);
    const [searchKey,setSearchKey] = useState("");
    const [searchList,setSearchList] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true);

    const [selectList,setSelectList] = useState([]);
    const [selectCnt,setSelectCnt] = useState(0);

    const [customFoodCnt,setCustomFoodCnt] = useState(0);
    const [customFoodName,setCustomFoodName] = useState('');
    const [customFoodKcal,setCustomFoodKcal] = useState(0);

    const searchFood = async(isSearch)=>{
        try {
            if(isSearch) {
                setSearchList([]);
            }
            const foodList = [];
            const {foods} = await send.get("/contents/food/search",{params:{page:isSearch?1:page,searchKey:searchKey}});
            foods.forEach(food => {
                foodList.push({
                    id:food.item.id,
                    kcal:food.item.nutritional_contents.energy.value,
                    brand:food.item.brand_name,
                    desc:food.item.description,
                    cnt:0
                })
            });
            setPage(page+1)
            setSearchList(isSearch ? foodList : searchList.concat(foodList));
        } catch(error) {
            alert(error.response.data.message);
        }
    }

    const handleCount = (mode,id)=>{
        const foodList = [];
        let selectFood = {};
        searchList.findIndex(food =>{
            if(food.id === id) {
                selectFood = food;
                if(mode === 'plus') {
                    if(food.cnt === 0) setSelectCnt(selectCnt+1);
                    food.cnt = food.cnt +1;
                } else {
                    if(food.cnt === 1) setSelectCnt(selectCnt-1);
                    food.cnt = food.cnt !== 0 ? food.cnt -1 : food.cnt
                }
            }
            foodList.push(food)
        });
        setSearchList(foodList);
        handleSelectList(selectFood,mode);
    }

    const handleSelectList = (_food,_mode) => {
        const selectfoodList = [];
        let flag = true;
        selectList.map((food,idx) => {
            if(food.id === _food.id) {
                flag = !flag;
                if(_mode === 'plus') {
                    food.cnt = food.cnt +1;
                } else {
                    food.cnt = food.cnt !== 0 ? food.cnt -1 : food.cnt;
                }
            }
            selectfoodList.push(food);
        })
        if(flag) {
            selectfoodList.push({..._food,...{cnt:1}})
        }
        setSelectList(selectfoodList);
    }

    const handleReachEnd = ()=>{
        if (!loading) {
            searchFood();
            setLoading(true);
        }
    }

    const customFoodCntHandler = mode =>{
        if( mode === 'plus') {
            setCustomFoodCnt(customFoodCnt + 1);
        } else {
            if (customFoodCnt !== 0) setCustomFoodCnt(customFoodCnt - 1);
        }
    }

    const renderTitle = (type) =>{
        switch (type) {
            case "M01":
                return "아침식사";
            case "M02":
                return "점심식사";
            case "M03":
                return "저녁식사";
            case "M04":
                return "야식";
            case "M05":
              return "간식";
        }
    }

    const handleSave = async() => {
        try {
            const {success} = await send.post("/contents/food",
                {...selectList,...{}});
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

    const renderItem = ({item})=>{
        return (
            <View style={{paddingVertical:16,paddingHorizontal:20,flexDirection:"row",alignContent:'center',justifyContent:"space-between",flex:1}}>
                <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
                    <Text style={[styles.commonColor,{fontSize:12}]}>{item.desc}</Text>
                    <Text style={[styles.commonColor,{fontSize:9,marginLeft:10}]}>({item.brand})</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',flex:1,justifyContent:"flex-end"}}>
                    <TouchableOpacity onPress={()=>{handleCount('plus',item.id)}}>
                        <View style={{width:14,height:14}}>
                            <Image source={require("../../img/ico_plus.png")}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginHorizontal:5,width:32,height:28,backgroundColor:'#EEEEEE',justifyContent:"center",alignItems:"center"}}>
                        <Text style={[styles.commonColor,{fontSize:15}]}>{item.cnt}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{handleCount('minus',item.id)}}>
                        <View style={{width:14,height:14}}>
                            <Image source={require("../../img/ico_minus.png")}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                            <Image source={require('../../img/ico_back.png')}  />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>{renderTitle(route.params.type)}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end",paddingRight:26}}>
                    <Text style={[styles.commonColor,{fontSize:'bold',fontSize:14}]}>{selectCnt}</Text>
                    <TouchableOpacity onPress={()=>{
                        setIsVisible(true)
                    }}>
                        <View style={{height:50,width:20,justifyContent:'center',alignItems:"flex-end",marginLeft:6}}>
                            <Image source={require('../../img/ico_food.png')}  />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,paddingHorizontal:26,paddingVertical:16,justifyContent:'space-between'}}>
                <View>
                    <View style={{borderWidth:1,borderColor:'#EEEEEE',borderRadius:2,height:36,backgroundColor:"#FFFFFF",flexDirection:"row",justifyContent:"space-between",alignItems:'center',paddingHorizontal:12}}>
                        <TextInput
                            onChangeText={(value)=>{setSearchKey(value)}}
                            style={{flex:1,padding:0,height:30}}
                        />
                        <TouchableOpacity onPress={()=>searchFood(true)}>
                            <Image source={require("../../img/ico_search.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,borderWidth:1,borderColor:'#EEEEEE',borderRadius:2,height:300}}>
                        <FlatList
                            data={searchList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => String(index)}
                            onEndReached={handleReachEnd}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { setLoading(false); }}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>setExtraView(!extraView)}>
                        <View style={{marginTop:16,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <Text>직접입력</Text>
                            {
                                extraView? 
                                    <Image source={require("../../img/ico_minus.png")} style={{marginLeft:10}}/>
                                :
                                    <Image source={require("../../img/ico_plus.png")} style={{marginLeft:10}}/>
                            }
                        </View>        
                    </TouchableOpacity>
                    {
                        extraView? 
                            <View style={{marginTop:10}}>
                                <View style={{height:36,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10}}>
                                    <TextInput
                                        placeholder={"음식 이름"}
                                        style={{padding:0,height:36,flex:1}}
                                        onChangeText={text=>setCustomFoodName(text)}
                                        value={customFoodName}
                                    />
                                </View>
                                <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                    <View style={{height:36,width:160,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                                        <TextInput
                                            placeholder={"열량"}
                                            style={{padding:0,height:36,flex:1}}
                                            keyboardType={"numeric"}
                                            onChangeText={(kcal)=>setCustomFoodKcal(kcal)}
                                            value={String(Number(customFoodKcal))}
                                        />
                                        <Text style={[styles.commonColor,{fontSize:"bold",fontSize:14,marginLeft:5}]}>Kcal</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:"center"}}>
                                        <View style={{marginRight:10,justifyContent:"space-between",alignItems:'center',flexDirection:"row"}}>
                                            <TouchableOpacity onPress={()=>customFoodCntHandler('minus')}>
                                                <Image source={require("../../img/ico_minus.png")}/>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:'#EEEEEE',height:29,width:34,marginHorizontal:6,justifyContent:"center",alignItems:'center'}}>
                                                <Text style={[styles.commonColor,{fontSize:15,fontWeight:'bold'}]}>{customFoodCnt}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>customFoodCntHandler('plus')}>
                                                <Image source={require("../../img/ico_plus.png")}/>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={()=>{
                                            setSelectList(selectList.concat({"cnt": customFoodCnt, "desc": customFoodName, "id": `${userNo}_${new Date().getTime()}`, "kcal": customFoodKcal}))
                                            setSelectCnt(selectCnt+1);
                                            setCustomFoodCnt(0);
                                            setCustomFoodKcal(0);
                                            setCustomFoodName("");
                                        }}>
                                            <View style={{height:36,width:54,backgroundColor:"#8C6C51",justifyContent:'center',alignItems:'center',borderRadius:2}}>
                                                <Text style={{color:"#FFFFFF",fontWeight:'bold',fontSize:14}}>추가</Text>            
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        :
                            null
                    }
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <View style={{backgroundColor:"#8C6C51",height:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:"#FFFFFF",fontWeight:'bold',fontSize:14}}>저장</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal 
                useNativeDriver
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={isVisible}
                hideModalContentWhileAnimating={true}
                onBackdropPress={()=>{setIsVisible(false)}}
                style={{justifyContent:'flex-start',marginTop:30}}
            >
                <ImageBackground resizeMode={"stretch"} source={require('../../img/bg_cal_popup.png')} style={{height:240}}>
                    <View style={{height:168,marginTop:26,paddingHorizontal:21}}>
                        {
                            selectList.map((item,index)=>{
                                return (
                                    <View key={index} style={{marginTop:10,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
                                        <View style={{flexDirection:"row",alignItems:'center',flex:1}}>
                                            <TouchableOpacity onPress={()=>{
                                                setSelectList(selectList.filter(food => food.id !== item.id));
                                                setSearchList(searchList.map(food=> food.id === item.id ? ({...item,...{cnt:0}}) : food));
                                                setSelectCnt(selectCnt-1)
                                            }}>
                                                <Image source={require("../../img/ico_close.png")}/>
                                            </TouchableOpacity>
                                            <Text style={{marginLeft:20 }}>{item.desc}</Text>
                                        </View>
                                        <View style={{flex:1,alignItems:"center"}}>
                                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>{`${item.kcal}Kcal`}</Text>
                                        </View>
                                        <View style={{flexDirection:"row",alignItems:'center',flex:1,justifyContent:"flex-end"}}>
                                            <TouchableOpacity onPress={()=>{
                                                setSearchList(searchList.map(food=> food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)-1}}) : food));
                                                if(item.cnt === 1) {
                                                    setSelectList(selectList.filter(food => food.id !== item.id));
                                                    setSelectCnt(cnt -1);
                                                } else {
                                                    setSelectList(selectList.map(food => food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)-1}}) : food ));

                                                }
                                            }}>
                                                <Image source={require("../../img/ico_minus.png")}/>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:"#EEEEEE",width:20,height:20,marginHorizontal:6,justifyContent:'center',alignItems:'center'}}>
                                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>{item.cnt}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{
                                                setSelectList(selectList.map(food => food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)+1}}) : food ));
                                                setSearchList(searchList.map(food=> food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)+1}}) : food));
                                            }}>
                                                <Image source={require("../../img/ico_plus.png")}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ImageBackground>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
    foodHeaderWrap:{
        borderRadius:2,
        borderColor:"#EEEEEE",
        overflow:"hidden",
        borderWidth:1
    },
    foodHeader:{
        height:36,
        backgroundColor:"#C7B6A0",
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