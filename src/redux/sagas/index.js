import {all} from 'redux-saga/effects';
import tasksSaga from './tasks';
import globalsSaga from './globals';


export default function* rootSaga() {
    yield all([
        tasksSaga(),
        globalsSaga()
    ]);
}
