// @flow
import React, {Component} from 'react';
import type {TaskType} from '../../../flow-typed/app.flow';
import i18n from '../../../i18n';

import './Task.css';

type State = {};

export default class Task extends Component<TaskType, State> {
    render() {
        return (
            <React.Fragment>
                <td className="Task__id">{this.props.id}</td>
                <td className="Task__username">{this.props.username}</td>
                <td className="Task__email">{this.props.email}</td>
                <td className="Task__text">{this.props.text}</td>
                <td className="Task__status">{this.props.status ? i18n.FINISHED : i18n.NOT_COMPLETED}</td>
            </React.Fragment>
        )
    }
};
