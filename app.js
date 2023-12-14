import express from "express";
import { join } from "path";
import { parse } from "querystring";
// import { homePage, food, meet } from "./content";
const app = express()

// Middleware (serving static assest)
app.use("/assets", express.static(join(__dirname, "public")))
app.set("view engine", "pug")

app.get("/", (req, res) => {
    res.status(200).send("<h1>Blog Chef says Hello!</h1>")
})

// Serving Static Assets and HTML Files
app
    .get("/admin/login", (req, res) => res.render("login"))
    .post("/admin/login", (req, res) => res.redirect("/admin/dashboard"))

app.get("/admin/dashboard", (req, res) => res.render("dashboard"))
app.get("/admin/logout", (req, res) => res.redirect("/admin/login"))

app.listen(3000, () => console.log("Blog chef is cooking on port 3000"))     