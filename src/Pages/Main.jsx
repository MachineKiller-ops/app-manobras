import React, { useState, useEffect, useRef } from 'react';
import { db } from "../utils/firebase-config"
import { getDatabase, ref, child, get } from "firebase/database";
import axios from 'axios';

const Main = () => {

    //const [title, setTitle] = useState('Geil')
    //const [conf, setConf] = useState()
    let sequencia = new Array('Abrir chave', 'fechar cahve')
    const json = JSON.stringify(sequencia);
    console.log(json)

    /* useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setConf(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []) */

    const handleClick = () => {
        /*    var request = new XMLHttpRequest();
           request.open('GET', 'http://localhost:5000/', true);
           request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
           request.send(JSON.stringify(sequencia));
           console.log(JSON.stringify(sequencia))
    */

        // first try
        /* fetch('http://127.0.0.1:5000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

 */

        // second try
        //axios.post('https://python-server-app-manobras.herokuapp.com/', json, {
        axios.post('http://127.0.0.1:5005/', json, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Sequencia_de_manobras.xlsx`);
            document.body.appendChild(link);
            link.click();
            console.log(link)
        });

    }


    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                background: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            <div style={{
                padding: '5em'
            }}>
                <h3 style={{
                    textAlign: 'center',
                    color: 'black',
                    margin: '0 20%',
                    padding: '5em',
                    border: '2px solid black'
                }} >"Loading..."</h3>

            </div>
            <button style={{
                padding: '2em',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }} onClick={handleClick} >Click me!</button>

        </div>
    );
}

export default Main;