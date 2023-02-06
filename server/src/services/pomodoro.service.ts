import { pomodoroModel } from "../models/pomodoro.model";
import { errorType } from "../controllers/helpers";
import { Pomodoro } from "../types/pomodoro";

export const pomodoroService = {
  async getPomodoro(userId: any, dayId: any): Promise<Pomodoro[]> {
    try {
      const pomodoros = await pomodoroModel.getPomodoro(userId, dayId);
      return pomodoros;
    } catch (error) {
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },

  async addPomodoro(day_id: any, user_id: any) {
    const pomodoros = await pomodoroModel.addPomodoro(day_id, user_id);
    return pomodoros;
  },
};
