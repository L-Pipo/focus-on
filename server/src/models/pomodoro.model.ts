import { db } from "../database/db.helper";
import { Pomodoro } from "../types/pomodoro";

export const pomodoroModel = {
  async addPomodoro(user_id: any, day_id: any): Promise<Pomodoro> {
    await db(`
      INSERT INTO pomodoro (user_id, day_id)
      VALUES (${user_id}, ${day_id})
  `);
    let todaySessions = (
      await db(
        `SELECT * FROM pomodoro WHERE user_id=${user_id} AND day_id = ${day_id}`
      )
    ).data;
    return todaySessions;
  },
};
