import React from 'react'
import './mostrasm.css'

export const MostraSM = (props) => {


    return (

        props.data.map((item,index)=>{

            return(
                <div key={index} className="showButtons">
                    
                    <input type="text"
                        value={item}
                        className="itemManobra"
                        onChange={e => {
                            props.mudaItem(index,e.target.value)

                            }
                        }
                    />
                    <button 
                        className="addLinha"
                        onClick={()=>props.addLinha(index)}
                    >+</button>
                    <button 
                        className="removeLinha"
                        onClick={()=>props.removeLinha(index)}
                    >-</button>
                </div>
                
            )
        })

    )

}

