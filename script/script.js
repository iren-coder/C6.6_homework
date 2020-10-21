const echoUrl = "wss://echo.websocket.org";

const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");
let inputValue = document.querySelector(".text-place");

let webSocket;

// WebSocket
window.onload = function() {
    webSocket = new WebSocket(echoUrl);

    webSocket.onopen = function() {
        console.log("Connected")
    };

    webSocket.onmessage = function(e) {
        let data = e.data.split(":");
        console.log(data)
        if (data[0] === "https")
            return;
        else
            postMsg(e.data, user = false);
    };

    webSocket.onclose = function() {
        console.log("Disconnected")
    };

    webSocket.onerror = function(e) {
        console.log("Error" + e.data)
    };
};

window.unload = function() {
    webSocket.close();
    webSocket = null;
};

sendBtn.addEventListener("click", () => {
    let message = inputValue.value;
    postMsg(message);
    webSocket.send(message);
});

function postMsg(message, user = true) {
    let newMsg = document.createElement("p");
    if (user)
        newMsg.classList.add("set-msg");
    else
        newMsg.classList.add("get-msg");
    newMsg.innerHTML = message;
    document.querySelector(".chat-body").append(newMsg);
}

// Geolocation
geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation)
        console.log("Ваш браузер не поддерживает геолокацию")
    else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    createLink(mapLink);
    webSocket.send(mapLink);
}

function error() {
    console.log("Your location is undefined")
}

function createLink(link) {
    let newlink = document.createElement("a");
    newlink.href = link;
    newlink.classList.add("set-msg");
    newlink.innerHTML = "Geolocation";
    document.querySelector(".chat-body").append(newlink);
}