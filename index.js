(function() {
  "use strict";

  const SATURATION = "95%";
  const LUMINANCE = "34%";

  // ユーザー追加処理
  var addUser = function() {
    var input = document.getElementById("add-user-input");
    var username = input.value;

    if (username == "") { return; }
    if (0 < document.getElementsByClassName("send-hi-button").filter(
          function(button) { return username === button.dataset.username; }).length) {
      return;
    }

    var hue = Math.round(Math.random() * 359);
    var button = document.createElement("li");
    button.classList.add("send-hi-button");
    button.style.backgroundColor = 'hsl(${hue}, ${SATURATION}, ${LUMINANCE})';
    button.innerHTML = button.dataset.username = username;
    button.addEventListener("click", sendHi);

    var addUserRow = document.getElementById("add-user-row");
    addUserRow.insertBefore(button, addUserRow);

    input.value = "";
  };

  // Hi! 送信処理
  var sendHi = function(e) {
    var buttons = document.getElementsByClassName("send-hi-button");
    var selectedButton = e.target;
    var sortedButtons = new Array(buttons.length);

    buttons.forEach(function(button, i) {
      if (button === selectedButton) {
        sortedButtons[0] = button;
        flag = true;
      } else {
        sortedButtons[flag ? i + 1 : i] = button;
      }
    });

    var addUserRow = document.getElementById("add-user-row");
    for (let button in sortedButtons) {
      addUserRow.parentNode.insertBefore(button, addUserRow);
    }

    selectedButton.innerHTML = "Send Hi!";
    setTimeout(function() {
      selectedButton.innerHTML = selectedButton.dataset.username;
    }, 1000);
  };

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("add-user-button").addEventListener("click", addUser);
  });
})();
