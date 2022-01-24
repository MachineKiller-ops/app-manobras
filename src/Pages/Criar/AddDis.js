import React from 'react'
import { db } from "../../utils/firebase-config"
import { getDatabase, ref, child, get, update } from "firebase/database";

export const AddDis = ({conf, id}) => {

    const salvaDis = () => {
        const dbRef = ref(getDatabase());
        let indice
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                indice = snapshot.val().findIndex(substation => substation.id === id) // separa os dados de configuração da SE)
                //let estacao = snapshot.val().find(substation => substation.id === id) // separa os dados de configuração da SE)
                let disj = {pos: [0,0], estado: true, ra: true, rn: true, sc: true}
                conf.mapa.disjuntores = [...conf.mapa.disjuntores,disj]
                console.log(conf)
                const updates = {};
                updates[`/${indice}`] = conf;
                alert('Configuração salva com sucesso!')
                return update(ref(db), updates);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        
        /* const updates = {};
        updates[`/${num}`] = conf;

        return update(ref(db), updates); */


    }

    return (

        <button style={{ margin: '20px', width: '100px' }}  onClick={() => salvaDis()}>Cria Disjuntor</button>

    )

}

