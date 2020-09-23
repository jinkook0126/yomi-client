// 액션 타입 정의
const OPEN_MODAL = "modal/OPEN_MODAL";
const CLOSE_MODAL = "modal/CLOSE_MODAL";


// 액션 생섬함수 정의
export const openModal = (contents) => ({ type: OPEN_MODAL,contents:contents });
export const closeModal = () => ({ type: CLOSE_MODAL });



// **** 초기상태 정의
const initState = {
    stat:false,
    contents:''
}

// **** 리듀서 작성
export default function reducer(state=initState, action){
    switch (action.type) {
        case OPEN_MODAL: 
            return {
                ...state,
                stat:true,
                contents:action.contents
            }
        case CLOSE_MODAL:
            return {
                ...state,
                stat:false,
                contents:''
            }
        default:
             return state;
    }
}