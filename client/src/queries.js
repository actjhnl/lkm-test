import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// for Table component
export const getUsersGraphQl = gql`
query{
    users{
    id,
    surname,
    name,
    patron,
    visits
    }
}`;
//------------------------------
// wrapper 1 for ModalForm component
//------------------------------
const createUserGraphQl = gql`mutation ($input: UserInput){
    createUser(input: $input) {
        id
    }
}`;
export const gqlWrapper1 = graphql(createUserGraphQl,{
    options: (ownProps) => ({
      variables: {
        "input":{
            "name" : ownProps._state.name,
            "surname" : ownProps._state.surname,
            "patron" : ownProps._state.patron,
            "visits" : ownProps._state.day ? `${ownProps._state.day} в ${ownProps._state.time}` : "Не был"
        }
      }
    }),
    name: 'postMutation'
});
//------------------------------
//wrapper 2 for ModalForm component
//------------------------------
const addNewVisitGraphQL = gql`mutation ($input: VisitInput){
    addVisit(input: $input) {
      id
    }
}`;
export const gqlWrapper2 = graphql(addNewVisitGraphQL,{
    options: (ownProps) => ({
        variables: {
            "input":{
                id: ownProps.currentUser.id,
                visit: `${ownProps._state.day} в ${ownProps._state.time}` 
            }
        }
    }),
    name: 'addVisit'
});
