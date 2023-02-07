import { pomodoroModel } from "../models/pomodoro.model";
import { errorType } from "../controllers/helpers";
import { Pomodoro } from "../types/pomodoro";

export const pomodoroService = {
  async addPomodoro(user_id: any, day_id: any) {
    const pomodoros = await pomodoroModel.addPomodoro(user_id, day_id);
    return pomodoros;
  },
};
