import {SET_TASKS, UPDATE_TASK, REMOVE_TASK, CREATE_TASK} from '../actionTypes/tasks';

export default function tasksReducer(state = null, action) {
    switch (action.type) {
        case SET_TASKS:
            return action.payload.data;
        case CREATE_TASK:
            return [
                ...state,
                action.payload.data
            ];
        case UPDATE_TASK:
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], action.payload.data),
                ...state.slice(action.payload.index + 1)
            ];
        case REMOVE_TASK:
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1)
            ];
        default:
            return state;
    }
}
