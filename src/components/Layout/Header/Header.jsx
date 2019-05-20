import React from "react";
import './Header.css';
import Logo from './Logo';
import HeaderTitle from './HeaderTitle';
import Navigation from './Navigation';
import Login from './Login';

const Header = () => {
    return (
        <div className="Header">
            <div className="block">
                <Logo></Logo>
                <HeaderTitle></HeaderTitle>
                <Navigation></Navigation>
            </div>
            <div className="block">
                <Login></Login>
            </div>
        </div>
    );
}

export default Header;