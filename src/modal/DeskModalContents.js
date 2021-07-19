import React,{useState,useEffect} from 'react';
import { View,Image,TouchableOpacity,FlatList,Alert,ImageBackground } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';
import {validNumber} from '../modules/common'

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
    const [bgHeight,setBgHeight] = useState(330);

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
            Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                dispatch(closeModal());
                if(params.callback) params.callback();
            }}]);
        }
    }

    const addList = ()=>{
        if(hours !== '' && !validNumber(hours)) {
            alert('숫자만 입력 가능합니다.')
            return;
        }
        if(min !== '' && !validNumber(min)) {
            alert('숫자만 입력 가능합니다.')
            return;
        }
        if(expl === '') {
            alert('내용을 입력해주세요.')
            return;
        }
        if(hours === '' && min === '') {
            alert('시간을 입력해주세요.')
            return;
        }
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
            <View style={{paddingVertical:4,flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
                <StyleText style={{fontSize:17}}>{item.expl}</StyleText>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end"}}>
                    <StyleText style={{fontSize:17}}>{`${item.hours} 시간 ${item.min} 분`}</StyleText>
                    <TouchableOpacity onPress={()=>removeItem(index)}>
                        <Image source={require('../img/common/ico_remove.png')} style={{marginLeft:10}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    return (
        <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/common_modal/modal_bg.png')} style={{width:'90%',height:bgHeight}}>
            <View style={{padding:20}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <StyleText style={{fontSize:20}} type='bold'>책상</StyleText>
                </View>
                <View style={{marginTop:26}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                        <StyleText style={{fontSize:18}} type='bold'>오늘 나의 공부</StyleText>
                        <StyleText style={{fontSize:14}}>{`Total ${totalHours}시간 ${totalMin}분`}</StyleText>
                    </View>
                    <FlatList
                        data={lists}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{marginTop:26,height:70}}
                    />
                    <ImageBackground source={require("../img/common/dash.png")} style={{width:'100%',height:4}} resizeMode={'stretch'}/>
                    <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
                        <StyleText style={{fontSize:18}}>공부 추가하기</StyleText>
                        <TouchableOpacity onPress={()=>{
                            setExtraView(!extraView);
                            !extraView ? setBgHeight(430) : setBgHeight(330);
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
                            <ImageBackground source={require("../img/common/active_input.png")} resizeMode="stretch" style={{height:36,width:"100%",overflow:"hidden"}}>
                                <StyleInput
                                    value={expl}
                                    onChangeText={(value)=>setExpl(value)}
                                    style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0,paddingLeft:10}}
                                    placeholder={"내가 한 공부를 입력해주세요."} />
                            </ImageBackground>
                            <View style={{marginTop:10,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                            <ImageBackground source={require('../img/common/input_small_bg_2.png')} resizeMode="stretch" style={{width:50,height:28,marginRight:4,paddingLeft:8}}>
                                    <StyleInput value={hours} keyboardType={"number-pad"} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:16}}/>
                                </ImageBackground>
                                <StyleText style={{fontSize:18}}>시간</StyleText>

                                <ImageBackground source={require('../img/common/input_small_bg_2.png')} resizeMode="stretch" style={{width:50,height:28,marginRight:4,paddingLeft:8}}>
                                    <StyleInput value={min} keyboardType={"number-pad"} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:16}}/>
                                </ImageBackground>
                                <StyleText style={{fontSize:18}}>분</StyleText>

                                <TouchableOpacity onPress={addList}>
                                    <ImageBackground source={require('../img/common_modal/modal_add.png')} style={{justifyContent:'center',alignItems:"center",marginLeft:20,height:36,width:64}}>
                                        <StyleText style={{color:"#ffffff",fontSize:17}} type='bold'>추가</StyleText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                    }
                    <View style={{marginTop:40,flexDirection:"row",justifyContent:"space-between",alignItems:'flex-end',display:'flex'}}>
                        <View style={{flex:1,paddingRight:4}}>
                            <TouchableOpacity onPress={handleClose}>
                                <ImageBackground source={require('../img/common_modal/modal_cancel.png')} resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:50}}>
                                    <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>취소</StyleText>
                                </ImageBackground>
                            </TouchableOpacity>    
                        </View>
                        <View style={{flex:1,paddingLeft:4}}>
                            <TouchableOpacity onPress={handleSave}>
                                <ImageBackground source={require('../img/common_modal/modal_confirm.png')}  resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:50}}>
                                    <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>저장</StyleText>
                                </ImageBackground>
                            </TouchableOpacity>    
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}