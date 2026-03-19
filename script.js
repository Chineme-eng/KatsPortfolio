const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* reveal on scroll */
const revealTargets = document.querySelectorAll(
  ".fade-up, .soft-card, .intro-card, .work-item, .hero-photo-card, .about-text, .mini-links a"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((el) => {
  el.classList.add("fade-up");
  revealObserver.observe(el);
});

/* active nav */
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* X cursor */
const xCursor = document.createElement("div");
xCursor.className = "x-cursor";
document.body.appendChild(xCursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  xCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = document.querySelectorAll(
  "a, button, .soft-card, .intro-card, .work-item, .mini-links a"
);

hoverTargets.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    xCursor.classList.add("hovered");
  });

  item.addEventListener("mouseleave", () => {
    xCursor.classList.remove("hovered");
  });
});

/* disable cursor on touch devices */
if (window.matchMedia("(pointer: coarse)").matches) {
  xCursor.style.display = "none";
}

/* expandable projects */
document.querySelectorAll(".work-item").forEach((item) => {
  const detail = item.querySelector(".project-detail");
  const btn = item.querySelector(".project-toggle");

  if (!detail || !btn) return;

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".work-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      const openBtn = openItem.querySelector(".project-toggle");
      if (openBtn) openBtn.textContent = "Details";
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.textContent = "Close";
    }
  });
});

/* soft parallax */
const floatingShapes = document.querySelectorAll(".float-shape");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  floatingShapes.forEach((shape, i) => {
    const speed = (i + 1) * 0.35;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
