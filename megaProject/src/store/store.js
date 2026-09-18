import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js';
import auth from '../appwrite/auth';
const store = configureStore({
    reducer: {
        auth : authReducer
    }
})

export default store;