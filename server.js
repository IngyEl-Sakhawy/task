const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3100;

app.use(bodyParser.json());

app.post("/data/getApiKey", (req, res) => {
    const { Email } = req.body;
    if (Email === "ingy.mahmoud.elsakhawy@gmail.com") {
        res.json({ ApiKey: "sample-api-key-123456" });
    } else {
        res.status(400).json({ error: "Invalid email address" });
    }
});

app.get("/data/getMyTask", (req, res) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey === "sample-api-key-123456") {
        res.json({
            Indexes: "0,1,2,3,7,8,9,10,11",
            Text: "example_password"
        });
    } else {
        res.status(401).json({ error: "Invalid API key" });
    }
});

app.post("/data/submitPassword", (req, res) => {
    const apiKey = req.headers["x-api-key"];
    const { Password } = req.body;

    if (apiKey === "sample-api-key-123456") {
        if (Password === "exam_pass") {
            // Assuming 'exam' is the correct password
            res.json({ message: "Password submitted successfully!" });
        } else {
            res.status(400).json({ error: "Incorrect password" });
        }
    } else {
        res.status(401).json({ error: "Invalid API key" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
