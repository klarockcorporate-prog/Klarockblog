/* Klarock - aviso de cookies (aceptar / rechazar).
 * Analítica (GA4) y Meta Pixel quedan en "denegado" hasta que el visitante acepta.
 * La decisión se guarda en localStorage (klarock_cookie_consent = granted | denied). */
(function () {
  var KEY = 'klarock_cookie_consent';
  var TEXTS = {
    es: {
      title: 'Usamos cookies',
      body: 'Usamos cookies de analítica y publicidad para medir el uso del sitio y mejorar nuestro contenido. Puedes aceptarlas o rechazarlas; el sitio funciona igual.',
      accept: 'Aceptar', reject: 'Rechazar', more: 'Aviso de Privacidad', link: 'Cookies', href: '/aviso-privacidad.html'
    },
    en: {
      title: 'We use cookies',
      body: 'We use analytics and advertising cookies to measure site usage and improve our content. You can accept or reject them; the site works the same.',
      accept: 'Accept', reject: 'Reject', more: 'Privacy Notice', link: 'Cookies', href: '/aviso-privacidad-en.html'
    },
    zh: {
      title: '我们使用 Cookie',
      body: '我们使用分析和广告类 Cookie 来衡量网站使用情况并改进内容。您可以接受或拒绝，网站功能不受影响。',
      accept: '接受', reject: '拒绝', more: '隐私声明', link: 'Cookie', href: '/aviso-privacidad-en.html'
    }
  };
  var lang = ((document.documentElement.lang || 'es') + '').slice(0, 2).toLowerCase();
  var t = TEXTS[lang] || TEXTS.es;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(value) {
    var g = value === 'granted' ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { ad_storage: g, analytics_storage: g, ad_user_data: g, ad_personalization: g });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('consent', value === 'granted' ? 'grant' : 'revoke');
    }
  }

  function close() {
    var el = document.getElementById('cookie-banner');
    if (el) el.remove();
  }

  function choose(value) {
    write(value);
    apply(value);
    close();
  }

  function open() {
    if (document.getElementById('cookie-banner')) return;
    var box = document.createElement('div');
    box.id = 'cookie-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', t.title);
    box.className = 'fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-sm border border-gold-400/40 bg-navy-950 p-5 shadow-2xl';
    box.innerHTML =
      '<p class="text-white font-semibold">' + t.title + '</p>' +
      '<p class="mt-2 text-sm text-slate-300 leading-relaxed">' + t.body +
      ' <a href="' + t.href + '" class="text-gold-400 hover:text-gold-300 underline">' + t.more + '</a>.</p>' +
      '<div class="mt-4 flex flex-col sm:flex-row gap-3">' +
      '<button type="button" data-cookie="granted" class="px-6 py-2.5 rounded-sm text-sm font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950 transition-colors">' + t.accept + '</button>' +
      '<button type="button" data-cookie="denied" class="px-6 py-2.5 rounded-sm text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors">' + t.reject + '</button>' +
      '</div>';
    box.addEventListener('click', function (e) {
      var v = e.target && e.target.getAttribute && e.target.getAttribute('data-cookie');
      if (v) choose(v);
    });
    document.body.appendChild(box);
  }

  function addFooterLink() {
    var legal = document.querySelector('footer a[href*="aviso-privacidad"]');
    if (!legal || !legal.parentNode || legal.parentNode.querySelector('[data-cookie-settings]')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-cookie-settings', '');
    b.className = 'hover:text-gold-400';
    b.textContent = t.link;
    b.addEventListener('click', open);
    legal.parentNode.appendChild(b);
  }

  function init() {
    addFooterLink();
    if (read() === null) open();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
