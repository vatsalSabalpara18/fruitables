import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes";

export const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;    
  }
}