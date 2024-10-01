import express from "express";
import dbConnect from "./db.js";
import userRouter from "./Routes/user.route.js";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import cors from 'cors';

let server = express();

let PORT = process.env.PORT || 8080;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

server.use(cors({
    origin: "https://unlockjustbuy.netlify.app",
    credentials: true,
  })
);

server.use("/", userRouter);
server.use("/users", userRouter);
server.use("/login", userRouter);
server.use("/logout", userRouter);
server.use("/signup", userRouter);

dbConnect()
  .then(() => {
    console.log(" DataBase connected ");
    server.listen(PORT, () => {
      console.log(" Sever is running on  ", `http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

