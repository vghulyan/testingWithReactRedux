import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.svg';

const Header = (props) => {
    return (
        <header>
            <div className="wrap">
                <div className="logo">
                    <img src={Logo} alt="Logo" className="img" />
                </div>
            </div>
        </header>
    )
};

export default Header;
