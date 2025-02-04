// import { store } from 'redux';
// import { reducer } from './reducer';
// import { initialState } from './initialState';

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './reducer';

// const store = createStore(reducer, initialState);

// export default store;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
    });
    let persistor = persistStore(store)
    return { store, persistor };
}