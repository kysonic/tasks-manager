// @flow
import React, {Component} from 'react';
import Task from './Task';
import TaskEditorForm from './TaskEditorForm';
import TasksListPagination from './TasksListPagination';
import Popup from '../Popup/Popup';
import i18n from '../../../i18n';
import _ from 'lodash';

import {mapStateToProps, mapDispatchToProps} from '../../../redux/store';
import {connect} from 'react-redux';
import * as tasksActions from '../../../redux/actions/tasks';
import * as globalsActions from '../../../redux/actions/globals';

import './TasksList.css';

import type {TaskType, GlobalsType} from '../../../flow-typed/app.flow';
import type {Node} from 'react';

type Props = {
    tasks: TaskType[],
    globals: GlobalsType,
    setEditableTask: Function
}

type State = {
    task: TaskType
}

class TasksList extends Component<Props, State> {
    popup: Popup | null = null;
    taskEditor: TaskEditorForm | null = null;

    state = {
        task: null
    };

    getHead (task: TaskType): Array<string> {
        return Object.keys(task).map(key => _.get(i18n.MAP_TASKS_FIELDS_TO_NAMES, key, 'XXX'));
    }

    openAddTaskPopup = (): void => {
        const taskEditor = this.taskEditor && this.taskEditor.ref.getWrappedInstance();
        taskEditor && taskEditor.setTask({username: '', text: '', status: 0, email: ''}, false);
        this.popup && this.popup.open();
    };

    editTask = (task: TaskType): void => {
        if (_.get(this, 'props.globals.user.isAdmin')) {
            const taskEditor = this.taskEditor && this.taskEditor.ref.getWrappedInstance();
            taskEditor && taskEditor.setTask(task, true);
            this.popup && this.popup.open();
        }
    };

    render(): Node {
        return (
            <div className="TasksList">
                {!this.props.tasks || !this.props.tasks.length && <div className="TasksList__no-data">{i18n.NO_TASK_MESSAGE}</div>}
                {this.props.tasks && !!this.props.tasks.length && (
                    <table className="TasksList__table">
                        <thead>
                        <tr>
                            {this.getHead(_.get(this.props.tasks, '0', i18n.DEFAULT_TABLE_HEAD_COLUMNS)).map((title, i) => (
                                <th key={i}>{title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.tasks.map( task => (
                                <tr className={`Task ${_.get(this, 'props.globals.user.isAdmin') ? 'is-clickable': ''}`} key={task.id} onClick={() => this.editTask(task)} >
                                    <Task {...task} />
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                )}
                <TasksListPagination />
                <button className="TasksList__add-button" onClick={this.openAddTaskPopup}>{i18n.ADD_TASK_BUTTON_TEXT}</button>
                {/* $FlowFixMe */}
                <Popup ref={el => this.popup = el}>
                    <TaskEditorForm ref={el => this.taskEditor = el} onSubmit={() => this.popup && this.popup.close() } />
                </Popup>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps({...tasksActions, ...globalsActions}))(TasksList);
