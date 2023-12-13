import express from "express";
import { parse } from "querystring";
// import { homePage, food, meet } from "./content";
const app = express()

const isPalindrome = str => {
    let trimAndPrepare = str.toLowerCase().trim().replace(/[\W_]/g, "")
    return trimAndPrepare === trimAndPrepare.split("").reverse().join("")
}

app.get("/", (req, res) => {
    res.status(200).send(homePage)
})
app.get("/food", (req, res) => {
    res.status(200).send(food)
})
app.get("/meet", (req, res) => {
    res.status(200).send(meet)
})

app.get("/", (req, res) => {
    res.status(200).send("<h1>Blog Chef says Hello!</h1>")
})

app.post("/palindrome", (req, res) => {
    let body = "";
    req.on('data', data => {
        body += data
    })

    req.on("end", () => {
        let { word } = parse(body)
        res.send(word ? {word, isPalindrome: isPalindrome(word)} : {message: "No word supplied!"})
    })

   
})

app.listen(3000, () => console.log("Blog chef is cooking on port 3000"))    