import {FETCH_TASKS, SET_TASKS, UPDATE_TASK, REMOVE_TASK, CREATE_TASK, POST_TASK, PUT_TASK} from '../actionTypes/tasks';

export function fetchTasks(data) {
    return {
        type: FETCH_TASKS,
        payload: data
    }
}

export function setTasks(data) {
    return {
        type: SET_TASKS,
        payload: {data}
    }
}

export function postTask(data) {
    return {
        type: POST_TASK,
        payload: data
    }
}

export function createTask(data) {
    return {
        type: CREATE_TASK,
        payload: data
    }
}

export function updateTask(index, data) {
    return {
        type: UPDATE_TASK,
        payload: {index, data}
    }
}

export function removeTask(index) {
    return {
        type: REMOVE_TASK,
        payload: {index}
    }
}

export function putTask(data) {
    return {
        type: PUT_TASK,
        payload: {data}
    }
}
