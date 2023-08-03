var checkbox = document.getElementById("cb");

checkbox.addEventListener("click", () => {
    if(checkbox.checked) {
        chrome.runtime.sendMessage({
            "message": [{"set": true}]   
        });
    } else {
        chrome.runtime.sendMessage({
            "message": [{"set": false}]
        })
    }
})


window.onload = () => {
    chrome.storage.sync.get(["set"], function(item) {
        condition = item.set;
        if(condition == true)
            checkbox.checked = true;
        else
            checkbox.checked = false;
      });
}
