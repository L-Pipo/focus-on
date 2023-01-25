import React, { useState } from "react";
import validator from "validator";

import {
  Button,
  Container,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import Api from "../helpers/Api";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [mailError, setMailError] = useState(false);

  async function doRegister() {
    if (!validator.isEmail(email)) {
      setMailError(true);
    } else {
      const newUserObj = {
        username: username,
        password: password,
        email: email,
      };

      let response = await Api.registerUser(newUserObj);
      if (response.ok) {
        props.loginCb && props.loginCb(username, password);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
        setError(true);
      }
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      case "emailInput":
        setEmail(value);
        setMailError(false);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    doRegister();
  }

  return (
    <Container maxW="md" color="white">
      {error && (
        <Stack spacing={2} marginBottom="2%">
          <Alert status="error" borderRadius="10px">
            <AlertIcon />
            <AlertTitle color="black">Oops something went wrong!</AlertTitle>
          </Alert>
          <Alert status="error" borderRadius="10px">
            <AlertDescription color="black">
              Username might already exist...
            </AlertDescription>
          </Alert>
        </Stack>
      )}

      <Container>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" />
              <Input
                // type="email"
                name="emailInput"
                required
                className="form-control"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                size="lg"
              />
            </InputGroup>

            {mailError && (
              <Alert status="error" borderRadius="10px">
                <AlertIcon />
                <AlertTitle color="black">
                  Please insert a valid mail adress
                </AlertTitle>
              </Alert>
            )}

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <Input
                marginRight="5px"
                type="text"
                placeholder="Username"
                name="usernameInput"
                required
                className="form-control"
                value={username}
                onChange={handleChange}
                size="lg"
              />

              <Input
                marginLeft="5px"
                type="password"
                name="passwordInput"
                required
                className="form-control"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                size="lg"
              />
            </InputGroup>
          </Stack>

          <Button
            type="submit"
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
            Sign up
          </Button>
        </form>
      </Container>
    </Container>
  );
}

export default Register;
