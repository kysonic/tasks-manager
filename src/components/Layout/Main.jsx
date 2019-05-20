// @flow
import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import Loader from '../UI/Loader/Loader';
import Error from '../UI/Error/Error';

import './Main.css';

import store from '../../redux/store';

type Props = {};
type State = {
    loading: boolean,
    error: boolean
};

class Main extends Component<Props,State> {
    state = {
        loading: false,
        error: false
    };

    unsubscribe: Function;

    constructor(props: Props, context: any){
        super(props,context);
        this.unsubscribe = store.subscribe(()=>this.setState({...store.getState().globals}));
    }

    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/:page' component={HomePage}/>
                </Switch>
                <Error className={`${!this.state.error ? 'is-hidden' : ''}`} message={this.state.error} />
                <Loader className={`${!this.state.loading ? 'is-hidden' : ''}`} />
            </div>
        )
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
}

export default Main;
