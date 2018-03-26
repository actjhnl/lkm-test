import React, {Component} from 'react'
import {compose} from 'recompose';
//redux
import {connect} from 'react-redux';
//AC
import {toggleOpenForm,addVisitStore} from '../../AC'
//graphql constants
import {gqlWrapper2} from '../../queries'
// reactstrap
import {Button, CardBody, Card} 
from 'reactstrap'
//foreign date-time component
import TimeField from 'react-simple-timefield';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class CollapseVisit extends Component{
    _onTimeChange = (time) => {
        this.props.onTimeChange(time)
    } 
    _handleDayClick = (day) => {
        this.props.handleDayClick(day)
    }
    handleAddVisitSubmit = () => {
        this.props.addVisit().then(res=>console.log(res));
        this.props.toggleOpenForm()
        this.props.addVisitStore(this.props.currentUser,`${this.props._state.day} в ${this.props._state.time}` );
        this.props.resetForm();
    }
    render(){
        const {currentUser} = this.props;
        return(
            <Card>
                <CardBody>
                    <div><i>Укажите дату</i></div>
                    <div>
                        <DayPicker
                        onDayClick={this._handleDayClick}
                        selectedDays={this.props._state.selectedDay}
                        />
                        {this.props._state.selectedDay ? (
                        <p>You clicked {this.props._state.selectedDay.toLocaleDateString()}</p>
                        ) : (
                        <p>Please select a day.</p>
                        )}
                    </div>
                    <div><i>Укажите время</i></div>
                    <TimeField value={this.props._state.time} onChange={this._onTimeChange} style={{
                        border: '2px solid #666',
                        margin:'7px',
                        fontSize: 35,
                        width: 107,
                        padding: '5px 8px',
                        color: '#333',
                        borderRadius: '3'
                    }}/>
                    {
                    currentUser!=='' &&  <div><Button onClick={this.handleAddVisitSubmit} outline color="success">Добавить</Button>{' '}</div>
                    }      
                </CardBody>
            </Card>
        )
    }
}
const reduxWrapper = connect(state=>({
    currentUser:state.currentUser,
    modal:state.modal
}),{toggleOpenForm,addVisitStore});
export default compose(reduxWrapper,gqlWrapper2)(CollapseVisit);