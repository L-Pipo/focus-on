var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all tasks

router.get("/", async function (req, res, next) {
  try {
    let tasks = await db("SELECT * FROM tasks;");
    res.send(tasks.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET all task for a day

router.get("/:day", async function (req, res, next) {
  let day = req.params.day;
  try {
    let results = await db(`SELECT * FROM tasks WHERE day_id=${day}`);
    let tasks = results.data;
    if (tasks.length === 0) {
      res
        .status(404)
        .send({ error: "There are no tasks for the requested day" });
    } else {
      res.send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new task into the DB

router.post("/", async (req, res) => {
  let { title, description, day_id, completed } = req.body;
  if (title.indexOf("'") !== -1) {
    let index = title.indexOf("'");
    let firstSubStr = title.substring(0, index);
    let secSubStr = title.substring(index);
    let newTitle = `${firstSubStr}/${secSubStr}`;
    console.log(newTitle);
    // console.log(firstSubStr);
    // console.log(secSubStr);
  }
  // if title includes ' (also description?)
  // find index of '
  // two substrings, seperate at '
  // before ' include / and assign this to title/description variable
  // use this variable in sql request
  //
  // if (title.includes("'")) {
  //   console.log(title.indexOf("'"));
  // }
  let sql = `
      INSERT INTO tasks (title, description, day_id, completed)
      VALUES ('${title}', '${description}', ${day_id}, ${completed})
  `;
  console.log(title);
  try {
    await db(sql);
    let result = await db("SELECT * FROM tasks");
    let tasks = result.data;
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a task from DB

router.delete("/:id", async function (req, res, next) {
  let taskId = req.params.id;
  try {
    let result = await db(`SELECT * FROM tasks WHERE id=${taskId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Task not found" });
    } else {
      await db(`DELETE FROM tasks WHERE id=${taskId}`);
      let result = await db(`SELECT * FROM tasks`);
      let tasks = result.data;
      res.status(201).send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE completed in task

router.patch("/:id/completed", async function (req, res, next) {
  const taskId = req.params.id;
  const changes = req.body;
  try {
    await db(
      `UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`
    );
    let updatedTask = await db(`SELECT * FROM tasks WHERE id=${taskId}`);
    res.status(201).send(updatedTask.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
