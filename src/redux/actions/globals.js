import {SET_LOADING, SET_ERROR, SET_PAGE, SET_USER, AUTH_USER, SET_EDITABLE_TASK} from '../actionTypes/globals';


export function setLoading(state) {
    return {
        type: SET_LOADING,
        payload: {data: state}
    }
}

export function setError(state) {
    return {
        type: SET_ERROR,
        payload: {data: state}
    }
}

export function setPage(state) {
    return {
        type: SET_PAGE,
        payload: {data: state}
    }
}

export function authUser(state) {
    return {
        type: AUTH_USER,
        payload: {credentials: state}
    }
}

export function setUser(state) {
    return {
        type: SET_USER,
        payload: {data: state}
    }
}

export function setEditableTask(state) {
    return {
        type: SET_EDITABLE_TASK,
        payload: {data: state}
    }
}
