// URL /exec de tu Google Apps Script. Tu correo personal NO se expone aquí.
const APPS_SCRIPT_URL = "";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "";
  if (form.website.value.trim() !== "") return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Enviando...";

  const data = Object.fromEntries(new FormData(form).entries());
  delete data.website;

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "text/plain;charset=utf-8"},
      body: JSON.stringify(data)
    });
    form.reset();
    statusEl.className = "form-status ok";
    statusEl.textContent = "Solicitud enviada. Gracias; revisaré los detalles y me pondré en contacto contigo.";
  } catch (error) {
    console.error(error);
    statusEl.className = "form-status error";
    statusEl.textContent = "No se pudo enviar el formulario. Intenta nuevamente.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Enviar solicitud <span>↗</span>';
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// Animaciones de entrada al hacer scroll.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Barra de progreso de lectura.
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, {passive:true});

// Menú móvil.
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("mobile-open");
  menuBtn?.setAttribute("aria-expanded", "false");
}));

// Luz suave siguiendo el cursor en escritorio.
const cursorGlow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  if (!cursorGlow || window.matchMedia("(max-width: 800px)").matches) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorGlow.style.opacity = "1";
}, {passive:true});

// Contadores animados.
const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, {threshold:.7});
counters.forEach((el) => countObserver.observe(el));

// Efecto de inclinación muy sutil en tarjetas.
document.querySelectorAll(".magnetic-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 800px)").matches) return;
    const r = card.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - .5;
    const y = (event.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(800px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-8px)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
});
