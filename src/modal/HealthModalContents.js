import React,{useState,useEffect} from 'react';
import { TextInput,Text,View,Image,StyleSheet,TouchableOpacity,FlatList,Alert,ImageBackground } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';

export default ()=>{
    const dispatch = useDispatch();
    const [extraView,setExtraView] = useState(false);
    const [lists,setLists] = useState([]);
    const [expl,setExpl] = useState("");
    const [min,setMin] = useState("");
    const [hours,setHours] = useState("");
    const [totalHours,setTotalHours] = useState(0);
    const [totalMin,setTotalMin] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [edit,setEdit] = useState(false);
    const pickerList = ["걷기","러닝","헬스장","요가","필라테스","홈트레이닝","직접입력"]
    const [contentsIdx,setContentsIdx] = useState("");
    const [bgHeight,setBgHeight] = useState(360);

    useEffect(()=>{
        const initDesk = async()=>{
            const {success,LISTS : lists,IDX} = await send.get("/contents/workout");
            if(success && lists.length !== 0) {
                setContentsIdx(IDX);
                const fromList = [];
                let fromHour = 0;
                let fromMin = 0;
                lists.forEach(item => {
                    fromList.push({
                        expl:item.expl,
                        hours:item.hours,
                        min:item.min
                    });
                    fromHour += parseInt(item.hours);
                    fromMin += parseInt(item.min);
                    if(fromMin>=60) {
                        fromHour += 1;
                        fromMin -= 60;
                    }
                });
                setLists(fromList);
                setTotalHours(fromHour);
                setTotalMin(fromMin);
            }
        }
        initDesk();
    },[])

    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=async()=>{
        let flag = false;
        const update = contentsIdx !== "";
        if(!update) { // 신규
            const {success} = await send.post("/contents/workout",{list:lists});
            flag = success;
        } else if(!update && lists.length === 0) { //에러
            Alert.alert("알림","목록을 입력해주세요.",[{text:'확인'}]);
        } else if(update && lists.length === 0) { //삭제
            const {success} = await send.delete("/contents/workout",{params:{idx:contentsIdx}});
            flag = success;
        } else if(update && lists.length !== 0) { //수정
            const {success} = await send.put("/contents/workout",{list:lists,idx:contentsIdx});
            flag = success;
        }
        if(flag) {
            Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>dispatch(closeModal())}])
        }
    }
    const addList = ()=>{
        calcTotalHousrs();

        setLists(lists.concat([
            {
                expl:edit?expl:pickerList[selectedValue],
                hours:hours,
                min:min
            }
        ]))
        setExpl("")
        setHours("")
        setMin("")
    }
    const calcTotalHousrs = ()=>{
        let calcMin = Number(totalMin)+Number(min);
        let calcHours = Number(totalHours)+Number(hours);
        if(calcMin>60) {
            calcHours += 1;
            calcMin -=60;
        }
        setTotalHours(calcHours);
        setTotalMin(calcMin);
    }
    const removeItem = (idx)=>{
        let calcMin = totalMin-parseInt(lists[idx].min);
        let calcHours = totalHours-parseInt(lists[idx].hours);

        if(calcMin < 0) {
            calcMin +=60;
            calcHours -= 1;
        }
        setTotalHours(calcHours);
        setTotalMin(calcMin);
        setLists(lists.filter((item,index)=>index !== idx));
    }
    const renderItem=({item,index})=>{
        return (
            <View style={{padding:4,flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
                <Text style={[styles.commonColor,{fontWeight:'bold'}]}>{item.expl}</Text>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end"}}>
                    <Text style={[styles.commonColor,{fontWeight:'bold'}]}>{`${item.hours} 시간 ${item.min} 분`}</Text>
                    <TouchableOpacity onPress={()=>removeItem(index)}>
                        <Image source={require('../img/ico_close.png')} style={{marginLeft:10}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const handlePicker=(value,idx)=>{
        setSelectedValue(idx)
        if (idx === 6) setEdit(true);
        else setEdit(false);
    }

    return (
        <ImageBackground resizeMode={'stretch'} source={require('../img/modal_bg.png')} style={{width:320,height:bgHeight,padding:16}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.commonColor,{fontSize:16,fontWeight:'bold'}]}>운동기구</Text>
            </View>
            <View style={{marginTop:26}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                    <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>오늘 나의 운동</Text>
                    <Text style={[styles.commonColor,{fontSize:11,fontWeight:'bold'}]}>{`Total ${totalHours}시간 ${totalMin}분`}</Text>
                </View>
                <FlatList
                    data={lists}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    style={{marginTop:26,height:70,borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}
                />
                <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
                    <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>운동 추가하기</Text>
                    <TouchableOpacity onPress={()=>{
                        extraView ? setBgHeight(418) : setBgHeight(360)
                        setExtraView(!extraView)
                    }}>
                        {
                            extraView ? 
                                <Image source={require("../img/ico_minus.png")} style={{marginLeft:8}}/>
                                :
                                <Image source={require("../img/ico_plus.png")} style={{marginLeft:8}}/>
                        }
                    </TouchableOpacity>
                </View>
                {
                    extraView ?
                    <View style={{marginTop:16}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <View style={{flex:1, borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 2}}>
                                <Picker
                                    style={{height:36}}
                                    selectedValue={selectedValue}
                                    onValueChange={handlePicker}
                                    mode="dropdown"
                                >
                                    <Picker.Item label="걷기" value={0} />
                                    <Picker.Item label="러닝" value={1} />
                                    <Picker.Item label="헬스장" value={2} />
                                    <Picker.Item label="요가" value={3} />
                                    <Picker.Item label="필라테스" value={4} />
                                    <Picker.Item label="홈트레이닝" value={5} />
                                    <Picker.Item label="직접입력" value={6} />
                                </Picker>
                            </View>
                            <View style={{width:4}}/>
                            <View style={{borderWidth:1,borderColor:'#EEEEEE',borderRadius:2,height:36,flex:1}}>
                                <TextInput
                                    editable={edit}
                                    value={expl}
                                    onChangeText={(value)=>setExpl(value)}
                                    style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0,backgroundColor:edit?"#ffffff":"#CECECE"}}
                                />
                            </View>
                        </View>
                        <View style={{marginTop:10,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                            <View style={{backgroundColor:"#EEEEEE",width:24,height:16,marginRight:8}}>
                                <TextInput value={hours} keyboardType={"number-pad"} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                            </View>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>시간</Text>

                            <View style={{backgroundColor:"#EEEEEE",width:24,height:16,marginRight:8,marginLeft:16}}>
                                <TextInput value={min} keyboardType={"number-pad"} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                            </View>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>분</Text>

                            <TouchableOpacity onPress={addList}>
                                {/* <View style={{height:30,width:60,backgroundColor:"#8C6C51",borderRadius:6,justifyContent:'center',alignItems:"center",marginLeft:20}}>
                                    <Text style={{color:"#ffffff",fontWeight:'bold'}}>추가</Text>
                                </View> */}
                                <ImageBackground source={require('../img/btn_add.png')} style={{justifyContent:'center',alignItems:"center",marginLeft:20,height:30,width:60}}>
                                    <Text style={{color:"#ffffff",fontWeight:'bold'}}>추가</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }
                <View style={{marginTop:90,flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                    <TouchableOpacity onPress={handleClose}>
                        {/* <View style={{width:134,height:40,backgroundColor:'#C7B6A0',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>취소</Text>
                        </View> */}
                        <ImageBackground source={require('../img/btn_cancel.png')} style={{justifyContent:'center',alignItems:"center",width:134,height:40}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontFamily:'Cafe24Dongdong'}}>취소</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        {/* <View style={{width:134,height:40,backgroundColor:'#8C6C51',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>저장</Text>
                        </View> */}
                        <ImageBackground source={require('../img/btn_confirm.png')} style={{justifyContent:'center',alignItems:"center",width:134,height:40}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontFamily:"Cafe24Oneprettynight"}}>저장</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    }
});