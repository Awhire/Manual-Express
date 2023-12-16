import express from "express";
import { join } from "path"; 
import session from "express-session";
// import { homePage, food, meet } from "./content";
const app = express()

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
app.set("view engine", "pug")

app.get("/", (req, res) => {
    res.status(200).send("<h1>Blog Chef says Hello!</h1>")
})

// Serving Static Assets and HTML Files
app
    .get("/admin", (req, res) => {
        req.session.user ? res.redirect("/admin/dashboard") : res.redirect("admin/login")
    })
    .get("/admin/login", (req, res) => res.render("login"))
    .post("/admin/login", (req, res) => {
        const {email, password} = req.body
        if (email === "admin@gmail.com" && password === "password"){
            req.session.user = "Homer Simpson";  //Storing data in the session
            return res.redirect("/admin/dashboard")
        }

        return res.redirect("/admin/login")
    });

app.get("/admin/dashboard", (req, res) => res.render("dashboard", {
    user: req.session.user,
    posts: [
        {
            id: 1,
            author: "Joe M",
            title: "I love Express",
            content: "Express is a wonderful framework for building Node.js Apps"
        },
        {
            id: 2,
            author: "Mike F",
            title: "Have you tried pug",
            content: "I recently tried th Pug template language and it's excellent"
        }
    ]
}))

app.post("/admin/approve", (req, res) => res.redirect("/admin/dashboard"))

app.get("/admin/logout", (req, res) => {
    delete req.session.user
    res.redirect("/admin/login")
})

app.post("/api/posts", (req, res) => {
    console.log(req.body);
    res.json({ message: "Got it!" })
})

app.listen(3000, () => console.log("Blog chef is cooking on port 3000"))     

