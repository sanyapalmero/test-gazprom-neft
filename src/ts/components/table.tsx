import React, { Component } from 'react';
import {render} from 'react-dom';

interface TableProps {
    table_rows: [Object]
}

class Table extends Component<TableProps, {}> {
    render() {
        let row = this.props.table_rows[0];
        let headers = Object.keys(row);
        let headersTdList: JSX.Element[] = [];

        headers.map((header, index) => {
            headersTdList.push(
                <td key={index}>{header}</td>
            )
        });

        let values: JSX.Element[] = [];
        this.props.table_rows.map((row, index) => {
            let tdList: JSX.Element[] = [];
            let rowValues = Object.values(row);
            rowValues.map((value, index) => {
                tdList.push(
                    <td key={index}>{value}</td>
                )
            });
            values.push(
                <tr key={index}>{tdList}</tr>
            )
        });

        return (
            <table className="Table">
                <thead>
                    <tr>
                        {headersTdList}
                    </tr>
                </thead>
                <tbody>
                    {values}
                </tbody>
            </table>
        )
    }
}

export function renderTable(data: [Object]) {
    let htmlElement = document.getElementById('table') as HTMLElement;
    render(<Table table_rows={data}/>, htmlElement);
}