// ── HEADER SCROLL SHADOW ─────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ── HAMBURGER / MOBILE NAV ───────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ── SMOOTH SCROLL FOR ANCHOR LINKS ───────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── ESTIMATE FORM SUBMIT ─────────────────
const form = document.getElementById('estimateForm');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting...';
  btn.disabled = true;

  setTimeout(() => {
    form.innerHTML = `
      <div style="text-align:center;padding:40px 0;">
        <div style="font-size:3rem;color:#c0392b;margin-bottom:16px;">✓</div>
        <h3 style="color:#0d2240;font-size:1.4rem;margin-bottom:12px;">You're All Set!</h3>
        <p style="color:#6b7280;line-height:1.6;">Thank you! A local Atlas project specialist will contact you within 24 hours to schedule your free in-home estimate.</p>
      </div>
    `;
  }, 1200);
});}

// ── INTERSECTION OBSERVER — FADE IN ──────
const fadeEls = document.querySelectorAll(
  '.service-card, .col-card, .review-card, .nw-stat, .stat-block, .trust-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── PHONE NUMBER FORMATTING ──────────────
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
    else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });
}

// ── COUNTER ANIMATION ────────────────────
const counters = document.querySelectorAll('.stat-big');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;
      const suffix = text.replace(/[0-9.,]/g, '');
      let start = 0;
      const duration = 1500;
      const step = 16;
      const increment = num / (duration / step);
      const timer = setInterval(() => {
        start += increment;
        if (start >= num) {
          start = num;
          clearInterval(timer);
        }
        el.textContent = (Number.isInteger(num) ? Math.floor(start).toLocaleString() : start.toFixed(1)) + suffix;
      }, step);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));
