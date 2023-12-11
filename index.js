import express from "express";
import ViteExpress from "vite-express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/results', express.static('results'));

let userData = [];
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

    userData.push(dataGet);
    console.log(userData);
    res.json({ task: "success" });
})

app.get('/storageData', (req, res) => {
    let dataSto = { data: userData };
    res.json(dataSto);
})

ViteExpress.listen(app, PORT, () => console.log("Server is listening..."));