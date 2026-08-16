/* Klarock — mejoras de ficha de propiedad
 * Galería lightbox, compartir, ficha técnica (lead capture) y eventos de analítica.
 * Autocontenido: no requiere ningún framework, funciona en cualquier página que
 * incluya este script y los data-attributes descritos abajo en <body>.
 *
 * Activar analítica: define window.gtag / window.fbq (GA4 / Meta Pixel) en el
 * <head> ANTES de este script (ver assets/partials/analytics-head-snippet.html).
 * Mientras no existan, trackEvent() no hace nada — no genera errores.
 *
 * Activar ficha técnica en PDF: agrega al <body> de la propiedad
 * data-brochure-url="/ruta/a/ficha.pdf" y el botón de descarga aparece solo.
 */
(function () {
  'use strict';

  var LANG = (document.documentElement.lang || 'es').toLowerCase().indexOf('zh') === 0
    ? 'zh' : (document.documentElement.lang === 'en' ? 'en' : 'es');

  var STR = {
    es: {
      galleryOpen: 'Ver galería completa',
      photos: 'fotos',
      photo: 'foto',
      close: 'Cerrar',
      prev: 'Anterior',
      next: 'Siguiente',
      share: 'Compartir',
      shareTitle: 'Compartir propiedad',
      copyLink: 'Copiar enlace',
      copied: 'Enlace copiado al portapapeles',
      whatsapp: 'Compartir por WhatsApp',
      email: 'Compartir por correo',
      brochureBtn: 'Descargar Ficha Técnica Completa (PDF)',
      brochureTitle: 'Descargar ficha técnica',
      brochureDesc: 'Déjanos tus datos y descarga la ficha completa de esta propiedad.',
      fName: 'Nombre completo',
      fCompany: 'Empresa',
      fEmail: 'Correo corporativo',
      submit: 'Descargar PDF',
      submitting: 'Enviando…',
      brochureError: 'No pudimos procesar tu solicitud. Intenta de nuevo.',
      brochureSuccess: '¡Listo! Tu descarga comenzará en un momento.'
    },
    en: {
      galleryOpen: 'View full gallery',
      photos: 'photos',
      photo: 'photo',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      share: 'Share',
      shareTitle: 'Share property',
      copyLink: 'Copy link',
      copied: 'Link copied to clipboard',
      whatsapp: 'Share via WhatsApp',
      email: 'Share via email',
      brochureBtn: 'Download Full Technical Sheet (PDF)',
      brochureTitle: 'Download technical sheet',
      brochureDesc: 'Leave your details to download the full property sheet.',
      fName: 'Full name',
      fCompany: 'Company',
      fEmail: 'Corporate email',
      submit: 'Download PDF',
      submitting: 'Sending…',
      brochureError: "We couldn't process your request. Please try again.",
      brochureSuccess: "Done! Your download will start shortly."
    },
    zh: {
      galleryOpen: '查看完整相册',
      photos: '张照片',
      photo: '张照片',
      close: '关闭',
      prev: '上一张',
      next: '下一张',
      share: '分享',
      shareTitle: '分享房源',
      copyLink: '复制链接',
      copied: '链接已复制',
      whatsapp: '通过WhatsApp分享',
      email: '通过邮件分享',
      brochureBtn: '下载完整技术资料（PDF）',
      brochureTitle: '下载技术资料',
      brochureDesc: '留下您的信息以下载完整的房源资料。',
      fName: '姓名',
      fCompany: '公司',
      fEmail: '企业邮箱',
      submit: '下载PDF',
      submitting: '发送中…',
      brochureError: '提交失败，请重试。',
      brochureSuccess: '完成！下载即将开始。'
    }
  }[LANG];

  var ICONS = {
    close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>'
  };

  /* ---------- Analítica (GA4 / Meta Pixel) — no-op si no está instalado ---------- */
  function trackEvent(name, params) {
    params = params || {};
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
      if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params);
    } catch (e) { /* nunca romper la página por un error de tracking */ }
  }
  window.klTrackEvent = trackEvent;

  var body = document.body;
  var propertyId = body.getAttribute('data-property-id') || '';
  var propertyName = body.getAttribute('data-property-name') || document.title;

  if (propertyId) {
    trackEvent('view_property_details', {
      property_id: propertyId,
      property_name: propertyName
    });
  }

  /* ---------- Toast simple ---------- */
  var toastEl = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'kl-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-open');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toastEl.classList.remove('is-open'); }, 2600);
  }

  /* ---------- Lightbox de galería ---------- */
  function initGallery() {
    var galleries = document.querySelectorAll('.property-gallery');
    if (!galleries.length) return;

    var images = [];
    galleries.forEach(function (g) {
      g.querySelectorAll('img').forEach(function (img) {
        images.push({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' });
      });
    });
    if (!images.length) return;

    var lb = document.createElement('div');
    lb.className = 'kl-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', propertyName);
    lb.innerHTML =
      '<div class="kl-lightbox__top">' +
        '<span data-role="counter"></span>' +
        '<button type="button" class="kl-lightbox__close" data-role="close" aria-label="' + STR.close + '">' + ICONS.close + '</button>' +
      '</div>' +
      '<div class="kl-lightbox__stage">' +
        '<button type="button" class="kl-lightbox__nav kl-lightbox__nav--prev" data-role="prev" aria-label="' + STR.prev + '">' + ICONS.chevronLeft + '</button>' +
        '<img data-role="stage-img" src="" alt="">' +
        '<button type="button" class="kl-lightbox__nav kl-lightbox__nav--next" data-role="next" aria-label="' + STR.next + '">' + ICONS.chevronRight + '</button>' +
      '</div>' +
      '<div class="kl-lightbox__thumbs" data-role="thumbs"></div>';
    document.body.appendChild(lb);

    var stageImg = lb.querySelector('[data-role="stage-img"]');
    var counter = lb.querySelector('[data-role="counter"]');
    var thumbsWrap = lb.querySelector('[data-role="thumbs"]');
    var current = 0;
    var lastFocused = null;

    images.forEach(function (im, i) {
      var t = document.createElement('img');
      t.src = im.src;
      t.alt = im.alt;
      t.loading = 'lazy';
      t.addEventListener('click', function () { render(i); });
      thumbsWrap.appendChild(t);
    });

    function render(i) {
      current = (i + images.length) % images.length;
      var im = images[current];
      stageImg.src = im.src;
      stageImg.alt = im.alt;
      counter.textContent = (current + 1) + ' / ' + images.length;
      thumbsWrap.querySelectorAll('img').forEach(function (t, idx) {
        t.classList.toggle('is-active', idx === current);
      });
      var activeThumb = thumbsWrap.children[current];
      if (activeThumb && activeThumb.scrollIntoView) {
        activeThumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    }

    function open(i) {
      lastFocused = document.activeElement;
      render(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-role="close"]').focus();
      document.addEventListener('keydown', onKey);
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') render(current - 1);
      else if (e.key === 'ArrowRight') render(current + 1);
    }

    lb.querySelector('[data-role="close"]').addEventListener('click', close);
    lb.querySelector('[data-role="prev"]').addEventListener('click', function () { render(current - 1); });
    lb.querySelector('[data-role="next"]').addEventListener('click', function () { render(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    /* swipe táctil */
    var touchStartX = null;
    lb.querySelector('.kl-lightbox__stage').addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.querySelector('.kl-lightbox__stage').addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) render(current + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });

    var idx = 0;
    galleries.forEach(function (g) {
      g.querySelectorAll('img').forEach(function (img) {
        var i = idx++;
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.addEventListener('click', function () { open(i); });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
        });
      });
    });

    document.querySelectorAll('.gallery-open-all').forEach(function (btn) {
      btn.addEventListener('click', function () { open(0); });
    });
  }

  /* ---------- Compartir ---------- */
  function initShare() {
    var btn = document.getElementById('share-property-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var url = window.location.href;
      var shareData = { title: propertyName, text: propertyName, url: url };

      if (navigator.share) {
        navigator.share(shareData).catch(function () { /* usuario canceló */ });
        return;
      }
      openShareMenu(url);
    });

    function openShareMenu(url) {
      var backdrop = document.createElement('div');
      backdrop.className = 'kl-modal-backdrop';
      backdrop.innerHTML =
        '<div class="kl-modal" role="dialog" aria-modal="true" aria-label="' + STR.shareTitle + '">' +
          '<h3 class="font-serif text-lg text-white mb-4">' + STR.shareTitle + '</h3>' +
          '<div class="space-y-2">' +
            '<button type="button" data-act="copy" class="w-full text-left px-4 py-3 rounded-sm bg-navy-900 border border-white/10 text-sm text-white hover:border-gold-400/50">' + STR.copyLink + '</button>' +
            '<a data-act="wa" target="_blank" rel="noopener" class="block px-4 py-3 rounded-sm bg-navy-900 border border-white/10 text-sm text-white hover:border-gold-400/50">' + STR.whatsapp + '</a>' +
            '<a data-act="mail" class="block px-4 py-3 rounded-sm bg-navy-900 border border-white/10 text-sm text-white hover:border-gold-400/50">' + STR.email + '</a>' +
          '</div>' +
          '<button type="button" data-act="close" class="mt-5 text-xs text-slate-400 hover:text-white">' + STR.close + '</button>' +
        '</div>';
      document.body.appendChild(backdrop);
      requestAnimationFrame(function () { backdrop.classList.add('is-open'); });

      backdrop.querySelector('[data-act="wa"]').href = 'https://wa.me/?text=' + encodeURIComponent(propertyName + ' — ' + url);
      backdrop.querySelector('[data-act="mail"]').href = 'mailto:?subject=' + encodeURIComponent(propertyName) + '&body=' + encodeURIComponent(url);
      backdrop.querySelector('[data-act="copy"]').addEventListener('click', function () {
        navigator.clipboard && navigator.clipboard.writeText(url).then(function () { showToast(STR.copied); });
      });
      function dismiss() { backdrop.classList.remove('is-open'); setTimeout(function () { backdrop.remove(); }, 200); }
      backdrop.querySelector('[data-act="close"]').addEventListener('click', dismiss);
      backdrop.addEventListener('click', function (e) { if (e.target === backdrop) dismiss(); });
    }
  }

  /* ---------- Ficha técnica PDF (lead capture) ---------- */
  function initBrochure() {
    var brochureUrl = body.getAttribute('data-brochure-url') || '';
    var mount = document.getElementById('brochure-download');
    if (!brochureUrl || !mount) return; // oculto hasta que exista un PDF real

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'w-full inline-flex items-center justify-center gap-2 border border-gold-400/40 hover:border-gold-400 text-gold-300 hover:text-gold-200 font-medium px-6 py-3.5 rounded-sm transition-colors';
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"/></svg><span>' + STR.brochureBtn + '</span>';
    mount.appendChild(btn);

    btn.addEventListener('click', function () {
      var backdrop = document.createElement('div');
      backdrop.className = 'kl-modal-backdrop';
      backdrop.innerHTML =
        '<div class="kl-modal" role="dialog" aria-modal="true" aria-label="' + STR.brochureTitle + '">' +
          '<h3 class="font-serif text-lg text-white mb-2">' + STR.brochureTitle + '</h3>' +
          '<p class="text-sm text-slate-400 mb-5">' + STR.brochureDesc + '</p>' +
          '<form class="space-y-3">' +
            '<input required name="nombre" placeholder="' + STR.fName + '" class="w-full bg-navy-900 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400">' +
            '<input required name="empresa" placeholder="' + STR.fCompany + '" class="w-full bg-navy-900 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400">' +
            '<input required type="email" name="correo" placeholder="' + STR.fEmail + '" class="w-full bg-navy-900 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400">' +
            '<input type="hidden" name="_subject" value="Descarga de ficha técnica — ' + propertyName + '">' +
            '<input type="hidden" name="property_id" value="' + propertyId + '">' +
            '<input type="hidden" name="property_name" value="' + propertyName + '">' +
            '<input type="hidden" name="property_url" value="' + window.location.href + '">' +
            '<input type="hidden" name="lead_tag" value="Descarga Ficha ' + propertyId + '">' +
            '<button type="submit" class="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3.5 rounded-sm transition-colors">' + STR.submit + '</button>' +
            '<p data-role="error" class="hidden text-xs text-red-400 text-center">' + STR.brochureError + '</p>' +
          '</form>' +
          '<button type="button" data-act="close" class="mt-4 text-xs text-slate-400 hover:text-white">' + STR.close + '</button>' +
        '</div>';
      document.body.appendChild(backdrop);
      requestAnimationFrame(function () { backdrop.classList.add('is-open'); });

      function dismiss() { backdrop.classList.remove('is-open'); setTimeout(function () { backdrop.remove(); }, 200); }
      backdrop.querySelector('[data-act="close"]').addEventListener('click', dismiss);
      backdrop.addEventListener('click', function (e) { if (e.target === backdrop) dismiss(); });

      var form = backdrop.querySelector('form');
      var errorEl = backdrop.querySelector('[data-role="error"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorEl.classList.add('hidden');
        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = STR.submitting;

        fetch('https://formspree.io/f/mgogjlkw', {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (res) {
          if (!res.ok) throw new Error('submit failed');
          trackEvent('download_property_brochure', { property_id: propertyId, property_name: propertyName });
          showToast(STR.brochureSuccess);
          dismiss();
          var a = document.createElement('a');
          a.href = brochureUrl;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch(function () {
          errorEl.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.textContent = STR.submit;
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  function ready() {
    initGallery();
    initShare();
    initBrochure();
  }
})();
