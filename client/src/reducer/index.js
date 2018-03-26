import {combineReducers} from 'redux';
import {
    SET_CURRENT_USER,
    TOGGLE_OPEN_FORM,
    TOGGLE_OPEN_COLLAPSE,
    ADD_VISIT
} from '../constants'

export default combineReducers({
    currentUser: (state='',action)=>{
        switch(action.type){
            case SET_CURRENT_USER: return action.user;
            case ADD_VISIT: {
                const newVisit = [...action.user.visits,action.visit];
                return Object.assign({},action.user,{visits:newVisit});
            }
            default: return state;
        }
    },
    modal: (state=false,action)=>action.type === TOGGLE_OPEN_FORM && !state,
    collapse: (state=false,action)=>action.type === TOGGLE_OPEN_COLLAPSE && !state,
})