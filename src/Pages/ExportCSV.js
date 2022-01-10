import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import axios from 'axios';

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {

        const json = JSON.stringify(csvData);


        axios.post('https://python-server-app-manobras.herokuapp.com/', json, {
        //axios.post('http://127.0.0.1:5006/', json, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            console.log(link)
        });

    }

    return (

        <button  onClick={(e) => exportToCSV(csvData,fileName)}>Baixar sequência de manobras</button>

    )

}

