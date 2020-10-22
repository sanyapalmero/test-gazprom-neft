import React, { Component } from 'react';
import {render} from 'react-dom';

interface TableProps {
    table_name: string,
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
            <div>
                <div className="ContentWithSidebar-Content__header">{this.props.table_name}</div>
                <div className="ContentWithSidebar-Content__table">
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
                </div>
            </div>
        )
    }
}

export function renderTable(data: [Object], table_name: string) {
    let htmlElement = document.getElementById('table') as HTMLElement;
    render(<Table table_rows={data} table_name={table_name}/>, htmlElement);
}
