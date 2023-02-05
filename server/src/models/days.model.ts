import { db } from "../database/db.helper";
import { Day } from "../types/day";

export const daysModel = {
  async getAllDays(userId: any) : Promise<Day[]> {
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

  // sql syntax error

  async addDay(userId: number, today: string) : Promise<Day> {
    let days : Day[] = (await db(
      `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
    )).data;
    console.log(days)
    if (days.length !== 0) {
      return days[0]
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let days: Day[] = (
        await db(
          `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
        )
      ).data;
      console.log(days);
      return days[0];
      // return db(
      //   `INSERT INTO days (date, user_id) VALUES ("${today}", ${userId})`
      // ).then((result) => result.data);
    }
  },
};
