import React,{useState,useEffect} from 'react';
import { View,Image,TouchableOpacity,FlatList,ImageBackground,BackHandler } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import {closeModal} from '../reducers/modal';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText';

export default ()=>{
    const dispatch = useDispatch();
    const params = useSelector(state=> state.modal.params);

    const backAction = () => {
        handleClose();
        return true;
    };

    useEffect(()=>{
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[])

    const handleClose=()=>{
        dispatch(closeModal());
    }
    return (
        <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/downtown/modal/modal_bg.png')} style={{width:'56%'}}>
            <View style={{padding:20}}>
                <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                    <StyleText style={{fontSize:18}} type='bold'>{params.msg}</StyleText>
                </View>
                <View style={{height:40,flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>{
                        params.callback();
                        handleClose();
                    }} style={{flex:1}}>
                        <ImageBackground resizeMode="stretch" source={require('../img/downtown/modal/modal_confirm.png')} style={{justifyContent:'center',alignItems:"center",height:40}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>확인</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{width:20}}/>
                    <TouchableOpacity style={{flex:1}} onPress={handleClose}>
                        <ImageBackground resizeMode="stretch" source={require('../img/downtown/modal/modal_confirm.png')} style={{justifyContent:'center',alignItems:"center",height:40}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>취소</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        // <View style={{width:"90%"}}>
        //     <StyleText style={{fontSize:20}} type='bold'>Hello World!!</StyleText>
        // </View>
        // <ImageBackground resizeMode={'stretch'} imageStyle={{width:"100%"}} source={require('../img/common_modal/modal_bg.png')} style={{width:'90%',height:bgHeight}}>
        //     <View style={{padding:20}}>
        //         <View style={{justifyContent:'center',alignItems:'center'}}>
        //             <StyleText style={{fontSize:20}} type='bold'>운동</StyleText>
        //         </View>
        //         <View style={{marginTop:26}}>
        //             <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
        //                 <StyleText style={{fontSize:18}} type='bold'>오늘 나의 운동</StyleText>
        //                 <StyleText style={{fontSize:14}}>{`Total ${totalHours}시간 ${totalMin}분`}</StyleText>
        //             </View>
        //             <FlatList
        //                 data={lists}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item, index) => String(index)}
        //                 style={{marginTop:26,height:70}}
        //             />
        //             <ImageBackground source={require("../img/common/dash.png")} style={{width:'100%',height:4}} resizeMode={'stretch'}/>
        //             <View style={{marginTop:16,flexDirection:"row",alignItems:"center"}}>
        //                 <StyleText style={{fontSize:18}}>운동 추가하기</StyleText>
        //                 <TouchableOpacity style={{width:25,height: 25,justifyContent:"center",alignItems:"center",marginLeft:2}} onPress={()=>{
        //                     setExtraView(!extraView);
        //                     !extraView ? setBgHeight(430) : setBgHeight(330);
        //                 }}>
        //                     {
        //                         extraView ? 
        //                             <Image source={require("../img/common/ico_minus.png")} />
        //                             :
        //                             <Image source={require("../img/common/ico_plus.png")} />
        //                     }
        //                 </TouchableOpacity>
        //             </View>
        //             {
        //                 extraView ?
        //                 <View style={{marginTop:16}}>
        //                     <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        //                         <ImageBackground source={require("../img/common/picker_border.png")} style={{width:130,paddingHorizontal:12}} resizeMode="stretch" >
        //                             <Tooltip
        //                                 showChildInTooltip={false}
        //                                 isVisible={tooltip}
        //                                 content={
        //                                     <View>
        //                                         {pickerList.map((item,idx)=>(
        //                                             <TouchableOpacity key={idx} onPress={()=>{
        //                                                 handlePicker(idx)
        //                                             }}>
        //                                                 <View style={{marginVertical:8,width:120}}>
        //                                                     <StyleText style={{fontSize:18}}>{item}</StyleText>
        //                                                 </View>
        //                                             </TouchableOpacity>
        //                                         ))}
        //                                     </View>
        //                                 }
        //                                 placement="top"
        //                                 onClose={()=>setTooltip(false)}
        //                                 >
        //                                 <TouchableOpacity onPress={()=>setTooltip(true)}>
        //                                     <View style={{height:36,justifyContent:'space-between',alignItems:"center",flexDirection:"row"}}>
        //                                         <StyleText style={{fontSize:18}}>{pickerLabel}</StyleText>
        //                                         <Image source={require("../img/common_modal/ico_down_arrow.png")} style={{height:9,width:13}}/>
        //                                     </View>
        //                                 </TouchableOpacity>
        //                             </Tooltip>
        //                         </ImageBackground>
        //                         <View style={{width:10}}/>
        //                         <ImageBackground source={edit? ACTIVE_INPUT:INACTIVE_INPUT } resizeMode="stretch" style={{height:36,flex:1,overflow:"hidden"}}>
        //                             <StyleInput
        //                                 editable={edit}
        //                                 value={expl}
        //                                 onChangeText={(value)=>setExpl(value)}
        //                                 style={{flex:1,height:36,alignItems:"stretch",paddingVertical:0,fontSize:16,paddingLeft:10}}
        //                             />
        //                         </ImageBackground>
        //                     </View>
        //                     <View style={{marginTop:10,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
        //                         <ImageBackground source={require('../img/common/input_small_bg_2.png')} resizeMode="stretch" style={{width:50,height:28,marginRight:4,paddingLeft:8}}>
        //                             <StyleInput value={hours} keyboardType={"number-pad"} onChangeText={(value)=>setHours(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:16}}/>
        //                         </ImageBackground>
        //                         <StyleText style={{fontSize:18}}>시간</StyleText>

        //                         <ImageBackground source={require('../img/common/input_small_bg_2.png')} resizeMode="stretch" style={{width:50,height:28,marginRight:4,marginLeft:6,paddingLeft:8}}>
        //                             <StyleInput value={min} keyboardType={"number-pad"} onChangeText={(value)=>setMin(value)} style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:16}}/>
        //                         </ImageBackground>
        //                         <StyleText style={{fontSize:18}}>분</StyleText>

        //                         <TouchableOpacity onPress={addList}>
        //                             <ImageBackground source={require('../img/common_modal/modal_add.png')} style={{justifyContent:'center',alignItems:"center",marginLeft:10,height:36,width:64}}>
        //                                 <StyleText style={{color:"#ffffff",fontSize:17}} type='bold'>추가</StyleText>
        //                             </ImageBackground>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 :
        //                 null
        //             }
        //             <View style={{marginTop:40,flexDirection:"row",justifyContent:"space-between",alignItems:'flex-end',display:"flex"}}>
        //                 <View style={{flex:1,paddingRight:4}}>
        //                     <TouchableOpacity onPress={handleClose}>
        //                         <ImageBackground source={require('../img/common_modal/modal_cancel.png')} resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:50}}>
        //                             <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>취소</StyleText>
        //                         </ImageBackground>
        //                     </TouchableOpacity>
        //                 </View>
        //                 <View style={{flex:1,paddingLeft:4}}>
        //                     <TouchableOpacity onPress={handleSave}>
        //                         <ImageBackground source={require('../img/common_modal/modal_confirm.png')} resizeMode={'stretch'} style={{justifyContent:'center',alignItems:"center",width:'100%',height:50}}>
        //                             <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>저장</StyleText>
        //                         </ImageBackground>
        //                     </TouchableOpacity>
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        // </ImageBackground>
    )
}