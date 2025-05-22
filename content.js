// Wait 500 milliseconds to give background.js time to update storage
setTimeout(function () {
  chrome.storage.local.get(["showPopup", "currentSite"], function(data) {
    if (data.showPopup) {
      // Create the popup box
      const popup = document.createElement("div");
      popup.innerText = "⚠️ New site visited: " + data.currentSite;

      // Style the popup
      popup.style.position = "fixed";
      popup.style.top = "20px";
      popup.style.right = "20px";
      popup.style.backgroundColor = "#ffcc00";
      popup.style.padding = "15px 40px 15px 15px"; // Room for close button
      popup.style.zIndex = "9999";
      popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
      popup.style.fontSize = "16px";
      popup.style.borderRadius = "8px";
      popup.style.maxWidth = "300px";
      popup.style.lineHeight = "1.4";
      popup.style.fontFamily = "sans-serif";

      // Create the close (X) button
      const closeBtn = document.createElement("span");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "8px";
      closeBtn.style.right = "12px";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.fontSize = "20px";
      closeBtn.style.color = "#333";
      closeBtn.style.fontWeight = "bold";

      // Remove popup when close button is clicked
      closeBtn.addEventListener("click", function () {
        popup.remove();
      });

      // Add close button to the popup
      popup.appendChild(closeBtn);

      // Add the popup to the page
      document.body.appendChild(popup);

      // Auto-remove the popup after 20 seconds
      setTimeout(function () {
        if (document.body.contains(popup)) {
          popup.remove();
        }
      }, 20000); // 20,000 milliseconds = 20 seconds
    }
  });
}, 500); // wait 500ms to make sure storage is updated
