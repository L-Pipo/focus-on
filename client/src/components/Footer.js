import React from "react";
import { Text, Container } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container display="flex" justifyContent="center">
      <Text color="#FFECEF" position="fixed" bottom="2">
        Made with ❤️ by Lea Pipo
      </Text>
    </Container>
  );
}
