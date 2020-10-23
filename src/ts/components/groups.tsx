import React, { Component } from 'react';
import { render } from 'react-dom';

import { renderTable } from './table';

interface Group {
    id: number,
    name: string,
    is_tables_visible: boolean,
}

interface Table {
    table_id: number,
    group_id: number,
    name: string,
    graph: boolean,
}

interface GroupsState {
    groups: Group[],
    tables: Table[],
    selectedTable: number | null,
}

// Компонент для вывода групп и таблиц под группами.
class Groups extends Component<{}, GroupsState>{
    constructor(props = {}) {
        super(props);
        this.state = {
            groups: [],
            tables: [],
            selectedTable: null,
        }
    }

    componentDidMount() {
        this.getGroupsFromJsonFile();
        this.getTableNamesFromJsonFile();
    }

    async getGroupsFromJsonFile() {
        // Получение и сохранение групп в состояние.
        let response = await fetch("/groups", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let groups = await response.json() as Group[];
        for (let group of groups) {
            // Изначально все таблицы группы скрыты.
            group.is_tables_visible = false;
        }

        this.setState({groups: groups});
    }

    async getTableNamesFromJsonFile() {
        // Получение списка таблиц.
        let response = await fetch("/tables", {
            method: 'POST',
            credentials: 'same-origin'
        });

        let tables = await response.json() as Table[];
        this.setState({tables: tables});
    }

    toggleGroupTables(group_id: number) {
        // Метод скрытия/показа таблиц по нажатию на группу.
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

    async getTableData(table: Table) {
        // Метод получения таблицы по её id.
        let response = await fetch("/tables/" + table.table_id, {
            method: 'POST',
            credentials: 'same-origin'
        });

        let data = await response.json();
        renderTable(data, table.name, table.graph);
        this.setState({selectedTable: table.table_id});
    }

    render() {
        return (
            <div>
                {this.state.groups.map(group => (
                    <div key={group.id}>
                        <div
                            className="SidebarMenu-GroupsItem SidebarMenu-GroupsItem__group"
                            key={group.id}
                            onClick={() => this.toggleGroupTables(group.id)}
                        >
                            <div>{group.name}</div>
                            <div className={group.is_tables_visible ? "SidebarMenu-MinusIcon" : "SidebarMenu-PlusIcon"}></div>
                        </div>
                        <div className={group.is_tables_visible ? "SidebarMenu-GroupsTables" : "SidebarMenu-GroupsTables SidebarMenu-GroupsTables__hidden"}>
                            {this.state.tables.filter(table => table.group_id == group.id).map((table, index) => (
                                <div
                                    className={
                                        table.table_id == this.state.selectedTable ?
                                        "SidebarMenu-GroupsItem SidebarMenu-GroupsItem__table SidebarMenu-GroupsItem__selected" :
                                        "SidebarMenu-GroupsItem SidebarMenu-GroupsItem__table"
                                    }
                                    key={index}
                                    onClick={() => this.getTableData(table)}
                                >
                                    <div className="SidebarMenu-FileIcon"></div>
                                    <div className="SidebarMenu-GroupsItem__name">{table.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

// Функция рендеринга компонента Groups. Импортируется в index.ts
export function renderGroups(htmlElement: HTMLElement) {
    render(<Groups/>, htmlElement);
}
