import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Groups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
        }
        this.getGroupsFromJsonFile();
    }

    async getGroupsFromJsonFile() {
        let response = await fetch("/groups", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let resp_json = await response.json();
        console.log(resp_json);
    }

    render() {
        return (
            <div>
                <a className="SidebarMenu-Item SidebarMenu-Item__link" href="#">Таблица 3</a>
                <a className="SidebarMenu-Item SidebarMenu-Item__link" href="#">Таблица 4</a>
            </div>
        )
    }
}

ReactDOM.render(<Groups/>, document.getElementById('groups'));
