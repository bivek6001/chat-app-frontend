import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice.js";

// import postReducer from "./postSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'counter',
  storage,
};
const rootReducer= combineReducers(

{
  user:userReducer,

 
 
  socket:socketReducer,
  message:messageReducer,
}

)
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              // need to add unnecessary action in a list for avoiding
              // errors and warning
              ignoredActions: [
                       PERSIST,
                       FLUSH, 
                       REHYDRATE, 
                       PAUSE, 
                       PURGE,
                       REGISTER
                       ],
          },
      }),
});
