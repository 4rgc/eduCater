var express = require("express");
var router = express.Router();

const url = require("url");
const querystring = require("querystring");

/* GET home page. */
router.post("/changePLink", function (req, res, next) {
    //TODO: update the record in the database

    res.json({
        message: "New code: " + req.body.code,
        success: true,
    });
});

router.post("/addCourse", (req, res, next) => {
    res.json({
        message: "Add course: " + req.body.name,
        success: true,
    });
});

router.get("/getPLink", (req, res, next) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    const id = parsedQs["id"];

    res.json({
        success: true,
        link: "/assets/testdoc.pdf",
    });
});

module.exports = router;
