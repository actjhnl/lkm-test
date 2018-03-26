import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import registerServiceWorker from './registerServiceWorker';
//for graphql
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
//for redux
import {Provider} from 'react-redux'
import store from './store'

const client = new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
