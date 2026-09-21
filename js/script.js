(function () {
  'use strict';

  var HEADER_OFFSET = 80;

  /* ============ Header scroll state ============ */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ============ Mobile menu ============ */
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  var iconMenu = document.getElementById('iconMenu');
  var iconClose = document.getElementById('iconClose');

  function setMenuOpen(isOpen) {
    if (!navMobile) return;
    navMobile.classList.toggle('is-open', isOpen);
    if (iconMenu) iconMenu.style.display = isOpen ? 'none' : 'block';
    if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenuOpen(!navMobile.classList.contains('is-open'));
    });
  }

  document.querySelectorAll('.nav-mobile .nav-link, .nav-mobile .nav-cta').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  /* ============ Smooth scroll to in-page section ============ */
  document.querySelectorAll('a[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('data-scroll');
      var el = document.getElementById(targetId);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
      setMenuOpen(false);
    });
  });

  /* ============ Reveal on scroll ============ */
  var revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
            setTimeout(function () {
              entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* ============ Footer year ============ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
