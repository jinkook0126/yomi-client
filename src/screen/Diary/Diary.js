import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,Dimensions,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';

const lists = [
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
    {date:"2021-03-02"},
]
export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [inputDiary,setInputDiary] = useState("");
    const handleModalSave = (value)=>{
        console.log(value)
        setVisible(false);
    }
    const renderItem=({item,index})=>{
        const margin = (Dimensions.get('window').width-(90*3)-(26*2)) / 2;
        return (
            <View style={{marginTop:16,alignItems:"center",marginLeft:index%3===0?0:margin}}>
                <View style={{width:90,height:116,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6}}>
                </View>
                <Text style={{marginTop:10}}>{item.date}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>일기장</Text>
            </View>
            <View style={{marginTop:16,paddingHorizontal:26,paddingBottom:26,flex:1}}>
                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>오늘의 일기</Text>
                <TouchableOpacity onPress={()=>setVisible(true)}>
                    <View style={{height:153,backgroundColor:"#FFFBE9",marginTop:16,paddingHorizontal:16,borderRadius:6}}>
                        <View style={{marginTop:10,alignItems:"flex-end"}}>
                            <Image source={require('../../img/emoji_01.png')}  />
                        </View>
                        <View style={{marginTop:10,paddingBottom:16}}>
                            <Text numberOfLines={6} ellipsizeMode={"tail"} style={[styles.commonColor,{fontSize:12}]}>{inputDiary}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop:26,flex:1}}>
                    <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>지난 일기</Text>
                    <FlatList 
                        numColumns={3}
                        data={lists}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{flex:1}}
                        ListFooterComponent={ <View style={{ marginTop:16 }} /> }
                    />
                </View>
            </View>
            <Modal
                useNativeDriver
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={visible}
                hideModalContentWhileAnimating={true}
                onBackdropPress={()=>{setVisible(false)}}
            >
                <View style={styles.modalContents}>
                    <View style={{justifyContent:'center',alignItems:"center"}}>
                        <Text style={[styles.commonColor,{fontSize:16}]}>2021.03.03</Text>
                    </View>
                    <View style={{marginTop:12,alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('../../img/emoji_01.png')} />
                    </View>
                    <View style={{marginTop:22,height:286}}>
                        <TextInput
                            onChangeText={(value)=>setInputDiary(value)}
                            multiline={true}
                        />
                    </View>
                    <View style={{marginTop:40,flexDirection:"row", justifyContent:"flex-end",}}>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
                            <Text style={{color:"#8C6C51",fontSize:14}}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
                            <Text style={{color:"#8C6C51",fontSize:14,marginLeft:30}}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
    modalContents:{
        backgroundColor:'#FFFBE9',
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:26
    }
});