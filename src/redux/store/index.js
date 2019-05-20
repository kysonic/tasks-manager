import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import {bindActionCreators} from 'redux';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const mapStateToProps = state => ({...state});

export const mapDispatchToProps = (actions) => dispatch => bindActionCreators(actions, dispatch);

export default store;



