import {combineReducers} from 'redux';
import tasks from './tasks';
import globals from './globals';

const rootReducer = combineReducers({tasks, globals});

export default rootReducer;
