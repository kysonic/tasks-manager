import React from 'react';
import './Error.css';

export default function Error(props) {
    return (
        <div className={`Error ${props.className}`}>
            <div className="Error__message">{props.message}</div>
        </div>
    )
}
