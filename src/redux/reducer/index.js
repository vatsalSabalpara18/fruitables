import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import subcategorySlice from "./slice/subcategory.slice";
import userReducer from "./slice/user.slice";
import categoryReducer from "./slice/category.slice";

// export const intialState = {
//     value: 0
// }

// export const RootReducer = (state = intialState, action) => {    
//     counterReducer(state.value, action);    
//     return state;
// }

export const rootReducer = combineReducers({
    counter: counterReducer,
    subcategory: subcategorySlice,
    user: userReducer,
    category: categoryReducer
});