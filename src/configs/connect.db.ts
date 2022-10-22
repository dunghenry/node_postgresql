import { Pool } from "pg";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();
export const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: "postgres",
  port: process.env.PORTDB,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log(colors.green("Connect DB sucessfully"));
  } catch (error) {
    console.log(colors.red("Connect DB failed"));
    console.log(error);
  }
};
process.on("SIGINT", async () => {
  console.log(colors.red("You are performing a server shutdown!"));
  await pool.end();
  process.exit(0);
});
export default connectDB;
