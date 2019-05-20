// @flow
import React, {Component} from 'react';
import './HomePage.css';
import TasksList from '../UI/Tasks/TasksList';

import store, {mapStateToProps, mapDispatchToProps} from '../../redux/store';
import {connect} from 'react-redux';
import * as tasksActions from '../../redux/actions/tasks';
import * as globalsActions from '../../redux/actions/globals';

import type {GlobalsType, TaskType} from '../../flow-typed/app.flow';

type Props = {
    tasks: Array<TaskType>,
    fetchTasks: Function,
    setPage: Function,
    match: Object,
    globals: GlobalsType,
    location: ?string
}

class HomePage extends Component<Props> {

    componentDidMount() {
        if (!this.props.tasks) {
            this.fetchTasks();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.fetchTasks();
        }
    }

    fetchTasks = () => {
        const page = +this.props.match.params.page || 1;
        this.props.fetchTasks({page});
    };

    render() {
        return (
            <div className="HomePage">
                <TasksList tasks={this.props.tasks} />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps({...tasksActions, ...globalsActions}))(HomePage);
