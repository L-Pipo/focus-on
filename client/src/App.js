import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Container, Text } from "@chakra-ui/react";
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

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />

          <Route path="/" element={<Overview />} />
          <Route path="/focus/:id" element={<CurrentDay />} />
          <Route path="*" element={<Error404View />} />
        </Routes>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
