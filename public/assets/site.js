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
  document.querySelectorAll('.lead-form').forEach(function (form) {
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

      var payload = Object.fromEntries(new FormData(form).entries());
      payload.page = window.location.pathname;

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
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
})();
