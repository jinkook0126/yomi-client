import send from '../modules/send';
import EncryptedStorage from 'react-native-encrypted-storage';

// 액션 타입 정의
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";


// 액션 생섬함수 정의
export const loginRequest = (mail,pw) =>{
    return (dispatch,getState) => {
        return send.post("/users/login",{mail:mail,pw:pw}).then(({login,name,token,userNo,thumb,coin})=>{
            if(login) {
                dispatch(loginSuccess(name,userNo,thumb,coin));
                EncryptedStorage.setItem(
                    "jwt_token",
                    JSON.stringify({token : token})
                );
            }
            return {login:login}
        })
    }
}

export const verifyRequest = ()=>{
    return (dispatch,getState)=>{
        return send.post("/users/verify").then(({login,name,userNo,thumb,coin})=>{
           if(login) {
               dispatch(loginSuccess(name,userNo,thumb,coin));
           }
        })
    }
}

export const logoutRequest = (mail,pw) =>{
    return (dispatch,getState) => {
        EncryptedStorage.removeItem("jwt_token");
        dispatch(logoutSuccess());
        return true;
    }
}

export const loginSuccess = (name,userNo,thumb,coin) => ({ type: LOGIN_SUCCESS,name,userNo,thumb,coin });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });


// **** 초기상태 정의
const initState = {
    login:{stat:false},
    userInfo:{
        name:"",
        userNo:"",
        thumb:"",
        coin:0
    }
}

// **** 리듀서 작성
export default function reducer(state=initState, action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                login:{stat:true},
                userInfo:{
                    name:action.name,
                    userNo:action.userNo,
                    thumb:action.thumb,
                    coin:action.coin
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                login:{stat:false},
                userInfo:{
                    name:"",
                    userNo:"",
                    thumb:"",
                    coin:0
                }
            }
        default:
            return state;
    }
}