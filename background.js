chrome.tabs.onUpdated.addListener((tabId,changeInfo, tab) => {
  // console.log("tab", tab );
  // console.log("tab URL", tab.url );

  // if (tab.url && tab.url.includes("flipkart.com")) {
  //   const queryParameters = tab.url.split("?")[1];
  //   const urlParameters = new URLSearchParams(queryParameters);

    // console.log("tab urlParameters", urlParameters );
    // console.log("pid ", urlParameters.get("pid"));
    // console.log("lid ", urlParameters.get("lid"))
  //   chrome.tabs.sendMessage(tabId, {
  //     type: "NEW",
  //     pid: urlParameters.get("pid"),
  //     lid: urlParameters.get("lid"),
  //     videoId: urlParameters.get("v"),
  //   });
  // }
});
