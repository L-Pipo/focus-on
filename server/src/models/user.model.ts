import { db } from "../database/db.helper";

export const usersModel = {
  async getUser(userId: any) {
    let result: any = await db(`SELECT * FROM users WHERE id=${userId}`);
    let user = result.data[0];
    delete user.password;
    return user;
  },
};
