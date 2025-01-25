import { INCREMENT_COUNTER , DECREMENT_COUNTER } from "../ActionTypes";

export const increment = () => (dispatch) => { //2
    dispatch({ type: INCREMENT_COUNTER });
}

export const decrement = () => (dispatch) => {
    dispatch({ type: DECREMENT_COUNTER });
}