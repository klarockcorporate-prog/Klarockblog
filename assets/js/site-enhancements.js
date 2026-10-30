/* Klarock — mejoras de UX transversales (es / en / zh):
 * 1) botones flotantes de WhatsApp y llamada con mensaje según la página;
 * 2) video de YouTube bajo demanda (la carga pesada ocurre solo al dar play);
 * 3) filtro por categoría en el índice del blog;
 * 4) eventos de analítica para clics de contacto (solo si GA4 / Pixel están activos por consentimiento). */
(function () {
  var PHONE = '526681894960';
  var TEL = '+526681894960';
  var lang = ((document.documentElement.lang || 'es') + '').slice(0, 2).toLowerCase();
  var L = {
    es: { wa: 'WhatsApp', waAria: 'Escríbenos por WhatsApp', call: 'Llamar a Klarock', msg: 'Hola, vi “{t}” en klarock.mx y me gustaría recibir más información.', all: 'Todas', play: 'Reproducir video' },
    en: { wa: 'WhatsApp', waAria: 'Message us on WhatsApp', call: 'Call Klarock', msg: 'Hello, I saw “{t}” on klarock.mx and would like more information.', all: 'All', play: 'Play video' },
    zh: { wa: 'WhatsApp', waAria: '通过 WhatsApp 联系我们', call: '致电 Klarock', msg: '您好，我在 klarock.mx 看到“{t}”，希望了解更多信息。', all: '全部', play: '播放视频' }
  };
  var T = L[lang] || L.es;

  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('track', 'Contact'); } catch (e) {}
  }

  /* 1) contacto rápido */
  function addFab() {
    if (document.querySelector('.kl-fab')) return;
    var title = (document.title || 'klarock.mx').split('|')[0].trim().slice(0, 90);
    var href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(T.msg.replace('{t}', title));
    var box = document.createElement('div');
    box.className = 'kl-fab';
    box.innerHTML =
      '<a class="kl-call" href="tel:' + TEL + '" aria-label="' + T.call + '" data-kl="call">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg></a>' +
      '<a class="kl-wa" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="' + T.waAria + '" data-kl="whatsapp">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      '<span class="kl-label">' + T.wa + '</span></a>';
    box.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-kl]');
      if (!a) return;
      track(a.getAttribute('data-kl') === 'call' ? 'click_call' : 'click_whatsapp', { link_location: 'floating_button', page_path: location.pathname });
    });
    document.body.appendChild(box);
  }

  /* 2) video bajo demanda */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.yt-lite');
    if (!b) return;
    var id = b.getAttribute('data-yt');
    if (!id) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = b.getAttribute('data-title') || 'Video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    f.className = (b.getAttribute('class') || '').replace('yt-lite', '').trim() + ' block w-full';
    var st = b.getAttribute('style'); if (st) f.setAttribute('style', st);
    b.parentNode.replaceChild(f, b);
    track('play_video', { video_id: id, page_path: location.pathname });
  });

  /* 3) filtro por categoría en el blog */
  function addBlogFilter() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('a.card-hover[href^="blog-"]'));
    if (cards.length < 6 || document.querySelector('.kl-chipbar')) return;
    var grid = cards[0].parentNode;
    var counts = {}, order = [];
    cards.forEach(function (c) {
      var p = c.querySelector('p');
      var cat = p ? p.textContent.split('·')[0].trim() : '';
      c.setAttribute('data-cat', cat);
      if (cat) { if (!counts[cat]) { counts[cat] = 0; order.push(cat); } counts[cat]++; }
    });
    if (order.length < 2) return;
    var bar = document.createElement('div');
    bar.className = 'kl-chipbar';
    bar.setAttribute('role', 'group');
    function chip(label, value, pressed) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'kl-chip'; b.setAttribute('data-v', value); b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      b.textContent = label; return b;
    }
    bar.appendChild(chip(T.all + ' (' + cards.length + ')', '', true));
    order.forEach(function (c) { bar.appendChild(chip(c + ' (' + counts[c] + ')', c, false)); });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.kl-chip'); if (!b) return;
      var v = b.getAttribute('data-v');
      Array.prototype.forEach.call(bar.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cards.forEach(function (c) { c.style.display = (!v || c.getAttribute('data-cat') === v) ? '' : 'none'; });
    });
    grid.parentNode.insertBefore(bar, grid);
  }

  function init() { addFab(); addBlogFilter(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
