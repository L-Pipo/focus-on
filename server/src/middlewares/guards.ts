import { Response, Request } from "express";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = require("../configs/config");

/**
 * Guards are middleware that "protect" route functions
 **/

/**
 * Make sure the user is logged in
 **/

export function ensureUserLoggedIn(req: Request, res: Response, next: any) {
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token
    jwt.verify(token, SECRET_KEY);
    // If we get here, a valid token was passed
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param (route)
 * right now I don't use ensureSameUser - Do I need it somewhere?
 * btw we have to make it a number because params are by default strings
 **/

export function ensureSameUser(req: Request, res: Response, next: any) {
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token
    let payload: any = jwt.verify(token, SECRET_KEY);
    // If we get here, a valid token was passed
    if (payload.userId === Number(req.params.userId)) {
      next();
    } else {
      res.status(403).send({ error: "Forbidden" });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req: Request) {
  // Return '' if header not found
  if (!("authorization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader: any = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
