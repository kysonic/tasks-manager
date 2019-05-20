import React from "react";
import "./Logo.css";
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <div className="Logo">
                <img src={logo} alt="Task Manger Logo"/>
                <h1 className="indent">Task Manger Logotype</h1>
            </div>
        </Link>
    );
}

export default Logo;
