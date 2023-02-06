import { db } from "../database/db.helper";
import { Day } from "../types/day";

export const daysModel = {
  async getAllDays(userId: any): Promise<Day[]> {
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
      date["sessions"] = pomodoros;

      resolvedDays.push(date);
    }
    return resolvedDays;
  },

  async getOneDay(userId: any, dayId: any): Promise<Day> {
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

  async addDay(userId: number, today: string): Promise<Day> {
    let days: Day[] = (
      await db(`SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`)
    ).data;
    console.log("days model: " + days);
    console.log("days[0]: " + days[0]);
    console.log("type of days: " + typeof days);
    // console.log("user Id model: " + userId);
    console.log("days[0] JSON.stringify: " + JSON.stringify(days[0]));
    if (days.length !== 0) {
      // return error? otherwise service will never know if day already existed
      // return Promise.reject() ??
      // SQL query works! (tested with postman)
      // wrong data format
      // days is undefined
      return days[0];
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let days: Day[] = (
        await db(
          `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
        )
      ).data;
      // console.log(days);
      return days[0];
    }
  },
};
