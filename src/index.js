import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import {components, formFields} from './Login'
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

const restLink = new RestLink({ uri: 'http://52.237.23.55:8080/' });
// const restLink = new RestLink({ uri: 'http://localhost:8080/' });

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          events: {
            keyArgs: ["path"], // Cache'owanie na podstawie ścieżki
          },
        },
      },
    },
  }),
});
Amplify.configure(awsconfig);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Authenticator  components={components}>
    <Router>
      <App />
    </Router>
      </Authenticator>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
