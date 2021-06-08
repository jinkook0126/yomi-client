import send from '../modules/send';
import EncryptedStorage from 'react-native-encrypted-storage';

// 액션 타입 정의
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";


// 액션 생섬함수 정의
export const loginRequest = (mail,pw) =>{
    return (dispatch,getState) => {
        return send.post("/users/login",{mail:mail,pw:pw}).then(({login,name,token,userNo})=>{
            if(login) {
                dispatch(loginSuccess(name,userNo));
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
        return send.post("/users/verify").then(({login,name,userNo})=>{
           if(login) {
               dispatch(loginSuccess(name,userNo));
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

export const loginSuccess = (name,userNo) => ({ type: LOGIN_SUCCESS,name,userNo });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });


// **** 초기상태 정의
const initState = {
    login:{stat:false},
    userInfo:{
        name:"",
        userNo:""
    }
}

// **** 리듀서 작성
export default function reducer(state=initState, action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action) 
            return {
                ...state,
                login:{stat:true},
                userInfo:{
                    name:action.name,
                    userNo:action.userNo
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                login:{stat:false},
                userInfo:{
                    name:"",
                    userNo:""
                }
            }
        default:
            return state;
    }
}