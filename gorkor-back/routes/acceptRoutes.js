import {
  addData,
  getLetter,
  getCurPasser,
  anyUnread,
  alreadyRead,
  sendHistory,
} from "../controllers/acceptController.js";
import Express from "express";

const acceptRouter = Express.Router();

acceptRouter.route("/send").post(addData);
acceptRouter.route("/require").get(getLetter);
acceptRouter.route("/current").get(getCurPasser);
acceptRouter.route("/unread").get(anyUnread);
acceptRouter.route("/read").post(alreadyRead);
acceptRouter.route("/history").get(sendHistory);
export default acceptRouter;
