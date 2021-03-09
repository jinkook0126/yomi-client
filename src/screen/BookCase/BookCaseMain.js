import React from 'react';
import {Text,View,SafeAreaView,Image,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import Dash from 'react-native-dash';


export default ({navigation})=>{
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>책장</Text>
            </View>
            <ScrollView style={{paddingTop:16,paddingHorizontal:26}}>
                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>현재 읽고 있는 책</Text>
                <View style={{flexWrap:'wrap',flexDirection:"row",justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("BookSearch")}}>
                        <View style={{width:90,height:116,marginTop:16,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6,justifyContent:"center",alignItems:'center'}}>
                            <Text style={{fontSize:10,color:"#757575",lineHeight:12}}>  새로운 책을{"\n"}추가해보세요!</Text>
                            <View style={{borderWidth:1,borderRadius:6,borderStyle:"dotted",width:28,height:28,marginTop:17,borderColor:"#9E9E9E",overflow:"hidden"}}>
                                <Dash dashLength={1} dashThickness={1} dashGap={1} dashColor={"#9E9E9E"} style={{height:1,width:22,position:'absolute',top:12,left:2.5}}/>
                                <Dash dashLength={1} dashThickness={1} dashGap={1} dashColor={"#9E9E9E"} style={{width:1,height:22,position:'absolute',top:2.5,left:13,flexDirection:'column'}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:90,height:116,marginTop:16,backgroundColor:'black'}}>
                    </View>
                    <View style={{width:90,height:116,marginTop:16,backgroundColor:'yellow'}}>
                    </View>
                    <View style={{width:90,height:116,marginTop:16,backgroundColor:'green'}}>
                    </View>
                </View>
                <View style={{marginTop:28}}>
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                        <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>완독한 책</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require("../../img/ico_orderby.png")}/>
                            <Text style={[styles.commonColor,{fontSize:12,fontWeight:'bold',marginLeft:4}]}>최신순</Text>
                        </View>
                    </View>
                    <View style={{flexWrap:'wrap',flexDirection:"row",justifyContent:'space-between'}}>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'black'}}>
                        </View>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'yellow'}}>
                        </View>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'green'}}>
                        </View>
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
});