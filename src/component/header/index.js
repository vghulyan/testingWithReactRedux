import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.svg';

const Header = (props) => {
    return (
        <header data-test='headerComponent'>
            <div className="wrap">
                <div className="logo">
                    <img data-test='logoIMG' src={Logo} alt="Logo" />
                </div>
            </div>
        </header>
    )
};

export default Header;
