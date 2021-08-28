
const formSubscribe = document.querySelector(".form-subscribe");
const email = document.querySelector("#email");
const subscribeMsg = document.querySelector('#subscribeMessage');
const subscribeSuccessMsg = document.querySelector('#subscribeSuccess');
// const coffeeAudio = document.querySelector('#coffeeAudio');
const button = document.querySelector("#coffeeAudioButton");
const icon = document.querySelector("#coffeeAudioButton > i");
const audio = document.querySelector("#coffeeAudio");

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
    subscribeMsg.classList.add('visible-none');
    subscribeSuccessMsg.classList.remove('visible-none');
    formSubscribe.remove(true);
  }).catch(function(data) {
    console.log(data);
  });

});



button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');
    
  } else {
    audio.pause();
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-mute');
  }
});
