import { LOGIN, LOGOFF } from "./action";
import { Reducer } from "redux";
const reducer: Reducer<
  { isLogin: boolean; email: String; authToken: String },
  { type: String; payload: Object }
> = (state = { isLogin: false, email: "", authToken: "" }, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        ...action.userData,
        authToken: action.authToken,
      };
    case LOGOFF:
      return {
        ...state,
        isLogin: false,
        email: null,
        authToken: null,
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
