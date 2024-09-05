/*----- Dependencies ------*/
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const functionsRouter = require("./routes/functions");
const cartValidationRouter = require("./routes/cartValidation");

/*----- Express App ------*/
const app = express();

// use port 80 unless there exists a preconfigured port
const PORT = process.env.PORT || 8000;

/*----- Middleware Pipe ------*/
app.use(cors());
app.use(logger("dev"));
//Serving up Static HTML, JS ,CSS from public folder
app.use(express.static('public'))
// needed for POST/PUT request
app.use(express.json());

/*----- Routes ------*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/functions", functionsRouter);
app.use("/api/cartvalidation", cartValidationRouter);


// catch all route
app.use("/*", (req, res) => {
  res.status(404).json({ error: "Endpoint Not Found" });
});

/*----- Listener ------*/
app.listen(PORT, function () {
  console.log(`'Server running on ${PORT}`);
});
