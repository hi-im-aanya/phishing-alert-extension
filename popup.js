chrome.storage.local.get(["showPopup", "currentSite"], function(data) {
  var message = document.getElementById("message");

  if (data.showPopup) {
    message.innerHTML = "New site visited: <strong>" + data.currentSite + "</strong>";
  } else {
    message.innerHTML = "You've visited this site before.";
  }
});
