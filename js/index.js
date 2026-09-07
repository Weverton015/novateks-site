document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Hero build animation ---------- */
  const blocks = [
    { sel: '.b1', x: 150, y: 420, w: 130, h: 100 },
    { sel: '.b2', x: 300, y: 330, w: 130, h: 100 },
    { sel: '.b3', x: 190, y: 230, w: 130, h: 100 },
    { sel: '.b4', x: 320, y: 150, w: 130, h: 100 },
    { sel: '.b5', x: 210, y: 60,  w: 130, h: 100 },
  ];

  const conns = [
    { sel: '.c1', from: 0, to: 1 },
    { sel: '.c2', from: 1, to: 2 },
    { sel: '.c3', from: 2, to: 3 },
    { sel: '.c4', from: 3, to: 4 },
  ];

  function center(b) {
    return { cx: b.x + b.w / 2, cy: b.y + b.h / 2 };
  }

  blocks.forEach(b => {
    const el = document.querySelector(b.sel);
    if (!el) return;
    el.setAttribute('x', b.x);
    el.setAttribute('y', b.y);
    el.setAttribute('width', b.w);
    el.setAttribute('height', b.h);
  });

  conns.forEach(c => {
    const el = document.querySelector(c.sel);
    if (!el) return;
    const from = center(blocks[c.from]);
    const to = center(blocks[c.to]);
    el.setAttribute('x1', from.cx);
    el.setAttribute('y1', from.cy);
    el.setAttribute('x2', to.cx);
    el.setAttribute('y2', to.cy);
  });

  const orbitCenter = center(blocks[2]);
  ['.d1', '.d2'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.setAttribute('cx', orbitCenter.cx);
    el.setAttribute('cy', orbitCenter.cy);
  });

  const sequence = [
    { sel: '.b1', delay: 100 },
    { sel: '.c1', delay: 450 },
    { sel: '.b2', delay: 600 },
    { sel: '.c2', delay: 950 },
    { sel: '.b3', delay: 1100 },
    { sel: '.c3', delay: 1450 },
    { sel: '.b4', delay: 1600 },
    { sel: '.c4', delay: 1950 },
    { sel: '.b5', delay: 2100 },
    { sel: '.d1', delay: 2400 },
    { sel: '.d2', delay: 2500 },
  ];

  sequence.forEach(step => {
    const el = document.querySelector(step.sel);
    if (!el) return;
    setTimeout(() => el.classList.add('animate'), step.delay);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Array.from(el.parentElement.children).indexOf(el) * 80;
          setTimeout(() => el.classList.add('in-view'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }
});
