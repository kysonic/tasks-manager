// @flow
import React, {Component} from 'react';
import formValidatorHoc from '../../hocs/formValidatorHoc';
import './LoginForm.css';
import i18n from '../../../i18n';

import {mapStateToProps, mapDispatchToProps} from '../../../redux/store';
import {connect} from 'react-redux';
import * as globalsActions from '../../../redux/actions/globals';

import type {GlobalsType} from '../../../flow-typed/app.flow';

type Props = {
    validator: Object,
    haveErrors: Function,
    handleChange: Function,
    authUser: Function,
    userError: string,
    globals: GlobalsType
};

type State = {
    email: string,
    password: string
};

class LoginForm extends Component<Props, State> {
    state = {
        email: '',
        password: ''
    };

    handleChange: Function;

    constructor(props) {
        super(props);
        this.handleChange = props.handleChange.bind(null, this);
    }

    componentDidUpdate() {
        const {globals: {user}} = this.props;
        if (user) {
            window.location.hash = '#/';
        }
    }

    render() {
        const {validator, haveErrors} = this.props;
        return (
            <form className="LoginForm" onSubmit={this.handleSubmit}>
                <div className="title">{i18n.LOGIN}</div>
                <fieldset>
                    <div className="group">
                        <label>{i18n.EMAIL_PLACEHOLDER}</label>
                        <input
                            name="email"
                            type="email"
                            data-validator-type="email"
                            data-validator-rules="isCorrect"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder={i18n.EMAIL_PLACEHOLDER}
                        />
                        <div className="error">{validator.errors.email}</div>
                    </div>
                    <div className="group">
                        <label>{i18n.PASSWORD_PLACEHOLDER}</label>
                        <input
                            name="password"
                            data-validator-type="string"
                            data-validator-rules="notEmpty"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder={i18n.PASSWORD_PLACEHOLDER}
                        />
                        <div className="error">{validator.errors.password}</div>
                    </div>
                    {this.props.globals.userError && <div className="LoginForm__error">{this.props.globals.userError}</div>}
                    <input disabled={haveErrors()} type="submit" value={i18n.LOGIN}/>
                </fieldset>
            </form>
        );
    }

    handleSubmit = async (e: Object) => {
        e.preventDefault();
        this.props.authUser(this.state);
    }
}

export default formValidatorHoc(connect(mapStateToProps, mapDispatchToProps(globalsActions))(LoginForm));
