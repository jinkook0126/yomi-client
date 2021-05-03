// 액션 타입 정의
const OPEN_MODAL = "modal/OPEN_MODAL";
const OPEN_MODAL_PARAMS = "modal/OPEN_MODAL_PARAMS";
const CLOSE_MODAL = "modal/CLOSE_MODAL";


// 액션 생섬함수 정의
export const openModal = (contents) => ({ type: OPEN_MODAL,contents:contents });
export const openModalWithProps = (contents,params) => ({ type: OPEN_MODAL_PARAMS,contents:contents,params:params });
export const closeModal = () => ({ type: CLOSE_MODAL });



// **** 초기상태 정의
const initState = {
    stat:false,
    contents:'',
    params:{}
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
        case OPEN_MODAL_PARAMS: 
            return {
                ...state,
                stat:true,
                contents:action.contents,
                params:action.params
            }
        case CLOSE_MODAL:
            return {
                ...state,
                stat:false,
                contents:'',
                params:{}
            }
        default:
             return state;
    }
}