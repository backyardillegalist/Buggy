const ID = 1;
const UAs = ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36",
"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
"Googlebot/2.1 (+http://www.google.com/bot.html)"]

function setHeaders () {
  chrome.storage.sync.set({"set": true}); // set enable state
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      "id": ID,
      "priority": 1,
      "action": {"type": "modifyHeaders",
      "requestHeaders": [
        {"header": "user-agent", "operation": "set", "value": UAs[Math.floor(Math.random()*UAs.length)]},
        {"header": "cookie", "operation": "remove"},
        {"header": "sec-ch-ua-ua", "operation": "remove"},
        {"header": "sec-ch-ua-platform", "operation": "remove"},
        {"header": "sec-ch-ua-platform-version", "operation": "remove"},
      
      ]},
      "condition": {
          "urlFilter": "http*",
          "resourceTypes": [ "main_frame" ]
      }
    }]
  });
};



chrome.runtime.onMessage.addListener((data) => {
  let msg = data.message[0].set;

  if(msg) {
    // remove old rules and create new
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [ID]
    }, setHeaders);

    console.log("set");
  } else {

    // disable
    chrome.storage.sync.set({"set": false}); // set disable state
    chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [ID]})
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"set": false}); // set disable state
});