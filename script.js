/* Certificate Generator – Circuit and Soul */

(function () {
  /* ---------- Images (files in the images/ folder) ---------- */
  const IMG = {
    logo: 'images/LOGO.png',
    swapnila: 'images/swapnila-signature.png',
    dhaval: 'images/dhaval-signature.png'
  };

  /* ---------- Certificate content for each type ---------- */
  const HELD = 'held on 17<sup>th</sup> September 2026';
  const TOPIC = '“Are we shaping technology, or is technology shaping us?”';

  const TYPES = {
    'debate-winner': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has been awarded the <strong>First Position</strong> in the debate competition',
      event: 'Circuit and Soul',
      series: 'The Mind Behind the Machines',
      topic: TOPIC,
      wishes: 'Your insight, articulation, and thoughtful perspective distinguished your contribution.<br>Congratulations on this well-deserved achievement.',
      label: 'Debate Winner'
    },
    'debate-participation': {
      title: 'CIRCUIT AND SOUL',
      line1: 'has participated in the debate competition',
      event: 'Circuit and Soul',
      series: 'The Mind Behind the Machines',
      topic: TOPIC,
      wishes: 'Your thoughtful perspective, enthusiasm, and participation contributed to the spirit of meaningful dialogue.<br>We appreciate your contribution and wish you continued success.',
      label: 'Debate Participation'
    },
    'engineer-winner': {
      title: 'THE CIRCUIT AND SOULS',
      line1: 'has been awarded the <strong>First Position</strong> in the event',
      event: 'Engineer It!',
      series: 'The Circuit and Souls',
      topic: null,
      wishes: 'Your creativity, ingenuity, and vision distinguished your contribution.<br>Congratulations on this well-deserved achievement.',
      label: 'Engineer It Winner'
    },
    'engineer-participation': {
      title: 'THE CIRCUIT AND SOULS',
      line1: 'has participated in the event',
      event: 'Engineer It!',
      series: 'The Circuit and Souls',
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
        <p class="event">${t.event}</p>
        <p class="series">${t.series}</p>
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
          <p class="sign-role">(Convener)</p>
        </div>

        <div class="sign-block">
          <div class="sign-img">
            <img src="${IMG.dhaval}" alt="Signature of Dhaval Mehta" onerror="this.remove()">
            <div class="placeholder">SIGNATURE IMAGE</div>
          </div>
          <div class="sign-line"></div>
          <p class="sign-name">Dhaval Mehta</p>
          <p class="sign-role">Program Head</p>
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

  window.addEventListener('afterprint', () => { document.title = originalTitle; });

  // Re-fit names once web fonts have loaded, then first render
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
})();
