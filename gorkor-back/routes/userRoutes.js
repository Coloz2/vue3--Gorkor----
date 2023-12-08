import Express from "express";
import { createPasser, login, test } from "../controllers/userController.js";

const passerRouter = Express.Router();

passerRouter.route("/sign").post(createPasser);
passerRouter.route("/login").post(login);
passerRouter.route("/test").post(test);
export default passerRouter;
