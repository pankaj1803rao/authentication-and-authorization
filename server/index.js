require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userroute");
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow sending/receiving cookies
  })
);

app.use("/api", userRoute);

db().then(() => {
  console.log("DB connected");
  app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(
      `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
    );
  });
});
