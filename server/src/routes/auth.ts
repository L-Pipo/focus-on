import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../types/user";

import { db } from "../database/db.helper";
import { getErrorMessage } from "../utils/getErrorMessage";

const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../configs/config");

export const authRouter = Router();

/**
 * Register a user
 **/

authRouter.post("/register", async (req: Request, res: Response) => {
  let { username, password, email } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

/**
 * Log in a user
 **/

authRouter.post("/login", async (req: Request, res: Response) => {
  let { username, password } = req.body;

  try {
    let results: User[] = (
      await db(`SELECT * FROM users WHERE username = '${username}'`)
    ).data;
    if (results.length === 0) {
      // Username not found
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password!);
      if (passwordsEqual) {
        // Passwords match
        let payload = { userId: user.id };
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});
