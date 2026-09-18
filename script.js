// Pega aquí la URL /exec de tu Google Apps Script.
// Esta URL NO contiene tu correo personal.
const APPS_SCRIPT_URL = "";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "";

  // Honeypot anti-spam
  if (form.website.value.trim() !== "") return;

  if (!APPS_SCRIPT_URL.startsWith("https://script.google.com/")) {
    statusEl.className = "form-status error";
    statusEl.textContent = "Configura primero la URL de Google Apps Script en script.js.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Enviando...";

  const data = Object.fromEntries(new FormData(form).entries());
  delete data.website;

  try {
    // no-cors evita problemas de CORS para el POST simple de Apps Script.
    // Apps Script recibe y procesa el formulario aunque el navegador no lea la respuesta.
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("mobile-open");
});
