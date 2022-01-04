//import '../index.css';
import './quadro.css';
import React, { useState } from 'react';
import * as data from './data.json';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { ExportCSV } from '../ExportCSV';
import { MostraSM } from '../MostraSM';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, // Não remover link pois pode ocorrer erro de referência
    useParams
} from "react-router-dom";
import chaveAberta from './chave_aberta.png'; // Tell Webpack this JS file uses this image
import chaveFechada from './chave_fechada.png'; // Tell Webpack this JS file uses this image
//import { auth, firestore } from '../App'

/* import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore' */


function Disjuntor(props) {

    //console.log(props)

    return (
        <>
            <ContextMenuTrigger id={`contextmenu${props.index}`}>  {/* Especifica objeto que será gatilho para context-menu */}
                <button
                    className="disjuntor"
                    style={{
                        position: 'absolute',
                        left: `${props.x}px`, // cria figura do disjuntor na posição passada pela props
                        top: `${props.y}px`,
                        backgroundColor: props.estado ? 'red' : 'green'// a cor é definida pelo estado do disjuntor
                    }}
                    onClick={() => props.onClick()}
                >
                    {props.index}
                </button>
            </ContextMenuTrigger>

            <ContextMenu id={`contextmenu${props.index}`}>
                <MenuItem onClick={() => { props.setRa() }}>
                    <span>{props.ra ? 'Bloquear RA' : 'Desbloquear RA'}</span>
                </MenuItem>
                <MenuItem onClick={() => { props.setRn() }}>
                    <span>{props.rn ? 'Bloquear RN' : 'Desbloquear RN'}</span>
                </MenuItem>
                <MenuItem onClick={() => { props.setSc() }}>
                    <span>{props.sc ? 'Desabilita Remoto' : 'Habilita Remoto'}</span>
                </MenuItem>
            </ContextMenu>
        </>
    );
}



const DiagramaDisj = (props) => {


    const renderDisjuntor = (x, y, estado, ra, rn, sc, index) => {

        return <Disjuntor
            x={x} // envia coordenadas x e y para renderizar disjuntor
            y={y}
            estado={estado}
            ra={ra}
            rn={rn}
            sc={sc}
            index={index}
            onClick={() => props.onClick(index)}
            setRa={() => props.setRa(index)}
            setRn={() => props.setRn(index)}
            setSc={() => props.setSc(index)}
        />;
    }


    const mapa = JSON.parse(props.v); // (des)converte de JSON para objeto
    return (

        mapa.map((dis, index) => { // cria loop em que se lê todos os disjuntores chamando a função de renderização para cada um deles
            return (
                <div key={index}>
                    {renderDisjuntor(dis.pos[0], dis.pos[1], dis.estado, dis.ra, dis.rn, dis.sc, index)}
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
        //content: props.estado ? "url('./chave_fechada.png')" : "url('./chave_aberta.png')" // a cor é definida pelo estado do disjuntor
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


    const renderSecc = (x, y, estado, index) => {

        return <Seccionadora
            x={x} // envia coordenadas x e y para renderizar disjuntor
            y={y}
            estado={estado}
            index={index}
            onClick={() => props.onClick(index)}

        />;
    }


    const mapa = JSON.parse(props.v); // (des)converte de JSON para objeto

    return (

        mapa.map((dis, index) => { // cria loop em que se lê todos os disjuntores chamando a função de renderização para cada um deles
            return (
                <div key={index}>
                    {renderSecc(dis.pos[0], dis.pos[1], dis.estado, index)}
                </div>
            );
        })
    );
}


const Elabora = (props) => {

    let { id } = useParams();

    const handleClickDisj = (i) => {

        let itemMan = ''

        let confTemp = conf  // copia conf
        confTemp.mapa.disjuntores[i].estado = confTemp.mapa.disjuntores[i].estado ? 0 : 1; // muda o estado do disjuntor
        setConf({ ...confTemp }) // o spread é necessário para que o react entenda q haja uma mudança e as propague para os componentes, caso isso n seja feito, a mudança n se propaga
        // neste caso o que ocorreu é que o disjuntor não mudava de cor
        console.log('estado: ' + conf.mapa.disjuntores[i].estado);

        itemMan = conf.mapa.disjuntores[i].estado ? 'Fechar disjuntor ' + conf.mapa.disjuntores[i].nome : 'Abrir disjuntor ' + conf.mapa.disjuntores[i].nome

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

        console.log(seqManobra)


    }
    const handleClickSecc = (i) => {

        let itemMan = ''
        let confTemp = conf; // copia conf


        confTemp.mapa.seccionadoras[i].estado = confTemp.mapa.seccionadoras[i].estado ? 0 : 1; // muda o estado do disjuntor
        setConf({ ...confTemp })
        console.log('estado: ' + conf.mapa.seccionadoras[i].estado);
        itemMan = conf.mapa.seccionadoras[i].estado ? 'Fechar chave seccionadora ' + conf.mapa.seccionadoras[i].nome : 'Abrir chave seccionadora ' + conf.mapa.seccionadoras[i].nome

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }
    const toggleRa = (i) => {

        let itemMan = ''

        let confTemp = conf; // copia conf
        confTemp.mapa.disjuntores[i].ra = !confTemp.mapa.disjuntores[i].ra; // muda o estado do disjuntor
        setConf({ ...confTemp })
        console.log('ra: ' + conf.mapa.disjuntores[i].ra);
        itemMan = conf.mapa.disjuntores[i].ra ? 'Desbloquear RA disjuntor ' + conf.mapa.disjuntores[i].nome : 'Bloquear RA do disjuntor ' + conf.mapa.disjuntores[i].nome

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)


    }
    const toggleRn = (i) => {

        let itemMan = ''
        let confTemp = conf; // copia conf


        confTemp.mapa.disjuntores[i].rn = !confTemp.mapa.disjuntores[i].rn; // muda o estado do disjuntor
        setConf({ ...confTemp })
        console.log('rn: ' + conf.mapa.disjuntores[i].rn);
        itemMan = conf.mapa.disjuntores[i].rn ? 'Desbloquear RN disjuntor ' + conf.mapa.disjuntores[i].nome : 'Bloquear RN do disjuntor ' + conf.mapa.disjuntores[i].nome

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }
    const toggleSc = (i) => {

        let itemMan = ''

        let confTemp = conf
        confTemp.mapa.disjuntores[i].sc = !confTemp.mapa.disjuntores[i].sc;
        setConf({ ...confTemp })

        console.log('sc: ' + conf.mapa.disjuntores[i].sc);
        itemMan = conf.mapa.disjuntores[i].sc ? 'Colocar chave ' + conf.mapa.disjuntores[i].nome
            + '3SC na posição REMOTO' : 'Colocar chave ' + conf.mapa.disjuntores[i].nome + '3SC na posição LOCAL'

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }
    const [conf, setConf] = useState(data.default.find(conf => conf.id === id)) // separa os dados de configuração da SE)
    const [stepNumber, setStepNumber] = useState(0)
    const [seqManobra, setSeqMan] = useState([])

    //console.log(conf)

    const fileName = 'TechnicalAddaBetter'

    /*     const messagesRef = firestore.collection('SEs')
        const query = messagesRef
    
        const [messages] = useCollectionData(query) */

    const mudaItem = (i, text) => {
        console.log('item de manobra' + i)
        const newSeq = seqManobra.slice()

        newSeq[i] = text
        console.log(newSeq)
        console.log(seqManobra)
        setSeqMan(newSeq)
        //const newHistory = history
        //console.log(history[history.length - 1].seqMan[i])
        //newHistory[history.length - 1].seqMan[i] = e
        //console.log('primeiro' + newHistory[history.length - 1].seqMan[i])
        //console.log(newHistory[history.length - 1])

        //setHistory({ ...newHistory })

    }

    return (
        <div>
            <div className="image-container">
                <div className="image-inner-container">
                    <img src={process.env.PUBLIC_URL
                        + "/img/" + conf.id + ".png"} alt="" />
                    <DiagramaDisj
                        v={JSON.stringify(conf.mapa.disjuntores)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                        onClick={i => { handleClickDisj(i) }}
                        setRa={i => { toggleRa(i) }}
                        setRn={i => { toggleRn(i) }}
                        setSc={i => { toggleSc(i) }}
                    />
                    <DiagramaSecc
                        v={JSON.stringify(conf.mapa.seccionadoras)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                        onClick={i => { handleClickSecc(i) }}
                    />



                </div>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'

            }}>
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'


                }}>
                    <MostraSM data={seqManobra} mudaItem={(i, text) => { mudaItem(i, text) }} />
                </div>
                <div>
                    <ExportCSV csvData={seqManobra} fileName={fileName} />
                </div>
            </div>


        </div>



    )
}


export default Elabora;