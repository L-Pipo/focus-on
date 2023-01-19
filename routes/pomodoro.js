var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET pomodoro sessions for a specific day

router.get("/:userId/:day", async (req, res) => {
  let userId = req.params.userId;
  let dayId = req.params.day;
  try {
    let results = await db(
      `SELECT * FROM pomodoro WHERE user_id=${userId} AND day_id = ${dayId}`
    );
    let sessions = results.data;
    if (sessions.length === 0) {
      res.status(404).send({
        error: "Sorry, there are no pomodoro sessions for the requested day.",
      });
    } else {
      res.send(sessions);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new pomodoro session

// data that is being send back doesn't make sense
// for what is it needed?

router.post("/:userId", async (req, res) => {
  let userId = req.params.userId;
  let { day_id } = req.body;
  let sql = `
        INSERT INTO pomodoro (day_id, user_id)
        VALUES (${day_id}, ${userId})
    `;
  try {
    await db(sql);
    let result = await db("SELECT * FROM pomodoro");
    let sessions = result.data;
    res.status(201).send(sessions);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
