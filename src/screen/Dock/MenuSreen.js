import React from 'react';
import { View,StyleSheet,SafeAreaView,TouchableOpacity,Image } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import {logoutRequest} from '../../reducers/auth';
import StyleText from '../../components/UI/StyleText';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const thumb = useSelector(state=> state.auth.userInfo.thumb);
    const doLogOut = async() => {
        dispatch(logoutRequest());
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
            <View style={{justifyContent:'center',alignItems:"center",marginTop:40}}>
                {
                    thumb === null ?
                        <View style={{width:104,height:104,borderRadius:100,borderWidth:1,borderColor:'#9E9E9E'}} />
                    :
                        <Image source={{uri:thumb}} resizeMode="stretch" style={{width:104,height:104,borderRadius:100}}/>
                }
                
            </View>
            <View style={{marginTop:38,paddingHorizontal:16}}>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <StyleText style={styles.menuText}>내 정보</StyleText>
                    </View>
                </TouchableOpacity>
                <Image source={require("../../img/login/dash01.png")} style={{width:'100%'}}/>
                <TouchableOpacity onPress={()=>navigation.navigate("Notice")}>
                    <View style={styles.menuWrap}>
                        <StyleText style={styles.menuText}>공지사항</StyleText>
                    </View>
                </TouchableOpacity>
                <Image source={require("../../img/login/dash01.png")} style={{width:'100%'}}/>
                <TouchableOpacity onPress={()=>navigation.navigate("Contact")}>
                    <View style={styles.menuWrap}>
                        <StyleText style={styles.menuText}>문의하기</StyleText>
                    </View>
                </TouchableOpacity>
                <Image source={require("../../img/login/dash01.png")} style={{width:'100%'}}/>
                <TouchableOpacity onPress={()=>navigation.navigate("Question")}>
                    <View style={styles.menuWrap}>
                        <StyleText style={styles.menuText}>FAQ</StyleText>
                    </View>
                </TouchableOpacity>
                <Image source={require("../../img/login/dash01.png")} style={{width:'100%'}}/>
                <TouchableOpacity onPress={doLogOut}>
                    <View style={styles.menuWrap}>
                        <StyleText style={styles.menuText}>로그아웃</StyleText>
                    </View>
                </TouchableOpacity>
                <Image source={require("../../img/login/dash01.png")} style={{width:'100%'}}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    menuWrap:{
        paddingVertical:16
    },
    menuText:{
        fontSize:17
    }
})