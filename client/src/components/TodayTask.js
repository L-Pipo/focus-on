import React, { useState } from "react";

import {
  Container,
  Text,
  Input,
  Button,
  IconButton,
  Box,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

import Local from "../helpers/Local";

const INIT_STATE = {
  todo: "",
  description: "",
};

function TodayTask(props) {
  let [inputData, setInputData] = useState(INIT_STATE);

  let userId = Local.getUserId();

  function handleChange(event) {
    let { name, value } = event.target;
    setInputData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    addTask();
    setInputData(INIT_STATE);
  }

  async function addTask() {
    const newTaskObject = {
      title: inputData.todo,
      description: inputData.description,
      day_id: props.currentDayData.id,
      completed: 0,
      user_id: userId,
    };

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskObject),
    };
    try {
      let response = await fetch("/tasks", options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function updateTask(id) {
    let completedTask = {
      completed: 1,
    };
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(completedTask),
    };
    try {
      let response = await fetch(`/tasks/${id}/completed`, options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function deleteTask(id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/tasks/${id}`, options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <Container color="brand.300">
      <Container>
        <Text fontSize="xl" mb={5}>
          Today's Tasks:
        </Text>
      </Container>

      <Accordion allowToggle>
        {props.currentDayData.tasks.map((element) => (
          <AccordionItem key={element.id}>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  textDecoration={
                    element.completed === 1 ? "line-through" : null
                  }
                >
                  {element.title}
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={"left"} bg={"brand.400"}>
              {element.description}
              <br></br>
              <Container display={"flex"} justifyContent={"flex-end"}>
                <IconButton
                  aria-label="Mark task as done"
                  icon={<CheckIcon />}
                  m={2}
                  bg="brand.200"
                  color="brand.400"
                  size={"xs"}
                  _hover={{ background: "brand.300" }}
                  onClick={() => updateTask(element.id)}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<DeleteIcon />}
                  bg="brand.200"
                  m={2}
                  color="brand.400"
                  size={"xs"}
                  _hover={{ background: "brand.400" }}
                  onClick={() => deleteTask(element.id)}
                />
              </Container>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Container p="6">
        <Text fontSize="lg" m={2}>
          New To-Do
        </Text>
        <form onSubmit={handleSubmit}>
          <label>
            Task:
            <Input
              m={2}
              type="text"
              name="todo"
              value={inputData.todo}
              onChange={handleChange}
              focusBorderColor="brand.200"
            />
          </label>
          <label>
            Description:
            <Textarea
              m={2}
              type="text"
              name="description"
              value={inputData.description}
              onChange={handleChange}
              focusBorderColor="brand.200"
            />
          </label>
          <Button
            m={2}
            bg="brand.200"
            color="brand.400"
            _hover={{ background: "brand.300" }}
            type="submit"
          >
            Add
          </Button>
        </form>
      </Container>
    </Container>
  );
}

export default TodayTask;
