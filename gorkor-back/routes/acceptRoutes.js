import { addData } from "../controllers/acceptController.js";
import Express from "express";

const acceptRouter = Express.Router();

acceptRouter.route("/send").post(addData);

export default acceptRouter;
