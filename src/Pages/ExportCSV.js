import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {

        let sequence = '['

        for (let i in csvData){
            console.log(csvData[i])
            sequence = sequence.concat(`{"Sequência de Manobras": "${csvData[i]}"}`)
            if(i<csvData.length-1)sequence = sequence.concat(`,`)
        }
        sequence = sequence.concat(']')

        //sequence = `[{"item": "afsdsad"}]`

        console.log(sequence)
        let sequenceParse = JSON.parse(sequence)


        const ws = XLSX.utils.json_to_sheet(sequenceParse);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }



    return (

        <button  onClick={(e) => exportToCSV(csvData,fileName)}>Baixar sequência de manobras</button>

    )

}

