import React,{useState,useEffect} from 'react';
import { View,SafeAreaView,Image,TouchableOpacity, ImageBackground, FlatList,Alert } from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import send from '../../modules/send';
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../../components/UI/StyleInput';

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

    useEffect(()=>{
        if(route.params.lists) {
            setSelectList(route.params.lists);
            setSelectCnt(route.params.lists.length);
        }
    },[])

    const searchFood = async(isSearch)=>{
        try {
            if(isSearch) {
                setSearchList([]);
            }
            const foodList = [];
            const {foods} = await send.get("/contents/food/search",{params:{page:isSearch?1:page,searchKey:searchKey}});
            foods.forEach(food => {
                let filter = {
                    id:food.item.id,
                    kcal:food.item.nutritional_contents.energy.value,
                    brand:food.item.brand_name,
                    desc:food.item.description,
                    cnt:0
                };
                selectList.forEach(select => {
                    if(select.id === food.item.id) {
                        filter.cnt = select.cnt;
                    }
                });
                foodList.push(filter)
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
        if(selectList.length !== 0) {
            try {
                const {success} = await send.post("/contents/food",{foods:{[route.params.type]:selectList},date:route.params.date||null});
                if(success) {
                    Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                        navigation.goBack();
                    }}])
                }
            } catch(error){
                alert(error.response.data.message);
            }
        } else {
            alert("음식을 선택해주세요.")
        }
    }

    const renderItem = ({item})=>{
        return (
            <View style={{paddingVertical:16,paddingHorizontal:20,flexDirection:"row",alignContent:'center',justifyContent:"space-between",flex:1}}>
                <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
                    <StyleText style={{fontSize:12}}>{item.desc}</StyleText>
                    <StyleText style={{fontSize:9,marginLeft:10}}>({item.brand})</StyleText>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',flex:1,justifyContent:"flex-end"}}>
                    <TouchableOpacity onPress={()=>{handleCount('plus',item.id)}}>
                        <View style={{width:14,height:14}}>
                            <Image source={require("../../img/common/ico_plus.png")}/>
                        </View>
                    </TouchableOpacity>
                    <ImageBackground source={require("../../img/calorie/input_bg.png")} style={{marginHorizontal:5,width:38,height:29,justifyContent:"center",alignItems:"center"}}>
                        <StyleText style={{fontSize:15}}>{item.cnt}</StyleText>
                    </ImageBackground>
                    <TouchableOpacity onPress={()=>{handleCount('minus',item.id)}}>
                        <View style={{width:14,height:14}}>
                            <Image source={require("../../img/common/ico_minus.png")}/>
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
                            <Image source={require('../../img/common/ico_back.png')}  />
                        </View>
                    </TouchableOpacity>
                    <StyleText style={{paddingLeft:20,fontSize:16}}>{renderTitle(route.params.type)}</StyleText>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end",paddingRight:26}}>
                    <StyleText>{selectCnt}</StyleText>
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
                    <ImageBackground source={require("../../img/calorie/search_border.png")} resizeMode={'stretch'} style={{height:39,backgroundColor:"#FFFFFF",flexDirection:"row",justifyContent:"space-between",alignItems:'center',paddingHorizontal:12}}>
                        <StyleInput
                            onChangeText={(value)=>{setSearchKey(value)}}
                            style={{flex:1,padding:0,height:30}}
                        />
                        <TouchableOpacity onPress={()=>searchFood(true)}>
                            <Image source={require("../../img/common/ico_search.png")}/>
                        </TouchableOpacity>
                    </ImageBackground>
                    <ImageBackground resizeMode={'stretch'} source={require("../../img/calorie/contents_border.png")} style={{marginTop:10,borderRadius:2,height:321}}>
                        <FlatList
                            data={searchList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => String(index)}
                            onEndReached={handleReachEnd}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { setLoading(false); }}
                        />
                    </ImageBackground>
                    <TouchableOpacity onPress={()=>setExtraView(!extraView)}>
                        <View style={{marginTop:16,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <StyleText>직접입력</StyleText>
                            {
                                extraView? 
                                    <Image source={require("../../img/common/ico_minus.png")} style={{marginLeft:10}}/>
                                :
                                    <Image source={require("../../img/common/ico_plus.png")} style={{marginLeft:10}}/>
                            }
                        </View>        
                    </TouchableOpacity>
                    {
                        extraView? 
                            <View style={{marginTop:10}}>
                                <View style={{height:36,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10}}>
                                    <StyleInput
                                        placeholder={"음식 이름"}
                                        style={{padding:0,height:36,flex:1}}
                                        onChangeText={text=>setCustomFoodName(text)}
                                        value={customFoodName}
                                    />
                                </View>
                                <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                    <View style={{height:36,width:160,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                                        <StyleInput
                                            placeholder={"열량"}
                                            style={{padding:0,height:36,flex:1}}
                                            keyboardType={"numeric"}
                                            onChangeText={(kcal)=>setCustomFoodKcal(kcal)}
                                            value={String(Number(customFoodKcal))}
                                        />
                                        <StyleText style={{marginLeft:5}}>Kcal</StyleText>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:"center"}}>
                                        <View style={{marginRight:10,justifyContent:"space-between",alignItems:'center',flexDirection:"row"}}>
                                            <TouchableOpacity onPress={()=>customFoodCntHandler('minus')}>
                                                <Image source={require("../../img/common/ico_minus.png")}/>
                                            </TouchableOpacity>
                                            <ImageBackground source={require("../../img/calorie/input_bg.png")} style={{height:29,width:38,marginHorizontal:6,justifyContent:"center",alignItems:'center'}}>
                                                <StyleText style={{fontSize:15}}>{customFoodCnt}</StyleText>
                                            </ImageBackground>
                                            <TouchableOpacity onPress={()=>customFoodCntHandler('plus')}>
                                                <Image source={require("../../img/common/ico_plus.png")}/>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={()=>{
                                            if(customFoodName === '') {
                                                alert('음식 이름을 입력해주세요.')
                                                return;
                                            }
                                            if (customFoodCnt === 0) {
                                                alert('1 이상의 수량을 입력해주세요.')
                                                return;
                                            }
                                            setSelectList(selectList.concat({"cnt": customFoodCnt, "desc": customFoodName, "id": `${userNo}_${new Date().getTime()}`, "kcal": customFoodKcal}))
                                            setSelectCnt(selectCnt+1);
                                            setCustomFoodCnt(0);
                                            setCustomFoodKcal(0);
                                            setCustomFoodName("");
                                        }}>
                                            <ImageBackground source={require('../../img/common_modal/modal_add.png')} style={{height:36,width:64,justifyContent:'center',alignItems:'center'}}>
                                                <StyleText style={{color:"#FFFFFF"}}>추가</StyleText>            
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        :
                            null
                    }
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <ImageBackground source={require('../../img/common/long_btn.png')} resizeMode='stretch' style={{height:40,justifyContent:'center',alignItems:'center'}}>
                        <StyleText style={{color:"#FFFFFF"}}>저장</StyleText>
                    </ImageBackground>
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
                <ImageBackground resizeMode={"stretch"} source={require('../../img/calorie/modal_bg.png')} style={{height:240}}>
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
                                                <Image source={require("../../img/common/ico_remove.png")}/>
                                            </TouchableOpacity>
                                            <StyleText style={{marginLeft:20 }}>{item.desc}</StyleText>
                                        </View>
                                        <View style={{flex:1,alignItems:"center"}}>
                                            <StyleText>{`${item.kcal}Kcal`}</StyleText>
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
                                                <Image source={require("../../img/common/ico_minus.png")}/>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:"#EEEEEE",width:20,height:20,marginHorizontal:6,justifyContent:'center',alignItems:'center'}}>
                                                <StyleText style={{fontSize:15}}>{item.cnt}</StyleText>
                                            </View>
                                            <TouchableOpacity onPress={()=>{
                                                setSelectList(selectList.map(food => food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)+1}}) : food ));
                                                setSearchList(searchList.map(food=> food.id === item.id ? ({...food,...{cnt:parseInt(food.cnt)+1}}) : food));
                                            }}>
                                                <Image source={require("../../img/common/ico_plus.png")}/>
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