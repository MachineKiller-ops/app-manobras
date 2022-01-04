//import '../index.css';
import React from 'react';
import * as data from './data.json';
import { Link } from 'react-router-dom';


function ListaElab() {

    const items = [...data.default];
    const textStyle = {
        display: "inline-block",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textDecoration: "none",
        border: "none",
        width: "150px",
        padding: "20px",
        backgroundColor: "rgb(69, 172, 91)",
        borderRadius: "5px"
    };
    return (
        items.map(item => {
            return (
                <h3 key={item.id} >
                    <Link style={textStyle} to={`/elabora/${item.id}`}>{item.nome}</Link>
                </h3>

            );

        })
    );
}

export default ListaElab;

