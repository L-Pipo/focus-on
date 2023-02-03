import { Router, Response, Request } from "express";

import { daysService } from "../services/days.service";

export const daysRouter = Router();

daysRouter.get("/:userId", (req: Request, res: Response) => {
  daysService
    .getAllDays(req.params.userId)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

daysRouter.get("/:userId/currentday/:id", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const dayId = req.params.id;
  daysService
    .getOneDay(userId, dayId)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

daysRouter.post("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  daysService
    .addDay(userId)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

// daysRouter.get("/:userId/currentday/:id", async function (req, res) {
//     let userId = req.params.userId;
//     let dayId = req.params.id;
//     try {
//       let days: Day[] = (
//         await db(`SELECT * FROM days WHERE id=${dayId} AND user_id=${userId}`)
//       ).data;
//       if (days.length === 0) {
//         res.status(404).send({ error: "Day not found" });
//       } else {
//         //fetch remaining data: tasks
//         let taskResults: Task[] = (
//           await db(
//             `SELECT * FROM tasks WHERE day_id=${dayId} AND user_id=${userId}`
//           )
//         ).data;
//         // taskResults is an array with an object inside that gets added to days object
//         days[0]["tasks"] = taskResults;
//         //fetch remaining data: pomodoros
//         let pomodoroResult: Pomodoro[] = (
//           await db(
//             `SELECT * FROM pomodoro WHERE day_id=${dayId} AND user_id=${userId}`
//           )
//         ).data;
//         days[0]["sessions"] = pomodoroResult;
//         res.send(days[0]);
//       }
//     } catch (err) {
//       res.status(500).send({ error: getErrorMessage(err) });
//     }
//   });

// daysRouter.post("/:userId", async function (req, res) {
//     let userId = req.params.userId;

//     let getDay = new Date();
//     var dd = String(getDay.getDate()).padStart(2, "0");
//     var mm = String(getDay.getMonth() + 1).padStart(2, "0");
//     var yyyy = getDay.getFullYear();
//     let today = dd + "." + mm + "." + yyyy;

//     try {
//       let day: Day[] = (
//         await db(`SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`)
//       ).data;
//       // let dayExist: any = await db(day);
//       if (day.length !== 0) {
//         res.send({ error: "Day already exists." });
//       } else {
//         await db(`INSERT INTO days (date, user_id)
//         VALUES ("${today}", ${userId})`);
//         let days: Day[] = (
//           await db(
//             `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
//           )
//         ).data;
//         res.status(201).send(days);
//       }
//     } catch (err) {
//       res.status(500).send({ error: getErrorMessage(err) });
//     }
//   });
