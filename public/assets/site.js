(function () {
  'use strict';

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Submenu disclosure (mobile only; desktop opens on hover)
  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = btn.parentElement.querySelector('.sub');
      var open = sub.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Header shadow once scrolled
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Forms: validate, then submit as JSON so the page does not navigate away.
  // .email-form is the single-field variant; same submit, validation and
  // status handling, so it goes through this loop too.
  document.querySelectorAll('.lead-form, .email-form').forEach(function (form) {
    var status = form.querySelector('.form-status');

    var setError = function (input, message) {
      var field = input.closest('.field');
      field.classList.toggle('invalid', Boolean(message));
      var existing = field.querySelector('.field-error');
      if (message) {
        if (!existing) {
          existing = document.createElement('p');
          existing.className = 'field-error';
          field.appendChild(existing);
        }
        existing.textContent = message;
      } else if (existing) {
        existing.remove();
      }
    };

    var validate = function () {
      var ok = true;
      form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
        var value = input.value.trim();
        var message = '';
        if (!value) {
          message = 'This field is required.';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          message = 'Enter a valid email address.';
        } else if (input.type === 'tel' && value.replace(/\D/g, '').length < 10) {
          message = 'Enter a phone number with at least 10 digits.';
        }
        setError(input, message);
        if (message) ok = false;
      });
      return ok;
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validate()) {
        status.textContent = 'Please correct the highlighted fields.';
        status.classList.add('err');
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var label = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending…';

      var fd = new FormData(form);
      var payload = Object.fromEntries(fd.entries());
      var picked = fd.getAll('challenges');
      if (picked.length) payload.challenges = picked.join('; ');
      payload.page = window.location.pathname;

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          document.querySelectorAll('input[form="' + form.id + '"]').forEach(function (i) { i.checked = false; });
          updateMeter();
          status.textContent = 'Thank you. We will be in touch shortly.';
          status.classList.add('ok');
        })
        .catch(function () {
          status.innerHTML =
            'We could not send that. Please email <a href="mailto:info@mahastarmedicalbilling.llc">info@mahastarmedicalbilling.llc</a> or call us.';
          status.classList.add('err');
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = label;
        });
    });

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.closest('.field').classList.contains('invalid')) validate();
      });
    });
  });

  // Challenges checklist: live feedback on how many apply.
  var meter = document.querySelector('[data-pain-meter]');
  function updateMeter() {
    if (!meter) return;
    var n = document.querySelectorAll('[data-pain] input:checked').length;
    var msgs = [
      'Tick what applies. Your answers are sent with the form.',
      '1 selected. Worth a closer look — we will check it in your free review.',
      '2 selected. A billing review is likely worth an hour of your time.',
      '3 selected. These usually share one root cause. Let us find it.',
      '4 selected. Revenue is very likely leaking. Book your free audit.',
      'All 5 selected. Let us talk this week — send the form.'
    ];
    meter.textContent = msgs[n];
    meter.classList.toggle('hot', n >= 2);
  }
  document.querySelectorAll('[data-pain] input').forEach(function (i) { i.addEventListener('change', updateMeter); });

  // Interactive US map
  var map = document.querySelector('[data-us-map]');
  if (map) {
    var wrap = map.parentElement;
    var tip = wrap.querySelector('[data-map-tip]');
    var stateEl = document.querySelector('[data-map-state]');
    var textEl = document.querySelector('[data-map-text]');
    var cta = document.querySelector('[data-map-cta]');
    var active = null;

    var place = function (evt, el) {
      var box = wrap.getBoundingClientRect();
      var x, y;
      if (evt && evt.clientX) { x = evt.clientX - box.left; y = evt.clientY - box.top; }
      else { var b = el.getBoundingClientRect(); x = b.left + b.width / 2 - box.left; y = b.top + b.height / 2 - box.top; }
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    };
    var show = function (el, evt) {
      tip.textContent = el.dataset.name + (el.classList.contains('hq') ? ' · Headquarters' : '');
      tip.hidden = false; place(evt, el);
    };
    var select = function (el) {
      if (active) active.classList.remove('active');
      active = el; el.classList.add('active');
      var name = el.dataset.name;
      stateEl.textContent = name + (el.classList.contains('hq') ? ' — our home base' : '');
      textEl.textContent = el.classList.contains('hq')
        ? 'Mahastar Medical Billing LLC is based in Virginia and serves practices across the country.'
        : 'We handle billing, coding, denials and credentialing for practices in ' + name + ', working remotely inside your own systems.';
      cta.textContent = 'Free billing review for my ' + name + ' practice';
      cta.href = '/contact/?state=' + encodeURIComponent(el.dataset.state);
    };

    map.querySelectorAll('path').forEach(function (p) {
      p.addEventListener('mouseenter', function (e) { show(p, e); });
      p.addEventListener('mousemove', function (e) { place(e, p); });
      p.addEventListener('mouseleave', function () { tip.hidden = true; });
      p.addEventListener('focus', function () { show(p); });
      p.addEventListener('blur', function () { tip.hidden = true; });
      p.addEventListener('click', function () { select(p); });
      p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p); } });
    });
  }

  // Prefill the contact form when arriving from the map.
  var st = new URLSearchParams(window.location.search).get('state');
  var msg = document.getElementById('contact-message');
  if (st && msg && !msg.value) {
    msg.value = 'Practice located in ' + st.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() + '. ';
  }
})();

// Service card illustrations animate only while on screen (saves battery, and
// mobile has no hover). Reduced-motion users get the still, finished icon via CSS.
(function () {
  'use strict';
  var cards = document.querySelectorAll('.service-card, .specialty-grid li');
  if (!cards.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle('is-live', e.isIntersecting); });
  }, { threshold: 0.35 });
  cards.forEach(function (c) { io.observe(c); });
})();

// Specialties page: a spotlight moves from one specialty to the next.
// Pauses while the visitor is hovering the list; off for reduced motion.
(function () {
  'use strict';
  var grid = document.querySelector('.specialty-grid');
  if (!grid || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var items = grid.querySelectorAll('li');
  var i = -1, paused = false;
  grid.addEventListener('mouseenter', function () { paused = true; items.forEach(function (li) { li.classList.remove('spot'); }); });
  grid.addEventListener('mouseleave', function () { paused = false; });
  setInterval(function () {
    if (paused || document.hidden) return;
    if (items[i]) items[i].classList.remove('spot');
    for (var n = 0; n < items.length; n++) {
      i = (i + 1) % items.length;
      if (items[i].classList.contains('is-live')) { items[i].classList.add('spot'); return; }
    }
  }, 1600);
})();

// Specialties page: the "go straight to your specialty" picker.
// The grid below links to the same pages, so this is an enhancement only —
// with JavaScript off the page still works, it just has no shortcut.
(function () {
  'use strict';
  document.querySelectorAll('[data-spec-picker]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var select = form.querySelector('select');
      if (select && select.value) window.location.href = select.value;
    });
    // Choosing from the list is intent enough; no need to press Go as well.
    var select = form.querySelector('select');
    if (select) {
      select.addEventListener('change', function () {
        if (select.value) window.location.href = select.value;
      });
    }
  });
})();
