import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorType } from "../controllers/helpers";

const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../configs/config");

import { authModel } from "../models/auth.model";

export const authService = {
  async registerUser(username: any, password: any, email: any) {
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    try {
      return await authModel.registerUser(username, hashedPassword, email);
    } catch (error) {
      return Promise.reject({
        status: errorType.BAD_REQUEST,
        message: "Registration failed",
      });
    }
  },

  async loginUser(username: any, password: any) {
    try {
      let user = await authModel.loginUser(username, password);
      let passwordsEqual = await bcrypt.compare(password, user.password!);
      if (passwordsEqual) {
        let payload = { userId: user.id };
        let token = jwt.sign(payload, SECRET_KEY);
        delete user.password;
        return { message: "Login succeeded", token: token, user: user };
      } else {
        return "Passwords don't match";
      }
    } catch (error) {
      return Promise.reject({
        status: 401,
        message: "Login failed",
      });
    }
  },
};
