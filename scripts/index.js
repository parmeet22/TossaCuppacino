
const formSubscribe = document.querySelector(".form-subscribe");
const email = document.querySelector("#email");
const subscribeMsg = document.querySelector('#subscribe');
// const coffeeAudio = document.querySelector('#coffeeAudio');


formSubscribe.addEventListener("submit", (e) => { 
e.preventDefault();
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

fetch('/api/postEmail', {
    method: 'post',
    body: JSON.stringify({ "email" : email.value }),
    headers: myHeaders
  }).then(function(response) {
    console.log(response);
    subscribeMsg.innerHTML = 'Thanks for Subscribing!';
    formSubscribe.remove(true);
  }).catch(function(data) {
    console.log(data);
  });

});
