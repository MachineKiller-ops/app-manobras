//import '../index.css';
import '../quadro.css';
import React from 'react';
import * as data from './data.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, // Não remover link pois pode ocorrer erro de referência
    useParams
} from "react-router-dom";


function ListaCriar() {
    
    const items = [...data.default];
    const textStyle = {
        color: 'black',
        textAlign: 'center'
    };
        return (
            items.map(item=>{
                return(
                    <h3 key={item.id} style={textStyle}>
                        <Link to={`/criar/${item.id}`}>{item.nome}</Link>
                   </h3>

                );
                   
            })
        );
}

export default ListaCriar;

