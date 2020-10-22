import React, { Component } from 'react';
import {render} from 'react-dom';

interface Group {
    id: number,
    name: string,
    is_tables_visible: boolean,
}

interface Table {
    group_id: number,
    name: string
}

interface GroupsState {
    groups: Group[],
    tables: Table[],
}

class Groups extends Component<{}, GroupsState>{
    constructor(props = {}) {
        super(props);
        this.state = {
            groups: [],
            tables: [],
        }
    }

    componentDidMount() {
        this.getGroupsFromJsonFile();
        this.getTableNamesFromJsonFile();
    }

    async getGroupsFromJsonFile() {
        let response = await fetch("/groups", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let resp_json = await response.json();
        for (let group of resp_json) {
            Object.defineProperty(group, 'is_tables_visible', {
                value: false,
                writable: true
            });
        }

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

    toggleGroupTables(group_id: Number) {
        let groups = [...this.state.groups];
        for (let group of groups) {
            if (group.id == group_id) {
                if (!group.is_tables_visible) {
                    group.is_tables_visible = true;
                } else {
                    group.is_tables_visible = false;
                }
            }
        }
        this.setState({groups: groups});
    }

    render() {
        return (
            <div>
                {this.state.groups.map(group => (
                    <div key={group.id}>
                        <div
                            className="SidebarMenu-Item SidebarMenu-Item__group"
                            key={group.id}
                            onClick={() => this.toggleGroupTables(group.id)}
                        >
                            {group.name}
                        </div>
                        <div className={group.is_tables_visible ? "SidebarMenu-Tables" : "SidebarMenu-Tables SidebarMenu-Tables__hidden"}>
                            {this.state.tables.filter(table => table.group_id == group.id).map((table, index) => (
                                <div
                                    className="SidebarMenu-Item SidebarMenu-Item__table"
                                    key={index}
                                >
                                    {table.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export function renderGroups(htmlElement: HTMLElement) {
    render(<Groups/>, htmlElement)
}
