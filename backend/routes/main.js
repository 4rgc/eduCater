var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/changePLink", function (req, res, next) {
    res.send({
        message: req.params["code"],
    });
});

module.exports = router;
