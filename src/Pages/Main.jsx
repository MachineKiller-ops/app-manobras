import React, { useState, useEffect, useRef } from 'react';
import { db } from "../utils/firebase-config"
import { getDatabase, ref, child, get } from "firebase/database";

const Main = () => {

    const [title, setTitle] = useState('Geil')
    const [conf, setConf] = useState()
    useEffect(() => {
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
    }, [])

    const handleClick = () => {
        /* const seRef = db.database().ref("ses")
        const todo = {
            title,
            complete: false,
        }
        seRef.push(todo) 
        let conf
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                conf = snapshot.val()
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        */
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
                }} >{!conf ? "Loading..." : JSON.stringify(conf)}</h3>

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