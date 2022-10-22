import express, { Express, Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./configs/connect.db";
dotenv.config();
const port : Number = +process.env.PORT || 4000;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
connectDB();
app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!");
});

app.listen(port, () => {
  console.log(colors.green(`Server listening on http://localhost:${port}`));
});
