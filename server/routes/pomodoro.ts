import express, { Router } from "express";
import { db } from "../model/helper";

export const pomodoroRouter = Router();

// GET pomodoro sessions for a specific day

pomodoroRouter.get("/:userId/:day", async (req, res) => {
  let userId = req.params.userId;
  let dayId = req.params.day;
  try {
    let results: any = await db(
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
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
});

// POST new pomodoro session

// data that is being send back doesn't make sense
// for what is it needed?

pomodoroRouter.post("/", async (req, res) => {
  // let userId = req.params.userId;
  let { day_id, user_id } = req.body;
  let sql = `
        INSERT INTO pomodoro (day_id, user_id)
        VALUES (${day_id}, ${user_id})
    `;
  try {
    await db(sql);
    let result: any = await db("SELECT * FROM pomodoro");
    let sessions = result.data;
    res.status(201).send(sessions);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
});
