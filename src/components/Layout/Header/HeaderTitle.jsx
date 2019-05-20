import React from 'react';
import './HeaderTitle.css';
import i18n from '../../../i18n';

const HeaderTitle = () => {
    return (
        <div className="HeaderTitle">
            <div className="subtitle">{i18n.HEADER_SUBTITLE}</div>
            <div className="title">{i18n.HEADER_TITLE}</div>
        </div>);
};

export default HeaderTitle;
