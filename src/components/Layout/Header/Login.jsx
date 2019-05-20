import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import i18n from '../../../i18n';
import _ from 'lodash';

import {mapStateToProps, mapDispatchToProps} from '../../../redux/store';
import {connect} from 'react-redux';
import * as globalsActions from '../../../redux/actions/globals';

const Login = (props) => {
    return (
        <Link className="Login" to="/login">
            <div className="icon"></div>
            {props.globals.user ? (
                    <div className="text">{`${_.get(props, 'globals.user.profile.firstName', props.globals.user.email)}`}</div>
            ) :
                (
                    <div className="text">{i18n.LOGIN}</div>
                )
            }

        </Link>
    );
}

export default connect(mapStateToProps, mapDispatchToProps(globalsActions))(Login);
