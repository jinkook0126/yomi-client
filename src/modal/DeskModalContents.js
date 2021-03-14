import React,{useState} from 'react';
import { TextInput,Text,View,Image,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
export default ()=>{
    const dispatch = useDispatch();
    const [extraView,setExtraView] = useState(false);
    const [lists,setLists] = useState([]);
    const [expl,setExpl] = useState("");
    const [min,setMin] = useState("");
    const [hours,setHours] = useState("");
    const [totalHours,setTotalHours] = useState(0);
    const [totalMin,setTotalMin] = useState(0);

    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=()=>{
        alert("save!");
        dispatch(closeModal());
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
        setLists(lists.filter((item,index)=>index !== idx))
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
                                <TextInput value={hours} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                            </View>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>시간</Text>

                            <View style={{backgroundColor:"#EEEEEE",width:24,height:16,marginRight:8,marginLeft:16}}>
                                <TextInput value={min} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
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