import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const httpLink = createUploadLink({
  uri: "https://weak-warthog-29.loca.lt/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector("#root")
);
