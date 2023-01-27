import React from "react";
// import { Link } from "react-router-dom";

import Register from "./Register";

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
      <Grid templateColumns="repeat(2, 1fr)" placeItems="center">
        <GridItem colSpan={{ md: 1, sm: 2 }}>
          <Heading fontSize="3xl" marginBottom="4%">
            Start boosting your productivity today 🤓
          </Heading>
          <Register loginCb={props.loginCb} />
          <Text>
            Already have an account?{" "}
            <Link color="#FFCACA" href="/login">
              Sign in here
            </Link>
          </Text>
        </GridItem>
        <GridItem colSpan={{ md: 1, sm: 2 }}>
          <Box>
            <Image src={welcomeimg} alt="woman working" />
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default WelcomeView;
