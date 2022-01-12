import React from 'react';
import '../nav.css'
import { Link } from 'react-router-dom';

const Nav = () => {


    return (
        <nav className="navs">
            <h1>CEMIG DISTRIBUIÇÃO</h1>
            <ul className="nav-links">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/elabora">
                    <li>Elaborar</li>
                </Link>
                {<Link to="/configurase">
                    <li>Configurar</li>
                </Link>}
                <Link to="/criar">
                    <li>Criar</li>
                </Link>


            </ul>
        </nav>
    );
}

export default Nav;