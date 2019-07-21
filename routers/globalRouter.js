import express from "express";
import passport from "passport";
import routes from "../routes";
import { onlyPublic, onlyPrivate } from "../middlewares";
import { home, search } from "../controllers/videocontrollers";
import {
  postJoin,
  getLogin,
  postLogin,
  getJoin,
  login,
  logout,
  githubLogin,
  postGithubLogIn
} from "../controllers/userController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);
export default globalRouter;
