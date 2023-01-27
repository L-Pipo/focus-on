const { ensureSameUser } = require("../middleware/guards");

import express, { Router } from "express";
import { db } from "../model/helper";

export const usersRouter = Router();

/**
 * Get all users
 **/

usersRouter.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results: any = await db(sql);
    let users = results.data;
    users.forEach((u: any) => delete u.password); // don't return passwords
    res.send(users);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Get one user.
 * A user can only see his/her own profile info.
 **/

usersRouter.get("/:userId", ensureSameUser, async function (req, res, next) {
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
});
