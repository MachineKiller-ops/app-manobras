import '../index.css';
import React from 'react';
import * as data from './data.json';

function Disjuntor(props) {
    return (
        <button
            className="disjuntor"
            style={{
                position: 'absolute',
                left: `${props.x}px`, // cria figura do disjuntor na posição passada pela props
                top: `${props.y}px`,
                backgroundColor: props.closed ? 'red' : 'green' // a cor é definida pelo estado do disjuntor
            }}
            onClick={() => props.onClick()}
        >
            {props.index}
        </button>
    );
}

class Diagrama extends React.Component {


    renderDisjuntor(x, y, closed, index) {

        return <Disjuntor
            x={x} // envia coordenadas x e y para renderizar disjuntor
            y={y}
            closed={closed}
            index={index}
            onClick={() => this.props.onClick(index)}
        />;
    }

    render() {

        const mapa = JSON.parse(this.props.v); // (des)converte de JSON para objeto
        //console.log(this.props.v);

        return (

            mapa.map((dis, index) => { // cria loop em que se lê todos os disjuntores chamando a função de renderização para cada um deles
                return (
                    <div key={index}>
                        {this.renderDisjuntor(dis[0], dis[1], dis[2], index)}
                    </div>

                );
            })
        );

    }
}


export default class Simula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //conf: data.default.find(conf => conf.nome === this.props.match.params.id) // separa os dados de configuração da SE
        };

        //this.handleDropdownChange = this.handleDropdownChange.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    /* handleClick(i) {
        let conf = { ...this.state.conf }; // copia conf
        conf.mapa[i][2] = conf.mapa[i][2] ? 0 : 1; // muda o estado do disjuntor
        console.log('estado: ' + conf.mapa[i][2]);
        this.setState({
            conf: conf // atualiza conf
        });

    }

    handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
    }

 */

    render() {
        //console.log(this.state.conf.mapa[1][1]);
        return (

            <div className="image-container">
                <div className="image-inner-container">
                    {/* <img src={process.env.PUBLIC_URL
                            + "/img/" + this.props.match.params.id + ".png"} alt="" />
                        <Diagrama 
                            v={JSON.stringify(this.state.conf.mapa)} //Necessário conversão para JSON pois objetos não podem ser passados em props
                            onClick={i=>{this.handleClick(i)}}
                        /> */}
                    Hello world
                </div>
            </div>


        )
    }
}


