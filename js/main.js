/**
 * Landing page behavior. Plain script (no modules) so the page also works
 * when opened directly from the filesystem. Reads content from js/data.js
 * (window.KD), which must be loaded first.
 */
(function () {
  'use strict';

  var config = window.KD.config;
  var plugins = window.KD.plugins;

  /* ---------- Templating helpers ---------- */

  function esc(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function icon(name, extraClass) {
    return (
      '<svg class="ic ' + (extraClass || '') + '" aria-hidden="true">' +
      '<use href="#i-' + name + '"/></svg>'
    );
  }

  function priceTag(price) {
    return price === 0
      ? '<span class="price-tag free">Free</span>'
      : '<span class="price-tag paid">$' + price + '</span>';
  }

  /* ---------- Version + repo links ---------- */

  document.querySelectorAll('[data-version]').forEach(function (el) {
    el.textContent = 'v' + config.version;
  });

  document.querySelectorAll('[data-gh]').forEach(function (a) {
    a.href = config.repoUrl + (a.getAttribute('data-gh') || '');
  });

  /* ---------- Render plugin catalog (marketplace grid + preview panel) ---------- */

  function pluginCard(p) {
    return (
      '<div class="plugin" data-category="' + esc(p.category) + '">' +
      '<div class="plugin-top">' +
      '<div class="plugin-ic ' + p.iconClass + '">' + icon(p.icon) + '</div>' +
      priceTag(p.price) +
      '</div>' +
      '<h4>' + esc(p.name) + '</h4>' +
      '<div class="by">by ' + esc(p.author) + ' · v' + esc(p.version) + '</div>' +
      '<p>' + esc(p.description) + '</p>' +
      '<div class="plugin-meta"><span class="plugin-cat">' + esc(p.category) + '</span></div>' +
      '</div>'
    );
  }

  function miniPluginCard(p) {
    return (
      '<div class="mini-plug">' +
      '<div class="plugin-ic ' + p.iconClass + '">' + icon(p.icon) + '</div>' +
      '<div><h4>' + esc(p.name) + '</h4>' +
      '<div class="by">' + esc(p.author) + ' · v' + esc(p.version) + '</div></div>' +
      priceTag(p.price) +
      '</div>'
    );
  }

  var mktGrid = document.getElementById('mkt-grid');
  mktGrid.innerHTML = plugins.map(pluginCard).join('');

  var miniGrid = document.getElementById('mini-grid');
  miniGrid.innerHTML = plugins.slice(0, 4).map(miniPluginCard).join('');

  var mktCount = document.getElementById('mkt-count');
  if (mktCount) {
    mktCount.textContent = plugins.length + ' plugins · signed & sandboxed';
  }

  /* ---------- Theme toggle ---------- */

  var root = document.documentElement;
  var saved = null;
  try {
    saved = localStorage.getItem('kd-theme');
  } catch (e) {}
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
  }
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var dark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('kd-theme', next);
    } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */

  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');
  menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- OS-aware download label ---------- */

  var ua = navigator.userAgent;
  var os =
    ua.indexOf('Win') !== -1
      ? 'Windows'
      : ua.indexOf('Mac') !== -1
        ? 'macOS'
        : ua.indexOf('Linux') !== -1
          ? 'Linux'
          : '';
  if (os) {
    document.getElementById('hero-dl').textContent = 'Download for ' + os;
  }

  /* ---------- App preview: cycle panels ---------- */

  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var sbItems = Array.prototype.slice.call(document.querySelectorAll('.sb-item'));
  var current = 0;
  var timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showPanel(i) {
    current = i;
    panels.forEach(function (p, idx) {
      p.classList.toggle('on', idx === i);
    });
    sbItems.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-goto') === String(i));
    });
  }
  function nextPanel() {
    showPanel((current + 1) % panels.length);
  }
  function startCycle() {
    if (reduceMotion || timer) return;
    timer = setInterval(nextPanel, 5000);
  }
  function stopCycle() {
    clearInterval(timer);
    timer = null;
  }
  sbItems.forEach(function (b) {
    b.addEventListener('click', function () {
      var target = b.getAttribute('data-goto');
      if (target !== '') {
        stopCycle();
        showPanel(Number(target));
      }
    });
  });
  var preview = document.getElementById('preview');
  preview.addEventListener('mouseenter', stopCycle);
  preview.addEventListener('mouseleave', startCycle);
  preview.addEventListener('focusin', stopCycle);
  startCycle();

  /* ---------- Marketplace filter ---------- */

  // Category chips come from the same data as the cards.
  var catBar = document.getElementById('mkt-cats');
  catBar.innerHTML =
    '<button class="cat on" data-cat="all">All</button>' +
    window.KD.categories
      .map(function (c) {
        return '<button class="cat" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      })
      .join('');

  var cats = Array.prototype.slice.call(catBar.querySelectorAll('.cat'));
  var searchInput = document.getElementById('mkt-search');
  var emptyMsg = document.getElementById('mkt-empty');
  var activeCat = 'all';

  function applyFilter() {
    var q = searchInput.value.trim().toLowerCase();
    var visible = 0;
    Array.prototype.slice
      .call(mktGrid.querySelectorAll('.plugin'))
      .forEach(function (card) {
        var matchCat =
          activeCat === 'all' || card.getAttribute('data-category') === activeCat;
        var matchText = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        var show = matchCat && matchText;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
    emptyMsg.style.display = visible === 0 ? 'block' : 'none';
  }
  cats.forEach(function (btn) {
    btn.addEventListener('click', function () {
      cats.forEach(function (b) {
        b.classList.remove('on');
      });
      btn.classList.add('on');
      activeCat = btn.getAttribute('data-cat');
      applyFilter();
    });
  });
  searchInput.addEventListener('input', applyFilter);
})();
