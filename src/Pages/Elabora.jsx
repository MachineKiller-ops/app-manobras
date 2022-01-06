//import '../index.css';
import './quadro.css';
import React, { useState, useEffect } from 'react';
//import * as data from './data.json';
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

import { db } from "../utils/firebase-config"
import { getDatabase, ref, child, get } from "firebase/database";


function Disjuntor(props) {

    //console.log(props)
    let infoDis = JSON.parse(props.disInfo)

    return (
        <>
            <ContextMenuTrigger id={`contextmenu${props.index}`}>  {/* Especifica objeto que será gatilho para context-menu */}
                <div className='equipContainer'>
                    <button
                        className="disjuntor"
                        style={{
                            position: 'absolute',
                            left: `${infoDis.pos[0]}px`, // cria figura do disjuntor na posição passada pela props
                            top: `${infoDis.pos[1]}px`,
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
                        {infoDis.sc !== undefined &&

                            <div
                                style={{
                                    color: infoDis.sc ? 'green' : 'red',// a cor é definida pelo estado do disjuntor
                                    width: '3em',
                                    backgroundColor: 'white'
                                }}
                            >SC
                            </div>
                        }
                        {infoDis.ra !== undefined &&

                            <div
                                style={{
                                    color: infoDis.ra ? 'green' : 'red',// a cor é definida pelo estado do disjuntor
                                    width: '3em',
                                    border: 'none'
                                }}
                            >RA
                            </div>
                        }

                        {infoDis.rn !== undefined &&
                            <div
                                style={{
                                    color: infoDis.rn ? 'green' : 'red',// a cor é definida pelo estado do disjuntor
                                    width: '3em',
                                    border: 'none'
                                }}
                            >RN
                            </div>
                        }

                        {infoDis.c69bc !== undefined &&
                            <div
                                style={{
                                    color: infoDis.c69bc ? 'green' : 'red',// a cor é definida pelo estado do disjuntor
                                    width: '3em',
                                    border: 'none'
                                }}
                            >69BC
                            </div>
                        }

                        {infoDis.c43t !== undefined &&
                            <div
                                style={{
                                    color: infoDis.c43t ? 'green' : 'red',// a cor é definida pelo estado do disjuntor
                                    width: '3em',
                                    border: 'none'
                                }}
                            >43T
                            </div>
                        }
                    </div>
                </div>
            </ContextMenuTrigger>

            <ContextMenu
                id={`contextmenu${props.index}`}
            >
                {infoDis.ra !== undefined &&
                    <MenuItem onClick={() => { props.setRa() }}>
                        <span>{infoDis.ra ? 'Bloquear RA' : 'Desbloquear RA'}</span>
                    </MenuItem>
                }
                {infoDis.rn !== undefined &&
                    <MenuItem onClick={() => { props.setRn() }}>
                        <span>{infoDis.rn ? 'Bloquear RN' : 'Desbloquear RN'}</span>
                    </MenuItem>
                }
                {infoDis.c69bc !== undefined &&
                    <MenuItem onClick={() => { props.set69bc() }}>
                        <span>{infoDis.c69bc ? 'Bloquear relé 87' : 'Desbloquear relé 87'}</span>
                    </MenuItem>
                }
                {infoDis.c43t !== undefined &&
                    <MenuItem onClick={() => { props.set43t() }}>
                        <span>{infoDis.c43t ? 'Tranferir proteção' : 'Normalizar proteção'}</span>
                    </MenuItem>
                }
                <MenuItem onClick={() => { props.setSc() }}>
                    <span>{infoDis.sc ? 'Desabilita Remoto' : 'Habilita Remoto'}</span>
                </MenuItem>
            </ContextMenu>
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
            console.log(disInfo)
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


const Elabora = (props) => {

    let { id } = useParams();

    const handleClickDisj = (i) => {

        if (conf.mapa.disjuntores[i].sc) {
            //alert('O equipamento não pode ser operado, pois está em REMOTO.')
            return
        }

        let itemMan = ''

        let confTemp = conf  // copia conf
        confTemp.mapa.disjuntores[i].estado = confTemp.mapa.disjuntores[i].estado ? 0 : 1; // muda o estado do disjuntor
        setConf({ ...confTemp }) // o spread é necessário para que o react entenda q haja uma mudança e as propague para os componentes, caso isso n seja feito, a mudança n se propaga
        // neste caso o que ocorreu é que o disjuntor não mudava de cor
        console.log('estado: ' + conf.mapa.disjuntores[i].estado);

        itemMan = conf.mapa.disjuntores[i].estado ? 'Fechar disjuntor ' + conf.mapa.disjuntores[i].nome + '4' : 'Abrir disjuntor ' + conf.mapa.disjuntores[i].nome + '4'

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
        if (conf.mapa.disjuntores[i].sc) {
            //alert('O equipamento não pode ser operado, pois está em REMOTO.')
            return
        }

        let itemMan = ''

        let confTemp = conf; // copia conf
        confTemp.mapa.disjuntores[i].ra = !confTemp.mapa.disjuntores[i].ra; // muda o estado do disjuntor
        setConf({ ...confTemp })
        console.log('ra: ' + conf.mapa.disjuntores[i].ra);
        itemMan = conf.mapa.disjuntores[i].ra ? 'Desbloquear RA disjuntor ' + conf.mapa.disjuntores[i].nome + '4' : 'Bloquear RA do disjuntor ' + conf.mapa.disjuntores[i].nome + '4'

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)


    }
    const toggleRn = (i) => {
        if (conf.mapa.disjuntores[i].sc) {
            //alert('O equipamento não pode ser operado, pois está em REMOTO.')
            return
        }

        let itemMan = ''
        let confTemp = conf; // copia conf


        confTemp.mapa.disjuntores[i].rn = !confTemp.mapa.disjuntores[i].rn; // muda o estado do disjuntor
        setConf({ ...confTemp })
        console.log('rn: ' + conf.mapa.disjuntores[i].rn);
        itemMan = conf.mapa.disjuntores[i].rn ? 'Desbloquear RN disjuntor ' + conf.mapa.disjuntores[i].nome + '4' : 'Bloquear RN do disjuntor ' + conf.mapa.disjuntores[i].nome + '4'

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
            + '43SC na posição REMOTO' : 'Colocar chave ' + conf.mapa.disjuntores[i].nome + '43SC na posição LOCAL'

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }

    const toggle43t = (i) => {
        if (conf.mapa.disjuntores[i].sc) {
            //alert('O equipamento não pode ser operado, pois está em REMOTO.')
            return
        }

        let itemMan = ''

        let confTemp = conf
        confTemp.mapa.disjuntores[i].c43t = !confTemp.mapa.disjuntores[i].c43t;
        setConf({ ...confTemp })

        console.log('sc: ' + conf.mapa.disjuntores[i].c43t);
        itemMan = conf.mapa.disjuntores[i].c43t ? 'Colocar chave ' + conf.mapa.disjuntores[i].nome
            + '43T na posição NORMAL' : 'Colocar chave ' + conf.mapa.disjuntores[i].nome + '43T na posição TRANSFERE.'

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }

    const toggle69bc = (i) => {
        if (conf.mapa.disjuntores[i].sc) {
            //alert('O equipamento não pode ser operado, pois está em REMOTO.')
            return
        }

        let itemMan = ''

        let confTemp = conf
        confTemp.mapa.disjuntores[i].c69bc = !confTemp.mapa.disjuntores[i].c69bc;
        setConf({ ...confTemp })

        console.log('sc: ' + conf.mapa.disjuntores[i].c69bc);
        itemMan = conf.mapa.disjuntores[i].c69bc ? 'Colocar chave ' + conf.mapa.disjuntores[i].nome
            + '69BC na posição DESLIGADA' : 'Colocar chave ' + conf.mapa.disjuntores[i].nome + '69BC na posição LIGADA.'

        setSeqMan(seqManobra.concat(itemMan))
        setStepNumber(stepNumber + 1)

    }


    const [conf, setConf] = useState()
    const [isLoading, setLoading] = useState(true)

    //Carrega o banco de dados com as configurações das subestações
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                setConf(snapshot.val().find(substation => substation.id === id)) // separa os dados de configuração da SE)
                setLoading(false) //Evita que o componente seja renderizado antes de se obter a configuração
                console.log(conf)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])


    const [stepNumber, setStepNumber] = useState(0)
    const [seqManobra, setSeqMan] = useState([])



    const fileName = 'Sequência de Manobras'

    const mudaItem = (i, text) => {
        console.log('item de manobra' + i)
        const newSeq = seqManobra.slice()

        newSeq[i] = text
        console.log(newSeq)
        console.log(seqManobra)
        setSeqMan(newSeq)
    }

    const addLinha = (i) => {
        const newSeq = seqManobra.slice()
        newSeq.splice(i + 1, 0, '')
        setSeqMan(newSeq)
    }

    const removeLinha = (i) => {
        const newSeq = seqManobra.slice()
        newSeq.splice(i, 1)
        console.log(newSeq)
        setSeqMan(newSeq)
    }

    //Evita que o componente seja renderizado antes que a configuração da SE seja carregada
    if (isLoading) {
        return null;
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
                        set69bc={i => { toggle69bc(i) }}
                        set43t={i => { toggle43t(i) }}
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
                    <MostraSM data={seqManobra} mudaItem={(i, text) => { mudaItem(i, text) }} addLinha={i => addLinha(i)} removeLinha={i => removeLinha(i)} />
                </div>
                <div>
                    <ExportCSV csvData={seqManobra} fileName={fileName} />
                </div>
            </div>


        </div>



    )
}


export default Elabora;