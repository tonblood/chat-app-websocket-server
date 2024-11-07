(function connect() {
  const SOCKET_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : `https://${window.location.hostname}`;
  let socket = io.connect(SOCKET_URL);

  let username = document.querySelector("#username");
  let usernameBtn = document.querySelector("#usernameBtn");
  let currentUsername = document.querySelector(".card-header");
  let msg = document.querySelector("#message");
  let msgBtn = document.querySelector("#messageBtn");
  let msgList = document.querySelector("#message-list");
  let info = document.querySelector(".info");

  usernameBtn.addEventListener("click", (e) => {
    console.log(username.value);
    socket.emit("change_username", { username: username.value });
    currentUsername.textContent = username.value;
    username.value = "";
  });

  msgBtn.addEventListener("click", (e) => {
    console.log(msg.value);
    socket.emit("new_message", { message: message.value });
    message.value = "";
    info.textContent = "";
  });

  socket.on("recieve_message", (data) => {
    console.log(data);
    let listItem = document.createElement("li");
    listItem.textContent = data.username + ":" + data.message;
    listItem.classList.add("list-group-item");
    msgList.appendChild(listItem);
  });

  message.addEventListener("keypress", (e) => {
    socket.emit("typing");
  });

  socket.on("typing", (data) => {
    info.textContent = data.username + ": is typing...";
    setTimeout(() => {
      info.textContent = "";
    }, 5000);
  });
})();
