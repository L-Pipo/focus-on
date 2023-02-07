import { errorType } from "../controllers/helpers";
import { tasksModel } from "../models/tasks.model";

import { Task } from "../types/task";

export const tasksService = {
  async addTask(
    title: any,
    description: any,
    day_id: any,
    completed: any,
    user_id: any
  ): Promise<Task[]> {
    try {
      const tasks = await tasksModel.addTask(
        title,
        description,
        day_id,
        completed,
        user_id
      );
      return tasks;
    } catch (error) {
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },

  async deleteTask(taskId: any): Promise<Task> {
    try {
      return tasksModel.deleteTask(taskId);
    } catch (error) {
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },

  async updatedTask(taskId: any, changes: any) {
    try {
      return tasksModel.updatedTask(taskId, changes);
    } catch (error) {
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },
};
