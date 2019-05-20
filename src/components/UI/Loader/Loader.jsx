import React from 'react';
import loaderPNG from '../../../assets/loader.gif';
import './Loader.css';

export default function Loader(props) {
    return (
        <div className={`Loader ${props.className}`}>
            <div className="Loader__gif" style={{backgroundImage:`url(${loaderPNG})`}}></div>
        </div>
    )
}
