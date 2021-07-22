import React,{useState,useEffect} from 'react';
import { View,SafeAreaView,Image,Dimensions,TouchableOpacity,ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import send from '../../modules/send';;
import {formatDate,DashedFormatDate} from '../../modules/common'
import StyleText from '../../components/UI/StyleText';
import DiaryModal from '../../components/Diary/DiaryModal';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [inputDiary,setInputDiary] = useState("");
    const [diaryList,setDiaryList] = useState([]);
    const [diaryDate,setDiaryDate] = useState("");
    const [today,setToday] = useState({});
    const [updateNo,setUpdateNo] = useState("");

    useEffect(()=>{
        getList();
    },[])
    const getList = async()=>{
        const {success,rows,today} = await send.get('/contents/diary');
        if(success) {
            if(today) {
                setToday(today)
            } else{
                setToday({})
            }
            setDiaryList(rows)
        }
    }
    
    const openDiaryModal = (_idx)=>{
        setUpdateNo(_idx)
        diaryList.map((item,index)=>{
            if(item.IDX === _idx) {
                setInputDiary(item.CONTENTS);
                setDiaryDate(item.DATE_DT)
            }
        });
        setVisible(true);
    }
    const openTodayDiaryModal = ()=>{
        setUpdateNo("")
        setDiaryDate(today.DATE_DT || formatDate())
        setInputDiary(today.CONTENTS);
        setVisible(true);
    }

    const renderItem=({item,index})=>{
        const margin = (Dimensions.get('window').width-(90*3)-(26*2)) / 2;
        
        return (
            <TouchableOpacity onPress={()=>openDiaryModal(item.IDX)}>
                <View style={{marginTop:16,alignItems:"center",marginLeft:index%3===0?0:margin}}>
                    <View style={{width:90,height:116,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6,padding:6}}>
                        <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <Image source={require('../../img/emoji_02.png')}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <StyleText numberOfLines={7} ellipsizeMode={"tail"} style={{fontSize:13}}>{item.CONTENTS}</StyleText>
                        </View>
                    </View>
                    <StyleText style={{marginTop:10,fontSize:17}}>{DashedFormatDate(item.DATE_DT)}</StyleText>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/common/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <StyleText style={{fontSize:20,paddingLeft:20}} type='bold'>일기장</StyleText>
            </View>
            <View style={{marginTop:16,paddingHorizontal:26,paddingBottom:26,flex:1}}>
                <StyleText style={{fontSize:18}} type='bold'>오늘의 일기</StyleText>
                <TouchableOpacity onPress={openTodayDiaryModal}>
                    <ImageBackground source={require('../../img/diary/memo_bg.png')} resizeMode='stretch' style={{height:161,marginTop:16,paddingHorizontal:16}}>
                        <View style={{marginTop:10,alignItems:"flex-end"}}>
                            <Image source={require('../../img/emoji_01.png')}  />
                        </View>
                        <View style={{marginTop:10,paddingBottom:16}}>
                            <StyleText numberOfLines={6} ellipsizeMode={"tail"} style={{fontSize:17}}>{today.CONTENTS}</StyleText>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{marginTop:26,flex:1}}>
                    <StyleText style={{fontSize:18}}>지난 일기</StyleText>
                    <FlatList 
                        numColumns={3}
                        data={diaryList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{flex:1}}
                        ListFooterComponent={ <View style={{ marginTop:16 }} /> }
                    />
                </View>
            </View>
            <DiaryModal
                display={visible}
                inputDiary={inputDiary}
                diaryDate={diaryDate}
                callback={getList}
                updateNo={updateNo}
                today={today}
                closeModal={()=>setVisible(false)}
            />
        </SafeAreaView>
    )
}