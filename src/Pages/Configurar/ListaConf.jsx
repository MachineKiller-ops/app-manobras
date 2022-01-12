//import '../index.css';
import React, { useState, useEffect } from 'react';
//import * as data from '../data.json';
import { Link } from 'react-router-dom';
import { db } from "../../utils/firebase-config"
import { getDatabase, ref, child, get } from "firebase/database";

function ListaConf() {

    const [items, setItems] = useState()
    const [isLoading, setLoading] = useState(true)

    //Carrega o banco de dados com as configurações das subestações
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                setItems(snapshot.val()) // separa os dados de configuração da SE)
                setLoading(false) //Evita que o componente seja renderizado antes de se obter a configuração
                console.log(items)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const textStyle = {
        display: "inline-block",
        color: "white",
        textDecoration: "none",
        border: "none",
        width: "150px",
        padding: "20px",
        backgroundColor: "rgb(69, 172, 91)",
        borderRadius: "5px"
    };

    if (isLoading) {
        return null;
    }

    return (

        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto' }}
        >

            {items.map(item => {
                return (
                    <h3 key={item.id} >
                        <Link style={textStyle} to={`/configurase/${item.id}`}>{item.nome}</Link>
                    </h3>

                );

            })}
        </div>
    );
}

export default ListaConf;

