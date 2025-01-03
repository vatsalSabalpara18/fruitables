// import { store } from 'redux';
// import { reducer } from './reducer';
// import { initialState } from './initialState';

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

// const store = createStore(reducer, initialState);

// export default store;

export const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    });
    return store;
}