document.addEventListener("DOMContentLoaded", () => {
  const fechaEl = document.getElementById("fechaActual");
  const hoy = new Date();
  fechaEl.textContent = hoy.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const revealElements = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  if (!reducedMotion) {
    revealElements.forEach((element) => observer.observe(element));
  }

  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");

  if (!reducedMotion && orb1 && orb2) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      orb1.style.transform = `translate3d(0, ${Math.min(y * 0.08, 46)}px, 0)`;
      orb2.style.transform = `translate3d(0, ${Math.max(-y * 0.05, -38)}px, 0)`;
    });
  }

  document.querySelectorAll('.navbar .nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse.show");
      if (navbarCollapse) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  // Efecto ripple en botones principales
  function addRippleEffect(e) {
    const btn = e.currentTarget;
    let ripple = btn.querySelector('.ripple');
    if (ripple) ripple.remove();
    ripple = document.createElement('span');
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    ripple.classList.add('show');
    setTimeout(() => ripple.remove(), 500);
  }

  document.querySelectorAll('.btn, .btn-lg, .btn-accent, .btn-outline-light, .btn-outline-accent').forEach(btn => {
    btn.addEventListener('click', addRippleEffect);
  });
});
