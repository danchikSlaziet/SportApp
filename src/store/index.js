import {combineReducers, configureStore} from "@reduxjs/toolkit"
import mainSlice from './mainReducer';

const rootReducer = combineReducers({
    main:mainSlice
})

export const store = configureStore({
    reducer:rootReducer
})
