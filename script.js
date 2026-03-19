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

/* =========================
   REVEAL ON SCROLL
========================= */
const revealItems = document.querySelectorAll(
  ".section, .intro-card, .soft-card, .work-item, .link-tile, .hero-photo-card, .mini-note"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});

/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */
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

/* =========================
   CUSTOM CURSOR
========================= */
const cursor = document.createElement("div");
cursor.className = "custom-cursor";

const cursorDot = document.createElement("div");
cursorDot.className = "cursor-dot";

document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.14;
  cursorY += (mouseY - cursorY) * 0.14;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = document.querySelectorAll(
  "a, button, .soft-card, .intro-card, .link-tile, .work-item"
);

hoverTargets.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
  });

  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
  });
});

/* Hide custom cursor on touch devices */
function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

if (isTouchDevice()) {
  cursor.style.display = "none";
  cursorDot.style.display = "none";
}

/* =========================
   EXPANDABLE PROJECT DETAILS
========================= */
const workItems = document.querySelectorAll(".work-item");

workItems.forEach((item) => {
  const content = item.querySelector("div");

  const details = document.createElement("div");
  details.className = "project-details";
  details.innerHTML = `
    <p>
      More details about this project can go here: what it is, why you made it,
      what tools you used, what stage it is in, and where it is headed.
    </p>
  `;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "details-toggle";
  toggleBtn.type = "button";
  toggleBtn.textContent = "More";

  const actions = document.createElement("div");
  actions.className = "project-actions";
  actions.appendChild(toggleBtn);

  item.appendChild(actions);
  item.appendChild(details);

  toggleBtn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".work-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      const btn = openItem.querySelector(".details-toggle");
      if (btn) btn.textContent = "More";
    });

    if (!isOpen) {
      item.classList.add("open");
      toggleBtn.textContent = "Less";
    }
  });
});

/* =========================
   PARALLAX FOR BACKGROUND ORBS
========================= */
const orbs = document.querySelectorAll(".bg-orb");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 14;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.4;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
