import React from "react";
import { useNavigate } from "react-router-dom";

import Local from "../helpers/Local";

import { Button, Grid, GridItem, Text } from "@chakra-ui/react";

function AddDay(props) {
  const navigate = useNavigate();

  let userId = Local.getUserId();

  async function insertDay() {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await fetch(`/days/${userId}`, options);
      if (response.ok) {
        let newDay = await response.json();
        let dayId = newDay.id;
        console.log("dayId: " + dayId);
        navigate(`/current/${dayId}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <Grid
      w="50%"
      h="200"
      mt={5}
      mb={10}
      ml={10}
      borderWidth="2px"
      borderRadius={"lg"}
      borderColor="brand.300"
    >
      <GridItem color="#FFECEF" p={5}>
        <Text textAlign="left" fontSize="xl">
          There is no entry for today!
        </Text>
        <Text textAlign="left" fontSize="lgS">
          Do you want to plan your day and increase productivity?
        </Text>
      </GridItem>
      <GridItem textAlign="left" p={5}>
        <Button
          bg="brand.200"
          color="brand.400"
          _hover={{ background: "brand.300" }}
          onClick={insertDay}
        >
          Yes! Plan new day!
        </Button>
      </GridItem>
    </Grid>
  );
}

export default AddDay;
