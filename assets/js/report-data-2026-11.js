/* Klarock — Reporte de Mercado Inmobiliario Nacional · Noviembre 2026
 * Datos recopilados y contrastados con las fuentes citadas el 15 de noviembre de 2026.
 * conf: "alta" = cifra oficial leída en el documento original; "media" = firma del sector citada por prensa especializada;
 *       "baja" = cifra de una sola fuente secundaria, con resumen no verificado o que difiere de otras fuentes. */
window.KLAROCK_REPORT = {
  meta: { title: "Reporte de Mercado Inmobiliario Nacional", period: "Noviembre 2026", cutoff: "15 de noviembre de 2026", quarter: "3T 2026" },

  conf: {
    alta: "Cifra oficial, leída en el documento original",
    media: "Firma del sector citada por prensa especializada",
    baja: "Fuente única secundaria, o cifras que difieren entre fuentes"
  },

  sources: {
    banxico: { name: "Banco de México, Anuncio de Política Monetaria (5 nov 2026)", url: "https://www.banxico.org.mx/canales/%7B13B102AD-C237-17C0-0F39-65F9B35326DE%7D.pdf" },
    banxicoSurvey: { name: "Banco de México, Encuesta de Expectativas de Especialistas, octubre 2026 (3 nov 2026)", url: "https://www.banxico.org.mx/publicaciones-y-prensa/encuestas-sobre-las-expectativas-de-los-especialis/%7BD4B6ED49-140C-AE4A-7D64-3CA5B1974667%7D.pdf" },
    inegiPib: { name: "INEGI, Estimación Oportuna del PIB 3T 2026 (30 oct 2026)", url: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/pibo/pib_eo2026_10.pdf" },
    inflacion: { name: "Investing.com, inflación de octubre 2026 con datos del INEGI (9 nov 2026)", url: "https://es.investing.com/news/economic-indicators/banxico-recorto-e-inflacion-en-mexico-subio-mas-de-lo-previsto-en-octubre-a-375-3919453" },
    shf: { name: "SHF vía IIEG Jalisco, Índice de Precios de la Vivienda 2T 2026 (ficha del 13 ago 2026)", url: "https://iieg.gob.mx/ns/wp-content/uploads/2026/08/reporte_indice_precios_vivienda_mexico_2doT_2026.pdf" },
    datoz: { name: "Datoz, demanda industrial 3T 2026 (22 oct 2026)", url: "https://www.datoz.com/2026/10/22/3q-2026-la-demanda-industrial-en-mexico-supera-al-mismo-periodo-de-2025/" },
    centrourbano: { name: "Centro Urbano, inventario industrial 3T 2026 con datos de Datoz (26 oct 2026)", url: "https://centrourbano.com/revista/inmobiliario/inventario-industrial-crece-vacancia-al-alza/" },
    solili: { name: "Solili, Reporte Industrial 3T 2026 (5 oct 2026)", url: "https://www.solili.mx/noticias/reporte-industrial-solili-tercer-trimestre-2026/8177/" },
    buscabodegas: { name: "BuscaBodegas, Reporte de Mercado Industrial México 3T 2026", url: "https://buscabodegas.com/reporte-industrial-3t-2026" },
    publimetro: { name: "Publimetro, rentas industriales con datos de Spot2.mx (14 oct 2026)", url: "https://www.publimetro.com.mx/noticias/2026/10/14/rentas-industriales-en-mexico-suben-114-en-2026-oficinas-y-locales-moderan-precio/" },
    cwOficinas: { name: "Cushman & Wakefield MarketBeat CDMX Oficinas 3T 2026, vía Inmobiliare (12 oct 2026)", url: "https://inmobiliare.com/oficinas-cdmx-cushman-marketbeat-3t2026/" },
    soliliOficinas: { name: "Solili, mercado de oficinas 3T 2026, vía Inmobiliare Connect (6 oct 2026)", url: "https://inmobiliareconnect.com/noticias/mercado-oficinas-mexico-mantiene-crecimiento-moderado-solili/" },
    frelOficinas: { name: "Solili y Grupo FREL, oficinas a septiembre 2026, vía Real Estate Market (15 oct 2026)", url: "https://realestatemarket.com.mx/noticias/mercado-inmobiliario/51735-mercado-de-oficinas-perfila-un-cierre-de-2026-con-menor-disponibilidad" },
    liverpool: { name: "Expansión, resultados de Liverpool 3T 2026 (26 oct 2026)", url: "https://expansion.mx/empresas/2026/10/26/liverpool-negocio-inmobiliario-crecimiento-tercer-trimestre" },
    palacio: { name: "Expansión, Liverpool y Palacio de Hierro, negocio inmobiliario (5 nov 2026)", url: "https://expansion.mx/empresas/2026/11/05/liverpool-palacio-de-hierro-renta-locales-plazas-comerciales" },
    bienestar: { name: "PorEsto, Vivienda para el Bienestar (14 sep 2026)", url: "https://www.poresto.com/mexico/2026/9/14/vivienda-para-el-bienestar-suma-667-mil-casas-contratadas-meta-sexenal-alcanzara-a-12-millones-de-familias.html" },
    evi: { name: "INEGI, Encuesta de Viajeros Internacionales agosto 2026, vía Ruptura 360 (14 oct 2026)", url: "https://ruptura360.mx/el-pais/viajeros-internacionales-mexico-inegi/" },
    sectur: { name: "Sectur con datos del INEGI, vía Plano Informativo / Agencia Reforma (15 oct 2026)", url: "https://planoinformativo.com/1175847/crece-apenas-09-derrama-turistica-en-ocho-meses" },
    siturq: { name: "SITUR Quintana Roo, vía PorEsto (29 sep 2026)", url: "https://www.poresto.com/quintana-roo/2026/9/29/ocupacion-hotelera-en-quintana-roo-cae-a-485-en-septiembre-reportan-baja-historica.html" },
    hotelOct: { name: "UnoTV, hoteleros alertan por caída de ocupación (19 oct 2026)", url: "https://www.unotv.com/turismo/hoteleros-alertan-por-caida-de-ocupacion-y-piden-recursos-para-promocionar-mexico/" },
    hotelJun: { name: "UnoTV, hoteles y Mundial 2026, con datos de ANCH, AMHM y Starc (23 jul 2026)", url: "https://www.unotv.com/nacional/hoteles-en-mexico-elevaron-tarifas-por-el-mundial-sin-alcanzar-ocupacion-esperada/" },
    cbreHoteles: { name: "El Cronista, hoteles con datos de CBRE (19 mar 2026; cifras de 2025)", url: "https://www.cronista.com/mexico/finanzas-economia/el-boom-del-turismo-premium-en-mexico-por-que-las-tarifas-de-lujo-suben-mientras-se-construyen-17-mil-cuartos" }
  },

  /* ---------- Resumen y macro ---------- */
  macro: {
    kpis: [
      { label: "Tasa objetivo de Banxico", value: "6.25%", delta: "−25 pb (5 nov)", dir: "down", note: "Votación 3 a 2; Heath y Borja votaron por mantener 6.50%. Anticipa una pausa prolongada.", src: "banxico", conf: "alta" },
      { label: "Inflación anual, octubre", value: "3.75%", delta: "▲ desde 3.45% en septiembre", dir: "up", note: "Subyacente 3.80%. Banxico espera converger a 3.0% en el 4T 2027.", src: "inflacion", conf: "media" },
      { label: "PIB 3T 2026 (estimación oportuna)", value: "+0.9%", delta: "t/t · +3.2% a/a", dir: "up", note: "Tercer trimestre consecutivo de alza; acumulado enero–septiembre +1.9%.", src: "inegiPib", conf: "media" },
      { label: "Tipo de cambio esperado, cierre 2026", value: "18.25", delta: "pesos por dólar (media)", dir: "flat", note: "Mediana 18.39. La encuesta de septiembre esperaba 17.57.", src: "banxicoSurvey", conf: "alta" }
    ],
    expectations: [
      { label: "Inflación general, cierre 2026 (%)", mean: [3.85, 3.83], median: [3.87, 3.88] },
      { label: "Inflación general, cierre 2027 (%)", mean: [3.85, 3.83], median: [3.82, 3.85] },
      { label: "Inflación subyacente, cierre 2026 (%)", mean: [3.89, 3.85], median: [3.90, 3.82] },
      { label: "Crecimiento del PIB 2026 (%)", mean: [1.40, 1.61], median: [1.40, 1.50] },
      { label: "Crecimiento del PIB 2027 (%)", mean: [1.77, 1.86], median: [1.80, 1.83] },
      { label: "Tipo de cambio, cierre 2026 (MXN/USD)", mean: [17.57, 18.25], median: [17.50, 18.39] },
      { label: "Tipo de cambio, cierre 2027 (MXN/USD)", mean: [18.11, 18.58], median: [18.04, 18.64] },
      { label: "Tasa de fondeo, cierre 2026 (%)", mean: [6.51, 6.49], median: [6.50, 6.50] }
    ],
    forecastNote: "Banxico pronostica inflación general de 3.7% para el 4T 2026 (antes 3.5%) y convergencia a 3.0% en el 4T 2027. Mantiene un sesgo al alza en los riesgos."
  },

  /* ---------- Industrial ---------- */
  industrial: {
    kpis: [
      { label: "Vacancia nacional", value: "5.5% – 6.28%", delta: "mínimo histórico fue 1.8% a mediados de 2023", dir: "up", note: "Solili: 5.5% sobre 115.1 M m². Datoz: 6.28% sobre 109 M m² (+115 pb a/a). Las dos metodologías difieren.", src: "datoz", src2: "solili", conf: "media" },
      { label: "Absorción bruta, 3T", value: "1.3 M m²", delta: "3.4 M m² en lo que va del año", dir: "up", note: "El acumulado supera los más de 3.0 M m² de enero a septiembre de 2025. Logística 52%, manufactura 48%.", src: "datoz", conf: "media" },
      { label: "Renta promedio solicitada", value: "US$7.30 – 8.80", delta: "+5% a/a (Datoz)", dir: "up", note: "US$7.30 (Datoz), 7.67 (Solili, vía prensa), 8.60 (BuscaBodegas) y 8.80 (Publimetro/Spot2.mx) por m² al mes.", src: "datoz", src2: "publimetro", conf: "baja" },
      { label: "Inicios de construcción, 3T", value: "655,863 m²", delta: "84% especulativa", dir: "up", note: "2.2 M m² en lo que va del año. Las desocupaciones del trimestre sumaron 805,000 m² (+55% a/a).", src: "centrourbano", conf: "media" }
    ],
    origin: [
      { label: "Empresas mexicanas", value: 38 }, { label: "China", value: 14 }, { label: "Estados Unidos", value: 8 }, { label: "Corea del Sur", value: 5 }
    ],
    originNote: "Demanda del 3T por origen de capital (Datoz). El resto corresponde a otros países. Monterrey concentró 30% de la absorción bruta acumulada y la Ciudad de México 26%.",
    deals: [
      "Samsung, 55,000 m² (T-mex Park, Huehuetoca–Zumpango)",
      "Navistar, 40,000 m² (Escobedo, Monterrey)",
      "Industrias Eléctricas AG, ~36,000 m² (Tijuana)",
      "Inventec, ~36,000 m² (Ciudad Juárez)",
      "Daikin, ~35,000 m² (Ramos Arizpe, Saltillo)"
    ],
    /* rent: [mín, máx] US$/m²/mes (BuscaBodegas, triple neto); rentRef: otras referencias; vac: vacancia por fuente (%) */
    markets: [
      { name: "Ciudad de México (CTT)", inv: 14.2, rent: [10.36, 10.56], rentRef: { "Solili": 10.38, "Spot2.mx, Valle de México": 10.72 }, vac: { "BuscaBodegas": 2.1, "Solili (ZMCM)": 4.5, "CBRE (ZMCM)": 4.8 } },
      { name: "Tijuana", inv: 9.4, rent: [8.68, 8.90], rentRef: { "Solili": 8.68 }, vac: { "BuscaBodegas": 4.8, "Solili": 10.2 } },
      { name: "Guadalajara", inv: 17.1, rent: [7.16, 7.47], rentRef: { "Solili": 7.53 }, vac: { "BuscaBodegas": 1.7 } },
      { name: "Monterrey", inv: 19.8, rent: [7.00, 7.19], rentRef: { "Solili": 7.15 }, vac: { "BuscaBodegas": 7.2, "Solili": 7.0, "CBRE": 6.1 } },
      { name: "Ciudad Juárez", inv: 8.1, rent: [6.90, 7.40], rentRef: {}, vac: { "BuscaBodegas": 4.2, "Solili": 6.0 } },
      { name: "Saltillo", inv: 5.8, rent: [6.70, 6.95], rentRef: {}, vac: { "BuscaBodegas": 3.9, "Solili": 2.3 } },
      { name: "Querétaro", inv: 7.3, rent: [6.17, 6.45], rentRef: { "Solili": 6.15 }, vac: { "BuscaBodegas": 6.1 } },
      { name: "Guanajuato (Bajío)", inv: 6.4, rent: [6.00, 6.30], rentRef: { "Solili (ago)": 5.44 }, vac: { "BuscaBodegas": 5.4 } }
    ],
    marketNote: "Inventario y rentas: BuscaBodegas (3T 2026, triple neto). Vacancia: se muestran todas las fuentes disponibles porque no coinciden; las cifras por mercado de Solili provienen de un resumen del reporte y no se verificaron en el texto completo."
  },

  /* ---------- Comercial ---------- */
  comercial: {
    oficinas: {
      kpis: [
        { label: "Vacancia nacional de oficinas", value: "14.7%", delta: "2.6 M m² vacíos, −6% a/a", dir: "down", note: "Baja en seis de los ocho mercados analizados frente al 3T 2025. Inventario de más de 18 M m² (+2.2%).", src: "frelOficinas", src2: "soliliOficinas", conf: "media" },
        { label: "Renta promedio nacional", value: "US$20.53 – 20.75", delta: "+2.0% a/a", dir: "up", note: "Dos cortes de Solili con fechas distintas (3T y septiembre); el nivel de septiembre es el más alto en 24 meses.", src: "soliliOficinas", src2: "frelOficinas", conf: "media" },
        { label: "Demanda bruta, ene–sep", value: "737 mil m²", delta: "+5% a/a", dir: "up", note: "Nueva oferta entregada en el periodo: 198,000 m², más del doble que en enero–septiembre de 2025.", src: "frelOficinas", conf: "media" },
        { label: "En construcción", value: "~1 M m²", delta: "CDMX 40% · MTY 16% · León 10%", dir: "flat", note: "En la Ciudad de México la construcción cayó 33% a/a, a 269,550 m² (Cushman & Wakefield).", src: "soliliOficinas", src2: "cwOficinas", conf: "media" }
      ],
      /* vacancia por mercado (%), Solili; "n/d" no publicado */
      vacancy: [
        { label: "Puebla", value: 18.8 }, { label: "Mérida", value: 15.0 }, { label: "Tijuana", value: 6.2 }, { label: "León", value: 5.4 }
      ],
      vacancyNote: "Solili publicó la vacancia en porcentaje solo para estos cuatro mercados. Para los demás da metros cuadrados vacíos: Ciudad de México 2.1 M, Monterrey 221 mil y Guadalajara 128 mil.",
      vacantM2: [
        { label: "Ciudad de México", value: 2100, yoy: -126 }, { label: "Monterrey", value: 221, yoy: -42 }, { label: "Guadalajara", value: 128, yoy: 8 }
      ],
      /* disponibilidad Clase A por zona de la CDMX (%), Cushman & Wakefield */
      cdmxZones: [
        { label: "Norte", value: 37.1 }, { label: "Fuera de corredor", value: 34.6 }, { label: "Santa Fe", value: 29.3 }, { label: "Lomas Altas", value: 15.7 }, { label: "Bosques", value: 15.6 },
        { label: "Insurgentes", value: 14.9 }, { label: "Reforma", value: 13.6 }, { label: "Periférico Sur", value: 12.8 }, { label: "Polanco", value: 12.2 }, { label: "Lomas", value: 9.7 }, { label: "Interlomas", value: 8.3 }
      ],
      cdmxNote: "Disponibilidad de Clase A por zona de la Ciudad de México, 3T 2026. Total Clase A: 18.2% (18.4% un año antes); todas las clases: 16.5%. Absorción neta acumulada: 147,852 m², 77% en Polanco, Reforma y Lomas.",
      /* renta de salida Clase A y total por submercado, US$/m²/mes */
      rents: [
        { label: "Reforma (CDMX)", value: 24.01, a: 29.36 }, { label: "Polanco (CDMX)", value: 23.73, a: 25.94 }, { label: "Puerta de Hierro (Guadalajara)", value: 21.67, a: 21.84 },
        { label: "Nueva Zona Financiera (Guadalajara)", value: 20.77, a: 22.40 }, { label: "Valle Oriente (Monterrey)", value: 20.34, a: 21.52 }, { label: "Santa María (Monterrey)", value: 18.29, a: 18.75 }
      ],
      rentsNote: "Renta de salida promedio del submercado y de la Clase A, en US$ por m² al mes (Solili, 3T 2026). En la CDMX, Cushman & Wakefield reporta US$22.72 ponderado y US$24.06 en Clase A (+4.2% a/a); en Reforma Clase A, US$29.60 (+12.7%)."
    },
    retail: {
      kpis: [
        { label: "Ocupación de centros comerciales Liverpool", value: "94.5%", delta: "93.6% un año antes", dir: "up", note: "30 centros comerciales y 1.04 M m² de área rentable neta a septiembre de 2026.", src: "liverpool", conf: "media" },
        { label: "Ingresos inmobiliarios de Liverpool", value: "+16.3%", delta: "a MXN 1,527 M en el 3T", dir: "up", note: "Fue la división de mayor crecimiento del grupo. Contratos de renta híbridos citados como factor.", src: "liverpool", conf: "media" },
        { label: "Ventas mismas tiendas de Liverpool", value: "+0.8%", delta: "+1.7% en el 2T", dir: "down", note: "Suburbia: −0.5% (−6.4% en el 2T). El consumo en tiendas departamentales se estanca mientras los espacios se rentan bien.", src: "liverpool", conf: "media" },
        { label: "Ingresos inmobiliarios de Palacio de Hierro", value: "+0.4%", delta: "+4.2% enero–septiembre", dir: "flat", note: "No reporta ocupación ni renta por m²; las definiciones de ingreso inmobiliario difieren entre empresas.", src: "palacio", conf: "media" }
      ],
      note: "La cobertura de retail a nivel nacional es limitada: ninguna consultora publicó vacancia y rentas por m² del 3T 2026 que pudiéramos verificar. Se muestran datos de operadores (Liverpool y Palacio de Hierro). FUNO reportó 95.7% de ocupación consolidada en el 2T 2026 (todos sus segmentos)."
    }
  },

  /* ---------- Vivienda ---------- */
  vivienda: {
    kpis: [
      { label: "Precios de vivienda, nacional (2T 2026)", value: "+7.31%", delta: "a/a · 8.57% en el 1T", dir: "down", note: "Índice SHF con crédito hipotecario. El del 3T 2026 aún no estaba disponible al cierre de este reporte.", src: "shf", conf: "alta" },
      { label: "Zona Metropolitana de Guadalajara", value: "+9.99%", delta: "12.29% en el 1T", dir: "down", note: "Jalisco ocupa el 2.º lugar nacional entre los estados (+10.13%).", src: "shf", conf: "alta" },
      { label: "Zona Metropolitana del Valle de México", value: "+4.21%", delta: "a/a, 2T 2026", dir: "flat", note: "La Ciudad de México tiene el menor incremento estatal (+3.40%).", src: "shf", conf: "alta" },
      { label: "Vivienda para el Bienestar", value: "667 mil", delta: "viviendas contratadas (37% de la meta)", dir: "up", note: "277 mil en construcción en 766 proyectos; meta de 1.8 M de viviendas en el sexenio. Cifras oficiales al 14 de septiembre.", src: "bienestar", conf: "media" }
    ],
    /* variación anual del índice SHF por entidad, 2T 2026 (%) */
    states: [
      ["Tamaulipas", 12.47], ["Jalisco", 10.13], ["Aguascalientes", 9.93], ["Quintana Roo", 9.80], ["Nayarit", 9.54], ["Sonora", 9.20], ["Baja California", 8.92], ["Yucatán", 8.69],
      ["Baja California Sur", 8.68], ["Sinaloa", 8.43], ["Hidalgo", 8.30], ["Puebla", 8.30], ["Guanajuato", 8.06], ["Coahuila", 7.86], ["Nuevo León", 7.56], ["Tabasco", 7.52],
      ["Chihuahua", 7.41], ["Michoacán", 7.19], ["Colima", 7.13], ["Chiapas", 7.01], ["Oaxaca", 6.99], ["Campeche", 6.95], ["San Luis Potosí", 6.75], ["Zacatecas", 6.12],
      ["Durango", 6.10], ["Guerrero", 5.58], ["Estado de México", 5.50], ["Veracruz", 5.40], ["Morelos", 5.30], ["Querétaro", 4.87], ["Tlaxcala", 4.56], ["Ciudad de México", 3.40]
    ],
    national: 7.31,
    programs: [
      "Vivienda para el Bienestar: 667 mil viviendas contratadas, 277 mil en construcción y 89 mil asignadas a familias; inversión acumulada de unos MXN 75,076 millones (14 de septiembre de 2026).",
      "Infonavit: 1.3 millones de créditos hipotecarios y de mejoras entre octubre de 2024 y agosto de 2026, por MXN 681 mil millones. La cartera vencida bajó de 29% a 27%.",
      "Fovissste: 321,210 familias beneficiadas con la reestructura de créditos y 59,434 créditos otorgados por MXN 66,047 millones en los dos primeros años."
    ]
  },

  /* ---------- Hotelero y turismo ---------- */
  hotelero: {
    kpis: [
      { label: "Turistas internacionales, ene–ago", value: "32.7 M", delta: "+3.9% a/a", dir: "up", note: "Total de viajeros internacionales (incluye excursionistas): 67.7 M, +6.3%.", src: "sectur", conf: "media" },
      { label: "Derrama de turismo internacional, ene–ago", value: "US$24,152 M", delta: "+0.9% a/a", dir: "flat", note: "Crece tres puntos menos que las llegadas de turistas: más visitantes, menos gasto por visita.", src: "sectur", conf: "media" },
      { label: "Viajeros internacionales, agosto", value: "7.99 M", delta: "+1.3% a/a", dir: "flat", note: "Turistas con pernocta 3.77 M (−0.5%); excursionistas 4.22 M (+3.0%). Gasto medio por viajero US$301.7 (+5.6%).", src: "evi", conf: "media" },
      { label: "Ocupación hotelera en Quintana Roo, septiembre", value: "48.5%", delta: "−10 pts vs. sept. 2025", dir: "down", note: "Mínimo histórico según el sistema estatal SITUR Q. El sector espera una recuperación hacia noviembre.", src: "siturq", conf: "media" }
    ],
    /* ocupación hotelera (%), por plaza y periodo */
    occupancy: [
      { label: "Puerto Vallarta · sep 2026", value: 66.21, src: "hotelOct", note: "Presidente de la asociación hotelera local; −9.3% frente a 2025 y tarifa −9.4%." },
      { label: "Ciudad de México · jun 2026", value: 56.5, src: "hotelJun", note: "ANCH/AMHM; el artículo reporta variaciones distintas (−2.0 y −4.4 pts)." },
      { label: "Guadalajara · jun 2026", value: 56.0, src: "hotelJun", note: "ANCH/AMHM; el artículo reporta −7.0 y −2.4 pts." },
      { label: "Monterrey · jun 2026", value: 53.5, src: "hotelJun", note: "ANCH/AMHM; el artículo reporta −5.8 y −2.7 pts." },
      { label: "Quintana Roo · sep 2026", value: 48.5, src: "siturq", note: "SITUR Q, estimación estatal." }
    ],
    occupancyNote: "No existe una cifra nacional confiable y reciente: DataTur publica por centros turísticos y las demás cifras son de plazas y meses distintos. Por eso se muestran por destino con su fecha, y no son comparables entre sí.",
    airArrivals: [
      { label: "Puerto Vallarta", value: -19.7 }, { label: "Los Cabos", value: -8.0 }, { label: "Cancún", value: -6.1 }
    ],
    airNote: "Llegadas aéreas internacionales de enero a agosto de 2026 frente a 2025 (ANCH, vía UnoTV). El mercado de Estados Unidos cayó 10.2%.",
    supply: [
      "Más de 17,000 cuartos en construcción en el país: Cancún concentra 18% y la Ciudad de México 14% (CBRE, marzo de 2026).",
      "En 2025 se abrieron 6,015 cuartos, frente a 4,200 en 2024; la tarifa diaria de hoteles de lujo y alta gama fue de US$336.39 (+6.1%).",
      "Mundial 2026: las tarifas hoteleras subieron cerca de 40% en junio, pero la ocupación en CDMX, Guadalajara y Monterrey fue menor a la esperada (80–90%)."
    ]
  },

  /* ---------- Lectura Klarock (opinión) ---------- */
  lectura: {
    resumen: [
      { sector: "Industrial", tag: "Normalización", text: "La vacancia subió desde el mínimo de 1.8% de 2023, pero la renta sigue creciendo y la absorción acumulada supera la de 2025. El 84% de los inicios de construcción es especulativo: conviene vigilar cuántos metros se entregan sin inquilino." },
      { sector: "Oficinas", tag: "Recuperación selectiva", text: "La vacancia nacional baja y las rentas de Clase A en Reforma suben, mientras la construcción en la CDMX se contrae. La mejora se concentra en el centro; Santa Fe y el norte siguen con disponibilidad alta." },
      { sector: "Retail", tag: "Rentas firmes, consumo flojo", text: "Los centros comerciales mantienen ocupación alta (94.5% en Liverpool), pero las ventas de tiendas departamentales se estancan. El interés está en formatos híbridos y espacios de experiencia." },
      { sector: "Vivienda", tag: "Precios desacelerando", text: "El incremento nacional bajó de 8.57% a 7.31% y la dispersión es amplia: de 12.47% en Tamaulipas a 3.40% en la Ciudad de México. La oferta pública a gran escala (Bienestar) cambia el segmento de entrada." },
      { sector: "Hotelero", tag: "Volumen sí, gasto y ocupación no", text: "Llegan más visitantes, pero la derrama apenas crece (+0.9%) y los destinos de playa muestran ocupaciones débiles. La oferta en construcción y el aumento previsto del derecho de no residente en 2027 son riesgos a seguir." },
      { sector: "Macro", tag: "Tasas bajando, inflación subiendo", text: "Banxico recortó a 6.25% con voto dividido y anticipa pausa. La inflación repuntó a 3.75% y el peso se ha depreciado, algo que importa para rentas indexadas al dólar y para el costo de construcción." }
    ],
    vigilar: [
      "Índice SHF de precios de vivienda del 3T 2026, que aún no se publica.",
      "Reportes de cierre de año de CBRE, Cushman & Wakefield, Colliers y Solili (diciembre y enero) para confirmar vacancia y rentas.",
      "Cifras de ocupación hotelera de octubre y noviembre (DataTur) y el desenlace del debate sobre el derecho de no residente 2027.",
      "Inflación de noviembre y la siguiente decisión de Banxico."
    ]
  }
};
