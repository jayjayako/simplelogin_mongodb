var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const Joi = require("joi");

const bcrypt = require("bcrypt");

const { user1auth } = require("./user1");
const { user1auth2 } = require("./user1");

async function loginauth(req, res, next) {
  const { username, password } = req.body;
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    username: username,
    password: password,
  };
  const validationresult = await schema.validate(dataToValidate);
  if (validationresult.error == null) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

/////////////////////// for login page /////////////////////
router.use(upload.none(), loginauth, user1auth, async (req, res) => {
  const { password } = req.body;
  var results = res.locals.results;
  if (
    results &&
    results != "none" &&
    (await bcrypt.compare(password, results.password))
  ) {
    console.log("Success Login");
    req.session.authenticated = true;
    req.session.userid = results.id;
    req.session.lastname = results.lastname;
    req.session.firstname = results.firstname;
    setTimeout(user1auth2, 5000, req);
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
//////////////////////////////////////////////////////////////

module.exports = router;
