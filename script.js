// Ensure all elements exist before adding event listeners
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let darkModeIcon = document.querySelector("#darkMode-icon");
let header = document.querySelector(".header");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };
}

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  if (header) {
    header.classList.toggle("sticky", window.scrollY > 100);
  }

  if (menuIcon && navbar) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

if (darkModeIcon) {
  darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle("bx-sun");
    document.body.classList.toggle("dark-mode");
  };
}

ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

const typed = new Typed('.multiple-text', {
  strings: ['Sachin Jha', 'Web Developer', 'App Developer'],
  typeSpeed: 100,
  loop: true,
  backSpeed: 100,
  backDelay: 1000,
})
