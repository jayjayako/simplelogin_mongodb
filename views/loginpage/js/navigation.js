// reminder always put functions under these
// like this
// document.getElementById("page1").style.display = "block";
// document.getElementById("page2").style.display = "none";
// checkuser(); <== here the function always below

//getcodeid(elementid) // use to execute script in html page

// page 1
function page1() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
  checkuser();
}

// page 2
function page2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

setTimeout(page1, 200); // always set defaullt page

window.addEventListener("error", function () {
  setTimeout(page1, 200);
});
