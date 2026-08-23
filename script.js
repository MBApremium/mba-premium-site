// ============================================
// MBA PREMIUM — script.js
// ============================================

// --- Menu mobile ---
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.textContent = isOpen ? '✕' : '☰';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      navToggle.textContent = '☰';
    });
  });
}

// --- Carrousel témoignages ---
const slides = document.querySelectorAll('.testimonial-slide');
const dotsWrap = document.getElementById('slider-dots');
let current = 0;

if (slides.length && dotsWrap) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  setInterval(() => {
    goToSlide((current + 1) % slides.length);
  }, 6000);
}

// --- Reveal au scroll ---
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// --- FAQ accordion ---
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ============================================
// ENVOI DU FORMULAIRE — EmailJS
//
// 1. Crée un compte gratuit sur https://www.emailjs.com
// 2. Récupère ton Service ID, Template ID et Public Key
// 3. Remplace les 3 valeurs ci-dessous
// 4. Décommente le bloc emailjs.init(...) et emailjs.send(...)
// ============================================

const EMAILJS_PUBLIC_KEY = "TA_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "TON_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TON_TEMPLATE_ID";

// emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById('booking-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  status.textContent = "Envoi en cours…";
  status.className = "form-status";

  const params = {
    depart: document.getElementById('f-depart').value,
    arrivee: document.getElementById('f-arrivee').value,
    date: document.getElementById('f-date').value,
    passagers: document.getElementById('f-passagers').value,
    nom: document.getElementById('f-nom').value,
    email: document.getElementById('f-email').value,
    telephone: document.getElementById('f-tel').value,
    message: document.getElementById('f-message').value
  };

  // emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
  //   .then(() => {
  //     status.textContent = "Demande envoyée ! Vous recevrez une confirmation par email.";
  //     status.className = "form-status success";
  //     form.reset();
  //   })
  //   .catch(() => {
  //     status.textContent = "Erreur lors de l'envoi. Merci d'appeler directement.";
  //     status.className = "form-status error";
  //   });

  status.textContent = "Formulaire prêt — connecte EmailJS dans script.js pour activer l'envoi.";
  status.className = "form-status";
});
