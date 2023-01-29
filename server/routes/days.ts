import { Router, Request, Response } from "express";
import { db } from "../model/helper";
import { Day } from "../types/day";
import { Pomodoro } from "../types/pomodoro";
import { Task } from "../types/task";

export const daysRouter = Router();

// GET all days

daysRouter.get(
  "/:userId",
  async function (req: Request, res: Response) {
    let { userId } = req.params;

    try {
      let resolvedDays: Day[] = [];

      let days: Day[] = (await db(`SELECT * FROM days WHERE user_id=${userId}`)).data;

      for (let date of days) {
        let tasks: Task[] = (await db(
          `SELECT * FROM tasks WHERE day_id=${date.id} AND user_id=${userId}`
        )).data;
       

        let pomodoros: Pomodoro[] = (await db(
          `SELECT * from pomodoro WHERE day_id=${date.id} AND user_id=${userId}`
        )).data;

        // build days object with all corresponding data
        date["tasks"] = tasks;
        date["sessions"] = pomodoros;

        resolvedDays.push(date);
        // Alternative code: daysData.push({ ...date, tasks: tasks, sessions: pomodoro });
      }

      res.send(resolvedDays);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }
);

// GET day

daysRouter.get("/:userId/currentday/:id", async function (req, res) {
  let userId = req.params.userId;
  let dayId = req.params.id;
  try {
    let results: any = await db(
      `SELECT * FROM days WHERE id=${dayId} AND user_id=${userId}`
    );
    // days is an object
    let days = results.data;
    if (days.length === 0) {
      res.status(404).send({ error: "Day not found" });
    } else {
      //fetch remaining data: tasks
      let taskResults: any = await db(
        `SELECT * FROM tasks WHERE day_id=${dayId} AND user_id=${userId}`
      );
      // taskResults is an array with an object inside that gets added to days object
      days[0]["tasks"] = taskResults.data;
      //fetch remaining data: pomodoros
      let pomodoroResult: any = await db(
        `SELECT * FROM pomodoro WHERE day_id=${dayId} AND user_id=${userId}`
      );
      days[0]["sessions"] = pomodoroResult.data;
      res.send(days[0]);
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message });
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
    let day = `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`;
    let dayExist: any = await db(day);
    if (dayExist.data.length !== 0) {
      res.send({ error: "Day already exists." });
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let result: any = await db(
        `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
      );
      let days = result.data;
      res.status(201).send(days);
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
});
