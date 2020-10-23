import React, { CanvasHTMLAttributes, Component } from 'react';
import {render} from 'react-dom';
import Chart from 'chart.js';

interface TableProps {
    table_name: string,
    table_rows: [Object],
    has_graph: boolean,
}

class TableData extends Component<TableProps, {}> {
    showGraph() {
        let labels: string[] = [];
        let data: number[] = [];

        this.props.table_rows.map(row => {
            let rowValues = Object.values(row);
            labels.push(rowValues[1]);
            data.push(rowValues[2]);
        });

        let row = this.props.table_rows[0];
        let headers = Object.keys(row);
        let label = headers[2];

        let context = document.getElementById('chart') as HTMLCanvasElement;
        new Chart(context, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

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
                    {this.props.has_graph ?
                        <button className="Button Button-Success" id="showGraph" onClick={() => this.showGraph()}>Построить график</button>
                    : null}
                </div>
            </div>
        )
    }
}

export function renderTable(data: [Object], table_name: string, graph: boolean) {
    let htmlElement = document.getElementById('table') as HTMLElement;
    render(<TableData table_rows={data} table_name={table_name} has_graph={graph}/>, htmlElement);

    let canvas = document.getElementById('chart');
    if (canvas) {
        canvas.remove();
    }
    if (graph) {
        let showGraphBtn = document.getElementById('showGraph');
        if (showGraphBtn) {
            showGraphBtn.insertAdjacentHTML('afterend', '<canvas class="Chart" id="chart"></canvas>');
        }
    }
}
