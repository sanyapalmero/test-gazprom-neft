import React, { Component } from 'react';
import {render} from 'react-dom';

interface TableProps {
    table_rows: [Object]
}

class Table extends Component<TableProps, {}> {
    render() {
        let row = this.props.table_rows[0];
        let headers = Object.keys(row);
        let thList = [];

        for (let header of headers) {
            thList.push(
                <th key={header}>{header}</th>
            )
        }

        let values = [];
        for (let prop of this.props.table_rows) {
            let tds = [];
            let propValues = Object.values(prop);
            for (let propValue of propValues) {
                tds.push(
                    <td key={propValue}>{propValue}</td>
                )
            }
            values.push(
                <tr>{tds}</tr>
            )
        }

        return (
            <table>
                <thead>
                    <tr>
                        {thList}
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
