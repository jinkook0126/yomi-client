import send from '../modules/send';
// 액션 타입 정의
const INIT_FURNITURE = "furniture/INIT_FURNITURE";
const UPDATE_FURNITURE = "furniture/UPDATE_FURNITURE";


// 액션 생섬함수 정의
export const  initFurnitureRequest = () => {
    return (dispatch,getState) =>{
        return send.get("/info/room").then(({success,furnitures}) => {
            if(success) {
                const furniture = {};
                furnitures.forEach(item => {
                    furniture[item.FT_CODE] = item.FT_URL
                });
                dispatch(initFurniture(furniture));
            }
        });
    }
}
export const updateFurniture = (furniture) => ({type : UPDATE_FURNITURE, furniture});
export const initFurniture = (furnitures) => ({ type : INIT_FURNITURE, furnitures});

// **** 초기상태 정의
const initState = {
    init:false,
    furnitures:{
        FT01:"",
        FT02:"",
        FT03:"",
        FT04:"",
        FT05:"",
    }
}

// **** 리듀서 작성
export default function reducer(state=initState, action){
    switch (action.type) {
        case INIT_FURNITURE: 
            return {
                ...state,
                init:true,
                furnitures:action.furnitures
            }
        case UPDATE_FURNITURE:
            return {
                ...state,
                furnitures:{...state.furnitures,...action.furniture}
            }
        default:
             return state;
    }
}