"use strict";
const express = require("express");
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('from test controller');
});
module.exports = router;

//# sourceMappingURL=Test.js.map
