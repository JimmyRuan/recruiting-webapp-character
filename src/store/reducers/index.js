// src/store/reducers/index.js
import { combineReducers } from 'redux';
import charactersReducer from "./characterReducer";

const rootReducer = combineReducers({
    characters: charactersReducer,
});

export default rootReducer;
