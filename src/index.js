import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "leaflet/dist/leaflet.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { components } from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

// const restLink = new RestLink({ uri: "http://52.237.23.55:8080/" });
const restLink = new RestLink({ uri: "http://74.248.145.105:8080/" });

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["uuid"], // Ustawienie `uuid` jako identyfikatora obiektu `Post`
        fields: {
          reactionsNumber: {
            merge(existing = 0, incoming) {
              return incoming; // Zachowuje się jak nadpisywanie
            },
          },
          userReacted: {
            merge(existing = false, incoming) {
              return incoming;
            },
          },
          commentsNumber: {
            merge(existing = 0, incoming) {
              return incoming; // Analogicznie jak dla `reactionsNumber`
            },
          },
        },
      },
    },
  }),
});
Amplify.configure(awsconfig);

function RootApp() {
  if (isMobile) {
    return (
      <div className="mobile-app-banner">
        <p>Download our mobile app or visit from a desktop.</p>
      </div>
    );
  }

  if (window.location.protocol === "https:") {
    return (
      <a href="http://socialtripper-cna3btdnckbpazd8.polandcentral-01.azurewebsites.net/">
        {" "}
        change https to http in url
      </a>
    );
  }

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Authenticator components={components}>
          <Router>
            <App />
            <Helmet>
              <meta charSet="utf-8" />
              <title>SocialTripper</title>
            </Helmet>
          </Router>
        </Authenticator>
      </ApolloProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
