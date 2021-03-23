import * as React from 'react';
import { Text,View,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {logoutRequest} from '../../reducers/auth';
export default ({navigation})=>{
    const dispatch = useDispatch();
    const doLogOut = () => {
        dispatch(logoutRequest()).then(({result}) => {
            if(result){
                navigation.reset({
                    index:0,
                    routes:[{name:"Login"}]
                });
            }
        });
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
                        <Text style={styles.menuText}>내 정보</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <Text style={styles.menuText}>공지사항</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <Text style={styles.menuText}>문의하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menuWrap}>
                        <Text style={styles.menuText}>FAQ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={doLogOut}>
                    <View style={styles.menuWrap}>
                        <Text style={styles.menuText}>로그아웃</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    menuText:{
        fontWeight:"bold",fontSize:12,color:"#2B2B2B"
    },
    menuWrap:{
        borderBottomColor:'#ECECEC',
        borderBottomWidth:1,
        paddingVertical:16
    }
})