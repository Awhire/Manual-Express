import express from "express";
import { join } from "path"; 
import { createWriteStream } from "fs";
import morgan from "morgan"
import session from "express-session";
import compression from "compression";
import home from "./routes/home";
import admin from "./routes/admin"
import api from "./routes/api"

// import { homePage, food, meet } from "./content";
const app = express()
const logFile = join(__dirname, "blogchef.log");

app.use(compression())
// Middleware (serving static assest)
app.use("/assets", express.static(join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/admin", session({
    name: "sessId",
    resave: false,
    saveUninitialized: true,
    secret: app.get("env") === "production" ? process.env.sessionSecret : "2bb375d5abe58776bbf28695",
    cookie: {
        httpOnly: true,
        maxAge: 18000000,
        secure: app.get("env") === "production" ? true : false
    }
}))
app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);
app.set("view engine", "pug")

app.use("/", home)
app.use("/admin", admin)
app.use("/api", api)



app.listen(3000, () => console.log("Blog chef is cooking on port 3000"))     

