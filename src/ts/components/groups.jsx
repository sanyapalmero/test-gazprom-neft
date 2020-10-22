import React, { Component } from 'react';

export default class Groups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            tables: [],
        }
        this.getGroupsFromJsonFile();
        this.getTableNamesFromJsonFile();
    }

    async getGroupsFromJsonFile() {
        let response = await fetch("/groups", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let resp_json = await response.json();
        this.setState({groups: resp_json});
    }

    async getTableNamesFromJsonFile() {
        let response = await fetch("/tables", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let resp_json = await response.json();
        this.setState({tables: resp_json});
    }

    render() {
        return (
            <div>
                {this.state.groups.map(group => (
                    <div key={group.id}>
                        <div
                            className="SidebarMenu-Item SidebarMenu-Item__group"
                            id={group.id}
                            key={group.id}
                        >
                            {group.name}
                        </div>
                        {this.state.tables.filter(table => table.group_id == group.id).map((table, index) => (
                            <div key={index}>{table.name}</div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}
