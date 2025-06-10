const frontImg = document.getElementById("front-img");
const modal = document.getElementById("nameModal");
const images = document.querySelectorAll(".img-box img");
const overlay = document.querySelector(".overlay");
const btnCloseCard = document.querySelector(".close-card");

const closeCard = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

frontImg.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseCard.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  closeCard();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeCard();
  }
});

document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const verifyEmail = document.getElementById("reSender");

  function validateForm(
    person,
    sender,
    subject,
    num,
    location,
    postal,
    date,
    tel,
    message
  ) {
    const constraints = {
      person: {
        presence: { allowEmpty: false },
      },
      subject: {
        presence: { allowEmpty: false },
      },
      num: {
        presence: { allowEmpty: false },
      },
      sender: {
        presence: { allowEmpty: false },
      },
      location: {
        presence: { allowEmpty: false },
      },
      postal: {
        presence: { allowEmpty: false },
      },
      date: {
        presence: { allowEmpty: false },
      },
      tel: {
        presence: { allowEmpty: false },
      },
      message: {
        presence: { allowEmpty: false },
      },
    };

    return validate(
      { person, sender, subject, num, location, postal, date, tel, message },
      constraints
    );
  }

  verifyEmail.addEventListener("copy", function (e) {
    e.preventDefault();
    alert("Bitte geben Sie die E-Mail erneut ein.");
  });

  verifyEmail.addEventListener("cut", function (e) {
    e.preventDefault();
    alert("Bitte geben Sie die E-Mail erneut ein.");
  });

  verifyEmail.addEventListener("paste", function (e) {
    e.preventDefault();
    alert("Bitte geben Sie die E-Mail erneut ein.");
  });

  // Prevent default form submission

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDate = new Date(year, month - 1, day);
    const person = form.elements.person.value;
    const sender = form.elements.sender.value;
    const reSender = form.elements.reSender.value;
    const subject = form.elements.subject.value;
    const num = form.elements.num.value;
    const location = form.elements.location.value;
    const postal = form.elements.postal.value;
    const date = form.elements.date.value;
    const tel = form.elements.tel.value;
    const message = form.elements.message.value;
    const regex = /^[A-Za-zÄäÖöÜüß\s\-]+$/;
    const numRegex = /^\d+$/;
    const errors = validateForm(
      person,
      sender,
      subject,
      num,
      location,
      postal,
      date,
      tel,
      message
    );

    if (errors) {
      displayErrors(errors);
      return;
    }

    let inputDate = new Date(date);

    if (sender !== reSender) {
      alert("Bitte geben Sie die E-Mail erneut ein.");
      return;
    }

    if (inputDate >= new Date(year + 2, month - 1, day)) {
      alert("Das Jahr sollte nicht mehr als 2 Jahre im Voraus sein.");
      return;
    }

    if (inputDate <= formattedDate) {
      alert("Datum ist ungültig");
      return;
    }

    if (!regex.test(person)) {
      alert("Name ist ungültig");
      return;
    }

    if (!numRegex.test(num)) {
      alert("Anzahl ist ungültig");
      return;
    }

    if (sender === reSender && inputDate > formattedDate) {
      form.submit();
    }
  });
});

const fadeInBox = document.getElementById("about");
window.addEventListener("scroll", () => {
  fadeInBox.classList.add("fadeIn");
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoOne");
  const image = document.getElementById("mainImage");

  function replaceImg(src) {
    image.src = src;
  }

  function vidTransition() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      replaceImg("vertical-winter.JPG");
    } else {
      replaceImg("snow-2.png");
    }

    image.style.display = "none"; // Hide the image
    video.style.display = "block"; // Show the video
    video.classList.add("visible"); // Add class to show video
    video.play(); // Start playing video
  }

  video.addEventListener(
    "loadedmetadata",
    function () {
      vidTransition(); // Transition to video
    },
    { once: true }
  );

  video.addEventListener("ended", function () {
    video.play();
  });
});

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    if (data.country_code !== "DE") {
      document.body.innerHTML =
        "Sorry, this site is not accessible from your current region.";
    }
  })
  .catch((error) => console.error("Error:", error));
