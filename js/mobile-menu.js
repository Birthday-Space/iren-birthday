"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger-menu");
  const nav = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(".nav-list a");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Закрытие меню при клике на ссылку
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
});
