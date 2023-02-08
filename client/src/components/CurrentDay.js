import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Text, Button, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

import TodayTask from "./TodayTask";
import Tracker from "./Tracker";

import Local from "../helpers/Local";
import NavBar from "./NavBar";

function CurrentDay(props) {
  let { id } = useParams();
  let [currentDayData, setCurrentDayData] = useState({});

  useEffect(() => {
    getCurrentDayData();
  }, []);

  // get userId via helpers --> Locale and not params

  let userId = Local.getUserId();

  let linkToOverview = `/focus/${userId}`;

  let navigate = useNavigate();

  async function getCurrentDayData() {
    try {
      let response = await fetch(`/days/${userId}/currentday/${id}`);
      if (response.ok) {
        let currentDayData = await response.json();

        setCurrentDayData(currentDayData);
        console.log(currentDayData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function changeView() {
    navigate(linkToOverview);
  }

  return (
    <div>
      <NavBar logoutCb={props.logoutCb} changeViewCb={props.changeView} />
      <Grid>
        <GridItem mb={8}>
          <Text color="brand.300" fontSize="3xl">
            Focus Dashboard: {currentDayData.date}
          </Text>
        </GridItem>
      </Grid>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>
        {currentDayData.tasks && (
          <TodayTask
            currentDayData={currentDayData}
            updateDataCb={getCurrentDayData}
          />
        )}

        <Tracker
          dayId={currentDayData.id}
          sessions={currentDayData.sessions}
          updateDataCb={getCurrentDayData}
        />
      </SimpleGrid>
      <Button
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
        onClick={changeView}
      >
        Go back to overview
      </Button>
    </div>
  );
}

export default CurrentDay;
