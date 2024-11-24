import { combineReducers } from "redux";
import authReducer from "./auth";
import customerReducer from './customer'
import productreducer from './product'


export default combineReducers({

    authReducer,customerReducer,productreducer
})