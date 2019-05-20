import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import RootComponent from './components/RootComponent';

import store from './redux/store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <RootComponent />
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
