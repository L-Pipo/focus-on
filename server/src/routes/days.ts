import { Router, Request, Response } from "express";

import { Day } from "../types/day";
import { Pomodoro } from "../types/pomodoro";
import { Task } from "../types/task";

import { db } from "../database/db.helper";
import { getErrorMessage } from "../utils/getErrorMessage";

export const daysRouter = Router();

// GET all days

// express elements like req and res should not be in the same file like my business logic --> put that out
// probably part of the controller

daysRouter.get("/:userId", async function (req: Request, res: Response) {
  let { userId } = req.params;

  try {
    let resolvedDays: Day[] = [];

    let days: Day[] = (await db(`SELECT * FROM days WHERE user_id=${userId}`))
      .data;

    for (let date of days) {
      let tasks: Task[] = (
        await db(
          `SELECT * FROM tasks WHERE day_id=${date.id} AND user_id=${userId}`
        )
      ).data;

      let pomodoros: Pomodoro[] = (
        await db(
          `SELECT * from pomodoro WHERE day_id=${date.id} AND user_id=${userId}`
        )
      ).data;

      // build days object with all corresponding data
      date["tasks"] = tasks;
      date["sessions"] = pomodoros;

      resolvedDays.push(date);
      // Alternative code: daysData.push({ ...date, tasks: tasks, sessions: pomodoro });
    }

    res.send(resolvedDays);
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

// GET day

daysRouter.get("/:userId/currentday/:id", async function (req, res) {
  let userId = req.params.userId;
  let dayId = req.params.id;
  try {
    let days: Day[] = (
      await db(`SELECT * FROM days WHERE id=${dayId} AND user_id=${userId}`)
    ).data;
    if (days.length === 0) {
      res.status(404).send({ error: "Day not found" });
    } else {
      //fetch remaining data: tasks
      let taskResults: Task[] = (
        await db(
          `SELECT * FROM tasks WHERE day_id=${dayId} AND user_id=${userId}`
        )
      ).data;
      // taskResults is an array with an object inside that gets added to days object
      days[0]["tasks"] = taskResults;
      //fetch remaining data: pomodoros
      let pomodoroResult: Pomodoro[] = (
        await db(
          `SELECT * FROM pomodoro WHERE day_id=${dayId} AND user_id=${userId}`
        )
      ).data;
      days[0]["sessions"] = pomodoroResult;
      res.send(days[0]);
    }
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

// POST new day

daysRouter.post("/:userId", async function (req, res) {
  let userId = req.params.userId;

  let getDay = new Date();
  var dd = String(getDay.getDate()).padStart(2, "0");
  var mm = String(getDay.getMonth() + 1).padStart(2, "0");
  var yyyy = getDay.getFullYear();
  let today = dd + "." + mm + "." + yyyy;

  try {
    let day: Day[] = (
      await db(`SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`)
    ).data;
    // let dayExist: any = await db(day);
    if (day.length !== 0) {
      res.send({ error: "Day already exists." });
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let days: Day[] = (
        await db(
          `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
        )
      ).data;
      res.status(201).send(days);
    }
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});
