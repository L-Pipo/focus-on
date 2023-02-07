import { db } from "../database/db.helper";
import { Day } from "../types/day";

export const daysModel = {
  async getAllDays(userId: any): Promise<Day[]> {
    let resolvedDays: any = [];
    let dayIds = (await db(`SELECT id FROM days WHERE user_id=${userId}`)).data;

    for (let dayId of dayIds) {
      resolvedDays.push(await this.getOneDay(userId, dayId.id));
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
    if (days.length !== 0) {
      return days[0];
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let days: Day[] = (
        await db(
          `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`
        )
      ).data;
      return days[0];
    }
  },
};
