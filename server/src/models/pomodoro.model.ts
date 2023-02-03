import { db } from "../database/db.helper";

export const pomodoroModel = {
  getPomodoro(userId: any, day: any) {
    return db(
      `SELECT * FROM pomodoro WHERE user_id=${userId} AND day_id = ${day}`
    ).then((result) => result.data);
  },

  addPomodoro(user_id: any, day_id: any) {
    return db(
      `INSERT INTO pomodoro (day_id, user_id) VALUES (${day_id}, ${user_id})`
    ).then((result) => result.data);
  },
};
