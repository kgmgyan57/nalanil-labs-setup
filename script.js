/* ─────────────────────────────────────────────────────────────
   NALANIL LABS — script.js
   ───────────────────────────────────────────────────────────── */

/* ── ACTIVE NAV LINK ── */
function setActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('[data-nav]').forEach(function(el) {
    var val = el.getAttribute('data-nav');
    var active = false;
    if (val === 'home' && (path === '/' || path === '/index.html' || path === '')) {
      active = true;
    } else if (val !== 'home' && path.indexOf('/' + val) !== -1) {
      active = true;
    }
    if (active) el.classList.add('active');
  });
}

/* ── MOBILE NAV ── */
function initMobileNav() {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function() {
    var isOpen = mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', !isOpen);
    hamburger.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
}

/* ── SCROLL ANIMATIONS ── */
function initAnimations() {
  var els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function(el) { observer.observe(el); });
}

/* ── INQUIRY FORM ── */
function initForm() {
  var nextField = document.getElementById('form-next');
  if (nextField) {
    nextField.value = window.location.origin + window.location.pathname + '?submitted=1';
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === '1') {
    var form = document.getElementById('inquiry-form');
    var msg  = document.getElementById('success-msg');
    if (form) form.style.display = 'none';
    if (msg)  msg.style.display  = 'block';
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  initMobileNav();
  initAnimations();
  initForm();
});
