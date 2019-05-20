import React from 'react';

import Header from './Layout/Header/Header';
import Main from './Layout/Main';

const RootComponent = ()=>{
    return (
        <React.Fragment>
            <Header></Header>
            <Main></Main>
        </React.Fragment>
    )
};

export default RootComponent;
