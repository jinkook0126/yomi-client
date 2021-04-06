import send from '../modules/send';
// 액션 타입 정의
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";


// 액션 생섬함수 정의
export const loginRequest = (id,pw) =>{
    return (dispatch,getState) => {
        return send({uri:"/v0/users/login",method:"post",params:{id:id,pw:pw}}).then(res=>{
            dispatch(loginSuccess());
        })
    }
}
// export function logoutRequest() {
//     return (dispatch,getState) =>{
//         return Axios.post("/users/logout").then(response=>{
//             let _response = response.data;
//             if(_response.result === "success") {
//                 dispatch(logout())
//             }
//         }).catch(error=>{
//             console.log(error);
//         }).then(()=> { return getState().authentication.login.status });
//     }
// }
export const logoutRequest = () =>{
    return (dispatch,getState) => {
        dispatch(logoutSuccess());
        return new Promise((resolve, reject) => {
            resolve({result:true})
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