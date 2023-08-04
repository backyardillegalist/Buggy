let ID = 1;
const UAs = ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36",
"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
"Googlebot/2.1 (+http://www.google.com/bot.html)"]

chrome.declarativeNetRequest.getDynamicRules((rules) => {
  // remove all exsiting rules
  for(let rule of rules) {
    chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [rule.id]});
  }
});

function setHeaders () {
  chrome.storage.sync.set({"set": true}); // set enable state
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      "id": ID,
      "priority": 1,
      "action": {"type": "modifyHeaders",
      "requestHeaders": [
        {"header": "user-agent", "operation": "set", "value": UAs[Math.floor(Math.random()*UAs.length)]},
        {"header": "accept", "operation": "set", "value": "text/plain,text/html,*/*"},
        {"header": "accept-encoding", "operation": "set", "value": "gzip,deflate,br"},
        {"header": "connection", "operation": "set", "value": "keep-alive"},
        {"header": "referrer", "operation": "set", "value": "google.com"},
        {"header": "cookie", "operation": "remove"},
        {"header": "cache-control", "operation": "remove"},
        {"header": "content-length", "operation": "remove"},
        {"header": "content-type", "operation": "remove"},
        {"header": "sec-ch-ua", "operation": "remove"},
        {"header": "sec-ch-ua-model", "operation": "remove"},
        {"header": "sec-ch-ua-platform", "operation": "remove"},
        {"header": "sec-ch-ua-platform-version", "operation": "remove"},
        {"header": "sec-ch-prefers-color-scheme", "operation": "remove"},
        {"header": "sec-ch-prefers-reduced-motion", "operation": "remove"},
        {"header": "sec-ch-ua-arch", "operation": "remove"},
        {"header": "sec-ch-ua-full-version", "operation": "remove"},
        {"header": "sec-ch-ua-mobile", "operation": "remove"},
        {"header": "sec-fetch-dest", "operation": "remove"},
        {"header": "sec-fetch-mode", "operation": "remove"},
        {"header": "sec-fetch-site", "operation": "remove"},
        {"header": "sec-fetch-user", "operation": "remove"},
        {"header": "upgrade-insecure-requests", "operation": "remove"},
        {"header": "accept-language", "operation": "remove"},
        {"header": "cache-control", "operation": "remove"},
        {"header": "device-memory", "operation": "remove"},
        {"header": "downlink", "operation": "remove"},
        {"header": "dpr", "operation": "remove"},
        {"header": "ect", "operation": "remove"},
        {"header": "rtt", "operation": "remove"},
        {"header": "viewport-width", "operation": "remove"}
      
      ]},
      "condition": {
          "urlFilter": "http*",
          "resourceTypes": [ "main_frame" ]
      }
    }]
  }, () => {
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
      ID = rules[rules.length-1].id; // set id to newly added rule id because sometime browser might automically change id if 1 already exist

    });
  });
};


chrome.runtime.onMessage.addListener((data) => {

  let msg = data.message[0].set;

  if(msg == true) {
    // remove old rules and create new
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [ID]
    }, setHeaders);
  } else {

    // disable
    chrome.storage.sync.set({"set": false}); // set disable state
    chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [ID]});
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"set": false}); // set disable state

});