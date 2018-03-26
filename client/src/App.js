import React, { Component } from 'react';
//styles
import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import ManageBar from './components/ManageBar/';
import TableForUsers from './components/TableForUsers'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ManageBar />
        <TableForUsers />
      </div>
    );
  }
}

export default App;
