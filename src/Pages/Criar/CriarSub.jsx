//import '../index.css';
import '../quadro.css';
import React, { useState } from 'react';
import * as data from './data.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, // Não remover link pois pode ocorrer erro de referência
    useParams
} from "react-router-dom";

import chaveAberta from '../chave_aberta.png'; // Tell Webpack this JS file uses this image
import chaveFechada from '../chave_fechada.png'; // Tell Webpack this JS file uses this image

function Disjuntor(props) {

    let infoDis = JSON.parse(props.disInfo)

    return (
        <>
                <div className='equipContainer'>
                    <button
                        className="disjuntor"
                        style={{
                            position: 'absolute',
                            left: `${infoDis.pos[0]}px`, // cria figura do disjuntor na posição passada pela props
                            top: `${infoDis.pos[1]}px`,
                            width: '20px',
                            height: '20px',
                            backgroundColor: infoDis.estado ? 'red' : 'green'// a cor é definida pelo estado do disjuntor
                        }}
                        onClick={() => props.onClick()}
                    >
                        {props.index}
                    </button>
                    <div
                        className="opcoes"
                        style={{
                            fontFamily: 'arial',
                            position: 'absolute',
                            left: `${infoDis.pos[0] + 50}px`, // cria figura do disjuntor na posição passada pela props
                            top: `${infoDis.pos[1]}px`,
                            backgroundColor: 'white',
                            display: 'block'
                        }}
                    >
                    </div>
                </div>

        </>
    );
}



const DiagramaDisj = (props) => {


    const renderDisjuntor = (disInfo, index) => {

        return <Disjuntor
            disInfo={disInfo}
            index={index}
            onClick={() => props.onClick(index)}
            setRa={() => props.setRa(index)}
            setRn={() => props.setRn(index)}
            setSc={() => props.setSc(index)}
            set43t={() => props.set43t(index)}
            set69bc={() => props.set69bc(index)}
        />;
    }


    const mapa = JSON.parse(props.v); // (des)converte de JSON para objeto
    return (

        mapa.map((dis, index) => { // cria loop em que se lê todos os disjuntores chamando a função de renderização para cada um deles
            let disInfo = JSON.stringify(dis)
            return (
                <div key={index}>
                    {renderDisjuntor(disInfo, index)}
                </div>
            );
        })
    );
}

function Seccionadora(props) {

    const estiloChave = {
        position: 'absolute',
        left: `${props.x}px`, // cria figura do disjuntor na posição passada pela props
        top: `${props.y}px`,
        transform: props.horiz ? "rotate(90deg)" : "rotate(0deg)",
        content: props.estado ? `url(${chaveFechada})` : `url(${chaveAberta})` // a cor é definida pelo estado do disjuntor
    }
    return (
        <>
            <div
                className="seccionadora"
                style={estiloChave}
                onClick={() => props.onClick()}
            >
                {props.index}
            </div>
        </>
    );
}

const DiagramaSecc = (props) => {


    const renderSecc = (x, y, estado, horiz, index) => {

        return <Seccionadora
            x={x} // envia coordenadas x e y para renderizar disjuntor
            y={y}
            estado={estado}
            index={index}
            horiz={horiz}
            onClick={() => props.onClick(index)}

        />;
    }


    const mapa = JSON.parse(props.v); // (des)converte de JSON para objeto

    return (

        mapa.map((dis, index) => { // cria loop em que se lê todos os disjuntores chamando a função de renderização para cada um deles
            return (
                <div key={index}>
                    {renderSecc(dis.pos[0], dis.pos[1], dis.estado, dis.horizontal, index)}
                </div>
            );
        })
    );
}


const CriarSub = (props) => {
    
    let { id } = useParams();
    const [conf, setConf] = useState(data.default.find(conf => conf.id === id));
    
    return (
            <div>
                <h3>CONFIGURAR SUBESTAÇÃO</h3>
                <div className="image-container">
                    <div className="image-inner-container">
                        <img 
                            src={process.env.PUBLIC_URL
                            + "/img/" + conf.id + ".png"} alt="" />
                        <DiagramaDisj
                        v={JSON.stringify(conf.mapa.disjuntores)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                    />
                    <DiagramaSecc
                        v={JSON.stringify(conf.mapa.seccionadoras)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                    />
                    </div>
                </div>
            </div>
                    


    )
    
}


export default CriarSub;