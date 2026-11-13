// Cabo Raso. Small, dependency-free behaviour: header, menu, filters, forms.
(function () {
  var doc = document.documentElement;
  var pt = doc.lang === 'pt';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Header turns solid once the page scrolls.
  var header = $('.site-header');
  var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 24); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu.
  var toggle = $('.menu-toggle');
  var setMenu = function (open) {
    doc.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    $('.menu-toggle-label').textContent = open ? (pt ? 'Fechar' : 'Close') : 'Menu';
  };
  toggle.addEventListener('click', function () { setMenu(!doc.classList.contains('nav-open')); });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function () { setMenu(false); });

  // Services dropdown: hover and focus work in CSS; the button and Escape cover keyboard and touch.
  var sub = $('.has-sub');
  var subBtn = $('.sub-toggle');
  var setSub = function (open) {
    sub.classList.toggle('is-open', open);
    subBtn.setAttribute('aria-expanded', String(open));
  };
  subBtn.addEventListener('click', function () { setSub(!sub.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (!sub.contains(e.target)) setSub(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (sub.classList.contains('is-open')) { setSub(false); subBtn.focus(); }
    if (doc.classList.contains('nav-open')) { setMenu(false); toggle.focus(); }
  });

  // Images fade in once; route lines draw once.
  var reveal = $$('.fade, .routes');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('is-in'); });
  }

  // The docked quote button steps aside while the hero form's own button is on screen.
  var heroBtn = $('.quick-quote .btn');
  if (heroBtn && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      doc.classList.toggle('dock-off', entries[0].isIntersecting);
    }).observe(heroBtn);
  }

  // Category and service filters.
  $$('[data-filter]').forEach(function (group) {
    var list = document.getElementById(group.dataset.filter);
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      $$('button', group).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      $$('[data-cat]', list).forEach(function (item) {
        var show = btn.dataset.value === 'all' || item.dataset.cat === btn.dataset.value;
        item.toggleAttribute('data-hidden', !show);
      });
    });
  });

  // Validation ---------------------------------------------------------------
  var MSG = pt
    ? { required: 'Preencha este campo.', email: 'Indique um email válido, por exemplo nome@empresa.pt.', phone: 'Indique um telefone com pelo menos 9 dígitos.', consent: 'Precisamos do seu consentimento para responder.', service: 'Escolha uma opção.', pax: 'Indique entre 1 e 60 passageiros.', date: 'Escolha uma data a partir de hoje.', ret: 'O regresso tem de ser depois da partida.' }
    : { required: 'Fill in this field.', email: 'Enter a valid email, for example name@company.com.', phone: 'Enter a phone number with at least 9 digits.', consent: 'We need your consent to reply.', service: 'Choose an option.', pax: 'Enter between 1 and 60 passengers.', date: 'Choose a date from today onwards.', ret: 'The return must be after the departure.' };

  var today = new Date().toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(function (i) { i.min = today; });

  function problem(el, form) {
    var v = (el.value || '').trim();
    if (el.type === 'radio') {
      return el.required && !$('input[name="' + el.name + '"]:checked', form) ? MSG.service : '';
    }
    if (el.type === 'checkbox') return el.required && !el.checked ? MSG.consent : '';
    if (el.required && !v) return MSG.required;
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return MSG.email;
    if (el.type === 'tel' && v.replace(/\D/g, '').length < 9) return MSG.phone;
    if (el.name === 'pax' && !(Number(v) >= 1 && Number(v) <= 60)) return MSG.pax;
    if (el.name === 'date' && v < today) return MSG.date;
    if (el.name === 'return' && form.elements.date.value && v < form.elements.date.value) return MSG.ret;
    return '';
  }

  // Validates the fields inside `scope`; returns the first invalid one.
  function validate(scope, form) {
    var first = null;
    var seen = {};
    $$('input, select, textarea', scope).forEach(function (el) {
      if (seen[el.name]) return;
      seen[el.name] = true;
      var msg = problem(el, form);
      var box = $('#e-' + el.name, form);
      if (box) { box.textContent = msg; box.hidden = !msg; }
      if (el.type !== 'radio') {
        if (msg) { el.setAttribute('aria-invalid', 'true'); if (box) el.setAttribute('aria-describedby', box.id); }
        else { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); }
      }
      if (msg && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  }

  function finish(form) {
    $$(':scope > *:not(.form-done)', form).forEach(function (el) { el.hidden = true; });
    var done = $('.form-done', form);
    done.hidden = false;
    done.setAttribute('tabindex', '-1');
    done.focus();
    done.scrollIntoView({ block: 'center' });
  }

  var contact = $('[data-form="contact"]');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validate(contact, contact)) finish(contact);
    });
  }

  // Quote form in four steps.
  var quote = $('[data-form="quote"]');
  if (quote) {
    var steps = $$('.step', quote);
    var marks = $$('.progress li', quote);
    var back = $('[data-back]', quote);
    var next = $('[data-next]', quote);
    var send = $('[type="submit"]', quote);
    var at = 0;

    var show = function (i, focus) {
      at = i;
      steps.forEach(function (s, n) { s.hidden = n !== i; });
      marks.forEach(function (m, n) {
        if (n === i) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current');
        m.classList.toggle('is-done', n < i);
      });
      back.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      send.hidden = i !== steps.length - 1;
      if (focus) $('legend', steps[i]).focus();
    };

    next.addEventListener('click', function () { if (validate(steps[at], quote)) show(at + 1, true); });
    back.addEventListener('click', function () { show(at - 1, true); });
    quote.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validate(steps[at], quote)) finish(quote);
    });
    // Enter in a text field moves on instead of submitting early.
    quote.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.matches('input') && at < steps.length - 1) { e.preventDefault(); next.click(); }
    });

    // Prefill from the short form on the home page.
    var q = new URLSearchParams(location.search);
    ['from', 'to', 'date', 'pax'].forEach(function (k) {
      if (q.get(k) && quote.elements[k]) quote.elements[k].value = q.get(k);
    });
    var svc = q.get('service') && $('input[name="service"][value="' + q.get('service') + '"]', quote);
    if (svc) { svc.checked = true; show(1, false); } else { show(0, false); }
  }
})();
