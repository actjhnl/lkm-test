import React, { Component } from 'react';
//AC
import {toggleOpenForm} from '../../AC';
// my component
import ModalForm from '../ModalForm/';
//my styles
import './ManageBar.css';
//reactstrap
import { Button,Navbar,NavbarBrand } from 'reactstrap';
//redux
import {connect} from 'react-redux';

class ManageBar extends Component{
    state = {
        name:'',
        surname:'',
        patron:'',
        visits:[],
        //
        collapse: false,
        //
        time: '12:34',
        day:undefined, //useful
        selectedDay: undefined // for dev date-picker
    }
    baseState = this.state;
    resetForm = () => {
        this.setState(this.baseState)
    }
    changeInputState = (event) => {
        const attr = event.target.name;
        const {value} = event.target
        switch(attr){
            case 'name': {this.setState({name:value});return;}
            case 'surname': {this.setState({surname:value});return}
            case 'patron': {this.setState({patron:value});return}
            dafault: return;
        }
    }
    handleOpenAdd = () => {
        const {toggleOpenForm} = this.props;
        toggleOpenForm();
        this.resetForm(); // for reset in the previous state
    }
    handleCollapse = () => {
        this.setState({ collapse: !this.state.collapse });
    }
    onTimeChange = (time) => {
        this.setState({time});
    } 
    handleDayClick = (day) => {
        this.setState({ selectedDay: day });
        this.setState({ day: day.toLocaleDateString() });
    }    
    render(){
        const {currentUser,toggleOpenForm} = this.props;
        return(
            <Navbar color="faded" light expand="md">
                <NavbarBrand><h3 className="NavbarBrand">Simple CRM</h3></NavbarBrand>
                <Button color="success" onClick={this.handleOpenAdd}  disabled={currentUser !==''}> Добавить</Button>
                <Button color="warning" onClick={toggleOpenForm}  disabled={currentUser===''}>Открыть</Button>
                <ModalForm 
                    _state={this.state} 
                    changeInputState={this.changeInputState}
                    handleCollapse={this.handleCollapse}
                    onTimeChange={this.onTimeChange}
                    handleDayClick={this.handleDayClick}
                    resetForm={this.resetForm}
                />
            </Navbar>
        );
    }
}
export default connect(state=>({
    currentUser:state.currentUser
}),{toggleOpenForm})(ManageBar);