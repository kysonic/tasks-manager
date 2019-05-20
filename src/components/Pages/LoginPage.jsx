import React, {Component} from 'react';
import './LoginPage.css';
import LoginForm from '../UI/LoginForm/LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div className="LoginPage">
                <LoginForm></LoginForm>
            </div>
        );
    }
}

export default LoginPage;