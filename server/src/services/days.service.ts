import { errorType } from "../controllers/helpers";
import { daysModel } from "../models/days.model";

export const daysService = {
  getAllDays(userId: any) {
    return daysModel.getAllDays(userId);
  },

  // Promose reject not working
  // 500 error

  getOneDay(userId: any, dayId: any) {
    return daysModel.getOneDay(userId, dayId).then((result) =>
      result.length !== 0
        ? daysModel.getOneDay(userId, dayId)
        : Promise.reject({
            status: errorType.NOT_FOUND,
            message: "Not found",
          })
    );
  },

  addDay(userId: any) {
    let getDay = new Date();
    var dd = String(getDay.getDate()).padStart(2, "0");
    var mm = String(getDay.getMonth() + 1).padStart(2, "0");
    var yyyy = getDay.getFullYear();
    let today = dd + "." + mm + "." + yyyy;
    return daysModel.addDay(userId, today).then((result) =>
      result === "Day exists!"
        ? Promise.reject({
            status: errorType.BAD_REQUEST,
            message: "Day already exists",
          })
        : daysModel.addDay(userId, today)
    );
  },
};

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
