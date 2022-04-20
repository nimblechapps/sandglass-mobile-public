import { SET_CRAFT_LIST } from "./types";


const initialState = {
    craftList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CRAFT_LIST:
            return {
                ...state,
                craftList: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;
