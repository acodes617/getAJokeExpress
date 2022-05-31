var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbsDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

var jokey = document.getElementById("jokey");
jokey.addEventListener("click", getAJoke);

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
function getAJoke() {
  fetch(
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist&type=single"
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("jokeHere").innerText = data.joke;
    });
}
Array.from(thumbUp).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
Array.from(thumbsDown).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const likes = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    console.log(thumbsDown);
    fetch("messages2", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: likes,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        msg: msg,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
