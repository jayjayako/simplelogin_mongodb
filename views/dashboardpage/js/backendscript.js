//////////////// for socket connection /////////////////
const socket = io();

socket.on("chat-message", (msg) => {
  console.log(msg);
});

function sendrealtime() {
  socket.emit("message", {
    message: "this is from client socket",
  });
}
////////////////////////////////////////////////////////

async function dashboard() {
  try {
    let response = await fetch("/api/user1/user1/dashboard/dashboard", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "invalid") {
      location.replace("../loginpage");
    } else {
      document.getElementById(
        "titleid"
      ).innerHTML = `Welcome ${myresult[0].name}`;
    }
  } catch (error) {
    console.log("Error Occured");
  }
}

async function uploadfile() {
  var fileid = document.getElementById("file1");
  try {
    let formData = new FormData();
    formData.append("file1", fileid.files[0]);
    const response = await axios.post(
      "/api/user1/user1/dashboard/fileupload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data[0].id == "invalid") {
      alert("Invalid");
    } else {
      alert("File Upload Success");
    }
  } catch (error) {
    alert("Error Occured");
  }
}

function logout() {
  fetch("/api/authentication/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  location.replace("../loginpage");
}
