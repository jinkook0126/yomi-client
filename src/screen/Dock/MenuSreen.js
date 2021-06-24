import * as React from 'react';
import { View,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {logoutRequest} from '../../reducers/auth';
import StyleText from '../../components/UI/StyleText';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const doLogOut = async() => {
        dispatch(logoutRequest());
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
            <View style={{justifyContent:'center',alignItems:"center",marginTop:40}}>
                <View style={{width:104,height:104,borderRadius:104,borderWidth:1,borderColor:'#9E9E9E'}}>
                </View>
            </View>
            <View style={{marginTop:58,paddingHorizontal:16}}>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <StyleText>내 정보</StyleText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <StyleText>내 공지사항</StyleText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <StyleText>문의하기</StyleText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <StyleText>FAQ</StyleText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={doLogOut}>
                    <View style={styles.menuWrap}>
                        <StyleText>로그아웃</StyleText>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    menuWrap:{
        borderBottomColor:'#ECECEC',
        borderBottomWidth:1,
        paddingVertical:16
    }
})