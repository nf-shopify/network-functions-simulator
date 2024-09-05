/*----- Dependencies ------*/
const express = require("express");
const router = express.Router();
const functionsCtrl = require("../controllers/functions.js");

/*----- Routes ------*/
// /functions/
router.get("/", functionsCtrl.index);

/*----- Exports ------*/
module.exports = router;
