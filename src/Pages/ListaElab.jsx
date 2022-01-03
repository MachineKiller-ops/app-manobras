//import '../index.css';
import React from 'react';
import * as data from './data.json';
import { Link } from 'react-router-dom';


function ListaElab() {

    const items = [...data.default];
    const textStyle = {
        color: 'black',
        textAlign: 'center'
    };
    return (
        items.map(item => {
            return (
                <h3 key={item.id} style={textStyle}>
                    <Link to={`/elabora/${item.id}`}>{item.nome}</Link>
                </h3>

            );

        })
    );
}

export default ListaElab;

