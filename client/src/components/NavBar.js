import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Local from "../helpers/Local";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Button,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import logo from "../assets/logo.png";

function NavBar(props) {
  const [isDesktop, setDesktop] = useState(false);

  let navigate = useNavigate();
  let id = Local.getUserId();
  let linkToProfile = `/profile/${id}`;
  let linkToSettings = `/settings/${id}`;

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1000) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  function seeProfile() {
    navigate(linkToProfile);
  }

  function seeSettings() {
    navigate(linkToSettings);
  }

  return (
    <div>
      {!isDesktop ? (
        <Container margin="0px" width="100%" maxW="100%">
          <Grid
            height="150px"
            templateColumns="repeat(4, 1fr)"
            width="100%"
            margin="0px"
          >
            <GridItem
              color="#FFECEF"
              fontWeight="bold"
              justifySelf="start"
              colSpan={2}
              marginLeft="15px"
            >
              <Box boxSize="sm">
                <Image src={logo} alt="logo" />
              </Box>
            </GridItem>
            <GridItem colSpan="1"></GridItem>
            <GridItem
              justifySelf="end"
              marginTop="25px"
              colSpan="1"
              marginRight="20px"
            >
              <Menu>
                <MenuButton>
                  <HamburgerIcon
                    fontSize="5xl"
                    color="
                "
                  />
                </MenuButton>
                <MenuList backgroundColor="#FFECEF" color="#251B37">
                  <MenuItem
                    _hover={{ backgroundColor: "#FFCACA" }}
                    onClick={seeProfile}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    _hover={{ backgroundColor: "#FFCACA" }}
                    onClick={seeSettings}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    _hover={{ backgroundColor: "#FFCACA" }}
                    onClick={props.logoutCb}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </GridItem>
          </Grid>
        </Container>
      ) : (
        <Container margin="0px" width="100%" maxW="100%">
          <Grid
            height="150px"
            templateColumns="repeat(6, 1fr)"
            width="100%"
            margin="0px"
          >
            <GridItem
              color="#FFECEF"
              fontWeight="bold"
              justifySelf="start"
              colSpan={2}
              marginLeft="15px"
            >
              {" "}
              <Box boxSize="sm">
                <Image src={logo} alt="logo" />
              </Box>
            </GridItem>
            <GridItem colSpan={3} width="20px"></GridItem>
            <GridItem colSpan={1}>
              <Container marginTop="6%" color="#FFECEF">
                <Breadcrumb separator=" ">
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={seeProfile}>
                      Profile
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={seeSettings}>
                      Settings
                    </BreadcrumbLink>
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
      )}
    </div>
  );
}

export default NavBar;
