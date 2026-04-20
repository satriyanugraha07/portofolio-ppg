// ── NAVBAR ───────────────────────────────────────
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('visible', y > 400);
  updateActiveNav();
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── HAMBURGER ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  const [s0, s1, s2] = hamburger.children;
  s0.style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)'  : '';
  s1.style.opacity   = isOpen ? '0' : '1';
  s2.style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const [s0, s1, s2] = hamburger.children;
    s0.style.transform = ''; s1.style.opacity = '1'; s2.style.transform = '';
  });
});

// ── ACTIVE NAV ────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navItems.forEach(a => {
    const href = a.getAttribute('href')?.replace('#', '');
    a.classList.toggle('active', href === current);
  });
}
updateActiveNav();

// ── REVEAL ON SCROLL ──────────────────────────────
const autoReveal = document.querySelectorAll(
  '.section-header, .profil-text, .profil-stats, .pstat-card, ' +
  '.artefak-card, .komp-col, .komp-grid > *, ' +
  '.kontak-item, .kontak-form, .form-group'
);
autoReveal.forEach(el => el.classList.add('reveal'));

const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── SKILL BAR ANIMATION ───────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      skillObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
skillFills.forEach(el => skillObs.observe(el));

// ── CONTACT FORM ──────────────────────────────────
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const orig = btn.textContent;
  btn.textContent = 'Mengirim...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    form.reset();
    showToast();
  }, 1500);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── SUBTLE PARALLAX (decorative circles) ─────────
const decos = document.querySelectorAll(
  '.deco-circle-sm-1, .deco-circle-sm-2, .deco-circle-sm-3, ' +
  '.deco-outline-1, .deco-outline-2'
);
window.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth  - 0.5) * 18;
  const my = (e.clientY / window.innerHeight - 0.5) * 18;
  decos.forEach((el, i) => {
    const f = (i % 3 + 1) * 0.35;
    el.style.transform = `translate(${mx * f}px, ${my * f}px)`;
  });
}, { passive: true });

// ── PROFIL TABS ──────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    // Add active class to clicked
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    
    // Add active class to target panel
    const targetPanel = document.getElementById(targetId);
    if(targetPanel) {
      targetPanel.classList.add('active');
      
      // Trigger reveal animations inside the newly shown tab
      const newReveals = targetPanel.querySelectorAll('.reveal');
      newReveals.forEach(r => r.classList.add('visible'));
    }
  });
});


// ── HOBI INTERACTIVE TABS ────────────────────────
const hobiBtns = document.querySelectorAll('.hobi-nav-btn');
const hobiItems = document.querySelectorAll('.hobi-display-item');

function switchHobi(targetBtn) {
  // Remove active from all
  hobiBtns.forEach(b => b.classList.remove('active'));
  hobiItems.forEach(i => i.classList.remove('active'));
  
  // Add active to current
  targetBtn.classList.add('active');
  const targetId = targetBtn.getAttribute('data-hobi-target');
  const targetItem = document.getElementById(targetId);
  if(targetItem) {
    targetItem.classList.add('active');
  }
}

hobiBtns.forEach(btn => {
  btn.addEventListener('mouseenter', () => switchHobi(btn));
  btn.addEventListener('click', () => switchHobi(btn));
});

