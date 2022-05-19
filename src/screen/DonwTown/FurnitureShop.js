import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native';
import StyleText from '../../components/UI/StyleText';
import send from '../../modules/send';
import { formatNumber } from '../../modules/common';
import { openModalWithProps } from '../../reducers/modal'
import { updateCoin } from '../../reducers/auth';
import { updateFurniture } from '../../reducers/furniture';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

const IMG_PREFIX = "https://image.yomis-day.com";
export default ({ navigation }) => {
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const coin = useSelector(state => state.auth.userInfo.coin);
    const [lists, setLists] = useState([]);
    const [type, setType] = useState('FT02');

    useEffect(() => {
        getLists();
    }, [type])

    const getLists = useCallback(async () => {
        const { success, lists } = await send.get("/collection", { params: { category: type } });
        if (success) {
            setLists(lists);
        }
    })

    const buyItem = useCallback(async ({ FT_PRICE, FT_ID }) => {
        if (FT_PRICE > coin) {
            snackbar.show({ text: "코인이 부족합니다." });
        } else {
            dispatch(openModalWithProps('downtown/dialog', {
                msg: "가구를 구매하시겠습니까?",
                callback: async () => {
                    const { success, coin: dbCoin } = await send.post("/collection/buy", { id: FT_ID });
                    if (success) {
                        snackbar.show({ text: "구매하였습니다." });
                        dispatch(updateCoin(dbCoin))
                        getLists();
                    }
                }
            }))
        }
    })


    const activeItem = useCallback(async ({ FT_ID }) => {
        dispatch(openModalWithProps('downtown/dialog', {
            msg: "가구를 배치하시겠습니까?",
            callback: async () => {
                console.log(FT_ID)
                const { success, ftInfo, msg } = await send.put("/collection/active", { id: FT_ID });
                if (success) {
                    snackbar.show({ text: "적용하였습니다." });
                    dispatch(updateFurniture(ftInfo))
                } else {
                    snackbar.show({ text: msg });
                }
            }
        }))
    })

    const renderItem = ({ item, index }) => {
        const MARGINTOP = index <= 1 ? 22 : 12;
        // const HEIGHT = index <= 1 ? 100 : index >= 4 ? 100 : 105
        let HEIGHT = 0;
        if (index < 2) {
            HEIGHT = 100
        } else if (index < 6) {
            HEIGHT = 105
        } else {
            HEIGHT = 95
        }
        return (
            <View style={[{ width: '50%', height: HEIGHT, marginTop: MARGINTOP, justifyContent: 'space-between', alignItems: "center", paddingVertical: 3 }]}>
                <TouchableOpacity onPress={() => item.has ? activeItem(item) : buyItem(item)} >
                    <Image source={{ uri: IMG_PREFIX + item.FT_URL }} resizeMode="stretch" style={{ height: 70, width: 70 }} />

                </TouchableOpacity>
                {
                    item.has ?
                        <StyleText style={{ fontSize: 16, textAlign: "center" }} type='bold'>보유중</StyleText>
                        :
                        <View style={{ height: 16, flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
                            <Image source={require("../../img/common/coin.png")} style={{ width: 13, height: 16 }} />
                            <StyleText style={{ fontSize: 16, textAlign: "center", marginLeft: 6 }} type='bold'>{item.FT_PRICE}</StyleText>
                        </View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <StyleText style={{ paddingLeft: 50, fontSize: 20 }} type='bold'>가구상점</StyleText>
                    <TouchableOpacity style={{ position: 'absolute', height: 50, width: 50, justifyContent: 'center', alignItems: "center" }} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image source={require('../../img/common/ico_back.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "flex-end", paddingRight: 20 }}>
                    <Image source={require("../../img/common/coin.png")} style={{ width: 41, height: 34, marginRight: 10 }} />
                    <StyleText type='bold' style={{ fontSize: 20 }}>{formatNumber(coin)}</StyleText>
                </View>
            </View>
            <ImageBackground source={require("../../img/downtown/furniture-bg.png")} style={{flex:1,}} resizeMode="contain" >
                <View style={{position: 'absolute',backgroundColor:'#000000',left:0,top:0,width:'100%',height:'100%',opacity: 0.4}}/>
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setType('FT02')} style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                        <StyleText type='bold' style={{ fontSize: 23 }}>책상</StyleText>
                    </TouchableOpacity>
                    <StyleText type='bold' style={{ fontSize: 23, marginHorizontal: 38, paddingHorizontal: 10, paddingVertical: 8 }}>|</StyleText>
                    <TouchableOpacity onPress={() => setType('FT05')} style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                        <StyleText type='bold' style={{ fontSize: 23 }}>책장</StyleText>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 30 }}>
                    <TouchableOpacity onPress={() => {
                        alert('back')
                    }}>
                        <Image source={require('../../img/downtown/store-left-arrow.png')} style={{ width: 21, height: 36, marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={lists}
                                renderItem={renderItem}
                                numColumns={2}
                                horizontal={false}
                                keyExtractor={(item, index) => item.IDX}
                            />
                    </View>
                    <TouchableOpacity onPress={() => {
                        alert('go')
                    }}>
                        <Image source={require('../../img/downtown/store-right-arrow.png')} style={{ width: 21, height: 36, marginHorizontal: 16 }} />
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}