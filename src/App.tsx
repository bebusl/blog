import React, { useEffect } from "react";
import TopNav from "./layouts/TopNav";
import SideNav from "./layouts/sidenav";
import { useAppDispatch } from "./store/hooks";
import { getRefreshToken } from "src/store/authReducer";
import DefaultContainer from "./layouts/DefaultContainer";
import DefaultRoutes from "./routes/defaultRoutes";
import { FlexBox } from "./components/FlexBox";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function refreshedToken(cookie: String) {
      try {
        const refresh_token = cookie.split("=")[1];
        if (refresh_token) await dispatch(getRefreshToken(refresh_token));
      } catch (error) {
        console.log(error);
      }
    }
    const interval = setInterval(() => {
      refreshedToken(document.cookie);
    }, 1000 * 60 * 40); //40분마다 실행
    interval;
    return clearInterval(interval);
  }, []);

  return (
    <FlexBox flexDirection="row" alignItems="start" style={{ width: "100vw" }}>
      <SideNav />
      <div style={{ width: "100%" }}>
        <TopNav />
        <DefaultContainer>
          <DefaultRoutes />
        </DefaultContainer>
      </div>
    </FlexBox>
  );
}
