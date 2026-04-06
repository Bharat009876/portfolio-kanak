/**
 * All init runs after DOM is ready. Failures in one feature never break the rest.
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
  }
  if (navClose && navMenu) {
    navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));
  }
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("show-menu");
    });
  });

  const header = document.getElementById("header");
  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 50) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  }
  window.addEventListener("scroll", scrollHeader);
  scrollHeader();

  try {
    const homeSplit = document.getElementById("home-split");
    if (homeSplit && typeof anime !== "undefined") {
      const text = homeSplit.textContent.trim();
      homeSplit.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? '<span class="home__split-letter">&nbsp;</span>'
            : `<span class="home__split-letter">${char}</span>`
        )
        .join("");
      anime({
        targets: ".home__split-letter",
        translateY: [48, 0],
        opacity: [0, 1],
        duration: 900,
        delay: anime.stagger(60, { start: 400 }),
        easing: "easeOutExpo",
      });
    }
  } catch (e) {
    console.warn("Home animation:", e);
  }

  const expertiseTrack = document.getElementById("expertise-track");
  if (expertiseTrack) {
    expertiseTrack.querySelectorAll(".expertise-marquee__card").forEach((card) => {
      const duplicate = card.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      expertiseTrack.appendChild(duplicate);
    });
  }

  const workButtons = document.querySelectorAll(".work__button");
  const workContents = document.querySelectorAll(".work__content");
  workButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      workButtons.forEach((b) => b.classList.remove("work__button--active"));
      workContents.forEach((c) => c.classList.remove("work__content--active"));
      btn.classList.add("work__button--active");
      target.classList.add("work__content--active");
    });
  });

  document.querySelectorAll(".services__item").forEach((item) => {
    const hdr = item.querySelector(".services__header");
    if (!hdr) return;
    hdr.addEventListener("click", () => {
      const open = item.classList.contains("services__item--open");
      document.querySelectorAll(".services__item").forEach((i) => {
        i.classList.remove("services__item--open");
      });
      if (!open) item.classList.add("services__item--open");
    });
  });

  const testimonialsTrack = document.getElementById("testimonials-track");
  if (testimonialsTrack) {
    testimonialsTrack.querySelectorAll(".testimonials__card").forEach((card) => {
      const duplicate = card.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      testimonialsTrack.appendChild(duplicate);
    });
  }

  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()}`;
  }

  const sections = document.querySelectorAll("section[id]");
  function scrollActive() {
    const scrollY = window.scrollY + 120;
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute("id") || "";
      }
    });
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.remove("active-link");
      const href = link.getAttribute("href") || "";
      if (currentId && href === `#${currentId}`) {
        link.classList.add("active-link");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);
  scrollActive();

  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursor-follower");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (cursor && cursorFollower && finePointer && !prefersReducedMotion) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let cursorScale = 1;
    let followerScale = 1;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      cursorFollower.style.transform = `translate(-50%, -50%) scale(${followerScale})`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorScale = 1.35;
        followerScale = 1.25;
        cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
        cursorFollower.style.transform = `translate(-50%, -50%) scale(${followerScale})`;
      });
      el.addEventListener("mouseleave", () => {
        cursorScale = 1;
        followerScale = 1;
        cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
        cursorFollower.style.transform = `translate(-50%, -50%) scale(${followerScale})`;
      });
    });
  } else if (cursor && cursorFollower) {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
  }
});
