import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Heading,
  Container,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";

import logo from "../assets/logo.png";

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.loginCb(username, password);
  }

  function navToWelcome() {
    navigate("/");
  }

  return (
    <div>
      <Box>
        <Image src={logo} onClick={navToWelcome} cursor="pointer" />
      </Box>
      <Container maxW="md" color="white">
        <Stack spacing="8">
          <Heading fontsize="lg" mt="50px" mb="30px">
            Hello again 👋
          </Heading>
        </Stack>

        <div className="LoginView row">
          {props.loginError && (
            <Alert status="error" marginBottom="15px" borderRadius="10px">
              <AlertIcon />
              <AlertTitle color="black">Login failed!</AlertTitle>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" />
                <Input
                  type="text"
                  placeholder="Username"
                  name="usernameInput"
                  required
                  className="form-control"
                  value={username}
                  onChange={handleChange}
                  focusBorderColor="brand.200"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                />
                <Input
                  type="password"
                  name="passwordInput"
                  required
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  focusBorderColor="brand.200"
                />
              </InputGroup>
            </Stack>

            <Button
              type="submit"
              borderWidth={1}
              borderColor="brand.300"
              borderRadius={"lg"}
              bg="brand.100"
              color="brand.200"
              _hover={{ background: "brand.400" }}
              mt={4}
              mb={4}
              p={6}
              fontSize="lg"
            >
              Sign in
            </Button>
            <Text>
              Don't have an account?{" "}
              <Link color="brand.200" href="/">
                Sign up here
              </Link>
            </Text>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginView;
