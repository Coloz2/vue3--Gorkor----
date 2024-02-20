import Express from "express";
import {
  getAllquestions,
  addQuestion,
  getQuestionById,
} from "../controllers/questionController.js";

import { protect } from "../middleware/protect.js";

const qusRouter = Express.Router();

qusRouter.route("/id").get(getQuestionById);
qusRouter.route("/require").get(getAllquestions);
qusRouter.route("/add").post(addQuestion);
export default qusRouter;
