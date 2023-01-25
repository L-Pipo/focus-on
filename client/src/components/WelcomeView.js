import React from "react";
// import { Link } from "react-router-dom";

import RegisterView from "./RegisterView";

import {
  Heading,
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
      <Grid templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={{ sm: 0, md: 1 }}></GridItem>
        <GridItem colSpan={{ sm: 7, md: 4 }}>
          <Heading fontSize="2xl" marginBottom="3%" marginTop="8%">
            Start boosting your productivity today 🤓
          </Heading>
          <RegisterView loginCb={props.loginCb} />
          <Text>
            Already have an account?{" "}
            <Link color="#FFCACA" href="/login">
              Sign in here
            </Link>
          </Text>
        </GridItem>
        <GridItem colSpan={{ sm: 7, m: 3 }}>
          <Box boxSize="500px">
            <Image src={welcomeimg} alt="woman working" />
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default WelcomeView;
