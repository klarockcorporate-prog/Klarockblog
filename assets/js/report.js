/* Klarock — Reporte de Mercado Inmobiliario Nacional (interactivo). Sin dependencias externas. */
(function () {
  var R = window.KLAROCK_REPORT;
  if (!R) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var f1 = function (n) { return (Math.round(n * 100) / 100).toFixed(2).replace(/\.?0+$/, function (m) { return m === ".00" ? "" : m; }); };
  var pct = function (n) { return (Math.round(n * 100) / 100).toFixed(2) + "%"; };
  var usd = function (n) { return "US$" + (Math.round(n * 100) / 100).toFixed(2); };
  var CONF = { alta: "Alta", media: "Media", baja: "Baja" };

  function track(name, params) { try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {} }
  function srcLinks(k) {
    return [k.src, k.src2].filter(Boolean).map(function (id) { var s = R.sources[id]; return s ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + "</a>" : ""; }).join(" · ");
  }
  function badge(c) { return '<span class="rp-conf rp-conf-' + c + '" title="' + esc(R.conf[c]) + '">Confianza ' + CONF[c].toLowerCase() + "</span>"; }

  /* ---------- KPI cards ---------- */
  function kpis(target, list) {
    var host = typeof target === "string" ? $(target) : target; if (!host) return;
    host.innerHTML = list.map(function (k) {
      return '<article class="rp-kpi"><p class="rp-kpi-label">' + esc(k.label) + '</p><p class="rp-kpi-value">' + esc(k.value) + '</p>' +
        '<p class="rp-kpi-delta rp-' + (k.dir || "flat") + '">' + esc(k.delta || "") + '</p><p class="rp-kpi-note">' + esc(k.note || "") + '</p>' +
        '<p class="rp-kpi-src">' + badge(k.conf) + " " + srcLinks(k) + "</p></article>";
    }).join("");
  }

  /* ---------- Horizontal bars with detail on hover / focus / click ---------- */
  function bars(target, rows, o) {
    var host = typeof target === "string" ? $(target) : target; if (!host) return;
    o = o || {};
    var max = o.max || Math.max.apply(null, rows.map(function (r) { return Math.abs(r.value); })) * 1.08 || 1;
    var fmt = o.fmt || pct;
    var html = '<div class="rp-bars" role="list">' + rows.map(function (r, i) {
      var w = Math.max(1.5, Math.abs(r.value) / max * 100);
      var cls = "rp-bar" + (r.cls ? " " + r.cls : "") + (r.value < 0 ? " rp-neg" : "");
      return '<div class="rp-bar-row" role="listitem" tabindex="0" data-i="' + i + '"><span class="rp-bar-label">' + esc(r.label) + '</span>' +
        '<span class="rp-bar-track">' + (o.marker != null ? '<i class="rp-marker" style="left:' + (o.marker / max * 100) + '%"></i>' : "") + '<b class="' + cls + '" style="width:' + w + '%"></b></span>' +
        '<span class="rp-bar-value">' + esc(fmt(r.value)) + "</span></div>";
    }).join("") + "</div>" + (o.marker != null ? '<p class="rp-legend"><i class="rp-marker-key"></i> ' + esc(o.markerLabel || "Referencia") + "</p>" : "") + '<p class="rp-detail" aria-live="polite">' + esc(o.hint || "Pasa el cursor o toca una barra para ver el detalle.") + "</p>";
    host.innerHTML = html;
    var det = $(".rp-detail", host);
    function show(i) { var r = rows[i]; if (!r) return; $$(".rp-bar-row", host).forEach(function (x) { x.classList.toggle("rp-on", +x.getAttribute("data-i") === i); }); det.textContent = r.detail || (r.label + ": " + fmt(r.value)); }
    $$(".rp-bar-row", host).forEach(function (row) {
      var i = +row.getAttribute("data-i");
      row.addEventListener("mouseenter", function () { show(i); }); row.addEventListener("focus", function () { show(i); }); row.addEventListener("click", function () { show(i); });
    });
  }

  /* ---------- Tabs ---------- */
  var tabs = $$(".rp-tab"), panels = $$(".rp-panel");
  function activate(id, push) {
    if (!panels.some(function (p) { return p.id === "rp-" + id; })) id = "resumen";
    tabs.forEach(function (t) { var on = t.getAttribute("data-tab") === id; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; });
    panels.forEach(function (p) { p.hidden = p.id !== "rp-" + id; });
    if (push) { try { history.replaceState(null, "", "#" + id); } catch (e) {} track("report_tab", { tab: id }); }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { activate(t.getAttribute("data-tab"), true); var bar = $(".rp-tabbar"); if (bar && window.scrollY > bar.offsetTop) window.scrollTo({ top: bar.offsetTop - 70, behavior: "smooth" }); });
    t.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : -1; if (j < 0) return;
      j = (j + tabs.length) % tabs.length; tabs[j].focus(); activate(tabs[j].getAttribute("data-tab"), true); e.preventDefault();
    });
  });
  $$("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { activate(b.getAttribute("data-goto"), true); var bar = $(".rp-tabbar"); if (bar) window.scrollTo({ top: bar.offsetTop - 70, behavior: "smooth" }); }); });

  /* ---------- Resumen ---------- */
  (function () {
    var headline = {
      Industrial: R.industrial.kpis[0], Oficinas: R.comercial.oficinas.kpis[0], Retail: R.comercial.retail.kpis[0], Vivienda: R.vivienda.kpis[0], Hotelero: R.hotelero.kpis[1], Macro: R.macro.kpis[0]
    };
    var go = { Industrial: "industrial", Oficinas: "comercial", Retail: "comercial", Vivienda: "vivienda", Hotelero: "hotelero", Macro: "macro" };
    $("#rp-resumen-cards").innerHTML = R.lectura.resumen.map(function (s) {
      var k = headline[s.sector];
      return '<article class="rp-card"><p class="rp-card-sector">' + esc(s.sector) + '</p><p class="rp-card-tag">' + esc(s.tag) + '</p>' +
        '<p class="rp-card-kpi"><span>' + esc(k.value) + '</span> <em>' + esc(k.label) + '</em></p><p class="rp-card-text">' + esc(s.text) + '</p>' +
        '<button type="button" class="rp-link" data-goto="' + go[s.sector] + '">Ver detalle de ' + esc(s.sector.toLowerCase()) + ' →</button></article>';
    }).join("");
    $$("#rp-resumen-cards [data-goto]").forEach(function (b) { b.addEventListener("click", function () { activate(b.getAttribute("data-goto"), true); var bar = $(".rp-tabbar"); if (bar) window.scrollTo({ top: bar.offsetTop - 70, behavior: "smooth" }); }); });
    $("#rp-vigilar").innerHTML = R.lectura.vigilar.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  })();

  /* ---------- Macro ---------- */
  kpis("#rp-macro-kpis", R.macro.kpis);
  (function () {
    var mode = "mean", host = $("#rp-expect");
    function draw() {
      host.innerHTML = '<table class="rp-table"><thead><tr><th>Indicador</th><th>Septiembre</th><th>Octubre</th><th>Cambio</th></tr></thead><tbody>' + R.macro.expectations.map(function (e) {
        var v = e[mode], d = v[1] - v[0], cls = Math.abs(d) < 0.005 ? "rp-flat" : d > 0 ? "rp-up" : "rp-down";
        return "<tr><td>" + esc(e.label) + "</td><td>" + v[0].toFixed(2) + "</td><td><strong>" + v[1].toFixed(2) + '</strong></td><td class="' + cls + '">' + (d > 0 ? "▲ +" : d < 0 ? "▼ " : "= ") + d.toFixed(2) + "</td></tr>";
      }).join("") + "</tbody></table>";
    }
    $$("[data-expect]").forEach(function (b) { b.addEventListener("click", function () { mode = b.getAttribute("data-expect"); $$("[data-expect]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); draw(); }); });
    draw(); $("#rp-forecast-note").textContent = R.macro.forecastNote;
  })();

  /* ---------- Industrial ---------- */
  kpis("#rp-ind-kpis", R.industrial.kpis);
  bars("#rp-origin", R.industrial.origin.map(function (o) { return { label: o.label, value: o.value, detail: o.label + ": " + o.value + "% de la demanda del 3T." }; }), { max: 50, fmt: function (v) { return v + "%" } });
  $("#rp-origin-note").textContent = R.industrial.originNote;
  $("#rp-deals").innerHTML = R.industrial.deals.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
  (function () {
    var metric = "rent", sort = "value", host = $("#rp-markets");
    var SRC_CLASS = { "BuscaBodegas": "rp-s1", "Solili": "rp-s2", "CBRE": "rp-s3" };
    function srcCls(n) { return n.indexOf("Solili") === 0 ? "rp-s2" : n.indexOf("CBRE") === 0 ? "rp-s3" : "rp-s1"; }
    function draw() {
      var m = R.industrial.markets.slice();
      var key = function (x) { return metric === "rent" ? (x.rent[0] + x.rent[1]) / 2 : Math.max.apply(null, Object.keys(x.vac).map(function (k) { return x.vac[k]; })); };
      if (sort === "value") m.sort(function (a, b) { return key(b) - key(a); }); else if (sort === "inv") m.sort(function (a, b) { return b.inv - a.inv; }); else m.sort(function (a, b) { return a.name.localeCompare(b.name, "es"); });
      var max = metric === "rent" ? 12 : 12;
      var rows = m.map(function (x) {
        var detail;
        if (metric === "rent") {
          var ref = Object.keys(x.rentRef).map(function (k) { return k + ": " + usd(x.rentRef[k]); }).join(" · ");
          detail = x.name + " — renta solicitada US$" + x.rent[0].toFixed(2) + " a US$" + x.rent[1].toFixed(2) + " por m² al mes (BuscaBodegas, triple neto). Inventario: " + x.inv + " M m²." + (ref ? " Otras referencias: " + ref + "." : "");
          return '<div class="rp-bar-row" tabindex="0" data-d="' + esc(detail) + '"><span class="rp-bar-label">' + esc(x.name) + '</span><span class="rp-bar-track"><b class="rp-bar rp-range" style="left:' + (x.rent[0] / max * 100) + '%;width:' + Math.max(1.2, (x.rent[1] - x.rent[0]) / max * 100) + '%"></b>' +
            Object.keys(x.rentRef).map(function (k) { return '<i class="rp-dot" style="left:' + (x.rentRef[k] / max * 100) + '%" title="' + esc(k + ": " + usd(x.rentRef[k])) + '"></i>'; }).join("") + '</span><span class="rp-bar-value">' + x.rent[0].toFixed(2) + "–" + x.rent[1].toFixed(2) + "</span></div>";
        }
        var parts = Object.keys(x.vac).map(function (k) { return k + ": " + x.vac[k] + "%"; }).join(" · ");
        detail = x.name + " — vacancia según cada fuente: " + parts + ". Inventario: " + x.inv + " M m².";
        return '<div class="rp-bar-row rp-multi" tabindex="0" data-d="' + esc(detail) + '"><span class="rp-bar-label">' + esc(x.name) + '</span><span class="rp-bar-track">' +
          Object.keys(x.vac).map(function (k) { return '<b class="rp-bar ' + srcCls(k) + '" style="width:' + Math.max(1.5, x.vac[k] / max * 100) + '%" title="' + esc(k + ": " + x.vac[k] + "%") + '"></b>'; }).join("") + '</span><span class="rp-bar-value">' + Object.keys(x.vac).map(function (k) { return x.vac[k]; }).join(" · ") + "%</span></div>";
      });
      var legend = metric === "rent" ? '<p class="rp-legend"><i class="rp-swatch rp-range-key"></i> Rango de renta solicitada (US$/m²/mes) <i class="rp-dot-key"></i> Otras referencias (Solili, Spot2.mx)</p>' :
        '<p class="rp-legend"><i class="rp-swatch rp-s1"></i> BuscaBodegas <i class="rp-swatch rp-s2"></i> Solili <i class="rp-swatch rp-s3"></i> CBRE — la vacancia por mercado difiere entre fuentes</p>';
      host.innerHTML = '<div class="rp-bars">' + rows.join("") + "</div>" + legend + '<p class="rp-detail" aria-live="polite">Pasa el cursor o toca un mercado para ver el detalle.</p>';
      var det = $(".rp-detail", host);
      $$(".rp-bar-row", host).forEach(function (r) { var go = function () { $$(".rp-bar-row", host).forEach(function (x) { x.classList.toggle("rp-on", x === r); }); det.textContent = r.getAttribute("data-d"); }; r.addEventListener("mouseenter", go); r.addEventListener("focus", go); r.addEventListener("click", go); });
    }
    $$("[data-ind-metric]").forEach(function (b) { b.addEventListener("click", function () { metric = b.getAttribute("data-ind-metric"); $$("[data-ind-metric]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); draw(); track("report_filter", { section: "industrial", metric: metric }); }); });
    $("#rp-ind-sort").addEventListener("change", function (e) { sort = e.target.value; draw(); });
    draw(); $("#rp-market-note").textContent = R.industrial.marketNote;

    /* calculadora de renta */
    var sel = $("#calc-market"), fx = $("#calc-fx"), m2 = $("#calc-m2"), rent = $("#calc-rent");
    sel.innerHTML = '<option value="">Elegir mercado…</option>' + R.industrial.markets.map(function (x, i) { return '<option value="' + i + '">' + esc(x.name) + "</option>"; }).join("");
    sel.addEventListener("change", function () { if (sel.value === "") return; var x = R.industrial.markets[+sel.value]; rent.value = ((x.rent[0] + x.rent[1]) / 2).toFixed(2); calc(); });
    function calc() {
      var a = parseFloat(m2.value) || 0, r = parseFloat(rent.value) || 0, t = parseFloat(fx.value) || 0;
      $("#calc-usd").textContent = "US$" + Math.round(a * r).toLocaleString("es-MX");
      $("#calc-mxn").textContent = "MXN " + Math.round(a * r * t).toLocaleString("es-MX");
      $("#calc-year").textContent = "US$" + Math.round(a * r * 12).toLocaleString("es-MX");
    }
    [m2, rent, fx].forEach(function (i) { i.addEventListener("input", calc); }); calc();
  })();

  /* ---------- Comercial ---------- */
  (function () {
    var O = R.comercial.oficinas;
    kpis("#rp-of-kpis", O.kpis);
    bars("#rp-of-vac", O.vacancy.map(function (v) { return { label: v.label, value: v.value, detail: v.label + ": vacancia de oficinas de " + v.value + "% (Solili, 3T 2026)." }; }), { max: 22 });
    $("#rp-of-vac-note").textContent = O.vacancyNote;
    bars("#rp-of-m2", O.vacantM2.map(function (v) { return { label: v.label, value: v.value, cls: "rp-s2", detail: v.label + ": " + v.value.toLocaleString("es-MX") + " mil m² vacíos; cambio anual de " + (v.yoy > 0 ? "+" : "") + v.yoy + " mil m²." }; }), { max: 2400, fmt: function (v) { return v.toLocaleString("es-MX") + " mil m²"; } });
    var order = "desc", zh = $("#rp-zones");
    function zones() {
      var z = O.cdmxZones.slice().sort(function (a, b) { return order === "desc" ? b.value - a.value : a.value - b.value; });
      bars(zh, z.map(function (v) { return { label: v.label, value: v.value, cls: v.value > 18.2 ? "rp-hot" : "", detail: v.label + ": " + v.value + "% de disponibilidad de Clase A" + (v.value > 18.2 ? " (por encima del promedio de 18.2%)." : " (por debajo del promedio de 18.2%).") }; }), { max: 42, marker: 18.2, markerLabel: "Promedio Clase A de la CDMX: 18.2%" });
    }
    $$("[data-zone-order]").forEach(function (b) { b.addEventListener("click", function () { order = b.getAttribute("data-zone-order"); $$("[data-zone-order]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); zones(); }); });
    zones(); $("#rp-cdmx-note").textContent = O.cdmxNote;
    var host = $("#rp-of-rents");
    host.innerHTML = '<div class="rp-bars">' + O.rents.map(function (r) {
      return '<div class="rp-bar-row" tabindex="0"><span class="rp-bar-label">' + esc(r.label) + '</span><span class="rp-bar-track"><b class="rp-bar rp-s2" style="width:' + r.value / 32 * 100 + '%"></b><i class="rp-dot" style="left:' + r.a / 32 * 100 + '%" title="Clase A: US$' + r.a.toFixed(2) + '"></i></span><span class="rp-bar-value">' + r.value.toFixed(2) + " / " + r.a.toFixed(2) + "</span></div>";
    }).join("") + '</div><p class="rp-legend"><i class="rp-swatch rp-s2"></i> Renta promedio del submercado <i class="rp-dot-key"></i> Clase A (US$/m²/mes)</p>';
    $("#rp-rents-note").textContent = O.rentsNote;
    kpis("#rp-rt-kpis", R.comercial.retail.kpis); $("#rp-retail-note").textContent = R.comercial.retail.note;
    $$("[data-sub]").forEach(function (b) {
      b.addEventListener("click", function () { var id = b.getAttribute("data-sub"); $$("[data-sub]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); $$(".rp-sub").forEach(function (p) { p.hidden = p.id !== "rp-sub-" + id; }); track("report_filter", { section: "comercial", sub: id }); });
    });
  })();

  /* ---------- Vivienda ---------- */
  kpis("#rp-viv-kpis", R.vivienda.kpis);
  $("#rp-programs").innerHTML = R.vivienda.programs.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  (function () {
    var sort = "desc", q = "", host = $("#rp-states"), nat = R.vivienda.national;
    function draw() {
      var s = R.vivienda.states.filter(function (x) { return x[0].toLowerCase().indexOf(q) !== -1; });
      s.sort(function (a, b) { return sort === "desc" ? b[1] - a[1] : sort === "asc" ? a[1] - b[1] : a[0].localeCompare(b[0], "es"); });
      if (!s.length) { host.innerHTML = '<p class="rp-detail">Sin resultados para esa búsqueda.</p>'; return; }
      bars(host, s.map(function (x) { var d = x[1] - nat; return { label: x[0], value: x[1], cls: x[1] >= nat ? "rp-hot" : "rp-s2", detail: x[0] + ": " + pct(x[1]) + " de variación anual en el 2T 2026, " + Math.abs(d).toFixed(2) + " puntos " + (d >= 0 ? "por encima" : "por debajo") + " del promedio nacional (" + nat + "%)." }; }), { max: 14, marker: nat, markerLabel: "Promedio nacional: 7.31%", hint: "Pasa el cursor o toca un estado para comparar con el promedio nacional." });
    }
    $("#rp-state-q").addEventListener("input", function (e) { q = e.target.value.trim().toLowerCase(); draw(); });
    $("#rp-state-sort").addEventListener("change", function (e) { sort = e.target.value; draw(); track("report_filter", { section: "vivienda", sort: sort }); });
    draw();
  })();

  /* ---------- Hotelero ---------- */
  kpis("#rp-hot-kpis", R.hotelero.kpis);
  bars("#rp-occ", R.hotelero.occupancy.map(function (o) { return { label: o.label, value: o.value, detail: o.label + ": " + o.value + "% — " + o.note }; }), { max: 100, fmt: function (v) { return v + "%"; } });
  $("#rp-occ-note").textContent = R.hotelero.occupancyNote;
  bars("#rp-air", R.hotelero.airArrivals.map(function (o) { return { label: o.label, value: o.value, cls: "rp-hot", detail: o.label + ": " + o.value + "% en llegadas aéreas internacionales, enero–agosto 2026 vs. 2025." }; }), { max: 24, fmt: function (v) { return v + "%"; } });
  $("#rp-air-note").textContent = R.hotelero.airNote;
  $("#rp-supply").innerHTML = R.hotelero.supply.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");

  /* ---------- Fuentes ---------- */
  $("#rp-sources").innerHTML = Object.keys(R.sources).map(function (k) { var s = R.sources[k]; return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + "</a></li>"; }).join("");
  $("#rp-conf-legend").innerHTML = Object.keys(R.conf).map(function (k) { return "<li>" + badge(k) + " " + esc(R.conf[k]) + "</li>"; }).join("");

  /* ---------- CSV ---------- */
  function csvRows() {
    var rows = [["Sección", "Indicador", "Valor", "Detalle", "Fuente", "Confianza"]];
    function add(sec, list) { list.forEach(function (k) { rows.push([sec, k.label, k.value, [k.delta, k.note].filter(Boolean).join(" · "), [k.src, k.src2].filter(Boolean).map(function (i) { return R.sources[i].name; }).join(" | "), k.conf]); }); }
    add("Macro", R.macro.kpis); add("Industrial", R.industrial.kpis); add("Oficinas", R.comercial.oficinas.kpis); add("Retail", R.comercial.retail.kpis); add("Vivienda", R.vivienda.kpis); add("Hotelero", R.hotelero.kpis);
    R.macro.expectations.forEach(function (e) { rows.push(["Macro · Expectativas Banxico", e.label, e.mean[1], "Media oct (sep " + e.mean[0] + ") · Mediana oct " + e.median[1] + " (sep " + e.median[0] + ")", R.sources.banxicoSurvey.name, "alta"]); });
    R.industrial.markets.forEach(function (m) { rows.push(["Industrial · Mercados", m.name, m.rent[0] + "–" + m.rent[1], "Renta solicitada US$/m²/mes; inventario " + m.inv + " M m²; vacancia " + Object.keys(m.vac).map(function (k) { return k + " " + m.vac[k] + "%"; }).join(", "), R.sources.buscabodegas.name + " | " + R.sources.solili.name, "baja"]); });
    R.comercial.oficinas.cdmxZones.forEach(function (z) { rows.push(["Oficinas · CDMX Clase A", z.label, z.value + "%", "Disponibilidad Clase A (promedio 18.2%)", R.sources.cwOficinas.name, "media"]); });
    R.comercial.oficinas.vacancy.forEach(function (z) { rows.push(["Oficinas · Vacancia por mercado", z.label, z.value + "%", "", R.sources.soliliOficinas.name, "media"]); });
    R.vivienda.states.forEach(function (s) { rows.push(["Vivienda · SHF 2T 2026", s[0], s[1] + "%", "Variación anual (nacional " + R.vivienda.national + "%)", R.sources.shf.name, "alta"]); });
    R.hotelero.occupancy.forEach(function (o) { rows.push(["Hotelero · Ocupación", o.label, o.value + "%", o.note, R.sources[o.src].name, "media"]); });
    return rows;
  }
  var dl = $("#rp-csv");
  if (dl) dl.addEventListener("click", function () {
    var csv = csvRows().map(function (r) { return r.map(function (c) { return '"' + String(c == null ? "" : c).replace(/"/g, '""') + '"'; }).join(","); }).join("\r\n");
    var blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "klarock-reporte-mercado-nacional-2026-11.csv"; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    track("report_download_csv");
  });
  var pr = $("#rp-print"); if (pr) pr.addEventListener("click", function () { track("report_print"); window.print(); });

  activate((location.hash || "").replace("#", "") || "resumen", false);
  window.addEventListener("hashchange", function () { activate((location.hash || "").replace("#", "") || "resumen", false); });
})();
