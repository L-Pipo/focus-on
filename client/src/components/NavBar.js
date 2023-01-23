import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Container,
  Button,
} from "@chakra-ui/react";

function NavBar() {
  return (
    <Container marginTop="5%" color="#FFECEF">
      <Breadcrumb separator=" ">
        <BreadcrumbItem>
          <BreadcrumbLink>About</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Profile</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button
            borderWidth={1}
            borderColor="#FFECEF"
            borderRadius={"lg"}
            bg="#251B37"
            color="#FFCACA"
            _hover={{ background: "#372948" }}
          >
            Logout
          </Button>
        </BreadcrumbItem>
      </Breadcrumb>
    </Container>
  );
}

export default NavBar;
