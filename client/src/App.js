import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/500.css";
import theme from "./theme";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import CurrentDay from "./components/CurrentDay";
import Overview from "./components/Overview";
import Error404View from "./components/Error404View";
import LoginView from "./components/LoginView";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import WelcomeView from "./components/WelcomeView";
import RegisterView from "./components/RegisterView";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  // not sure if user is set correctly in doLogin function
  // important or can user state be deleted?

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);

    if (myresponse.ok) {
      let userId = myresponse.data.user.id;
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate(`/focus/${userId}`);
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    navigate("/");
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Routes style={{ margin: "0px" }}>
          <Route path="/" element={<WelcomeView />} />

          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />

          {/* <Route path="/register" element={<RegisterView />} /> */}

          <Route
            path="/focus/:userId"
            element={
              <PrivateRoute>
                <Overview logoutCb={doLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/current/:id"
            element={
              <PrivateRoute>
                <CurrentDay logoutCb={doLogout} />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Error404View />} />
        </Routes>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
