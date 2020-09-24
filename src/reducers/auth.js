// 액션 타입 정의
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";


// 액션 생섬함수 정의
export const loginRequest = () =>{
    return (dispatch,getState) => {
        dispatch(loginSuccess());
        return new Promise((resolve, reject) => {
            resolve(getState().auth.login.stat)
        });
    }
}
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });



// **** 초기상태 정의
const initState = {
    login:{stat:false},
}

// **** 리듀서 작성
export default function reducer(state=initState, action){
    switch (action.type) {
        case LOGIN_SUCCESS: 
            return {
                ...state,
                login:{stat:true}
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                login:{stat:false}
            }
        default:
             return state;
    }
}