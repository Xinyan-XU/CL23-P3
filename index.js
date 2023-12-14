import express from "express";
import ViteExpress from "vite-express";
import { Database } from "quickmongo";
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();
const mongodbPassword = process.env.MONGODB;
const db = new Database(mongodbPassword);

db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

app.use(express.json());

app.post('/userData', (req, res) => {
    console.log(req.body);

    let currentDate = new Date();
    let time = currentDate.toDateString().slice(4, 15);
    let dataGet = {
        ID: req.body.userID,
        timeM: req.body.minutes,
        timeS: req.body.seconds,
        date: time
    }

    // userData.push(dataGet);
    // console.log(userData);
    db.push("webData", dataGet);
    res.json({ task: "success" });
})

//let userData = [];
app.get('/storageData', (req, res) => {
    db.get("webData").then(userData => {
        let dataSto = { data: userData };
        res.json(dataSto);
    })
})

const listener = ViteExpress.listen(app, PORT, () =>
    console.log("Server is listening on port " + listener.address().port));