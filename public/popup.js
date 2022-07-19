function toggleUi(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, value, function(response){
            console.log("got response");
        });
    });
}

document.getElementById("on").addEventListener("click", () => toggleUi("on"));
document.getElementById("off").addEventListener("click", () => toggleUi("off"));