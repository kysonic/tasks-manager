import {SET_LOADING, SET_ERROR, SET_TOTAL_TASK_COUNT, SET_PAGE, SET_USER, SET_USER_ERROR, SET_EDITABLE_TASK} from '../actionTypes/globals';

export default function loadingReducer(state = {loading: false, error: false, totalTasksCount: 0, page: 1}, action) {
    switch (action.type) {
        case SET_LOADING:
            return Object.assign({}, state, {loading: action.payload.data});
        case SET_ERROR:
            return Object.assign({}, state, {error: action.payload.data});
        case SET_TOTAL_TASK_COUNT:
            return Object.assign({}, state, {totalTasksCount: action.payload.data});
        case SET_PAGE:
            return Object.assign({}, state, {page: action.payload.data});
        case SET_USER:
            return Object.assign({}, state, {user: action.payload.data});
        case SET_USER_ERROR:
            return Object.assign({}, state, {userError: action.payload.data});
        case SET_EDITABLE_TASK:
            return Object.assign({}, state, {editableTask: action.payload.data});
        default:
            return state;
    }
}
