// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import type {Node} from 'react';

import './Popup.css';

opaque type PopupProps = {
    ref: ?Node,
    children?: Node
};

opaque type PopupState = {
    opened: boolean
};

class Popup extends React.Component<PopupProps, PopupState> {
    state = {
        opened: false
    };

    open = () => {
        this.setState({opened: true});
    };

    close = () => {
        this.setState({opened: false});
    };

    render() {
        return ReactDOM.createPortal(
            (
                <div className={`Popup ${this.state.opened ? 'is-opened' : ''}`}>
                    <div role="button" tabIndex="0" className="Popup__close" onClick={this.close}>x</div>
                    <div className="Popup__content">
                        {this.props.children}
                    </div>
                </div>
            ),
            window.document.body
        );
    }
}

export default Popup;
