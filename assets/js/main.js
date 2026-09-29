/* Meldê · landing behaviour. No dependencies.
   One rAF loop owns every scroll-linked write; reads are cached on resize. */
(() => {
  const doc = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px)');
  doc.classList.add('motion');

  /* ---------- Hero entrance: once, after the product image is ready ---- */
  const hero = document.querySelector('.hero');
  const heroImgs = hero ? [...hero.querySelectorAll('img')] : [];
  const ready = Promise.race([
    Promise.all([document.fonts ? document.fonts.ready : null, ...heroImgs.map(img => img.decode ? img.decode().catch(() => {}) : null)]),
    new Promise(r => setTimeout(r, 1400)),
  ]);
  ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => hero && hero.classList.add('entrou'))));

  /* ---------- Heading reveals ------------------------------------------ */
  const revela = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visto'); revela.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
  document.querySelectorAll('[data-revela]').forEach(el => revela.observe(el));

  /* ---------- Lid band: current panel + nav state ------------------------ */
  const painelTxt = document.querySelector('[data-painel-atual]');
  const painelBox = painelTxt && painelTxt.parentElement;
  const navLinks = [...document.querySelectorAll('.tampa__nav a')];
  let painelAtual = '';
  const setPainel = (section) => {
    const label = section.dataset.painel;
    if (!painelTxt || label === painelAtual) return;
    painelAtual = label;
    painelBox.classList.add('is-trocando');
    setTimeout(() => { painelTxt.textContent = label; painelBox.classList.remove('is-trocando'); }, 180);
    navLinks.forEach(a => a.setAttribute('aria-current', a.hash === '#' + section.id ? 'true' : 'false'));
  };
  const painelObs = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) setPainel(e.target);
  }, { rootMargin: '-38% 0px -58% 0px' });
  document.querySelectorAll('[data-painel]').forEach(s => painelObs.observe(s));

  /* ---------- Moments picker ------------------------------------------- */
  const usos = document.querySelector('[data-usos]');
  if (usos) {
    const rows = [...usos.querySelectorAll('.uso')];
    const imgs = [...usos.querySelectorAll('[data-uso-img]')];
    const ativar = (row) => {
      rows.forEach(r => {
        const on = r === row;
        r.classList.toggle('is-ativo', on);
        r.querySelector('.uso__botao').setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      imgs.forEach(img => img.classList.toggle('is-ativo', img.dataset.usoImg === row.dataset.uso));
    };
    rows.forEach(r => r.querySelector('.uso__botao').addEventListener('click', () => ativar(r)));
    usos.querySelector('.usos__lista').addEventListener('keydown', (e) => {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      const i = rows.findIndex(r => r.contains(document.activeElement));
      if (i < 0) return;
      e.preventDefault();
      const next = rows[(i + (e.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length];
      next.querySelector('.uso__botao').focus();
      ativar(next);
    });
    // On desktop the row crossing the middle of the screen takes the stage.
    const scrollSel = new IntersectionObserver((entries) => {
      if (!desktop.matches) return;
      for (const e of entries) if (e.isIntersecting) ativar(e.target);
    }, { rootMargin: '-46% 0px -46% 0px' });
    rows.forEach(r => scrollSel.observe(r));
  }

  /* ---------- Scroll-linked layer ---------------------------------------- */
  const main = document.querySelector('main');
  const fioSvg = document.querySelector('[data-fio]');
  const fioG = fioSvg && fioSvg.querySelector('.fio__g');
  const fioSobre = document.querySelector('[data-fio-sobre]');
  const NS = 'http://www.w3.org/2000/svg';
  const parallax = [...document.querySelectorAll('[data-parallax]')].map(el => ({
    el,
    target: el.querySelector('img') || el,
    factor: parseFloat(el.dataset.parallax) || 0,
    scale: parseFloat(el.dataset.escala) || (el.classList.contains('janela') ? 1.14 : 1),
    top: 0, h: 0,
  }));
  const lacre = document.querySelector('[data-lacre]');
  const lacreTrilho = lacre && lacre.querySelector('.lacre__trilho');
  const mel = document.querySelector('[data-textura]');
  let vh = innerHeight, mainTop = 0, lacreTop = 0, melTop = 0, melH = 0;
  let fio = null;
  const FIO_PASSO = 6; // px between strand samples

  const pageTop = (el) => el.getBoundingClientRect().top + scrollY;

  function buildFio() {
    if (!fioSvg) return;
    const pts = [...document.querySelectorAll('[data-fio-ponto]')]
      .filter(p => p.offsetParent !== null && getComputedStyle(p).display !== 'none')
      .sort((a, b) => parseFloat(a.dataset.fioPonto) - parseFloat(b.dataset.fioPonto))
      .map(p => { const r = p.getBoundingClientRect(); return [r.left + scrollX, r.top + scrollY - mainTop]; });
    fioG.textContent = '';
    if (pts.length < 2) { fio = null; return; }
    // Catmull-Rom through the anchors, as cubic Béziers: a strand that hangs, never kinks.
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    const H = main.offsetHeight;
    fioSvg.setAttribute('height', H);
    fioSvg.setAttribute('viewBox', `0 0 ${doc.clientWidth} ${H}`);
    const mk = (parent, tag, attrs) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      parent.appendChild(e);
      return e;
    };
    const guia = mk(fioG, 'path', { d, visibility: 'hidden' });
    const length = guia.getTotalLength();

    // Sample the centreline; honey is thick where it leaves the spoon, thins as it
    // falls and necks slightly, like a real strand under its own weight.
    const big = desktop.matches;
    const w0 = big ? 18 : 10, wmin = big ? 7.5 : 4.2;
    const N = Math.max(2, Math.ceil(length / FIO_PASSO) + 1);
    const P = new Array(N);
    for (let i = 0; i < N; i++) {
      const s = Math.min(length, i * FIO_PASSO);
      const q = guia.getPointAtLength(s);
      P[i] = { x: q.x, y: q.y, s };
    }
    // On phones the margin is too narrow for a strand to travel the whole page
    // without reading as a scroll bar: it drips out of the hero, thins to nothing,
    // and falls again into the final spoon.
    const sAt = (sel) => {
      const el = document.querySelector(sel);
      if (!el || el.offsetParent === null) return null;
      const r = el.getBoundingClientRect(), x = r.left + scrollX, y = r.top + scrollY - mainTop;
      let best = 0, bd = Infinity;
      for (const p of P) { const dd = (p.x - x) ** 2 + (p.y - y) ** 2; if (dd < bd) { bd = dd; best = p.s; } }
      return best;
    };
    const pausaA = big ? null : sAt('[data-fio-pausa="inicio"]');
    const pausaB = big ? null : sAt('[data-fio-pausa="fim"]');
    const vis = (s) => (pausaA === null || pausaB === null) ? 1
      : s <= pausaA ? Math.min(1, (pausaA - s) / 160)
      : s >= pausaB ? Math.min(1, (s - pausaB) / 160) : 0;
    for (let i = 0; i < N; i++) {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(N - 1, i + 1)];
      let tx = b.x - a.x, ty = b.y - a.y;
      const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
      let nx = -ty, ny = tx;
      if (nx > 0) { nx = -nx; ny = -ny; } // normal facing the key light (upper left)
      const s = P[i].s, v = vis(s);
      const w = (wmin + (w0 - wmin) * Math.exp(-s / 420)) * (1 + 0.16 * Math.sin(s / 170 + 0.7) * (1 - Math.exp(-s / 260))) * v;
      Object.assign(P[i], { nx, ny, w, v });
    }
    const aro = big ? 2.4 : 1.6; // darker amber rim: keeps the strand legible even on the gold panel
    const poly = (a, b, extra) => {
      let l = '', r = '', open = false;
      for (let i = a; i <= b; i++) {
        const p = P[i];
        if (p.v <= 0) continue;
        const h = (p.w + extra * p.v) / 2;
        l += `${open ? 'L' : 'M'}${(p.x + p.nx * h).toFixed(1)} ${(p.y + p.ny * h).toFixed(1)}`;
        r = `L${(p.x - p.nx * h).toFixed(1)} ${(p.y - p.ny * h).toFixed(1)}` + r;
        open = true;
      }
      return open ? l + r + 'Z' : '';
    };
    const linha = (a, b, k) => {
      let d = '', open = false;
      for (let i = a; i <= b; i++) {
        const p = P[i];
        if (p.v < 0.35) { open = false; continue; }
        d += `${open ? 'L' : 'M'}${(p.x + p.nx * p.w * k).toFixed(1)} ${(p.y + p.ny * p.w * k).toFixed(1)}`;
        open = true;
      }
      return d;
    };
    const gAro = mk(fioG, 'g', { fill: '#A8661A' });
    const gCorpo = mk(fioG, 'g', { fill: '#E5A52A' });
    const gBrilho = mk(fioG, 'g', { fill: 'none', stroke: '#F2CF7E', 'stroke-width': (wmin * 0.42).toFixed(2), 'stroke-linecap': 'round' });
    const gReflexo = mk(fioG, 'g', { fill: 'none', stroke: '#FFF8E6', 'stroke-width': big ? 1.6 : 1.1, 'stroke-linecap': 'round', opacity: 0.9 });
    const gotaAro = mk(fioG, 'circle', { fill: '#A8661A', r: 0 });
    const gota = mk(fioG, 'circle', { fill: '#E5A52A', r: 0 });
    const gotaLuz = mk(fioG, 'circle', { fill: '#FFF8E6', r: 0 });
    const chunks = [];
    for (let a = 0; a < N - 1; a += 40) {
      chunks.push({ a, b: Math.min(a + 42, N - 1), aro: mk(gAro, 'path', {}), corpo: mk(gCorpo, 'path', {}), brilho: mk(gBrilho, 'path', {}), reflexo: mk(gReflexo, 'path', {}), estado: 0 });
    }

    // Where the strand reaches the final spoon it is drawn over the photo,
    // clipped to the photo's window, so the bead lands on the spoon.
    if (fioSobre) {
      fioSobre.setAttribute('height', H);
      fioSobre.setAttribute('viewBox', `0 0 ${doc.clientWidth} ${H}`);
      const clip = fioSobre.querySelector('clipPath');
      clip.textContent = '';
      document.querySelectorAll('[data-fio-sobre-alvo]').forEach(el => {
        const r = el.getBoundingClientRect();
        const rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        mk(clip, 'rect', { x: r.left + scrollX, y: r.top + scrollY - mainTop, width: r.width, height: r.height, rx: rad });
      });
    }
    fio = { P, N, length, poly, linha, aro, chunks, gota, gotaAro, gotaLuz, big, k: -1 };
  }

  function drawFio(L) {
    const f = fio;
    const k = Math.max(0, Math.min(f.N - 1, Math.round(L / FIO_PASSO)));
    if (k === f.k) return;
    f.k = k;
    const set = (c, b) => {
      c.aro.setAttribute('d', f.poly(c.a, b, f.aro));
      c.corpo.setAttribute('d', f.poly(c.a, b, 0));
      c.brilho.setAttribute('d', f.linha(c.a, b, 0.17));
      c.reflexo.setAttribute('d', f.linha(c.a, b, 0.27));
    };
    for (const c of f.chunks) {
      if (c.b <= k) {
        if (c.estado !== 2) { set(c, c.b); c.estado = 2; }
      } else if (c.a < k) {
        set(c, k); c.estado = 1;
      } else if (c.estado !== 0) {
        ['aro', 'corpo', 'brilho', 'reflexo'].forEach(n => c[n].setAttribute('d', ''));
        c.estado = 0;
      }
    }
    // the gathered bead at the tip, hanging slightly below the strand
    const p = f.P[k];
    const r = k > 2 && p.v > 0.5 ? p.w * 0.62 + (f.big ? 1.6 : 1) : 0;
    const cy = p.y + r * 0.3;
    f.gotaAro.setAttribute('cx', p.x); f.gotaAro.setAttribute('cy', cy); f.gotaAro.setAttribute('r', r ? r + f.aro / 2 : 0);
    f.gota.setAttribute('cx', p.x); f.gota.setAttribute('cy', cy); f.gota.setAttribute('r', r);
    f.gotaLuz.setAttribute('cx', p.x - r * 0.34); f.gotaLuz.setAttribute('cy', cy - r * 0.36); f.gotaLuz.setAttribute('r', r * 0.26);
  }

  function measure() {
    vh = innerHeight;
    mainTop = pageTop(main);
    parallax.forEach(p => {
      p.target.style.transform = '';
      const r = p.el.getBoundingClientRect();
      p.top = r.top + scrollY; p.h = r.height;
    });
    if (lacre) lacreTop = pageTop(lacre);
    if (mel) { melTop = pageTop(mel); melH = mel.offsetHeight; }
    buildFio();
  }

  function frame() {
    ticking = false;
    const y = scrollY;
    const still = reduce.matches;

    for (const p of parallax) {
      const off = still ? 0 : (y + vh / 2 - (p.top + p.h / 2)) * p.factor;
      p.target.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)` + (p.scale !== 1 ? ` scale(${p.scale})` : '');
    }

    if (lacreTrilho) {
      const x = still ? 0 : -((y + vh - lacreTop) * 0.22) % (lacreTrilho.scrollWidth / 2);
      lacreTrilho.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    }

    if (mel && !still) {
      const t = Math.min(1, Math.max(0, (y + vh - melTop) / (vh + melH)));
      mel.style.setProperty('--tex-y', `${(20 + t * 60).toFixed(1)}%`);
    }

    if (fio) {
      let L = fio.length;
      if (!still) {
        // the bead rides just above the bottom of the screen, always ahead of the reader
        const tip = y + vh * 0.86 - mainTop;
        L = 0;
        for (const p of fio.P) { if (p.y <= tip) L = p.s; else break; }
      }
      drawFio(L);
    }
  }

  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  let resizeT;
  const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(() => { measure(); frame(); }, 120); };

  const start = () => { measure(); frame(); };
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);
  reduce.addEventListener('change', () => frame());
  // images below the fold are lazy: re-measure when late layout settles
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(main);

  /* ---------- Waitlist ------------------------------------------------- */
  const form = document.querySelector('[data-lista]');
  if (form) {
    const nome = form.querySelector('#nome');
    const contato = form.querySelector('#contato');
    const status = form.querySelector('.lista__status');
    const botao = form.querySelector('.lista__enviar');
    const rotulo = botao.querySelector('[data-rotulo]');
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const foneOk = (v) => v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 13;
    const checar = (input, ok) => {
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (ok) input.removeAttribute('aria-describedby');
      else input.setAttribute('aria-describedby', input.id + '-erro');
      return ok;
    };
    const validar = () => {
      const a = checar(nome, nome.value.trim().length >= 2);
      const v = contato.value.trim();
      const b = checar(contato, emailOk(v) || foneOk(v));
      return a && b;
    };
    [nome, contato].forEach(i => i.addEventListener('blur', () => { if (i.value) validar(); }));
    [nome, contato].forEach(i => i.addEventListener('input', () => { if (i.getAttribute('aria-invalid') === 'true') validar(); }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      if (!validar()) {
        (nome.getAttribute('aria-invalid') === 'true' ? nome : contato).focus();
        return;
      }
      const dados = { nome: nome.value.trim(), contato: contato.value.trim(), origem: 'landing', quando: new Date().toISOString() };
      botao.classList.add('is-carregando');
      botao.setAttribute('aria-disabled', 'true');
      rotulo.textContent = 'Enviando';
      try {
        const endpoint = form.dataset.endpoint;
        if (endpoint) {
          const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(dados) });
          if (!r.ok) throw new Error('http ' + r.status);
        } else {
          // No endpoint configured yet: keep the sign-up on this device so nothing is lost in tests.
          const fila = JSON.parse(localStorage.getItem('melde-lista') || '[]');
          fila.push(dados);
          localStorage.setItem('melde-lista', JSON.stringify(fila));
        }
        form.classList.add('is-enviado');
        const ok = document.createElement('p');
        ok.className = 'lista__ok';
        ok.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-ok"/></svg><span></span>';
        ok.querySelector('span').textContent = `Pronto, ${dados.nome.split(' ')[0]}. Você está na lista: assim que tiver Meldê, a gente avisa.`;
        form.prepend(ok);
        status.textContent = 'Inscrição confirmada.';
      } catch (err) {
        status.textContent = 'Não conseguimos enviar agora. Confere sua conexão e tenta de novo.';
      } finally {
        botao.classList.remove('is-carregando');
        botao.removeAttribute('aria-disabled');
        rotulo.textContent = 'Quero Meldê';
      }
    });
  }
})();
