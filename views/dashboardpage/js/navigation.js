// page 1
function page1() {
  document.getElementById("page1").style.display = "block";
  dashboard();
}

setTimeout(page1, 200);

window.addEventListener("error", function () {
  setTimeout(page1, 200);
});
