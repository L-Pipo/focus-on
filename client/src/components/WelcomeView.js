import React from "react";
import { Link } from "react-router-dom";

import { Heading, Container } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function WelcomeView() {
  return (
    <Container>
      <Heading fontSize="4xl" marginBottom="10%">
        Welcome to FocusOn
      </Heading>
      <Heading fontSize="2xl">Do you already have an account?</Heading>
      <Button
        borderWidth={1}
        borderColor="#FFECEF"
        borderRadius={"lg"}
        bg="#251B37"
        color="#FFCACA"
        _hover={{ background: "#372948" }}
        mt={4}
        mb={4}
        p={6}
        fontSize="lg"
        marginBottom="5%"
      >
        {" "}
        <Link to="/login">Login</Link>
      </Button>
      <Heading fontSize="2xl">Create new acoount</Heading>
      <Button
        borderWidth={1}
        borderColor="#FFECEF"
        borderRadius={"lg"}
        bg="#251B37"
        color="#FFCACA"
        _hover={{ background: "#372948" }}
        mt={4}
        mb={4}
        p={6}
        fontSize="lg"
      >
        <Link to="/register">Register</Link>
      </Button>
    </Container>
  );
}

export default WelcomeView;
