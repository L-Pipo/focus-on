import React, { useEffect, useState } from "react";

import {
  CircularProgress,
  CircularProgressLabel,
  Button,
  Container,
  Text,
  ListItem,
  UnorderedList,
  IconButton,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import Local from "../helpers/Local";

import { InfoOutlineIcon } from "@chakra-ui/icons";
import clicksound from "../assets/clicksound.mp3";

function Tracker(props) {
  let [time, setTime] = useState(1500);
  let [intervalId, setIntervalId] = useState(null);

  let userId = Local.getUserId();

  function play() {
    new Audio(clicksound).play();
  }

  function printTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (time === 0) {
      // reset tracker
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(() => null);
      }
      setTime(() => 1500);

      async function sendNewSession() {
        let session = { day_id: props.dayId, user_id: userId };
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session),
        };
        try {
          let response = await fetch("/pomodoro", options);
          if (response.ok) {
            console.log(session);
            props.updateDataCb();
          } else {
            console.log(
              `Server error: ${response.status} ${response.statusText}`
            );
          }
        } catch (err) {
          console.log(`Network error: ${err.message}`);
        }
      }
      // force refetch from parent
      sendNewSession();

      play();
    }
  }, [props, time, intervalId]);

  function startTimer() {
    if (!intervalId) {
      const intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      setIntervalId(() => intervalId);
      play();
    }
    console.log(props.sessions);
  }

  function pauseTimer() {
    clearInterval(intervalId);
    setIntervalId(() => null);
  }

  function resetTimer() {
    // if intervalId is set turn off interval and set intervalstate to null
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(() => null);
    }
    setTime(() => 1500);
  }

  function printSessions() {
    if (!props.sessions) {
      return <h4>No completed sessions today.</h4>;
    } else if (props.sessions.length === 1) {
      return <h4>You have completed one session today.</h4>;
    } else {
      return (
        <h4>You have completed {props.sessions.length} sessions today.</h4>
      );
    }
  }

  return (
    <Container
      color="#FFECEF"
      borderWidth={1}
      borderColor="#F2D1D1"
      borderRadius={"2xl"}
      height="550px"
    >
      <Container>
        <Text fontSize="xl" mb={0} mt={5}>
          Pomodoro Tracker
        </Text>

        <Container>
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Information"
                icon={<InfoOutlineIcon />}
                bg="#251B37"
                color="#FFCACA"
                _hover={{ background: "#372948" }}
                size="lg"
              />
            </PopoverTrigger>
            <PopoverContent bg="#372948" textAlign={"left"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Instructions</PopoverHeader>
              <PopoverBody>
                <UnorderedList>
                  <ListItem>
                    Start the timer and focus for 25 minutes on one of today's
                    tasks
                  </ListItem>
                  <ListItem>Don't procrastinate during that time</ListItem>
                  <ListItem>Reset timer if you don't concentrate</ListItem>
                  <ListItem>
                    Use timeout button for smaller breaks, like accepting a
                    package
                  </ListItem>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Container>
      </Container>

      <Container>
        <CircularProgress
          mt={0}
          value={(time / 1500) * 100}
          color="#F2D1D1"
          size="xs"
        >
          <CircularProgressLabel fontSize="large">
            {printTime()} Minutes
          </CircularProgressLabel>
        </CircularProgress>
      </Container>
      <Container mt={5}>
        <Button
          isDisabled={time < 1500}
          onClick={startTimer}
          bg="#FFCACA"
          color="#372948"
          mr={2}
          _hover={{ background: "#FFECEF" }}
        >
          Start
        </Button>
        {time < 1500 && (
          <Button
            onClick={intervalId ? pauseTimer : startTimer}
            mr={2}
            bg="#FFCACA"
            color="#372948"
            _hover={{ background: "#FFECEF" }}
          >
            {intervalId ? "Timeout" : "Continue"}
          </Button>
        )}
        {time < 1500 && (
          <Button
            onClick={resetTimer}
            bg="#FFCACA"
            color="#372948"
            _hover={{ background: "#FFECEF" }}
          >
            Reset
          </Button>
        )}
      </Container>
      <Container fontSize={"lg"} mt={4}>
        {printSessions()}
      </Container>
    </Container>
  );
}

export default Tracker;
