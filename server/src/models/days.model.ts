import { db } from "../database/db.helper";

export const daysModel = {
  async getAllDays(userId: any) {
    let resolvedDays: any = [];
    let days = (await db(`SELECT * FROM days WHERE user_id=${userId}`)).data;
    for (let date of await days) {
      let tasks = (
        await db(
          `SELECT * FROM tasks WHERE day_id=${date.id} AND user_id=${userId}`
        )
      ).data;
      let pomodoros = (
        await db(
          `SELECT * FROM pomodoro WHERE day_id=${date.id} AND user_id=${userId}`
        )
      ).data;

      date["tasks"] = tasks;
      date["pomodoro"] = pomodoros;

      resolvedDays.push(date);
      return resolvedDays;
    }
  },

  async getOneDay(userId: any, dayId: any) {
    let days = (
      await db(`SELECT * FROM days WHERE id=${dayId} AND user_id=${userId}`)
    ).data;

    let tasks = (
      await db(
        `SELECT * FROM tasks WHERE day_id=${dayId} AND user_id=${userId}`
      )
    ).data;
    days[0]["tasks"] = tasks;
    let pomodoro = (
      await db(
        `SELECT * FROM pomodoro WHERE day_id=${dayId} AND user_id=${userId}`
      )
    ).data;
    days[0]["sessions"] = pomodoro;
    return days[0];
  },

  // sql syntax error

  async addDay(userId: any, today: any) {
    let days = await db(
      `SELECT * FROM days WHERE date=${today} AND user_id=${userId}`
    );
    if (days.data !== 0) {
      return "Day exists!";
    } else {
      return db(
        `INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`
      ).then((result) => result.data);
    }
  },
};
