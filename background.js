chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith("http")) {
    var currentSite = new URL(tab.url).hostname;

    chrome.storage.local.get("visitedSites", function(data) {
      var visited = data.visitedSites ? data.visitedSites : [];

      if (visited.indexOf(currentSite) === -1) {
        visited.push(currentSite);
        chrome.storage.local.set({ visitedSites: visited });
        chrome.storage.local.set({ showPopup: true, currentSite: currentSite });

        // ✅ Show system notification
        chrome.notifications.create({
          type: "basic",
          title: "New Site Detected",
          message: "You just visited: " + currentSite,
          iconUrl: "icon.png" // Make sure this file is in your folder
        });

        // ✅ Add red "NEW" badge on the icon
        chrome.action.setBadgeText({ text: "NEW", tabId: tabId });
        chrome.action.setBadgeBackgroundColor({ color: "#FF0000", tabId: tabId });

      } else {
        chrome.storage.local.set({ showPopup: false });

        // ✅ Clear the badge if the site is already known
        chrome.action.setBadgeText({ text: "", tabId: tabId });
      }
    });
  }
});
