import React,{useState,useEffect} from 'react';
import { View,Image,TouchableOpacity,FlatList,Alert,ImageBackground } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch,useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';
import {validNumber} from '../modules/common'

export default ()=>{
    const dispatch = useDispatch();
    const params = useSelector(state=> state.modal.params);
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
    const [bgHeight,setBgHeight] = useState(310);

    useEffect(()=>{
        const initModal = async()=>{
            const {success,LISTS : lists,IDX} = await send.get("/contents/workout",{params:{date:params.date || null}});
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
        initModal();
    },[])

    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=async()=>{
        let flag = false;
        const update = contentsIdx !== "";
        if(!update) { // 신규
            const {success} = await send.post("/contents/workout",{list:lists,date:params.date || null});
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
            Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                dispatch(closeModal());
                if(params.callback) params.callback();
            }}])
            
        }
    }
    const addList = ()=>{
        if(hours !== '' && !validNumber(hours)) {
            alert('숫자만 입력 가능합니다.');
            return;
        }
        if(min !== '' && !validNumber(min)) {
            alert('숫자만 입력 가능합니다.');
            return;
        }
        if(hours === '' && min === '') {
            alert('시간을 입력해주세요.');
            return;
        }
        if(edit && expl === '') {
            alert('내용을 입력해주세요.');
            return;
        }
        calcTotalHousrs();
        let mm = min !== "" ? parseInt(min%60) : 0;
        let hh = hours !== "" ? parseInt(hours) + parseInt(min/60) : 0;
        if(mm !== '' && mm >=60) {
            hh += parseInt(min/60);
        }

        setLists(lists.concat([
            {
                expl:edit?expl:pickerList[selectedValue],
                hours:hh,
                min:mm
            }
        ]));
        setExpl("");
        setHours("");
        setMin("");
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
                        <Image source={require('../img/common/ico_remove.png')} style={{marginLeft:10}}/>
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
        <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/common_modal/modal_bg.png')} style={{width:'90%',height:bgHeight}}>
            <View style={{padding:16}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <StyleText style={{fontSize:16}}>운동기구</StyleText>
                </View>
                <View style={{marginTop:26}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                        <StyleText>오늘 나의 운동</StyleText>
                        <StyleText style={{fontSize:11}}>{`Total ${totalHours}시간 ${totalMin}분`}</StyleText>
                    </View>
                    <FlatList
                        data={lists}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{marginTop:26,height:70}}
                    />
                    <ImageBackground source={require("../img/common/dash.png")} style={{width:'100%',height:4}} resizeMode={'stretch'}/>
                    <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
                        <StyleText>운동 추가하기</StyleText>
                        <TouchableOpacity onPress={()=>{
                            setExtraView(!extraView);
                            !extraView ? setBgHeight(410) : setBgHeight(310);
                        }}>
                            {
                                extraView ? 
                                    <Image source={require("../img/common/ico_minus.png")} style={{marginLeft:8}}/>
                                    :
                                    <Image source={require("../img/common/ico_plus.png")} style={{marginLeft:8}}/>
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        extraView ?
                        <View style={{marginTop:16}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <View style={{flex:1}}>
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
                                <View style={{borderRadius:2,height:36,flex:1,overflow:"hidden"}}>
                                    <StyleInput
                                        editable={edit}
                                        value={expl}
                                        onChangeText={(value)=>setExpl(value)}
                                        style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0,backgroundColor:edit?"#ffffff":"#CECECE"}}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop:10,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <ImageBackground source={require('../img/common/input_small_bg_1.png')} style={{width:24,height:16,marginRight:8}}>
                                    <StyleInput value={hours} keyboardType={"number-pad"} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                                </ImageBackground>
                                <StyleText>시간</StyleText>

                                <ImageBackground source={require('../img/common/input_small_bg_2.png')} style={{width:24,height:16,marginHorizontal:8}}>
                                    <StyleInput value={min} keyboardType={"number-pad"} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                                </ImageBackground>
                                <StyleText>분</StyleText>

                                <TouchableOpacity onPress={addList}>
                                    <ImageBackground source={require('../img/common_modal/modal_add.png')} style={{justifyContent:'center',alignItems:"center",marginLeft:20,height:36,width:64}}>
                                        <StyleText style={{color:"#ffffff"}}>추가</StyleText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                    }
                    <View style={{marginTop:40,flexDirection:"row",justifyContent:"space-between",alignItems:'flex-end',display:"flex"}}>
                        <View style={{flex:1,paddingRight:4}}>
                            <TouchableOpacity onPress={handleClose}>
                                <ImageBackground source={require('../img/common_modal/modal_cancel.png')} resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:47}}>
                                    <StyleText style={{color:"#FFFFFF"}}>취소</StyleText>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,paddingLeft:4}}>
                            <TouchableOpacity onPress={handleSave}>
                                <ImageBackground source={require('../img/common_modal/modal_confirm.png')} resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:47}}>
                                    <StyleText style={{color:"#FFFFFF"}}>저장</StyleText>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}