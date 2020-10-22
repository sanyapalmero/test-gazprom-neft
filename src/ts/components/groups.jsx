import React, { Component } from 'react';

export default class Groups extends Component{
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
        this.setState({groups: resp_json});
    }

    render() {
        let groups = [];
        this.state.groups.forEach(group => {
            groups.push(
                <a
                    className="SidebarMenu-Item SidebarMenu-Item__link"
                    href="#"
                    id={group.id}
                    key={group.id}
                >
                    {group.name}
                </a>
            )
        });

        return (
            <div>
                {groups}
            </div>
        )
    }
}
