import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Button,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

function NavBar(props) {
  return (
    <Container margin="0px" width="100%" maxW="100%">
      <Grid
        height="100px"
        templateColumns="repeat(6, 1fr)"
        width="100%"
        margin="0px"
        // alignItems="center"
      >
        <GridItem
          color="#FFECEF"
          fontWeight="bold"
          justifySelf="start"
          colSpan={2}
          marginLeft="15px"
        >
          <Text fontSize="6xl">Focus:ON</Text>
        </GridItem>
        <GridItem colSpan={2} width="20px"></GridItem>
        <GridItem colSpan={2}>
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
                  onClick={props.logoutCb}
                >
                  Logout
                </Button>
              </BreadcrumbItem>
            </Breadcrumb>
          </Container>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default NavBar;
