import React from 'react';
import '../nav.css'
import { Link } from 'react-router-dom';

const Nav = () => {


    return (
        <nav>
            <h1>CEMIG DISTRIBUIÇÃO</h1>
            <ul className="nav-links">
                <Link to="/">
                    <li><span>Home</span></li>
                </Link>
                <Link to="/elabora">
                    <li>Elaborar</li>
                </Link>
                <Link to="/simula">
                    <li>Simular</li>
                </Link>
                {/*<Link to="/configurase">
                    <li>Configurar</li>
                </Link> */}


            </ul>
        </nav>
    );
}

export default Nav;