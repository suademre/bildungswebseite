

const express = require('express');
const anmelden = require('./anmelden');
const login = require("./login");
const panel = require('./panel');
const router = express.Router();  //Router lari olusturmak icin fons seklinde kullaniyoruz

router.use("/anmelden",anmelden);

router.use("/login",login)

router.use("/panel",panel);


module.exports = router;