import React, { useState } from "react";
import {
  Button,
  Heading,
  Container,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Container maxW="md" color="white">
      <Stack spacing="8">
        <Heading fontsize="lg" mt="50px" mb="30px">
          Log in to your account
        </Heading>
      </Stack>

      <div className="LoginView row">
        {props.loginError && (
          <div className="alert alert-danger">{props.loginError}</div>
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
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginView;
