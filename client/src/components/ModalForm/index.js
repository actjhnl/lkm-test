import React, { Component } from 'react';
import CollapseVisit from '../CollapseVisit/'
import {compose} from 'recompose';
//AC
import {toggleOpenForm} from '../../AC'
//redux
import {connect} from 'react-redux';
//graphql constants
import {gqlWrapper1} from '../../queries'
// reactstrap
import {Button,Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Collapse
} from 'reactstrap'
//my styles
import './ModalForm.css';

class ModalForm extends Component{
    onChange = (event) => {
        this.props.changeInputState(event)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postMutation().then(res=>console.log(res));
        this.props.toggleOpenForm();
    }
    render(){
        const {toggleOpenForm,modal,currentUser,_state} = this.props;
        const {collapse} = _state;
    
        const visitList = currentUser!=='' && (currentUser.visits.filter((visit)=>{
            return visit !== "Не был";
        }).map((visit,index)=>{
            return <div key={index} className="visitHistory">{visit}</div>
        }))

        return(
            <Modal isOpen={modal} toggle={toggleOpenForm} >
            <ModalHeader toggle={toggleOpenForm}>{(currentUser === '')?"Добавление":"Личная карта"}</ModalHeader>
                <ModalBody>
                <Form >
                <FormGroup>
                    <Label for="userSurname">Фамилия</Label>
                    {
                        currentUser ==='' ?<Input  type="text" 
                            name="surname" 
                            id="userSurname" 
                            onChange={this.onChange} 
                            placeholder={currentUser ==='' ? "Фамилия" : ''} 
                        /> : <Input type="text" value={currentUser.surname}/> 
                    }
                </FormGroup>
                <FormGroup>
                    <Label for="userName">Имя</Label>
                    {
                        currentUser ==='' ? <Input  type="text" 
                            name="name" 
                            id="userName"  
                            onChange={this.onChange}
                            placeholder={currentUser ==='' ? "Имя" : ''}
                        /> : <Input type="text" value={currentUser.name} /> 
                    }     
                </FormGroup>
                <FormGroup>
                    <Label for="userPatron">Отчество</Label>
                    {
                        currentUser ==='' ?<Input  type="text" 
                            name="patron" 
                            id="userPatron" 
                            onChange={this.onChange} 
                            placeholder={currentUser ==='' ? "Отчество" : ''} 
                        />: <Input type="text" value={currentUser.patron}/> 
                    }
                </FormGroup>
                История посещений:
                <div className="wraooerVisitHistory">
                    {visitList}<Button onClick={this.props.handleCollapse} outline color="secondary">+</Button>
                </div>
                <Collapse isOpen={collapse}>
                    <CollapseVisit 
                        _state={this.props._state} 
                        onTimeChange={this.props.onTimeChange}
                        handleDayClick={this.props.handleDayClick}
                        resetForm={this.props.resetForm}
                    />
                </Collapse>
                </Form>
                </ModalBody>
                <ModalFooter>
                    {   currentUser ==='' && <Button color="primary" onClick={this.handleSubmit}>Подтвердить</Button>   }
                    <Button color="secondary" onClick={toggleOpenForm}>Выйти</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const reduxWrapper = connect(state=>({
    currentUser:state.currentUser,
    modal:state.modal
}),{toggleOpenForm});
export default compose(reduxWrapper, gqlWrapper1)(ModalForm);