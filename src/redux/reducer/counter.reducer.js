import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes";

// export const counterReducer = (state, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return state + 1;
//     case DECREMENT_COUNTER:
//       return state - 1;    
//   }
// }

const initialState = {
  count: 0
};

export const counterReducer = (state = initialState, action) => {
  console.log('state:', state); // 3
  console.log('action:', action);
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {        
        count: state.count + 1
      };
    case DECREMENT_COUNTER:
      return {        
        count: state.count - 1
      };
    default:
      return state;
  }
}