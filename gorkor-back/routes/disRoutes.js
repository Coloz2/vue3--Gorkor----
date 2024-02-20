import Express from "express";
import { getAlldis, addDis } from "../controllers/disController.js";

const disRoute = Express.Router();
disRoute.route("/find").get(getAlldis);
disRoute.route("/add").post(addDis);

export default disRoute;
