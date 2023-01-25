import React from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";

import { Box, Heading, Text, Button } from "@chakra-ui/react";

function Error404View() {
  return (
    <div>
      <NavBar />
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, rose.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Button
          colorScheme="gray"
          bgGradient="linear(to-r, gray.400, gray.500, gray.600)"
          color="white"
          variant="solid"
        >
          <Link to="/">Go back</Link>
        </Button>
      </Box>
    </div>
  );
}

export default Error404View;
