import React, { useState, useEffect } from 'react';
//import { auth, firestore } from '../App'

/* import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore' */

const Main = () => {
    /* const [data, setData] = useState();
    const [count, setCount] = useState(0);
    const atualizaServer = () => {
        setCount(count + 1);
        fetch("/api/bhat")
            .then((res) => res.json())
            .then((data) => setData(data.nome));
    }

    useEffect(() => {
        fetch("/api/betq")
            .then((res) => res.json())
            .then((data) => setData(data.nome));
    }, []);

    const messagesRef = firestore.collection('SEs')
    const query = messagesRef

    const [messages] = useCollectionData(query)

    console.log(messages) */


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
                }} >Hello</h3>

            </div>
            <button style={{
                padding: '2em',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }} /* onClick={atualizaServer} */ >Click me!</button>

        </div>
    );
}

export default Main;