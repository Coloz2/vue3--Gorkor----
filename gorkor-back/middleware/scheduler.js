import cron from "node-cron";
import { passer } from "../models/rebirth.js";
import { Op } from "sequelize";
export const scheduler = {
  start: () => {
    // 每天 0:0 触发任务
    scheduler.task = cron.schedule("40 17 * * *", async () => {
      try {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        // 找到三天未登录的用户
        const silentUsers = await passer.findAll({
          where: {
            lastLoginAt: {
              [Op.lt]: threeDaysAgo,
            },
          },
          raw: true,
        });

        if (silentUsers) {
          // 将这些用户标记为沉默用户
          for (const user of silentUsers) {
            console.log(user.id);
            const res = await passer.update(
              { silence: true },
              { where: { id: user.id } }
            );
            console.log(res);
          }
        }

        console.log("沉默用户检查完成");
      } catch (error) {
        console.error("沉默用户检查出错:", error);
      }
    });

    // 启动定时任务
    scheduler.task.start();
  },
};
