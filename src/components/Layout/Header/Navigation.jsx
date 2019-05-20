// @flow
import React from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom';
import i18n from '../../../i18n';

type Nav = {
    id: number,
    title: string,
    path: string
}

const NAVIGATION: Array<Nav> = [
    {
        id: 1,
        title: i18n.TASKS,
        path: '/'
    }
];

const Navigation = () => {
    return (
        <ul className="Navigation">
            {
                NAVIGATION.map((item) =>
                    <li className="item" key={item.id}>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                )
            }
        </ul>
    );
};

export default Navigation;
