const attendeesKey = "attendeesKey"
const defaultAttendees = [
    {name: "Max", role: "dev"},
    {name: "Alice", role: "dev"},
    {name: "Peter", role: "dev"},
    {name: "Mary", role: "ux"},
    {name: "John", role: "po"},
    {name: "David", role: "ac"},
];

const getAttendees = () => chrome.storage.sync.get([attendeesKey]).then(value => {
    if (isEmpty(value)) {
        return defaultAttendees;
    }
    return JSON.parse(value[attendeesKey]);
});

const saveAttendees = (value) => chrome.storage.sync.set({attendeesKey: value})

function sendMessage(value) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, value, function (response) {
            console.log("got response");
        });
    });
}

document.getElementById("on").addEventListener("click", () => {
    getAttendees().then(attendees => {
        sendMessage({type: "attendees", data: attendees});
        sendMessage("on");
    })
});
document.getElementById("off").addEventListener("click", () => sendMessage("off"));
document.getElementById("save").addEventListener("click", () => {
    const attendees = document.getElementById("data").value;
    saveAttendees(attendees);
    getAttendees().then(attendees => {
        sendMessage({type: "attendees", data: attendees});
    });
});

getAttendees().then(attendees => document.getElementById("data").innerText = JSON.stringify(attendees));

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}



