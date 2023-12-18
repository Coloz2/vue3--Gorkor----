import { addData, getLetter } from "../controllers/acceptController.js";
import Express from "express";

const acceptRouter = Express.Router();

acceptRouter.route("/send").post(addData);
acceptRouter.route("/require").get(getLetter);

export default acceptRouter;
