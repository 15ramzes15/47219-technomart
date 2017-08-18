var serviceTriggers = document.querySelectorAll(".slider-controls button");
var serviceSlides = document.querySelectorAll(".services-slide");
var link = document.querySelector(".credit-btn");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content-close");
var form = popup.querySelector("form");
var login = popup.querySelector("[name=login]");
var email = popup.querySelector("[name=email]");
var storage = localStorage.getItem("login");
var mapOpen = document.querySelector(".contacts-btn");
var mapPopup = document.querySelector(".modal-content-map");
var mapClose = mapPopup.querySelector(".modal-content-close");

if (serviceTriggers.length) {
  Array.prototype.forEach.call(serviceTriggers, function(btn) {
    btn.addEventListener("click", changeSlide);
  });
}

function changeSlide() {
  Array.prototype.forEach.call(serviceTriggers, function(btn) {
    btn.classList.remove("active");
  });

  Array.prototype.forEach.call(serviceSlides, function(slide) {
    slide.classList.remove("current-services-slide");
  });

  this.classList.add("active");
  serviceSlides[parseInt(this.dataset.index)].classList.add("current-services-slide");
};

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add ("modal-content-show");
  if (storage) {
    login.value = storage;
    email.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-content-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value) {
    evt.preventDefault();
    popup.classList.add("modal-error");
  } else {
    localStorage.setItem("login", login.value)
  }
 });

 mapOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-content-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-content-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapPopup.classList.contains("modal-content-show")) {
      mapPopup.classList.remove("modal-content-show");
    }
  }
});
