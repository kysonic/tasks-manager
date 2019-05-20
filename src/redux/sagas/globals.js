import { delay } from 'redux-saga';
import {put, takeEvery} from 'redux-saga/effects';
import config from '../../config';
import user from '../../data/user.json';
import i18n from '../../i18n';

import {SET_LOADING, SET_USER, AUTH_USER, SET_USER_ERROR} from '../actionTypes/globals';

function* authUser({payload: {credentials}}) {
    yield put({type: SET_LOADING, payload: {data: true}});
    yield delay(Math.random() * 1000 + 1000);
    yield put({type: SET_LOADING, payload: {data: false}});
    const authorizationHash = btoa(`Authorization: ${credentials.email}|${credentials.password}`);
    if (authorizationHash === config.authorizationHash) {
        yield put({type: SET_USER, payload: {data: user}});
        yield put({type: SET_USER_ERROR, payload: {data: ''}});
    } else {
        yield put({type: SET_USER_ERROR, payload: {data: i18n.CREDENTIALS_ARE_NOT_CORRECT}});
    }
}

export default function* watchTasksAsync() {
    yield takeEvery(AUTH_USER, authUser);
}



