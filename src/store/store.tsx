import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

//const store = createStore(reducer as Reducer, composeWithDevTools());
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});
//reducer 여러개 한개로 합쳐가지고 사용하는 법 배우기!

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
