import Express from "express";
import { codDrafts, getDrafts, test } from "../controllers/draftsController.js";

const draftsRoute = Express.Router();
draftsRoute.route("/save").post(codDrafts);
draftsRoute.route("/save2").post(codDrafts);
draftsRoute.route("/find").get(getDrafts);
draftsRoute.route("/test").post(test);
export default draftsRoute;
