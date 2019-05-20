// @flow
import React, {Component} from 'react';
import config from '../../../config';

import type {Node} from 'react';
import type {TaskType, GlobalsType} from '../../../flow-typed/app.flow';

import {mapStateToProps, mapDispatchToProps} from '../../../redux/store';
import {connect} from 'react-redux';
import * as tasksActions from '../../../redux/actions/tasks';

import './TasksListPagination.css';

opaque type Props = {
    tasks: TaskType[],
    globals: GlobalsType
}
opaque type State = {}

class TasksListPagination extends Component<Props, State> {

    changePage(page) {
        window.location.hash = `/${page}`;
    }

    shouldRenderButton = (buttonNumber: number, pagesCount: number): boolean => {
        const {globals: {totalTasksCount, page} } = this.props;
        return (page + 2 > buttonNumber && buttonNumber > page - 2)
            || (pagesCount === buttonNumber)
            || (buttonNumber === 1);
    };

    render(): Node {
        const {tasks, globals: {totalTasksCount, page} } = this.props;
        const totalTasks = totalTasksCount || (tasks ? tasks.length : 0);
        const pagesCount = Math.ceil(totalTasks / config.tasksPerPage);

        return pagesCount > 1 ? (
            <div className="TasksListPagination">
                {Array.from({length: pagesCount}).map((empty, index) =>
                    this.shouldRenderButton(index + 1, pagesCount) ? (
                        <div
                            key={index + 1}
                            onClick={() => this.changePage(index + 1)}
                            className={`TasksListPagination__button ${index + 1 === page ? 'TasksListPagination__button--active' : ''}`}>{index + 1}
                        </div>
                    ) : (
                        this.shouldRenderButton(index + 2, pagesCount) && <div key={index + 1} className="TasksListPagination__tree-dots">...</div>
                    )
                    )}
            </div>
        ) : null;
    }
}

export default  connect(mapStateToProps, mapDispatchToProps(tasksActions))(TasksListPagination);
