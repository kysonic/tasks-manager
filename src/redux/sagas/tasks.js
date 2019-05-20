import {put, takeEvery, select} from 'redux-saga/effects';

import {FETCH_TASKS, SET_TASKS, CREATE_TASK, POST_TASK, PUT_TASK, UPDATE_TASK} from '../actionTypes/tasks';
import {SET_LOADING, SET_ERROR, SET_TOTAL_TASK_COUNT, SET_PAGE} from '../actionTypes/globals';

import apiService from '../../services/apiService';
import { processTask } from '../../services/processData';
import _ from 'lodash';
import config from '../../config'
import md5 from '../../vendor/md5';

const EDITABLE_FIELD = ['text', 'status'];

function* fetchTasks({payload}) {
    yield put({type: SET_LOADING, payload: {data: true}});
    if (payload.page) {
        yield put({type: SET_PAGE, payload: {data: payload.page}});
    }
    const response = yield apiService.get(payload);
    if (response.isError) {
        yield put({type: SET_ERROR, payload: {data: response.message}});
        yield put({type: SET_LOADING, payload: {data: false}});
        return ;
    }
    yield put({type: SET_TASKS, payload: {data: response.message.tasks}});
    if (_.get(response, 'message.total_task_count')) {
        yield put({type: SET_TOTAL_TASK_COUNT, payload: {data: parseInt(_.get(response, 'message.total_task_count'), 10)}});
    }
    yield put({type: SET_LOADING, payload: {data: false}});
}

function* postTask({payload}) {
    yield put({type: SET_LOADING, payload: {data: true}});
    const response = yield apiService.post('create', processTask(payload));
    if (response.isError) {
        yield put({type: SET_ERROR, payload: {data: response.message}});
        yield put({type: SET_LOADING, payload: {data: false}});
        return ;
    }
    const tasks = yield select(state => state.tasks);
    if (tasks.length < 3) {
        yield put({type: CREATE_TASK, payload: {data: response.message}});
    }
    const totalTasksCount = yield select(state => state.globals.totalTasksCount);
    yield put({type: SET_TOTAL_TASK_COUNT, payload: {data: totalTasksCount + 1}});
    yield put({type: SET_LOADING, payload: {data: false}});
}

function* putTask({payload: {data}}) {
    yield put({type: SET_LOADING, payload: {data: true}});
    const editable = processTask(Object.assign({}, _.pick(data, EDITABLE_FIELD), {token: config.token}));
    let queryString = '';
    Object.keys(editable).sort().forEach( (key, i) => queryString += `${i?'&':''}${key}=${encodeURIComponent(editable[key])}`);
    editable.signature = md5(queryString).toLowerCase();
    const response = yield apiService.post(`edit/${data.id}`, editable);
    if (response.isError) {
        yield put({type: SET_ERROR, payload: {data: response.message}});
        yield put({type: SET_LOADING, payload: {data: false}});
        return ;
    }
    const tasks = yield select(state => state.tasks);
    const index = tasks.findIndex(task => task.id === data.id);
    if (Boolean(~index)) {
        yield put({type: UPDATE_TASK, payload: {index, data: Object.assign({}, data, _.pick(editable, EDITABLE_FIELD))}});
    }
    yield put({type: SET_LOADING, payload: {data: false}});
}

export default function* watchTasksAsync() {
    yield takeEvery(FETCH_TASKS, fetchTasks);
    yield takeEvery(POST_TASK, postTask);
    yield takeEvery(PUT_TASK, putTask);
}



