import { db } from "../database/db.helper";
import { Pomodoro } from "../types/pomodoro";

export const pomodoroModel = {
  async getPomodoro(userId: any, day: any): Promise<Pomodoro[]> {
    let pomodoros = (
      await db(
        `SELECT * FROM pomodoro WHERE user_id=${userId} AND day_id = ${day}`
      )
    ).data;
    return pomodoros;
  },

  // addPomodoro --> async

  async addPomodoro(user_id: any, day_id: any): Promise<Pomodoro[]> {
    let sql = await db(`
      INSERT INTO pomodoro (day_id, user_id)
      VALUES (${day_id}, ${user_id})
  `);
    let sessions = (await db("SELECT * FROM pomodoro")).data;
    return sessions;
  },
};
