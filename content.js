// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.showPopup) {
    // Create the popup container
    const popup = document.createElement("div");
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #fff;
        border: 2px solid #333;
        padding: 15px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        z-index: 999999;
        font-family: sans-serif;
        font-size: 14px;
      ">
        ⚠️ New site visited: <strong>${request.currentSite}</strong>
        <span id="close-popup" style="margin-left: 10px; cursor: pointer;">❌</span>
      </div>
    `;

    document.body.appendChild(popup);

    // Close popup when "X" is clicked
    document.getElementById("close-popup").addEventListener("click", () => {
      popup.remove();
    });

    // Optionally reset the flag
    chrome.storage.local.set({ showPopup: false });
  }
});