const fs=require('fs');
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const en=JSON.parse(fs.readFileSync(path.join(__dirname, "../languages/english.json")))
const arm=JSON.parse(fs.readFileSync(path.join(__dirname, "../languages/armenian.json")))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session secret key
app.use(session({
    secret: "e17d15639bf2065231aa5d2dd902237e9b833b93e45c23fa1f11fef9ce4577c0",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use((req, res, next) => {
    if(!req.session.lang) {
        req.session.lang = "en";
    }
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index2.html"));
});

app.post("/change-lang", (req, res) => {
    req.session.lang = req.body.lang;
    req.session.save(err => {
        if (err) {
            console.error("Error saving session:", err);
        }
        res.redirect("/");
    });
});

app.get("/get-lang", (req, res) => {
    if (req.session.lang === "en") {
        res.json(en);
    } else if(req.session.lang === "arm") {
        res.json(arm);
    } 
});

const port = 3001;
app.listen(port, () => console.log(`listening on port http://localhost:${port}`));
