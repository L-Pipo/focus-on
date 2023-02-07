import { usersModel } from "../models/user.model";

export const usersService = {
  async getUser(userId: any) {
    try {
      return await usersModel.getUser(userId);
    } catch (error) {
      Promise.reject({
        status: 500,
        message: "Server error",
      });
    }
  },
};
