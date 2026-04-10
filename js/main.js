/* =============================================
   St. George Heavy Haul — Main JavaScript
   ============================================= */

(function () {
  'use strict';

  /* --- Mobile Nav --- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Active Nav Link --- */
  function setActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* --- FAQ Accordion --- */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item.open').forEach(function (el) {
          el.classList.remove('open');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* --- Contact Form --- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('.form-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate a brief network delay, then show success
      setTimeout(function () {
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        var success = document.getElementById('formSuccess');
        if (success) {
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(function () {
            success.classList.remove('show');
          }, 6000);
        }
      }, 900);
    });
  }

  /* --- Scroll-in animation (lightweight) --- */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var style = document.createElement('style');
    style.textContent =
      '.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }' +
      '.reveal.visible { opacity: 1; transform: none; }';
    document.head.appendChild(style);

    var targets = document.querySelectorAll(
      '.service-card, .why-item, .area-card, .stat-block, .faq-item, .value-item'
    );

    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    setActiveNav();
    initFAQ();
    initContactForm();
    initScrollReveal();
  });
})();
