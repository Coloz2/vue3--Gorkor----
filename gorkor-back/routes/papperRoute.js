import Express from "express";
import { getAllBg } from "../controllers/HomeNavController.js";
import { HostNotFoundError } from "sequelize";
/////////////////////////////////////////////

////////////////////////////////////////////
const papperRouter = Express.Router();

papperRouter.route("/papper").get(getAllBg);

export default papperRouter;
