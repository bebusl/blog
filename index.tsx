import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";
import { Provider } from "react-redux";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import store from "src/store/store";

const httpLink = createUploadLink({
  uri: "https://jh-blog-api.yoonleeverse.com/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// if (process.env.NODE_ENV === "development") {
//   console.log("SERVICE START");
//   worker.start();
// }

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
