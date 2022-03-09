import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";
import { Provider } from "react-redux";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import store from "src/store/store";

const httpLink = createUploadLink({
  uri: "https://www.cbnu-psa.kro.kr/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
