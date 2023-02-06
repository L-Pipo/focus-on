import { errorType } from "../controllers/helpers";
import { tasksModel } from "../models/tasks.model";
import { escapeQuote } from "../utils/escapeQuote";
import { Task } from "../types/task";

export const tasksService = {
  getTasksByDay(userId: any, day: any) {
    return tasksModel.getTasksByDay(userId, day).then((result) =>
      result.length !== 0
        ? tasksModel.getTasksByDay(userId, day)
        : Promise.reject({
            status: errorType.NOT_FOUND,
            message: "Not found",
          })
    );
  },

  addTask(
    title: any,
    description: any,
    day_id: any,
    completed: any,
    user_id: any
  ): any {
    title = escapeQuote(title);
    description = escapeQuote(description);
    return tasksModel.addTask(title, description, day_id, completed, user_id);
  },

  deleteTask(taskId: any) {
    return tasksModel.deleteTask(taskId);
  },

  updatedTask(taskId: any, changes: any) {
    return tasksModel.updatedTask(taskId, changes);
  },
};

// add types correctly?
// add getErrorMessage (utils)?
