var express = require("express");
var router = express.Router();

const multer = require("multer");

var uniqid = require("uniqid");

var auth = require("../../modulelibrary/authsession");
const { updateuser1loggedin } = require("./user1");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + "--" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

router.use(auth);

///////////////// express with socket autologout ////////////
router.use((req, res, next) => {
  function autologout(socketid) {
    if (socketid == req.app.socket.id) {
      updateuser1loggedin(req.session.userid, "offline");
      req.session.destroy();
      console.log("User Logged Out");
    }
    return;
  }
  updateuser1loggedin(req.session.userid, "online");
  req.app.socket.on("disconnect", async () => {
    setTimeout(autologout, 5000, req.app.socket.id);
    console.log("Disconnected: inside " + req.app.socket.id);
    req.app.socket.disconnect(true);
  });

  req.app.socket.on("error", async () => {
    req.app.socket.disconnect(true);
    req.session.destroy();
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  });
  next();
});

/////////////////////// for dashboard page ///////////////////
router.get("/dashboard", (req, res) => {
  try {
    console.log(
      "Connected: " + req.app.socket.id + " node1 \nmy ip is " + req.ip
    );
    req.app.socket.emit(
      "chat-message",
      "from server" + " node1 \nmy ip is " + req.ip
    );
    res.send(
      JSON.stringify([
        {
          id: "loggedin",
          name: req.session.lastname + " " + req.session.firstname,
        },
      ])
    );
    res.end();
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
///////////////////////////////////////////////////////////////

router.post("/fileupload", upload.single("file1"), (req, res) => {
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
