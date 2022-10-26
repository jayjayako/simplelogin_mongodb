const user1 = require("../../models/user1");

const user1registerauth = async (req, res, next) => {
  try {
    res.locals.results = "none";
    const { username, password } = req.body;
    const results = await user1.findOne({ username });
    if (results) {
      res.locals.results = results;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const user1registerinsert = async (post) => {
  const register = new user1(post);
  try {
    const results = await register.save();
    if (results) {
      console.log("Insert Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  user1registerauth: user1registerauth,
  user1registerinsert: user1registerinsert,
};
