//import '../index.css';
import './criar.css';
import React, { useState, Component } from 'react';
import * as data from './data.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, // Não remover link pois pode ocorrer erro de referência
    useParams
} from "react-router-dom";
import Draggable from "react-draggable";

import chaveAberta from '../chave_aberta.png'; // Tell Webpack this JS file uses this image
import chaveFechada from '../chave_fechada.png'; // Tell Webpack this JS file uses this image

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
        this.props.setaValor(JSON.stringify(this.state.controlledPosition))
    };


    render = () => {

        let infoDis = JSON.parse(this.props.disInfo)
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        //const { deltaPosition, controlledPosition } = this.state;
        //this.setState({ controlledPosition: { x: infoDis.pos[0], y: infoDis.pos[1] } });
        const controlledPosition = this.state.controlledPosition;
        console.log(controlledPosition)

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
                                //left: `${infoDis.pos[0]}px`, // cria figura do disjuntor na posição passada pela props
                                //top: `${infoDis.pos[1]}px`,
                                width: '20px',
                                height: '20px',
                                backgroundColor: infoDis.estado ? 'red' : 'green'// a cor é definida pelo estado do disjuntor
                            }}
                        //onClick={() => this.state.onClick()}
                        >
                            <div>
                                <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
                            </div>
                            <div>
                                <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
                            </div>
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

    const recebeValor = (valor) => {
        console.log('Esse é o valor da função ' + JSON.parse(valor).x + ' e ' + JSON.parse(valor).x)

    }

    return (
        <div>
            <div className="outter-container"
            //style={{ content: `url('./${process.env.PUBLIC_URL}/img/${conf.id}.png')` }}
            >
                <div
                    className="inner-container"
                    style={{
                        backgroundImage: `url("${process.env.PUBLIC_URL}/img/${conf.id}.png")`
                    }}

                >
                    {/* <img
                        src={process.env.PUBLIC_URL
                            + "/img/" + conf.id + ".png"} alt="" /> */}
                    <DiagramaDisj
                        v={JSON.stringify(conf.mapa.disjuntores)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                        setaValor={recebeValor}
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