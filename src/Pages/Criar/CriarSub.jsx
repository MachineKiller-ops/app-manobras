//import '../index.css';
import './criar.css';
import React, { useState, Component, useEffect } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import * as data from './data.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, // Não remover link pois pode ocorrer erro de referência
    useParams
} from "react-router-dom";
import Draggable from "react-draggable";
import { SalvaConf } from './SalvaConf';
import { AddDis } from './AddDis';
import { AddSec } from './AddSec';

import chaveAberta from './chave_aberta.png'; // Tell Webpack this JS file uses this image
import chaveFechada from './chave_fechada.png'; // Tell Webpack this JS file uses this image
import chaveAberta1 from './chave_aberta1.png'; // Tell Webpack this JS file uses this image
import chaveFechada1 from './chave_fechada1.png'; // Tell Webpack this JS file uses this image

import { db } from "../../utils/firebase-config"
import { getDatabase, ref, child, get } from "firebase/database";

class Disjuntor extends Component {

    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: this.props.x, y: this.props.y
        }
    };

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = this.state.controlledPosition;
        this.setState({ controlledPosition: { x: x, y } });
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const { x, y } = controlledPosition;
        this.setState({ controlledPosition: { x, y: y } });
    };

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
        let posicao = JSON.stringify({ ...this.state.controlledPosition, index: this.props.index })
        this.props.setaValor(posicao)
    };


    render = () => {

        let infoDis = JSON.parse(this.props.disInfo)
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        //const { deltaPosition, controlledPosition } = this.state;
        //this.setState({ controlledPosition: { x: infoDis.pos[0], y: infoDis.pos[1] } });
        const controlledPosition = this.state.controlledPosition;

        return (
            <>

                <Draggable
                    //position={controlledPosition} 
                    defaultPosition={{ x: infoDis.pos[0], y: infoDis.pos[1] }}
                    {...dragHandlers} onDrag={this.onControlledDrag}>

                    <div className='equipContainer'>
                        <button
                            className="disjuntor"
                            style={{
                                position: 'absolute',
                                width: `${this.props.escala * 20}px`,
                                height: `${this.props.escala * 20}px`,
                                backgroundColor: infoDis.estado ? 'red' : 'green'// a cor é definida pelo estado do disjuntor
                            }}
                        //onClick={() => this.state.onClick()}
                        >
                            {this.props.index}
                            {/*  <div>
                                <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
                            </div>
                            <div>
                                <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
                            </div> */}
                        </button>
                        {/* <div
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
                    </div> */}
                    </div>
                </Draggable>

            </>
        );
    }

}


const DiagramaDisj = (props) => {

    //let valor = 0
    /* const recebeValor = (valor) => {
        console.log('Esse é o valor da função ' + JSON.parse(valor).x + ' e ' + JSON.parse(valor).x)

    } */
    const renderDisjuntor = (disInfo, x, y, index) => {

        return <Disjuntor
            disInfo={disInfo}
            x={x}
            y={y}
            index={index}
            escala={props.escala}
            setaValor={props.setaValor}
            onClick={() => props.onClick(index)}
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
                    {renderDisjuntor(disInfo, dis.pos[0], dis.pos[1], index)}
                </div>
            );
        })
    );
}

class Seccionadora extends Component {

    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: this.props.x, y: this.props.y
        }
    };

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = this.state.controlledPosition;
        this.setState({ controlledPosition: { x: x, y } });
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const { x, y } = controlledPosition;
        this.setState({ controlledPosition: { x, y: y } });
    };

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
        let posicao = JSON.stringify({ ...this.state.controlledPosition, index: this.props.index })
        this.props.setaValor(posicao)
    };


    render = () => {
        let cf, ca
        if (this.props.horiz) {
            cf = chaveFechada1
            ca = chaveAberta1
        } else {
            cf = chaveFechada
            ca = chaveAberta
        }

        //let infoDis = JSON.parse(this.props.disInfo)
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const controlledPosition = this.state.controlledPosition;

        const estiloChave = {
            position: 'absolute',
            //transform: `scale(${this.props.escala})`,
            content: this.props.estado ? `url(${cf})` : `url(${ca})` // a cor é definida pelo estado do disjuntor
        }
        return (
            <div>

                <ContextMenuTrigger id={`contextmenu${this.props.index}`}>
                    <Draggable
                        //position={controlledPosition} 
                        defaultPosition={{ x: this.props.x, y: this.props.y }}
                        scale={this.props.escala}
                        {...dragHandlers} onDrag={this.onControlledDrag}>
                        <div>

                            <div // É preciso duas DIVs para que o transform: rotate() funcione
                                className="seccionadora"
                                style={estiloChave}
                            >

                            </div>
                            <div style={{ color: 'red', position: 'absolute', textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff', justifyContent: 'center' }}>
                                {this.props.index}
                            </div>
                        </div>
                    </Draggable>
                </ContextMenuTrigger>

                <ContextMenu
                    id={`contextmenu${this.props.index}`}
                >
                    <MenuItem onClick={() => { this.props.setTurn() }}>
                        <span>Gira 90º</span>
                    </MenuItem>
                </ContextMenu>




            </div>
        );
    }
}

const DiagramaSecc = (props) => {


    const renderSecc = (x, y, estado, horiz, index) => {

        return <Seccionadora
            x={x} // envia coordenadas x e y para renderizar disjuntor
            y={y}
            estado={estado}
            setaValor={props.setaValor}
            setTurn={() => props.setTurn(index)}
            escala={props.escala}
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
    //const [conf, setConf] = useState(data.default.find(conf => conf.id === id));
    const [conf, setConf] = useState();
    const [isLoading, setLoading] = useState(true)


    //Carrega o banco de dados com as configurações das subestações
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                setConf(snapshot.val().find(substation => substation.id === id)) // separa os dados de configuração da SE)
                setLoading(false) //Evita que o componente seja renderizado antes de se obter a configuração
                console.log(conf) // Gera undefined pois a SE é carregada de maneira assincrona
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const recebeDis = (valorStr) => {
        //console.log('Esse é o valor da função ' + JSON.parse(valor).controlledPosition.x + ' e ' + JSON.parse(valor).controlledPosition.y)
        console.log(JSON.parse(valorStr))
        let dados = JSON.parse(valorStr)
        let confTemp = conf; // copia conf
        confTemp.mapa.disjuntores[dados.index].pos[0] = dados.x
        confTemp.mapa.disjuntores[dados.index].pos[1] = dados.y
        setConf({ ...confTemp })

    }

    const recebeSec = (valorStr) => {
        //console.log('Esse é o valor da função ' + JSON.parse(valor).controlledPosition.x + ' e ' + JSON.parse(valor).controlledPosition.y)
        console.log(JSON.parse(valorStr))
        let dados = JSON.parse(valorStr)
        let confTemp = conf; // copia conf
        confTemp.mapa.seccionadoras[dados.index].pos[0] = dados.x
        confTemp.mapa.seccionadoras[dados.index].pos[1] = dados.y
        setConf({ ...confTemp })

    }

    const toggleGira = (i) => {

        let confTemp = conf
        confTemp.mapa.seccionadoras[i].horizontal = !confTemp.mapa.seccionadoras[i].horizontal;
        setConf({ ...confTemp })

        console.log('horizontal: ' + conf.mapa.seccionadoras[i].horizontal);

    }

    const aumentaEscala = () => {
        let confTemp = conf
        confTemp.escala = confTemp.escala + 0.1
        setConf({ ...confTemp })
        console.log(conf.escala)
    }
    const diminuiEscala = () => {
        let confTemp = conf
        confTemp.escala = confTemp.escala - 0.1
        setConf({ ...confTemp })
        console.log(conf.escala)
    }
    //console.log(conf.escala)
    //Evita que o componente seja renderizado antes que a configuração da SE seja carregada
    if (isLoading) {
        return null;
    }

    return (
        <div>
            <div className="outter-container"
            >
                <div
                    className="inner-container"
                    style={{
                        backgroundImage: `url("${process.env.PUBLIC_URL}/img/${conf.id}.png")`
                    }}

                >
                    <DiagramaDisj
                        v={JSON.stringify(conf.mapa.disjuntores)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                        escala={conf.escala}
                        setaValor={recebeDis}
                    />
                    <DiagramaSecc
                        v={JSON.stringify(conf.mapa.seccionadoras)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                        escala={conf.escala}
                        setaValor={recebeSec}
                        setTurn={i => { toggleGira(i) }}
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '675px'
                    }}>
                        <SalvaConf conf={conf} id={id} />


                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '-1400px',
                            marginTop: '-600px',
                            flexDirection: 'column'
                        }}>
                        <AddDis conf={conf} id={id} />
                        <AddSec conf={conf} id={id} />
                        <button style={{ margin: '20px', width: '100px' }} >Apaga Disjuntor (desabilitado)</button>
                        <button style={{ margin: '20px', width: '100px' }} onClick={() => aumentaEscala()}>Aumenta Escala</button>
                        <button style={{ margin: '20px', width: '100px' }} onClick={() => diminuiEscala()}>Diminui Escala</button>
                        <div style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center', marginTop: '50px'
                        }}>
                            <span style={{ fontSize: '.9em' }}>Renomear</span>
                            <input type="text" />
                        </div>

                    </div>
                </div>
            </div>
        </div>



    )

}


export default CriarSub;