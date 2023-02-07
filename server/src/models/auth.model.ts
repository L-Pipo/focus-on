import { db } from "../database/db.helper";

import { User } from "../types/user";

export const authModel = {
  async registerUser(
    username: any,
    hashedPassword: any,
    email: any
  ): Promise<any> {
    await db(`
INSERT INTO users (username, password, email)
VALUES ('${username}', '${hashedPassword}', '${email}')
`);
    return "Registration suceeded";
  },

  async loginUser(username: any, password: any): Promise<any> {
    let results: User[] = (
      await db(`SELECT * FROM users WHERE username = "${username}"`)
    ).data;
    if (results.length !== 0) {
      let user = results[0];
      return user;
    }
  },
};
