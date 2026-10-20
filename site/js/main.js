/* Abdelrahman Elsofany: portfolio motion.
   Each section's motion borrows a mechanism from the work it presents. */
(() => {
  'use strict';

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs = {}) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  const onView = (el, cb, opts = { threshold: 0.45 }) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); } });
    }, opts);
    io.observe(el);
  };
  // mulberry32, so the noise field is the same on every visit
  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  /* ------------------------------------------------------------------
     Nav
  ------------------------------------------------------------------ */
  const nav = $('[data-nav]');
  const onScrollNav = () => nav.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });

  const navLinks = $$('.nav__links a');
  const secIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === '#' + e.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['ventures', 'products', 'diadose', 'research', 'about', 'contact'].forEach((id) => { const s = document.getElementById(id); if (s) secIO.observe(s); });

  /* ------------------------------------------------------------------
     Statement: one attention head over the sentence
  ------------------------------------------------------------------ */
  (() => {
    const wrap = $('[data-attention]');
    if (!wrap) return;
    const svg = $('.statement__arcs', wrap);
    const toks = Object.fromEntries($$('b[data-tok]', wrap).map((b) => [b.dataset.tok, b]));
    const A = {
      problem: { cash: 0.8, queue: 0.78, repair: 0.76, meal: 0.74 },
      model: { AI: 0.92, problem: 0.35, meal: 0.3 },
      cash: { price: 0.84, problem: 0.62, market: 0.4 },
      queue: { problem: 0.72, market: 0.6, AI: 0.35 },
      repair: { problem: 0.7, market: 0.66, price: 0.4 },
      meal: { AI: 0.76, problem: 0.6, model: 0.4 },
      AI: { model: 0.9, problem: 0.7, market: 0.32 },
      price: { cash: 0.82, market: 0.86, problem: 0.3 },
      market: { price: 0.84, problem: 0.62, AI: 0.4 },
    };
    const cycle = ['problem', 'price', 'AI', 'market', 'model'];
    let ci = 0, timer = 0, userHold = false, current = null;

    function show(q) {
      current = q;
      svg.textContent = '';
      Object.values(toks).forEach((b) => { b.classList.remove('is-query', 'is-key'); b.style.removeProperty('--w'); });
      if (!q) return;
      const box = wrap.getBoundingClientRect();
      const qb = toks[q]; qb.classList.add('is-query');
      const qr = qb.getBoundingClientRect();
      const x1 = qr.left + qr.width / 2 - box.left, y1 = qr.top - box.top + 4;
      const entries = Object.entries(A[q]).sort((a, b) => b[1] - a[1]);
      entries.forEach(([k, w], i) => {
        const kb = toks[k]; kb.classList.add('is-key'); kb.style.setProperty('--w', w);
        const kr = kb.getBoundingClientRect();
        const x2 = kr.left + kr.width / 2 - box.left, y2 = kr.top - box.top + 4;
        const h = Math.min(140, 26 + Math.abs(x2 - x1) * 0.22 + Math.abs(y2 - y1) * 0.15);
        const top = Math.min(y1, y2) - h;
        const p = svgEl('path', {
          d: `M${x1} ${y1} C${x1} ${top}, ${x2} ${top}, ${x2} ${y2}`,
          'stroke-width': (0.8 + w * 3.2).toFixed(2), opacity: (0.25 + w * 0.75).toFixed(2),
        });
        svg.appendChild(p);
        if (!RM) {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
          p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 700, delay: i * 90, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
        }
      });
    }
    const auto = () => {
      clearInterval(timer);
      if (RM) { show('problem'); return; }
      timer = setInterval(() => { if (!userHold) { ci = (ci + 1) % cycle.length; show(cycle[ci]); } }, 2800);
    };
    Object.entries(toks).forEach(([k, b]) => {
      b.addEventListener('pointerenter', () => { userHold = true; show(k); });
      b.addEventListener('click', () => { userHold = true; show(k); });
    });
    wrap.addEventListener('pointerleave', () => { userHold = false; });
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { show(cycle[ci]); auto(); } else { clearInterval(timer); }
    }, { threshold: 0.4 }).observe(wrap);
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => current && show(current), 150); });
  })();

  /* ------------------------------------------------------------------
     DiaDose: scroll drives the stage through the pipeline
  ------------------------------------------------------------------ */
  (() => {
    const stage = $('[data-dd-stage]');
    if (!stage) return;

    // 1. all 101 Food-101 classes
    const FOOD101 = 'apple_pie baby_back_ribs baklava beef_carpaccio beef_tartare beet_salad beignets bibimbap bread_pudding breakfast_burrito bruschetta caesar_salad cannoli caprese_salad carrot_cake ceviche cheese_plate cheesecake chicken_curry chicken_quesadilla chicken_wings chocolate_cake chocolate_mousse churros clam_chowder club_sandwich crab_cakes creme_brulee croque_madame cup_cakes deviled_eggs donuts dumplings edamame eggs_benedict escargots falafel filet_mignon fish_and_chips foie_gras french_fries french_onion_soup french_toast fried_calamari fried_rice frozen_yogurt garlic_bread gnocchi greek_salad grilled_cheese_sandwich grilled_salmon guacamole gyoza hamburger hot_and_sour_soup hot_dog huevos_rancheros hummus ice_cream lasagna lobster_bisque lobster_roll_sandwich macaroni_and_cheese macarons miso_soup mussels nachos omelette onion_rings oysters pad_thai paella pancakes panna_cotta peking_duck pho pizza pork_chop poutine prime_rib pulled_pork_sandwich ramen ravioli red_velvet_cake risotto samosa sashimi scallops seaweed_salad shrimp_and_grits spaghetti_bolognese spaghetti_carbonara spring_rolls steak strawberry_shortcake sushi tacos takoyaki tiramisu tuna_tartare waffles'.split(' ');
    const TOP = ['falafel', 'hummus', 'samosa', 'takoyaki', 'dumplings'];
    const classesEl = $('[data-classes]');
    const spans = FOOD101.map((c) => {
      const s = document.createElement('span');
      s.textContent = c.replace(/_/g, ' ');
      s.dataset.c = c;
      classesEl.appendChild(s);
      return s;
    });
    let recogTimers = [];
    function runRecognise() {
      recogTimers.forEach(clearTimeout); recogTimers = [];
      spans.forEach((s) => s.classList.remove('is-off', 'is-top'));
      const rest = spans.filter((s) => !TOP.includes(s.dataset.c)).sort(() => Math.random() - 0.5);
      const batch = RM ? rest.length : 8;
      for (let i = 0; i < rest.length; i += batch) {
        recogTimers.push(setTimeout(() => rest.slice(i, i + batch).forEach((s) => s.classList.add('is-off')), RM ? 0 : 60 + i * 7));
      }
      recogTimers.push(setTimeout(() => spans.filter((s) => TOP.includes(s.dataset.c)).forEach((s) => s.classList.add('is-top')), RM ? 0 : 760));
    }

    // 2. nutrient count-up
    const counts = $$('[data-count]', stage);
    function runEstimate() {
      counts.forEach((el) => {
        const to = +el.dataset.count;
        if (RM) { el.textContent = to; return; }
        const t0 = performance.now();
        const tick = (now) => {
          const p = clamp((now - t0) / 1100, 0, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * e);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }

    // 3. dose calculator: the base formula from the DiaDose engine
    const form = $('[data-dose]');
    const out = (k) => $(`[data-out="${k}"]`, form);
    const math = (k) => $(`[data-math="${k}"]`, form);
    const fmt = (n) => (Math.round(n * 10) / 10).toFixed(1);
    function updateDose() {
      const carbs = +form.carbs.value, bg = +form.bg.value;
      const ICR = 15, ISF = 40, TARGET = 110, MAX = 20;
      const meal = carbs / ICR;
      const corr = Math.max(0, (bg - TARGET - 30) / ISF);
      const total = Math.min(MAX, meal + corr);
      out('carbs').textContent = `${carbs} g`;
      out('bg').textContent = `${bg} mg/dL`;
      math('meal').textContent = `${carbs} ÷ ${ICR} = ${fmt(meal)}`;
      math('corr').textContent = bg - TARGET - 30 > 0 ? `(${bg} − ${TARGET} − 30) ÷ ${ISF} = ${fmt(corr)}` : `${bg} is within range, so 0.0`;
      math('total').textContent = fmt(total);
      math('total').parentElement.classList.toggle('is-capped', meal + corr > MAX);
      [form.carbs, form.bg].forEach((r) => r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min)) * 100 + '%'));
    }
    form.addEventListener('input', updateDose);
    updateDose();

    // 4. forecast chart: illustrative 24h curve, three models blending into the ensemble
    const fc = $('[data-forecast]');
    const X0 = 34, X1 = 390, Y = (mg) => 220 - ((mg - 40) / (300 - 40)) * 205;
    const Xh = (h) => X0 + (h / 24) * (X1 - X0);
    const g = (h, c, w, a) => a * Math.exp(-((h - c) ** 2) / (2 * w * w));
    const ens = (h) => 118 + g(h, 6, 1.2, 18) + g(h, 8.6, 1.1, 54) + g(h, 14.2, 1.4, 66) + g(h, 20.4, 1.3, 44) - g(h, 3, 1.6, 14);
    const series = (fn) => { const pts = []; for (let h = 0; h <= 24.001; h += 0.25) pts.push([Xh(h), Y(fn(h))]); return pts; };
    const d = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    const ensPts = series(ens);
    $('.fc__ens', fc).setAttribute('d', d(ensPts));
    $('.fc__m--a', fc).setAttribute('d', d(series((h) => ens(h) + 9 * Math.sin(h * 0.9) + 4)));
    $('.fc__m--b', fc).setAttribute('d', d(series((h) => ens(h) - 7 * Math.sin(h * 0.7 + 1) - 3)));
    $('.fc__m--c', fc).setAttribute('d', d(series((h) => ens(h) + 11 * Math.cos(h * 0.55))));
    const up = series((h) => ens(h) + 8 + h * 0.9), lo = series((h) => ens(h) - 8 - h * 0.9).reverse();
    $('.fc__band', fc).setAttribute('d', d(up) + d(lo).replace('M', 'L') + 'Z');
    const tgt = $('.fc__target', fc);
    tgt.setAttribute('y', Y(180)); tgt.setAttribute('height', Y(70) - Y(180));
    const grid = $('.fc__grid', fc), axis = $('.fc__axis', fc);
    [70, 180, 250].forEach((mg) => {
      grid.appendChild(svgEl('line', { x1: X0, x2: X1, y1: Y(mg), y2: Y(mg) }));
      const t = svgEl('text', { x: 0, y: Y(mg) + 3 }); t.textContent = mg; axis.appendChild(t);
    });
    [[0, 'now'], [6, '+6h'], [12, '+12h'], [18, '+18h'], [24, '+24h']].forEach(([h, l]) => {
      const t = svgEl('text', { x: Xh(h), y: 238, 'text-anchor': h === 0 ? 'start' : h === 24 ? 'end' : 'middle' }); t.textContent = l; axis.appendChild(t);
    });
    function runForecast() {
      if (RM) return;
      $$('.fc__m, .fc__ens', fc).forEach((p, i) => {
        const len = p.getTotalLength();
        p.animate([{ strokeDasharray: `0 ${len}` }, { strokeDasharray: `${len} 0` }], { duration: i === 3 ? 1500 : 1100, delay: i === 3 ? 700 : i * 120, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards' });
      });
      $('.fc__band', fc).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 1500, fill: 'backwards' });
    }

    const runs = { 1: runRecognise, 2: runEstimate, 4: runForecast };
    let state = 0;
    const setState = (s) => {
      if (s === state) return;
      state = s; stage.dataset.state = String(s);
      runs[s] && runs[s]();
    };
    const steps = $$('[data-dd-step]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setState(+e.target.dataset.ddStep); });
    }, { rootMargin: matchMedia('(max-width: 960px)').matches ? '-70% 0px -12% 0px' : '-48% 0px -48% 0px' });
    steps.forEach((s) => io.observe(s));
    onView(stage, () => { if (!state) setState(1); }, { threshold: 0.3 });
  })();

  /* ------------------------------------------------------------------
     Majlis: the council debates
  ------------------------------------------------------------------ */
  (() => {
    const root = $('[data-council]');
    if (!root) return;
    const seatsG = $('.council__seats', root), linksG = $('.council__links', root);
    const claim = $('[data-claim]', root), verdict = $('[data-verdict]', root);
    const ARC = [
      ['Teacher', 'T'], ['Analyst', 'A'], ['Dealmaker', 'D'], ['Skeptic', 'S'],
      ['Risk officer', 'R'], ['Legal & tax', 'L'], ['Auditor', 'Au'],
    ];
    const CX = 260, CY = 262, R = 206;
    const seats = {};
    ARC.forEach(([name, g], i) => {
      const th = Math.PI + (Math.PI * (i + 0.5)) / ARC.length;
      seats[name] = { x: CX + R * Math.cos(th) * 1.08, y: CY + R * Math.sin(th) * 0.9 };
    });
    seats.Chair = { x: CX, y: 214 };
    const gl = { Chair: 'C' }; ARC.forEach(([n, g]) => (gl[n] = g));
    const nodes = {};
    Object.entries(seats).forEach(([name, p]) => {
      const grp = svgEl('g', { class: 'seat', transform: `translate(${p.x} ${p.y})` });
      grp.appendChild(svgEl('circle', { class: 'seat__pulse', r: 24 }));
      grp.appendChild(svgEl('circle', { class: 'seat__ring', r: 24 }));
      const t = svgEl('text', { class: 'seat__glyph', y: 5 }); t.textContent = gl[name]; grp.appendChild(t);
      const short = { 'Risk officer': 'Risk', 'Legal & tax': 'Legal', Dealmaker: 'Deals' };
      const l = svgEl('text', { y: 44 });
      l.textContent = matchMedia('(max-width: 600px)').matches ? short[name] || name : name;
      grp.appendChild(l);
      seatsG.appendChild(grp);
      nodes[name] = grp;
    });
    const curve = (a, b, bend = 0.25) => {
      const A = seats[a], B = seats[b];
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      const qx = mx + (CX - mx) * bend, qy = my + (CY - 40 - my) * bend;
      return svgEl('path', { d: `M${A.x} ${A.y} Q${qx} ${qy} ${B.x} ${B.y}` });
    };
    const debate = [['Skeptic', 'Analyst'], ['Skeptic', 'Dealmaker'], ['Risk officer', 'Dealmaker'], ['Legal & tax', 'Dealmaker'], ['Analyst', 'Risk officer'], ['Skeptic', 'Risk officer']];
    const debateEls = debate.map(([a, b]) => linksG.appendChild(curve(a, b, 0.5)));
    const toChair = ARC.map(([n]) => linksG.appendChild(curve(n, 'Chair', 0.1)));
    const auditLink = linksG.appendChild(svgEl('path', { d: `M${seats.Auditor.x} ${seats.Auditor.y + 30} Q${seats.Auditor.x - 10} ${318} ${CX + 130} ${322}` }));

    const set = (el, cls, on) => el.classList.toggle(cls, on);
    function reset() {
      if (window.gsap) gsap.set(Object.values(nodes), { scale: 1 });
      Object.values(nodes).forEach((n) => { n.classList.remove('is-on', 'is-dissent'); });
      [...debateEls, ...toChair, auditLink].forEach((p) => { p.style.opacity = 0; });
      claim.classList.remove('is-struck');
    }
    function finalState() {
      reset();
      Object.values(nodes).forEach((n) => n.classList.add('is-on'));
      nodes['Risk officer'].classList.add('is-dissent');
      claim.style.opacity = 1; claim.classList.add('is-struck');
      verdict.style.opacity = 1;
    }
    if (RM || !window.gsap) { finalState(); $('[data-council-replay]').hidden = true; return; }

    const draw = (p) => { const len = p.getTotalLength(); return { strokeDasharray: len, strokeDashoffset: len, opacity: 0.55 }; };
    let tl;
    function play() {
      tl && tl.kill();
      reset();
      gsap.set(verdict, { opacity: 0, y: 24 });
      gsap.set(claim, { opacity: 0, y: 10 });
      tl = gsap.timeline();
      tl.from(Object.values(nodes), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)', stagger: 0.05 });
      // each advisor answers alone first
      const order = ['Analyst', 'Risk officer', 'Teacher', 'Legal & tax', 'Dealmaker', 'Auditor', 'Skeptic'];
      order.forEach((n, i) => {
        tl.call(() => set(nodes[n], 'is-on', true), null, 0.7 + i * 0.16);
        tl.fromTo(nodes[n].querySelector('.seat__pulse'), { attr: { r: 24 }, opacity: 0.9 }, { attr: { r: 44 }, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.7 + i * 0.16);
      });
      // then they challenge each other
      debateEls.forEach((p, i) => {
        tl.set(p, draw(p), 2.0 + i * 0.12);
        tl.to(p, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 2.0 + i * 0.12);
      });
      // a claim without a source gets removed
      tl.to(claim, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.6);
      tl.set(auditLink, draw(auditLink), 3.2);
      tl.to(auditLink, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 3.2);
      tl.call(() => claim.classList.add('is-struck'), null, 3.7);
      tl.to(debateEls, { opacity: 0.12, duration: 0.6 }, 4.2);
      tl.to([auditLink, claim], { opacity: 0, duration: 0.5 }, 4.6);
      // the Chair weighs it and names the dissent
      toChair.forEach((p, i) => {
        tl.set(p, draw(p), 4.5 + i * 0.05);
        tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 4.5 + i * 0.05);
      });
      tl.call(() => { set(nodes.Chair, 'is-on', true); set(nodes['Risk officer'], 'is-dissent', true); }, null, 5.0);
      tl.fromTo(nodes.Chair.querySelector('.seat__pulse'), { attr: { r: 24 }, opacity: 1 }, { attr: { r: 60 }, opacity: 0, duration: 0.9, ease: 'power2.out' }, 5.0);
      tl.to(toChair, { opacity: 0.18, duration: 0.6 }, 5.4);
      tl.to(verdict, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 5.3);
    }
    onView(root, play, { threshold: 0.5 });
    $('[data-council-replay]').addEventListener('click', play);
  })();


  /* ------------------------------------------------------------------
     Ventures: every product sorted by who it sells to and how far along
     it is. On first view the pills start as one unsorted cluster and
     segment out to their positions.
  ------------------------------------------------------------------ */
  (() => {
    const root = $('[data-market]');
    if (!root) return;
    const field = $('[data-field]', root), probe = $('.market__probe', root), detail = $('[data-detail]', root);
    const P = [
      { id: 'majlis', name: 'Majlis', v: 'aom', x: 0.06, r: 1, stage: 'Beta', who: 'Egyptian founders and SMEs (B2B)', earns: 'Monthly plans in Egyptian pounds, from a free tier to the full council', href: 'https://majlis-eg.vercel.app' },
      { id: 'line', name: 'InTheLine', v: 'itl', x: 0.34, xm: 0.52, r: 1, stage: 'Pilots with cafés', who: 'Café owners and chains (B2B)', earns: 'Monthly subscription per branch, no hardware' },
      { id: 'bone', name: 'Bone Guard', v: 'aom', x: 0.08, r: 3, stage: 'Research prototype', who: 'Specialists reviewing bone X-rays (B2B)', earns: 'Not sold yet. It flags osteosarcoma with an AUC of 0.99 and writes a report for review' },
      { id: 'osta', name: 'Osta', v: 'aom', x: 0.5, r: 2, stage: 'In development', who: 'Homeowners and craftsmen (two-sided marketplace)', earns: 'Open bidding: homeowners post a job, verified craftsmen compete on price' },
      { id: 'diadose', name: 'DiaDose', v: 'aom', x: 0.7, r: 3, stage: 'Published research', who: 'People with diabetes (B2C)', earns: 'Not sold. A research platform built as a full product, with accounts, a dashboard and 18+ APIs' },
      { id: 'uai', name: 'U.ai', v: 'aom', x: 0.86, r: 2, stage: 'Early build', who: 'People carrying something big on their own (B2C)', earns: 'Consumer app, pricing still being tested' },
      { id: 'goose', name: 'Saving Goose', v: 'aom', x: 0.96, r: 0, stage: 'Live', who: 'Anyone living on a monthly budget (B2C)', earns: 'Free, with no ads, accounts or servers', href: 'https://saving-goose.vercel.app' },
    ];
    const V = { aom: 'AOM Tech', itl: 'InTheLine' };
    const buttons = P.map((p) => {
      const pos = document.createElement('span');
      pos.className = 'mk-pos';
      pos.style.setProperty('--x', p.x); pos.style.setProperty('--r', p.r);
      if (p.xm != null) pos.style.setProperty('--xm', p.xm);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mk'; b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `${p.name}, ${V[p.v]}, ${p.stage}`);
      b.innerHTML = `<i class="dot dot--${p.v}" aria-hidden="true"></i>${p.name}`;
      pos.appendChild(b); field.appendChild(pos);
      b.addEventListener('click', () => pick(p, b));
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pick(p, b); });
      b.addEventListener('focus', () => pick(p, b));
      return b;
    });
    const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    function pick(p, b) {
      root.classList.add('has-pick');
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const f = field.getBoundingClientRect(), r = b.getBoundingClientRect();
      probe.style.left = `${r.left + r.width / 2 - f.left}px`;
      probe.style.top = `${r.bottom - f.top}px`;
      detail.innerHTML = `<p class="md__venture">${V[p.v]}</p><h4 class="md__name">${esc(p.name)}</h4>
        <dl class="md__list"><div><dt>Who it's for</dt><dd>${esc(p.who)}</dd></div><div><dt>How it earns</dt><dd>${esc(p.earns)}</dd></div><div><dt>Stage</dt><dd>${esc(p.stage)}${p.href ? ` <a class="link" href="${p.href}" target="_blank" rel="noopener">Open</a>` : ''}</dd></div></dl>`;
    }
    addEventListener('resize', () => { const b = buttons.find((x) => x.getAttribute('aria-pressed') === 'true'); if (b) pick(P[buttons.indexOf(b)], b); });

    const settle = () => pick(P[0], buttons[0]);
    if (RM || !window.gsap) { settle(); return; }
    root.classList.add('is-pending');
    gsap.set(buttons, { opacity: 0 });
    onView(root, () => {
      root.classList.remove('is-pending');
      const f = field.getBoundingClientRect(), cx = f.left + f.width / 2, cy = f.top + f.height / 2;
      const tl = gsap.timeline({ onComplete: settle });
      buttons.forEach((b, i) => {
        const r = b.getBoundingClientRect();
        const dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
        // start as one tight unsorted cluster
        tl.fromTo(b, { x: dx + (i % 3 - 1) * 14, y: dy + ((i * 7) % 5 - 2) * 9, opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, i * 0.04);
        tl.to(b, { x: 0, y: 0, duration: 1.1, ease: 'expo.inOut' }, 0.55 + i * 0.06);
      });
    }, { threshold: 0.35 });
  })();

  /* ------------------------------------------------------------------
     Product specimens: each plays once in view, replays on hover
  ------------------------------------------------------------------ */
  (() => {
    // Saving Goose: ten golden eggs crack as the month's budget is spent
    const eggsEl = $('.eggs');
    const spentEl = $('[data-goose-spent]');
    const cracks = ['M10 14 l4 4 -3 3 5 4 -2 4', 'M8 18 l5 2 -2 4 6 2', 'M12 12 l-2 5 4 2 -3 5 3 3', 'M9 16 l4 3 1 -3 4 5 -1 4'];
    const eggs = Array.from({ length: 10 }, (_, i) => {
      const s = svgEl('svg', { viewBox: '0 0 24 30', class: 'egg' });
      s.appendChild(svgEl('path', { class: 'shell', d: 'M12 1C5.8 1 1.5 10.4 1.5 18.2 1.5 24.5 6.2 29 12 29s10.5-4.5 10.5-10.8C22.5 10.4 18.2 1 12 1z' }));
      s.appendChild(svgEl('path', { class: 'crack', d: cracks[i % cracks.length] }));
      eggsEl.appendChild(s);
      return s;
    });
    let gooseRaf;
    function goose() {
      cancelAnimationFrame(gooseRaf);
      eggs.forEach((e) => e.classList.remove('is-cracked'));
      const to = 6120, t0 = performance.now();
      if (RM) { spentEl.textContent = to.toLocaleString('en-US'); eggs.slice(0, 6).forEach((e) => e.classList.add('is-cracked')); return; }
      const tick = (now) => {
        const p = clamp((now - t0) / 2200, 0, 1), v = Math.round(to * (1 - Math.pow(1 - p, 2)));
        spentEl.textContent = v.toLocaleString('en-US');
        eggs.forEach((e, i) => e.classList.toggle('is-cracked', v >= (i + 1) * 1000));
        if (p < 1) gooseRaf = requestAnimationFrame(tick);
      };
      gooseRaf = requestAnimationFrame(tick);
    }

    // InTheLine: preparing, then the customer's phone rings, then seen
    const ticket = $('.ticket');
    let lineT = [];
    function line() {
      lineT.forEach(clearTimeout);
      if (RM) { ticket.dataset.s = '1'; return; }
      ticket.dataset.s = '0';
      lineT = [setTimeout(() => (ticket.dataset.s = '1'), 1200), setTimeout(() => (ticket.dataset.s = '2'), 3600)];
    }

    // Osta: three quotes arrive, the homeowner picks one
    const osta = $('.spec--osta');
    let ostaT;
    function quotes() {
      clearTimeout(ostaT);
      const q = $$('.quote', osta);
      q.forEach((x) => x.classList.remove('is-picked'));
      osta.classList.remove('is-in');
      void osta.offsetWidth;
      osta.classList.add('is-in');
      ostaT = setTimeout(() => q[1].classList.add('is-picked'), RM ? 0 : 1700);
    }

    // U.ai: memory links form, one moment lights up, it checks in
    const uai = $('.spec--uai'), mem = $('.mem', uai);
    const N = [[30, 40], [80, 22], [140, 38], [190, 24], [55, 95], [115, 78], [170, 100], [100, 128]];
    const E = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [1, 5], [5, 2], [5, 6], [3, 6], [4, 7], [7, 6], [5, 7]];
    const lines = E.map(([a, b]) => mem.appendChild(svgEl('line', { x1: N[a][0], y1: N[a][1], x2: N[b][0], y2: N[b][1] })));
    const dots = N.map(([x, y]) => mem.appendChild(svgEl('circle', { cx: x, cy: y, r: 5 })));
    let uaiT;
    function memory() {
      clearTimeout(uaiT);
      uai.classList.remove('is-done');
      dots[5].classList.remove('is-hot');
      if (RM) { uai.classList.add('is-done'); dots[5].classList.add('is-hot'); return; }
      lines.forEach((l, i) => {
        const len = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value);
        l.animate([{ strokeDasharray: `0 ${len}` }, { strokeDasharray: `${len} 0` }], { duration: 420, delay: i * 90, fill: 'backwards', easing: 'ease-out' });
      });
      dots.forEach((c, i) => {
        c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center';
        c.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 380, delay: i * 70, fill: 'backwards', easing: 'cubic-bezier(.3,1.6,.5,1)' });
      });
      uaiT = setTimeout(() => { dots[5].classList.add('is-hot'); setTimeout(() => uai.classList.add('is-done'), 500); }, 1300);
    }

    const plays = { goose, line, osta: quotes, uai: memory };
    $$('.prod[data-spec]').forEach((row) => {
      const fn = plays[row.dataset.spec];
      const spec = $('.spec', row);
      onView(spec, fn, { threshold: 0.6 });
      let last = 0;
      row.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || performance.now() - last < 4000) return;
        last = performance.now(); fn();
      });
    });
  })();

  /* ------------------------------------------------------------------
     Research: a vital-signs trace runs down the papers, changing
     waveform to match each paper's subject
  ------------------------------------------------------------------ */
  (() => {
    const root = $('[data-papers]');
    if (!root) return;
    const svg = $('.trace', root), ghost = $('.trace__ghost', svg), live = $('.trace__live', svg), probe = $('.trace__probe', svg);
    const papers = $$('.paper', root);
    const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    const gauss = (x, c, w) => Math.exp(-((x - c) ** 2) / (2 * w * w));
    const W = {
      glucose: (u) => 0.7 * gauss(u, 0.28, 0.07) + 0.85 * gauss(u, 0.62, 0.08) - 0.25 * gauss(u, 0.45, 0.06),
      ecg: (u, y) => {
        const p = (y / 120) % 1;
        return 0.12 * gauss(p, 0.18, 0.04) - 0.18 * gauss(p, 0.36, 0.012) + 1 * gauss(p, 0.4, 0.012) - 0.3 * gauss(p, 0.44, 0.012) + 0.22 * gauss(p, 0.66, 0.06);
      },
      eeg: (u, y) => (0.3 * Math.sin(y * 0.16) + 0.2 * Math.sin(y * 0.41 + 1.3) + 0.12 * Math.sin(y * 0.83 + 0.4)) * (1 - 0.7 * u),
      learn: (u, y) => -0.6 + 1.25 * (1 - Math.exp(-4.5 * u)) + 0.06 * Math.sin(y * 0.4),
      steady: (u) => 0.9 * Math.exp(-4.2 * u) * Math.sin(6.2832 * 3.2 * u),
    };
    let total = 0, len = 0, segs = [];
    function build() {
      const box = root.getBoundingClientRect();
      const w = svg.getBoundingClientRect().width;
      const h = box.height;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const mid = w * 0.5, amp = Math.min(w * 0.42, 110);
      segs = papers.map((p) => {
        const r = p.getBoundingClientRect();
        return { a: r.top - box.top, b: r.bottom - box.top, fn: W[p.dataset.wave], el: p };
      });
      const pts = [];
      for (let y = 0; y <= h; y += 2) {
        let x = 0;
        for (const s of segs) {
          if (y >= s.a && y <= s.b) {
            const u = (y - s.a) / (s.b - s.a);
            x = s.fn(u, y) * sm(0, 0.06, u) * (1 - sm(0.94, 1, u));
            break;
          }
        }
        pts.push(`${pts.length ? 'L' : 'M'}${(mid + x * amp).toFixed(1)} ${y}`);
      }
      const d = pts.join('');
      ghost.setAttribute('d', d); live.setAttribute('d', d);
      len = live.getTotalLength(); total = h;
      live.style.strokeDasharray = len;
      update(lastP);
    }
    let lastP = RM ? 1 : 0;
    function update(p) {
      lastP = p;
      live.style.strokeDashoffset = len * (1 - p);
      const pt = live.getPointAtLength(len * p);
      probe.setAttribute('cx', pt.x); probe.setAttribute('cy', pt.y);
      segs.forEach((s) => s.el.classList.toggle('is-reached', pt.y >= s.a - 40));
    }
    build();
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(build, 150); });
    document.fonts && document.fonts.ready.then(build);
    if (RM || !window.gsap || !window.ScrollTrigger) { update(1); return; }
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add('is-live');
    ScrollTrigger.create({
      trigger: root, start: 'top 65%', end: 'bottom 65%', scrub: 0.5,
      onUpdate: (st) => update(st.progress),
    });
  })();

  /* ------------------------------------------------------------------
     Hero photo: a 3x3 Sobel kernel convolves across it and reveals it
  ------------------------------------------------------------------ */
  (() => {
    const fig = $('[data-conv]');
    if (!fig || RM) return;
    const cv = $('canvas', fig), ctx = cv.getContext('2d');
    const K = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    let cols = 10, rows = 11, cw, ch, revealed, done = false;
    function size() {
      const r = fig.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = r.width / cols; ch = r.height / rows;
    }
    function paint(kx, ky) {
      const w = cw * cols, h = ch * rows;
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        if (revealed[y * cols + x]) continue;
        ctx.fillStyle = '#1B263B';
        ctx.fillRect(x * cw, y * ch, cw + 0.5, ch + 0.5);
        ctx.strokeStyle = 'rgba(119,141,169,.14)';
        ctx.strokeRect(x * cw + 0.5, y * ch + 0.5, cw - 1, ch - 1);
      }
      if (kx == null) return;
      ctx.strokeStyle = '#E0E1DD'; ctx.lineWidth = 1.5;
      ctx.strokeRect(kx * cw, ky * ch, cw * 3, ch * 3);
      ctx.font = `500 ${Math.max(10, cw * 0.26)}px "Bricolage Grotesque", sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'rgba(13,27,42,.55)';
        ctx.fillRect((kx + i) * cw + 1, (ky + j) * ch + 1, cw - 2, ch - 2);
        ctx.fillStyle = '#E0E1DD';
        ctx.fillText(String(K[j][i]), (kx + i + 0.5) * cw, (ky + j + 0.5) * ch);
      }
    }
    size();
    revealed = new Uint8Array(cols * rows);
    paint();
    onView(fig, () => {
      const path = [];
      for (let y = 0; y <= rows - 3; y++) {
        const xs = [...Array(cols - 2).keys()];
        (y % 2 ? xs.reverse() : xs).forEach((x) => path.push([x, y]));
      }
      let i = 0, last = 0;
      const step = (now) => {
        if (now - last > 26) {
          last = now;
          const [x, y] = path[i];
          for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) revealed[(y + j) * cols + x + k] = 1;
          i++;
          paint(...(i < path.length ? path[i] : [null, null]));
        }
        if (i < path.length) requestAnimationFrame(step);
        else { revealed.fill(1); paint(); done = true; cv.remove(); }
      };
      setTimeout(() => requestAnimationFrame(step), 350);
    }, { threshold: 0.2 });
    addEventListener('resize', () => { if (!done) { size(); paint(); } });
  })();
})();
