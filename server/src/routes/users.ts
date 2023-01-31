import { ensureSameUser } from "../middlewares/guards";

import { Router, Request, Response } from "express";
import { User } from "../types/user";

import { db } from "../database/db.helper";
import { getErrorMessage } from "../utils/getErrorMessage";

export const usersRouter = Router();

/**
 * Get all users
 **/

usersRouter.get("/", async function (req: Request, res: Response) {
  try {
    let users: User[] = (await db("SELECT * FROM users ORDER BY username"))
      .data;
    users.forEach((u: any) => delete u.password); // don't return passwords
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

/**
 * Get one user.
 * A user can only see his/her own profile info.
 **/

usersRouter.get(
  "/:userId",
  ensureSameUser,
  async function (req: Request, res: Response) {
    let { userId } = req.params;
    let sql = "SELECT * FROM users WHERE id = " + userId;

    try {
      let results: any = await db(sql);
      // We know user exists because he/she is logged in!
      let user = results.data[0];
      delete user.password; // don't return the password
      res.send(user);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }
);
