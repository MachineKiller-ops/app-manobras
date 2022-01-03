import React from 'react'

export const MostraSM = (props) => {


    //console.log(props.data[0])


    return (

        props.data.map((item,index)=>{
            //console.log(index)
            return(
                <input type="text"
                value={item}
                key={index}
                style={{
                    width: '50em'
                }}
                onChange={e => {
                    props.mudaItem(index,e.target.value)
                    //console.log(e.target.value)
                    }
                }
                />
                
            )
        })

    )

}

