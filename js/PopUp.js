import React, { useState, useEffect } from "react";

function applyPassword(url, user, password) {
  chrome.tabs.getSelected(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      from: "ext",
      action: "do_fill",
      url: url,
      user: user,
      pass: password
    });
  });
}

function getTabUrl() {
  var tabUrl = "udemy.com";

  console.log("tab url: 3", tabUrl);
  return tabUrl;
}

function Popup() {
  // var hostname=getTabUrl();
  var [hostname, setHostname] = useState("");

  const fetchAndSetHostname = () => {
   chrome.tabs.getSelected((tabs)=>{
     var url=new URL(tabs.url);
     var tabUrl=url.hostname;
     console.log("active url",tabUrl)
     setHostname(tabUrl)
   })
  };

  useEffect(() => {
    fetchAndSetHostname();
  }, []);

  var iframeLink = "http://127.0.0.1:3000/extension/password/" + hostname;
  console.log("hostname", hostname);
  var eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
  console.log("eventMethod", eventMethod);

  eventer(messageEvent, function(e) {
    console.log("data", e.data);
    var data = e.data;
    if (data.app === "vaultilo")
      chrome.tabs.getSelected(function(tab) {
        var url = new URL(tab.url);
        hostname = url.hostname;
        if (!hostname.includes("www.")) {
          hostname = "www." + hostname;
        }
        console.log("URL comp", url);
        if (hostname !== data.url) {
          console.log(
            "URls dont match ",
            "hostname:",
            hostname,
            "url:",
            data.url
          );
          alert("Can't apply.URL dont match ");
        } else {
          applyPassword(data.url, data.username, data.password);
        }
      });
    if (data.app === "filtered") {
      applyPassword(data.url, data.username, data.password);
    }
  });
  return (
    <div>
      <iframe
        frameBorder="none"
        src={iframeLink}
        style={{
          height: "510px",
          width: "320px",
          background: "#abcdef",
          display: "block",
          margin: "0px"
        }}
      ></iframe>
    </div>
  );
}
export default Popup;
