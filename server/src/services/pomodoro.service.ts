import { pomodoroModel } from "../models/pomodoro.model";
import { errorType } from "../controllers/helpers";

export const pomodoroService = {
  getPomodoro(userId: any, day: any) {
    return pomodoroModel.getPomodoro(userId, day).then((result) =>
      result.length !== 0
        ? pomodoroModel.getPomodoro(userId, day)
        : Promise.reject({
            status: errorType.NOT_FOUND,
            message: "Not found",
          })
    );
  },

  addPomodoro(dayId: any, userId: any) {
    return pomodoroModel.addPomodoro(dayId, userId);
  },
};
