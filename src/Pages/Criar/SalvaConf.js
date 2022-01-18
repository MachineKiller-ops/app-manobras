import React from 'react'
import { db } from "../../utils/firebase-config"
import { getDatabase, ref, child, get, update } from "firebase/database";

export const SalvaConf = ({conf, id}) => {

    const salvaConf = () => {
        const dbRef = ref(getDatabase());
        let indice
        get(child(dbRef, '/')).then((snapshot) => {
            if (snapshot.exists()) {
                indice = snapshot.val().findIndex(substation => substation.id === id) // separa os dados de configuração da SE)
                //let estacao = snapshot.val().find(substation => substation.id === id) // separa os dados de configuração da SE)
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

        <button  onClick={() => salvaConf()}>Criar/Editar Subestação</button>

    )

}

