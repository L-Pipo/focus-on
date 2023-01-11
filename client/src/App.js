import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Container, Text } from "@chakra-ui/react";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/500.css";
import theme from "./theme";

import CurrentDay from "./components/CurrentDay";
import Overview from "./components/Overview";
import Error404View from "./components/Error404View";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/focus/:id" element={<CurrentDay />} />
          <Route path="*" element={<Error404View />} />
        </Routes>
        <Container>
          <Text color="#FFECEF">Made with ❤️ by Lea Pipo</Text>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
