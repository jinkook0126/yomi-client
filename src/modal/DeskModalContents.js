import React,{useState,useEffect} from 'react';
import { View,Image,TouchableOpacity,FlatList,Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';

export default (props)=>{
    const dispatch = useDispatch();
    const params = useSelector(state=> state.modal.params);
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
            const {success,LISTS : lists,IDX} = await send.get("/contents/desk",{params:{date:params.date || null}});
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
            const {success} = await send.post("/contents/desk",{list:lists,date:params.date || null});
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
        let mm = min !== "" ? parseInt(min%60) : 0;
        let hh = hours !== "" ? parseInt(hours) + parseInt(min/60) : 0;
        if(mm !== '' && mm >=60) {
            hh += parseInt(min/60)
        }

        setLists(lists.concat([
            {
                expl:expl,
                hours:hh,
                min:mm
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
                <StyleText>{item.expl}</StyleText>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end"}}>
                    <StyleText>{`${item.hours} 시간 ${item.min} 분`}</StyleText>
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
                <StyleText style={{fontSize:16}}>책상</StyleText>
            </View>
            <View style={{marginTop:26}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                    <StyleText>오늘 나의 공부</StyleText>
                    <StyleText style={{fontSize:11}}>{`Total ${totalHours}시간 ${totalMin}분`}</StyleText>
                </View>
                <FlatList
                    data={lists}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    style={{marginTop:26,height:70,borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}
                />
                <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
                    <StyleText>공부 추가하기</StyleText>
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
                            <StyleInput
                                value={expl}
                                onChangeText={(value)=>setExpl(value)}
                                style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0}}
                                placeholder={"내가 한 공부를 입력해주세요."} />
                        </View>
                        <View style={{marginTop:10,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                            <View style={{backgroundColor:"#EEEEEE",width:24,height:16,marginRight:8}}>
                                <StyleInput value={hours} keyboardType={"number-pad"} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                            </View>
                            <StyleText>시간</StyleText>

                            <View style={{backgroundColor:"#EEEEEE",width:24,height:16,marginRight:8,marginLeft:16}}>
                                <StyleInput value={min} keyboardType={"number-pad"} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                            </View>
                            <StyleText>분</StyleText>

                            <TouchableOpacity onPress={addList}>
                                <View style={{height:30,width:60,backgroundColor:"#8C6C51",borderRadius:6,justifyContent:'center',alignItems:"center",marginLeft:20}}>
                                    <StyleText style={{color:"#ffffff"}}>추가</StyleText>
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