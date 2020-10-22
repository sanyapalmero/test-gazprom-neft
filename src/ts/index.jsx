import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Groups from './components/groups.jsx';


class Index extends Component {
    render() {
        return (
            <Groups/>
        )
    }
}


ReactDOM.render(<Index/>, document.getElementById('groups'));
