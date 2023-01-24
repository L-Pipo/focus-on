import React from "react";
// import { Link } from "react-router-dom";

import RegisterView from "./RegisterView";

import {
  Heading,
  Container,
  Button,
  Image,
  Box,
  Text,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";

import welcomeimg from "../assets/welcomeimg.png";
import logo from "../assets/logo.png";

function WelcomeView(props) {
  return (
    <div>
      <Box>
        <Image src={logo} />
      </Box>
      <Grid templateColumns="repeat(7, 1fr)">
        <GridItem colSpan={4}>
          <Heading fontSize="2xl" marginBottom="3%" marginTop="8%">
            Start boosting your productivity today 🤓
          </Heading>
          <RegisterView loginCb={(u, p) => props.loginCb(u, p)} />
          <Text>
            Already have an account?{" "}
            <Link color="#FFCACA" href="/login">
              Sign in here
            </Link>
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Box boxSize="500px" paddingRight="40px">
            <Image src={welcomeimg} alt="woman working" />
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default WelcomeView;
