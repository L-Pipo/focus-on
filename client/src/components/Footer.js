import React from "react";
import { Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <div>
      <Text
        color="brand.300"
        position="absolute"
        bottom="0"
        width="100%"
        height="2.5rem"
      >
        Made with ❤️ by Lea Pipo
      </Text>
    </div>
  );
}
