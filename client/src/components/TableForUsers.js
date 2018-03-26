import React, { Component } from 'react';
import {compose} from 'recompose';
//AC
import {setCurrentUser} from '../AC';
//redux
import {connect} from 'react-redux';
//for graphql
import { graphql } from 'react-apollo';
//graphql constants
import {getUsersGraphQl} from '../queries';
//for react-grid
import {
    Grid,
    Table,
    TableHeaderRow,
  } from '@devexpress/dx-react-grid-bootstrap4';
import { Card } from 'reactstrap';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

class TableForUsers extends Component{
    state = {
        columns: [
            { name: 'surname', title: 'Фамилия' },
            { name: 'name', title: 'Имя' },
            { name: 'patron', title: 'Отчество' },
            { name: 'visits', title: 'Крайнее посещение' }
        ],
        currencyColumns: ['visits'],
    };
    render(){
        if (this.props.data.loading) {
            return (<div>Loading...</div>)
        }
        //for table from react-grid
        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className="table-striped"
            />
        );
        const TableRow = ({ row, ...restProps }) => (
            <Table.Row
                {...restProps}
                onClick={() => {
                    const {setCurrentUser,currentUser} = this.props;
                    currentUser.id !==row.id ? setCurrentUser(row) : setCurrentUser('');
                }}
                style={{
                    cursor: 'pointer',
                    backgroundColor: row.id === this.props.currentUser.id?'lightgreen':''
                }}
            />
        );
        const CurrencyFormatter = ({ value }) =>
            <b style={{ color: 'darkblue' }}>{value.length === 0? "не был" : value[value.length-1]}</b>;
        const CurrencyTypeProvider = props => (
            <DataTypeProvider
                formatterComponent={CurrencyFormatter}
                {...props}
            />
        );
        const { columns,currencyColumns } = this.state;
        const {users} = this.props.data;
        return(
            <div>
                <Card>
                    <Grid
                    rows={users}
                    columns={columns}
                    >
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <Table
                        tableComponent={TableComponent}
                        rowComponent={TableRow}
                    />
                    <TableHeaderRow />
                    </Grid>
                </Card>
            </div>
        );
    }
}

const gqlWrapper = graphql(getUsersGraphQl,{
    options: { pollInterval: 1000 },
});
const reduxWrapper = connect(state=>({
    currentUser:state.currentUser
}),{setCurrentUser});
export default compose(reduxWrapper,gqlWrapper)(TableForUsers)