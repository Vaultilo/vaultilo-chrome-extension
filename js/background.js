console.log("The Background is running")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("The request",request);
    // Callback for that request
   sendResponse();
});