import '../index.css';
import React from 'react';
import * as data from './data.json';
import { Link } from 'react-router-dom';


function Lista() {
    
    const items = [...data.default];
    const textStyle = {
        color: 'black',
        textAlign: 'center'
    };
        return (
            items.map(item=>{
                return(
                    <h3 key={item.nome} style={textStyle}>
                        <Link to={`/simula/${item.nome}`}>{item.nome}</Link>
                   </h3>

                );
                   
            })
        );
}

export default Lista;

