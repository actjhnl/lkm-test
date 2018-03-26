const express = require('express');
const app = express();
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const USERS = require('./fixtures');
//console.log('---',1)
const schema = buildSchema(`
	input UserInput {
		id: String
        surname: String
        name: String
        patron: String
        visits: [String]
    },
    input VisitInput {
        id:String
        visit:String
    },
    type Query {
        users: [UserType]
    },
	type Mutation {
        createUser(input: UserInput) : UserType,
        addVisit(input : VisitInput) : UserType
    },
    type UserType {
        id: String
        surname: String
        name: String
        patron: String
        visits: [String]
    },
    input VisitType {
        id:String
        visit:String
    },
`);
//console.log('---',2)
const getUsers = ()=>{
    return USERS;
}
const createUser = ({input})=>{
    let { surname, name, patron, visits } = input;
    let id = uuidv4();
    USERS.push({
        id,
        surname,
        name,
        patron,
        visits
    });
    return input;
}

const addVisit = ({ input }) => { 
    let {id, visit} = input
    for(let i=0;i<USERS.length;i++){
        if(USERS[i].id == id) {
            USERS[i].visits.push(visit);
        }
    }
    return input;
   }
//console.log('---',3)
const root = {
    users: getUsers,
    createUser: createUser,
    addVisit:addVisit
};
app.use('/graphql',bodyParser.json(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));