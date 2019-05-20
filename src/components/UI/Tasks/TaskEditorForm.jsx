// @flow

import React, {Component} from 'react';
import i18n from '../../../i18n';

import type {GlobalsType, TaskType} from '../../../flow-typed/app.flow';
import type {Node} from 'react';

import {mapStateToProps, mapDispatchToProps} from '../../../redux/store';
import {connect} from 'react-redux';
import * as tasksActions from '../../../redux/actions/tasks';

import './TaskEditorForm.css';

import formValidatorHoc from "../../hocs/formValidatorHoc";

type Props = {
    prepareAndValidate: Function,
    handleChange: Function,
    validator: Object,
    haveErrors: Function,
    postTask: Function,
    putTask: Function,
    createTask: Function,
    globals: GlobalsType,
    onSubmit: Function
};

type State = {
    task: TaskType,
    formError: string,
    editMode: boolean
}

class TaskEditorForm extends Component<Props, State> {
    state = {
        task: {
            username: '',
            email: '',
            text: '',
            status: false
        },
        editMode: false,
        formError: ''
    };

    handleChange: Function;
    form: ?HTMLFormElement;

    constructor(props) {
        super(props);
        this.handleChange = props.handleChange.bind(null, this);
    }

    componentDidMount(): void {
        this.initialValidate();
    }

    initialValidate = (): void => {
        this.form && Array.from(this.form.querySelectorAll('*[data-validator-type]'))
            .forEach(node => {
                this.props.prepareAndValidate(node);
            });
    };

    onSubmit = (e): void => {
        e.preventDefault();
        const {haveErrors, postTask, putTask} = this.props;
        if (haveErrors()) {
            return this.setState({formError: i18n.TASK_FORM_HAS_ERRORS});
        }

        if (this.props.onSubmit && typeof this.props.onSubmit === 'function') {
            this.props.onSubmit();
        }
        !this.state.editMode ? postTask(this.state.task) : putTask(this.state.task);
    };

    setTask = (task, editMode): void => {
        this.setState({task, editMode}, () => {
            this.initialValidate()
        });
    };

    render(): Node {
        const {validator, haveErrors} = this.props;

        return (
            <form ref={el => this.form = el} className="TaskEditorForm" onSubmit={this.onSubmit}>
                <input
                    className={`${validator.errors['task.username'] ? 'error': ''} ${this.state.editMode ? 'is-hidden' : ''}`}
                    type="text"
                    value={this.state.task.username}
                    data-validator-type="string"
                    data-validator-rules="notEmpty"
                    placeholder={i18n.USERNAME_PLACEHOLDER}
                    required
                    name="task.username"
                    onChange={this.handleChange}
                />
                <input
                    className={`${validator.errors['task.email'] ? 'error': ''} ${this.state.editMode ? 'is-hidden' : ''}`}
                    type="email"
                    value={this.state.task.email}
                    data-validator-type="email"
                    data-validator-rules="isCorrect"
                    placeholder={i18n.EMAIL_PLACEHOLDER}
                    required
                    name="task.email"
                    onChange={this.handleChange}
                />
                <textarea
                    className={`${validator.errors['task.text'] ? 'error': ''}`}
                    required
                    value={this.state.task.text}
                    data-validator-type="string"
                    data-validator-rules="notEmpty"
                    placeholder={i18n.TEXT_PLACEHOLDER}
                    name="task.text"
                    onChange={this.handleChange}
                />
                {this.props.globals.user && this.props.globals.user.isAdmin && (
                    <hgroup>
                        <label>{i18n.STATUS_PLACEHOLDER}</label>
                        <input
                            type="checkbox"
                            checked={this.state.task.status}
                            name="task.status"
                            onChange={this.handleChange}
                        />
                    </hgroup>
                )}
                <input disabled={haveErrors()} type="submit" value={this.state.editMode ? i18n.EDIT_TASK_BUTTON_TEXT : i18n.ADD_TASK_BUTTON_TEXT}/>
                <div className="TaskEditorForm__error">{this.state.formError}</div>
            </form>
        );
    }
}

export default formValidatorHoc(connect(mapStateToProps, mapDispatchToProps(tasksActions), null, { withRef: true })(TaskEditorForm));
