import {
    SET_CURRENT_USER,
    TOGGLE_OPEN_FORM,
    TOGGLE_OPEN_COLLAPSE,
    ADD_VISIT
} from '../constants'

export function setCurrentUser(user){
    return {
        type:SET_CURRENT_USER,
        user:user
    }
}
export function toggleOpenForm(){
    return {
        type: TOGGLE_OPEN_FORM
    }
}
export function toggleOpenCollapse(){
    return {
        type: TOGGLE_OPEN_COLLAPSE
    }
}
export function addVisitStore(user,visit){
    return {
        type: ADD_VISIT,
        user:user,
        visit:visit
    }
}