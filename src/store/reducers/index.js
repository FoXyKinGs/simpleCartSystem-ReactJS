import { combineReducers } from "redux";
import amountReducer from './amount'

const rootReducers = combineReducers({
    amount: amountReducer
})

export default rootReducers