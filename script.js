/* Certificate Generator – Circuit and Soul */

(function () {
  /* ---------- Images (files in the images/ folder) ---------- */
  const EMBED = window.CERT_IMAGES || {};
  const IMG = {
    logo: EMBED.logo || 'images/LOGO.png',
    swapnila: EMBED.swapnila || 'images/swapnila-signature.png',
    dhaval: EMBED.dhaval || 'images/dhaval-signature.png'
  };

  /* ---------- Certificate content for each type ---------- */
  const HELD = 'held on 17<sup>th</sup> September 2026';
  const TOPIC = '“Are we shaping technology, or is technology shaping us?”';

  const TYPES = {
    'debate-winner': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has been awarded the <strong>First Position</strong> in the debate competition',
      competition: 'The Mind Behind the Machines',
      parentEvent: 'Circuit and Soul',
      topic: TOPIC,
      wishes: 'Your insight, articulation, and thoughtful perspective distinguished your contribution.<br>Congratulations on this well-deserved achievement.',
      label: 'Debate Winner'
    },
    'debate-runnerup': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has been awarded the <strong>Runner-Up Position</strong> in the debate competition',
      competition: 'The Mind Behind the Machines',
      parentEvent: 'Circuit and Soul',
      topic: TOPIC,
      wishes: 'Your clarity of thought, composure, and well-reasoned arguments earned distinction.<br>Congratulations on this commendable achievement.',
      label: 'Debate Runner-Up'
    },
    'debate-participation': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has participated in the debate competition',
      competition: 'The Mind Behind the Machines',
      parentEvent: 'Circuit and Soul',
      topic: TOPIC,
      wishes: 'Your thoughtful perspective, enthusiasm, and participation contributed to the spirit of meaningful dialogue.<br>We appreciate your contribution and wish you continued success.',
      label: 'Debate Participation'
    },
    'engineer-participation': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has participated in the event',
      competition: 'Engineer It!',
      parentEvent: 'Circuit and Soul',
      topic: null,
      wishes: 'Your enthusiasm, creativity, and active participation contributed to the spirit of innovation and collaboration.<br>We appreciate your contribution and wish you continued success.',
      label: 'Engineer It Participation'
    }
  };

  /* ---------- Shared markup ---------- */
  const corner = (pos) => `
    <svg class="corner ${pos}" viewBox="0 0 200 200" fill="none">
      <path d="M0 0H200L150 0 0 50Z" fill="#0f2a55" opacity=".92"/>
      <path d="M0 0V200L0 70Z" fill="#0f2a55" opacity=".92"/>
      <path d="M0 0L70 0 0 70Z" fill="#1d4a86"/>
      <path d="M0 80L80 0" stroke="#0f2a55" stroke-width="1.6"/>
      <path d="M12 100 L100 12" stroke="#0f2a55" stroke-width="1.2" opacity=".7"/>
      <path d="M6 40 H70 L110 4" stroke="#fff" stroke-width="1.2" opacity=".65"/>
    </svg>`;

  function certificateHTML(t) {
    const topicBlock = t.topic
      ? `<p class="topic-label">on the topic</p>
         <p class="topic">${t.topic}</p>`
      : '';

    return `
    <div class="certificate ${t.topic ? '' : 'no-topic'}">
      ${corner('tl')}${corner('tr')}${corner('bl')}${corner('br')}

      <header class="uni-header">
        <img src="${IMG.logo}" alt="University standard header" onerror="this.remove()">
        <div class="placeholder">UNIVERSITY STANDARD HEADER IMAGE</div>
      </header>

      <h1 class="title">${t.title}</h1>
      <p class="tagline">The Spirit of Creativity &amp; Collaboration</p>
      <div class="divider"><span class="line"></span><span class="diamond"></span><span class="line"></span></div>

      <main class="body">
        <p class="certify">This is to certify that</p>
        <div class="name-line"></div>
        <p class="line1">${t.line1}</p>
        <p class="series">${t.competition}</p>
        <p class="event">under the event <strong>${t.parentEvent}</strong></p>
        ${topicBlock}
        <p class="held">${HELD}</p>
        <p class="wishes">${t.wishes}</p>
      </main>

      <section class="signatures">
        <div class="sign-block">
          <div class="sign-img">
            <img src="${IMG.swapnila}" alt="Signature of Swapnila Nigam" onerror="this.remove()">
            <div class="placeholder">SIGNATURE IMAGE</div>
          </div>
          <div class="sign-line"></div>
          <p class="sign-name">Swapnila Nigam</p>
          <p class="sign-role">Convener</p>
        </div>

        <div class="sign-block">
          <div class="sign-img">
            <img src="${IMG.dhaval}" alt="Signature of Dhaval Mehta" onerror="this.remove()">
            <div class="placeholder">SIGNATURE IMAGE</div>
          </div>
          <div class="sign-line"></div>
          <p class="sign-name">Dhaval Mehta</p>
          <p class="sign-role">Head CSE</p>
        </div>
      </section>
    </div>`;
  }

  /* ---------- Elements ---------- */
  const typeEl  = document.getElementById('type');
  const namesEl = document.getElementById('names');
  const sheet   = document.getElementById('sheet');
  const printBtn = document.getElementById('print');

  const getNames = () =>
    namesEl.value.split('\n').map(s => s.trim()).filter(Boolean);

  /* Shrink very long names so they stay on the line (short names unchanged) */
  function fitName(el) {
    el.style.fontSize = '';
    let size = 24;
    while (el.scrollWidth > el.clientWidth && size > 12) {
      size -= 0.5;
      el.style.fontSize = size + 'pt';
    }
  }

  function render() {
    const t = TYPES[typeEl.value];
    const names = getNames();
    const list = names.length ? names : [''];   // blank certificate if no name yet

    sheet.innerHTML = list.map(() => certificateHTML(t)).join('');

    sheet.querySelectorAll('.name-line').forEach((el, i) => {
      el.textContent = list[i];      // textContent = safe, no HTML injection
      fitName(el);
    });
  }

  /* ---------- Events ---------- */
  typeEl.addEventListener('change', render);
  namesEl.addEventListener('input', render);

  const originalTitle = document.title;

  printBtn.addEventListener('click', async () => {
    if (!getNames().length &&
        !confirm('No name entered. Print a blank certificate?')) return;

    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    render();

    // Helpful default file name when saving as PDF
    const names = getNames();
    const t = TYPES[typeEl.value];
    document.title = names.length === 1
      ? `Certificate - ${t.label} - ${names[0]}`
      : `Certificates - ${t.label}`;

    window.print();
  });

  /* ---------- Save as JPG ---------- */
  const jpgBtn = document.getElementById('jpg');
  const safeName = (s) => s.replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').trim();

  /* html2canvas cannot draw the flipped SVG corners, so paint them ourselves
     (behind the captured certificate) and return one flattened canvas. */
  async function withCorners(captured, certEl) {
    const svgEl = certEl.querySelector('svg.corner');
    const markup = new XMLSerializer().serializeToString(svgEl)
      .replace(/ class="[^"]*"/, '')
      .replace('<svg', '<svg width="200" height="200"');
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res; img.onerror = rej;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
    });

    const out = document.createElement('canvas');
    out.width = captured.width; out.height = captured.height;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#f5f3ee';
    ctx.fillRect(0, 0, out.width, out.height);

    const k = captured.width / certEl.offsetWidth;   // canvas px per CSS px
    const size = svgEl.getBoundingClientRect().width / (certEl.getBoundingClientRect().width / certEl.offsetWidth) * k;
    const b = 2 * k;                                  // certificate border width
    const W = out.width, H = out.height;
    const spots = [
      [b, b, 1, 1], [W - b, b, -1, 1], [b, H - b, 1, -1], [W - b, H - b, -1, -1]
    ];
    spots.forEach(([x, y, sx, sy]) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();
    });

    ctx.drawImage(captured, 0, 0);
    return out;
  }

  jpgBtn.addEventListener('click', async () => {
    if (typeof html2canvas !== 'function') {
      alert('JPG export library could not be loaded (lib/html2canvas.min.js).');
      return;
    }
    const names = getNames();
    if (!names.length && !confirm('No name entered. Save a blank certificate?')) return;

    const label = jpgBtn.textContent;
    jpgBtn.disabled = true;
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      render();
      const t = TYPES[typeEl.value];
      const certs = Array.from(sheet.querySelectorAll('.certificate'));

      for (let i = 0; i < certs.length; i++) {
        jpgBtn.textContent = certs.length > 1
          ? `Saving ${i + 1} of ${certs.length}…` : 'Saving…';

        const canvas = await html2canvas(certs[i], {
          scale: 3,                       // ~3370 x 2380 px (about 300 dpi on A4)
          backgroundColor: null,          // transparent: corners are drawn underneath below
          useCORS: true,
          logging: false,
          onclone: (doc) => {
            doc.querySelectorAll('.certificate').forEach(c => {
              c.style.zoom = '1';
              c.style.boxShadow = 'none';
              c.style.background = 'transparent';   // corners are painted underneath
            });
            doc.querySelectorAll('.placeholder').forEach(p => p.remove());

            doc.querySelectorAll('svg.corner').forEach(c => { c.style.visibility = 'hidden'; });
          }
        });

        const finalCanvas = await withCorners(canvas, certs[i]);
        const blob = await new Promise(res => finalCanvas.toBlob(res, 'image/jpeg', 0.95));
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (names.length
          ? `Certificate - ${t.label} - ${safeName(names[i]) || i + 1}`
          : `Certificate - ${t.label}`) + '.jpg';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        await new Promise(r => setTimeout(r, 400));   // let the browser start each download
      }
    } catch (err) {
      console.error(err);
      alert('Sorry, the JPG could not be created. Please try again or use Print → Save as PDF.');
    } finally {
      jpgBtn.textContent = label;
      jpgBtn.disabled = false;
    }
  });

  window.addEventListener('afterprint', () => { document.title = originalTitle; });

  // Re-fit names once web fonts have loaded, then first render
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
})();
