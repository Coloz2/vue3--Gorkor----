import Express from "express";

import homenavRouter from "./routes/HomeNavRoutes.js";

const app = Express();
app.use(Express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use("/api/frontRender", homenavRouter);

export default app;
