// create tables
const express = require("express");
const router = express.Router();

const { createTable } = require("../controller/createTable");

router.get("/create", createTable);

module.exports = router;
