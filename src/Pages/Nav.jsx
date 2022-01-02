import React from 'react';
import '../nav.css'
import { Link } from 'react-router-dom';

const Nav = (props) => {

    const navStyle = {
        color: 'white'
    };
    return (
        <nav>
            <h1>CEMIG DISTRIBUIÇÃO</h1>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/elabora">
                    <li>Elaborar</li>
                </Link>
                <Link style={navStyle} to="/simula">
                    <li>Simular</li>
                </Link>
                <Link style={navStyle} to="/configurase">
                    <li>Configurar</li>
                </Link>


            </ul>
        </nav>
    );
}

export default Nav;