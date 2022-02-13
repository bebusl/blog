import { createStore, Reducer } from "redux";
import reducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer as Reducer, composeWithDevTools());

//reducer 여러개 한개로 합쳐가지고 사용하는 법 배우기!

export default store;
