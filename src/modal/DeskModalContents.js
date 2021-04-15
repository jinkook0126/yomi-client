import React,{useState,useEffect} from 'react';
import { TextInput,Text,View,Image,StyleSheet,TouchableOpacity,FlatList,Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';

export default (props)=>{
    const dispatch = useDispatch();
    const [extraView,setExtraView] = useState(false);
    const [lists,setLists] = useState([]);
    const [expl,setExpl] = useState("");
    const [min,setMin] = useState("");
    const [hours,setHours] = useState("");
    const [totalHours,setTotalHours] = useState(0);
    const [totalMin,setTotalMin] = useState(0);
    const [contentsIdx,setContentsIdx] = useState("");

    useEffect(()=>{
        const initDesk = async()=>{
            const {success,LISTS : lists,IDX} = await send.get("/contents/desk");
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
            const {success} = await send.post("/contents/desk",{list:lists});
            flag = success;
        } else if(!update && lists.length === 0) { //에러
            Alert.alert("알림","목록을 입력해주세요.",[{text:'확인'}]);
        } else if(update && lists.length === 0) { //삭제
            const {success} = await send.delete("/contents/desk",{params:{idx:contentsIdx}});
            flag = success;
        } else if(update && lists.length !== 0) { //수정
            const {success} = await send.put("/contents/desk",{list:lists,idx:contentsIdx});
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
                expl:expl,
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
    
    return (
        <View style={{width:320,padding:16,backgroundColor:'white',borderRadius:8}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.commonColor,{fontSize:16,fontWeight:'bold'}]}>책상</Text>
            </View>
            <View style={{marginTop:26}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                    <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>오늘 나의 공부</Text>
                    <Text style={[styles.commonColor,{fontSize:11,fontWeight:'bold'}]}>{`Total ${totalHours}시간 ${totalMin}분`}</Text>
                </View>
                <FlatList
                    data={lists}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    style={{marginTop:26,height:70,borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}
                />
                <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
                    <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>공부 추가하기</Text>
                    <TouchableOpacity onPress={()=>setExtraView(!extraView)}>
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
                        <View style={{borderWidth:1,borderColor:'#EEEEEE',borderRadius:2,height:36}}>
                            <TextInput
                                value={expl}
                                onChangeText={(value)=>setExpl(value)}
                                style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0}}
                                placeholder={"내가 한 공부를 입력해주세요."} />
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
                                <View style={{height:30,width:60,backgroundColor:"#8C6C51",borderRadius:6,justifyContent:'center',alignItems:"center",marginLeft:20}}>
                                    <Text style={{color:"#ffffff",fontWeight:'bold'}}>추가</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }
                <View style={{marginTop:90,flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                    <TouchableOpacity onPress={handleClose}>
                        <View style={{width:134,height:40,backgroundColor:'#C7B6A0',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>취소</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        <View style={{width:134,height:40,backgroundColor:'#8C6C51',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>저장</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    }
});