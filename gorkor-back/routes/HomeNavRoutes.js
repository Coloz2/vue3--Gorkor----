import Express from "express";
import { getAll } from "../controllers/HomeNavController.js";
import { HostNotFoundError } from "sequelize";
/////////////////////////////////////////////

////////////////////////////////////////////
const homenavRouter = Express.Router();

homenavRouter.route("/sb").get(getAll);

export default homenavRouter;
