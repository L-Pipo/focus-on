import React, { useEffect, useState } from "react";

import { SimpleGrid, Grid, GridItem, Text, Container } from "@chakra-ui/react";

import Local from "../helpers/Local";

import DayCard from "./DayCard";
import AddDay from "./AddDay";
import NavBar from "./NavBar";

function Overview(props) {
  let [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    getOverviewData();
  }, []);

  async function getOverviewData() {
    let id = Local.getUserId();
    try {
      let response = await fetch(`/days/${id}`);
      if (response.ok) {
        console.log(response);
        let overviewData = await response.json();
        setOverviewData(overviewData.reverse());
        // console.log(overviewData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function checkDate() {
    let getDay = new Date();
    var dd = String(getDay.getDate()).padStart(2, "0");
    var mm = String(getDay.getMonth() + 1).padStart(2, "0");
    var yyyy = getDay.getFullYear();
    let today = dd + "." + mm + "." + yyyy;
    const found = overviewData.findIndex(function (element) {
      return element.date === today;
    });
    if (found === -1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <Grid
        height="100px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={6}
        // alignItems="center"
      >
        {/* <Container display="flex" marginLeft="10px"> */}
        <GridItem
          color="#FFECEF"
          fontWeight="bold"
          justifySelf="start"
          marginLeft="10%"
          rowSpan={2}
          colSpan={2}
        >
          <Text fontSize="6xl">Focus:ON</Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}></GridItem>
        <GridItem colSpan={2} justifySelf="end" marginRight="5%">
          <NavBar />
        </GridItem>
        {/* </Container> */}
      </Grid>
      {overviewData && !checkDate() && <AddDay overviewData={overviewData} />}
      {/* overviewData is an empty array before getOverviewData() executes.
      If overviewData gets passed to DayCard before the data from the asynchronous function has arrived, it will be undefined.
      Therefore, either: overviewData && DayCard (DayCard will only render when condition is truthy) or as below: */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={8} m={10}>
        {overviewData.map((element) => {
          return <DayCard overviewData={element} key={element.id} />;
        })}
      </SimpleGrid>
    </div>
  );
}

export default Overview;
