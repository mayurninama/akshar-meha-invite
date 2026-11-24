(() => {
  'use strict';

  const DEMO_WA_NUMBER = '910123456789';

  const EVENTS = [
    {
      date: '2027-01-22',
      dayLabel: 'FRI, JAN 22 · 10:00 AM',
      shortTime: '10:00 AM',
      title: 'Ganesh Sthapana & Haldi',
      venue: 'Courtyard Lawns · Boulevard 9, Nadiad',
      attire: 'Attire: Marigold & Yellow',
    },
    {
      date: '2027-01-22',
      dayLabel: 'FRI, JAN 22 · 3:30 PM',
      shortTime: '3:30 PM',
      title: 'Mehendi Soirée',
      venue: 'Poolside Pavilion · Boulevard 9, Nadiad',
      attire: 'Attire: Pastel Floral',
    },
    {
      date: '2027-01-22',
      dayLabel: 'FRI, JAN 22 · 7:30 PM',
      shortTime: '7:30 PM',
      title: 'Sangeet & Cocktail Night',
      venue: 'Grand Ballroom · Boulevard 9, Nadiad',
      attire: 'Attire: Indo-Western Glam',
    },
    {
      date: '2027-01-23',
      dayLabel: 'SAT, JAN 23 · 4:30 PM',
      shortTime: '4:30 PM',
      title: 'Baraat & Var Mala',
      venue: 'Royal Entryway & Lawn · Boulevard 9, Nadiad',
      attire: 'Attire: Traditional Royal',
    },
    {
      date: '2027-01-23',
      dayLabel: 'SAT, JAN 23 · 6:30 PM',
      shortTime: '6:30 PM',
      title: 'Pheras & Hasta Milap',
      venue: 'Mandap Gardens · Boulevard 9, Nadiad',
      attire: 'Attire: Auspicious Traditional',
    },
    {
      date: '2027-01-24',
      dayLabel: 'SUN, JAN 24 · 7:30 PM',
      shortTime: '7:30 PM',
      title: 'Grand Reception & Gala',
      venue: 'The Imperial Lawn · Boulevard 9, Nadiad',
      attire: 'Attire: Formal Ethnic',
    },
  ];

  const GALLERY_PHOTOS = [
    { src: 'assets/gallery-1.jpg', caption: 'Under golden sandstone arches' },
    { src: 'assets/gallery-2.jpg', caption: 'Henna, gold & forever promises' },
    { src: 'assets/gallery-3.jpg', caption: 'Driving toward our new chapter' },
    { src: 'assets/gallery-4.jpg', caption: 'Showered in petals & laughter' },
    { src: 'assets/gallery-5.jpg', caption: 'Dancing under twilight diyas' },
  ];

  // =========================================================
  // 1. OPENING ENVELOPE & VINTAGE CAR TRANSITION
  // =========================================================
  const introOverlay = document.getElementById('introOverlay');
  const envelopeBtn = document.getElementById('envelopeBtn');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const inviteMain = document.getElementById('inviteMain');
  const previewBar = document.getElementById('previewBar');
  const replayIntroBtn = document.getElementById('replayIntroBtn');
  let introBusy = false;

  function triggerOpeningAnimation() {
    if (introBusy) return;
    introBusy = true;

    introOverlay.classList.add('is-opening');

    setTimeout(() => {
      introOverlay.classList.add('car-gliding');
      spawnPetalBurst(window.innerWidth / 2, window.innerHeight * 0.65, 22);
    }, 420);

    setTimeout(() => {
      introOverlay.classList.add('is-finished');
      document.body.classList.remove('intro-locked');
      inviteMain.setAttribute('aria-hidden', 'false');
      previewBar.hidden = false;
      requestAnimationFrame(() => previewBar.classList.add('is-visible'));
      window.scrollTo({ top: 0, behavior: 'auto' });
      // Ensure hero animates in right away
      document.getElementById('sec-hero').classList.add('is-visible');
      introBusy = false;
    }, 1820);
  }

  function resetToEnvelope() {
    previewBar.classList.remove('is-visible');
    setTimeout(() => {
      previewBar.hidden = true;
    }, 300);
    introOverlay.classList.remove('is-finished', 'is-opening', 'car-gliding');
    document.body.classList.add('intro-locked');
    inviteMain.setAttribute('aria-hidden', 'true');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  openEnvelopeBtn.addEventListener('click', triggerOpeningAnimation);
  envelopeBtn.addEventListener('click', triggerOpeningAnimation);
  envelopeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerOpeningAnimation();
    }
  });
  replayIntroBtn.addEventListener('click', resetToEnvelope);

  // =========================================================
  // 2. SECTION SCROLL-IN ANIMATION OBSERVER
  // =========================================================
  const sections = document.querySelectorAll('.reveal-section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.14 }
  );
  sections.forEach((sec) => observer.observe(sec));

  // =========================================================
  // 3. INTERACTIVE JANUARY 2027 CALENDAR WIDGET
  // =========================================================
  const calendarGrid = document.getElementById('calendarGrid');
  const calDayPreview = document.getElementById('calDayPreview');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');

  // January 1, 2027 is a Friday (index 5 in SUN..SAT)
  const JAN_2027_START_COL = 5;
  const JAN_2027_DAYS = 31;
  const EVENT_DATES = new Set(['2027-01-22', '2027-01-23', '2027-01-24']);
  let selectedDate = '2027-01-23';

  function renderCalendar() {
    calendarGrid.innerHTML = '';

    for (let i = 0; i < JAN_2027_START_COL; i += 1) {
      const empty = document.createElement('span');
      empty.className = 'cal-cell';
      calendarGrid.appendChild(empty);
    }

    for (let d = 1; d <= JAN_2027_DAYS; d += 1) {
      const iso = `2027-01-${String(d).padStart(2, '0')}`;
      const isEvent = EVENT_DATES.has(iso);
      const cell = document.createElement(isEvent ? 'button' : 'span');
      cell.textContent = d;
      cell.className = 'cal-cell';

      if (isEvent) {
        cell.type = 'button';
        cell.classList.add('is-event');
        if (iso === '2027-01-23') cell.classList.add('is-wedding-main');
        if (iso === selectedDate) cell.classList.add('is-selected');
        cell.setAttribute('aria-label', `January ${d}, 2027 wedding events`);
        cell.addEventListener('click', () => {
          selectedDate = iso;
          renderCalendar();
          renderCalendarDayPreview(iso);
        });
      }

      calendarGrid.appendChild(cell);
    }
  }

  function renderCalendarDayPreview(iso) {
    const dayLabels = {
      '2027-01-22': 'Friday, Jan 22 · Day 1 — Pre-Wedding Festivities',
      '2027-01-23': 'Saturday, Jan 23 · Day 2 — Shubh Vivah',
      '2027-01-24': 'Sunday, Jan 24 · Day 3 — Grand Reception',
    };
    const dayEvents = EVENTS.filter((ev) => ev.date === iso);
    calDayPreview.innerHTML = `
      <p class="cal-preview-head">${dayLabels[iso]}</p>
      ${dayEvents
        .map(
          (ev) => `
        <div class="cal-preview-item">
          <strong>${ev.title}</strong>
          <span>${ev.shortTime}</span>
        </div>
      `
        )
        .join('')}
    `;
  }

  downloadIcsBtn.addEventListener('click', () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AksharMehaWedding//Boulevard9Nadiad//EN',
      'BEGIN:VEVENT',
      'UID:akshar-meha-2027@boulevard9nadiad',
      'DTSTAMP:20261124T080000Z',
      'DTSTART;VALUE=DATE:20270122',
      'DTEND;VALUE=DATE:20270125',
      'SUMMARY:Akshar & Meha Patel Wedding Celebrations',
      'DESCRIPTION:Ganesh Sthapana, Haldi, Mehendi, Sangeet, Baraat, Pheras & Grand Reception at Boulevard 9 Luxury Resort & Spa, Nadiad.',
      'LOCATION:Boulevard 9 Luxury Resort & Spa, Nadiad, Gujarat',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Akshar-Meha-Wedding-Jan2027.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  renderCalendar();
  renderCalendarDayPreview(selectedDate);

  // =========================================================
  // 4. TIMELINE SUB-CARDS, FILTER TABS & MINIATURE CAR TRACK
  // =========================================================
  const eventsTimelineList = document.getElementById('eventsTimelineList');
  const timelineRoadWrap = document.getElementById('timelineRoadWrap');
  const timelineRail = document.querySelector('.timeline-rail');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineMiniCar = document.getElementById('timelineMiniCar');
  const dayTabs = document.querySelectorAll('.day-tab');

  let hasCelebratedFinalStop = false;
  let timelineRafPending = false;

  function renderTimeline(filterDay) {
    const filtered = filterDay === 'all' ? EVENTS : EVENTS.filter((e) => e.date === filterDay);
    hasCelebratedFinalStop = false;
    timelineMiniCar.classList.remove('is-arrived');

    eventsTimelineList.innerHTML = filtered
      .map((ev, idx) => {
        const isLast = idx === filtered.length - 1;
        return `
        <article class="event-subcard${isLast ? ' is-last' : ''}" data-idx="${idx}">
          <span class="event-stop-dot" aria-hidden="true"></span>
          <div class="event-subcard-inner">
            <p class="event-when">${ev.dayLabel}</p>
            <h4 class="event-name">${ev.title}</h4>
            <p class="event-place">${ev.venue}</p>
            <span class="event-attire">${ev.attire}</span>
          </div>
        </article>
      `;
      })
      .join('');

    requestAnimationFrame(updateTimelineCar);
  }

  function updateTimelineCar() {
    timelineRafPending = false;
    const cards = Array.from(eventsTimelineList.querySelectorAll('.event-subcard'));
    if (!cards.length || !timelineRoadWrap) return;

    const wrapRect = timelineRoadWrap.getBoundingClientRect();
    const stops = cards.map((card) => {
      const dot = card.querySelector('.event-stop-dot');
      const dotRect = dot.getBoundingClientRect();
      return {
        card,
        dot,
        relY: dotRect.top + dotRect.height / 2 - wrapRect.top,
        vpY: dotRect.top + dotRect.height / 2,
      };
    });

    const first = stops[0];
    const last = stops[stops.length - 1];
    const span = Math.max(0, last.relY - first.relY);

    timelineRail.style.top = `${first.relY}px`;
    timelineRail.style.height = `${Math.max(2, span)}px`;

    const focusLine = window.innerHeight * 0.54;
    let progress = 1;
    if (stops.length > 1) {
      const vpSpan = Math.max(1, last.vpY - first.vpY);
      progress = Math.min(1, Math.max(0, (focusLine - first.vpY) / vpSpan));
    } else {
      progress = focusLine >= first.vpY - 40 ? 1 : 0;
    }

    const carY = first.relY + progress * span;
    timelineMiniCar.style.top = `${carY}px`;
    timelineProgress.style.height = `${Math.max(0, carY - first.relY)}px`;

    let closestIdx = 0;
    let minDiff = Infinity;
    stops.forEach((s, idx) => {
      const passed = s.relY <= carY + 10;
      s.card.classList.toggle('is-passed', passed);
      s.dot.classList.toggle('is-passed', passed);
      const diff = Math.abs(s.relY - carY);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    stops.forEach((s, idx) => {
      s.card.classList.toggle('is-active', idx === closestIdx);
    });

    const arrived = progress >= 0.96;
    timelineMiniCar.classList.toggle('is-arrived', arrived);
    last.card.classList.toggle('is-final-arrived', arrived);
    last.dot.classList.toggle('is-final-arrived', arrived);

    if (arrived && !hasCelebratedFinalStop) {
      hasCelebratedFinalStop = true;
      const dotRect = last.dot.getBoundingClientRect();
      if (dotRect.top > 0 && dotRect.top < window.innerHeight) {
        spawnPetalBurst(dotRect.left + dotRect.width / 2, dotRect.top, 12);
      }
    } else if (progress < 0.72) {
      hasCelebratedFinalStop = false;
    }
  }

  function scheduleTimelineCarUpdate() {
    if (!timelineRafPending) {
      timelineRafPending = true;
      requestAnimationFrame(updateTimelineCar);
    }
  }

  window.addEventListener('scroll', scheduleTimelineCarUpdate, { passive: true });
  window.addEventListener('resize', scheduleTimelineCarUpdate, { passive: true });

  dayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      dayTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderTimeline(tab.dataset.day);
    });
  });

  renderTimeline('all');

  // =========================================================
  // 5. POLAROID GALLERY & LIGHTBOX (5 IMAGES)
  // =========================================================
  const polaroidGallery = document.getElementById('polaroidGallery');
  const lightboxModal = document.getElementById('lightboxModal');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let activePhotoIdx = 0;

  function openLightbox(idx) {
    activePhotoIdx = (idx + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    const item = GALLERY_PHOTOS[activePhotoIdx];
    lbImg.src = item.src;
    lbImg.alt = item.caption;
    lbCaption.textContent = item.caption;
    lbCounter.textContent = `${activePhotoIdx + 1} / ${GALLERY_PHOTOS.length}`;
    lightboxModal.hidden = false;
  }

  GALLERY_PHOTOS.forEach((photo, idx) => {
    const fig = document.createElement('figure');
    fig.className = 'polaroid gallery-polaroid anim-item';
    fig.style.setProperty('--d', `${0.12 + idx * 0.07}s`);
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', `View photo: ${photo.caption}`);
    fig.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
      <figcaption class="pol-caption">${photo.caption}</figcaption>
    `;
    fig.addEventListener('click', () => openLightbox(idx));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
    polaroidGallery.appendChild(fig);
  });

  lbClose.addEventListener('click', () => (lightboxModal.hidden = true));
  lbPrev.addEventListener('click', () => openLightbox(activePhotoIdx - 1));
  lbNext.addEventListener('click', () => openLightbox(activePhotoIdx + 1));
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) lightboxModal.hidden = true;
  });

  // =========================================================
  // 6. WHATSAPP RSVP FORM (DEMO NUMBER 0123456789)
  // =========================================================
  const rsvpForm = document.getElementById('rsvpForm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim() || 'Guest';
    const status = document.getElementById('rsvpStatus').value;
    const guests = document.getElementById('rsvpGuests').value;
    const note = document.getElementById('rsvpNote').value.trim();
    const checkedEvents = Array.from(
      rsvpForm.querySelectorAll('.event-checks input:checked')
    ).map((el) => el.value);

    const msgLines = [
      `Namaste Akshar & Meha Patel! 🌸`,
      `RSVP from: *${name}*`,
      `Response: *${status}*`,
      `Guests: *${guests}*`,
      checkedEvents.length
        ? `Events Joining: ${checkedEvents.join(', ')}`
        : 'Events Joining: Will confirm shortly',
      note ? `Note: ${note}` : '',
      `Venue: Boulevard 9 Luxury Resort & Spa, Nadiad (Jan 22–24, 2027)`,
    ].filter(Boolean);

    const waUrl = `https://wa.me/${DEMO_WA_NUMBER}?text=${encodeURIComponent(
      msgLines.join('\n')
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // =========================================================
  // 7. LIVE COUNTDOWN TO JAN 23, 2027 4:30 PM IST
  // =========================================================
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  const weddingTarget = new Date('2027-01-23T16:30:00+05:30').getTime();

  function updateCountdown() {
    const diff = Math.max(0, weddingTarget - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =========================================================
  // 8. INTERACTIVE BLESSINGS ANIMATION + WHATSAPP
  // =========================================================
  const petalLayer = document.getElementById('petalLayer');
  const blessingChips = document.querySelectorAll('.blessing-chip');
  const blessingSender = document.getElementById('blessingSender');
  const blessingText = document.getElementById('blessingText');
  const showerBlessingBtn = document.getElementById('showerBlessingBtn');
  const sendBlessingWaBtn = document.getElementById('sendBlessingWaBtn');
  const blessingToast = document.getElementById('blessingToast');

  function spawnPetalBurst(originX, originY, count = 26) {
    const glyphs = ['🌸', '✨', '🌷', '💛', '🪷'];
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('span');
      el.className = 'blessing-particle';
      el.textContent = glyphs[i % glyphs.length];
      const spreadX = (Math.random() - 0.5) * 320;
      const liftY = -(160 + Math.random() * 340);
      const rot = (Math.random() - 0.5) * 360;
      const dur = 2.1 + Math.random() * 1.4;

      el.style.left = `${originX + (Math.random() - 0.5) * 40}px`;
      el.style.top = `${originY}px`;
      el.style.fontSize = `${14 + Math.random() * 14}px`;
      el.style.setProperty('--tx', `${spreadX}px`);
      el.style.setProperty('--ty', `${liftY}px`);
      el.style.setProperty('--rot', `${rot}deg`);
      el.style.setProperty('--dur', `${dur}s`);

      petalLayer.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 80);
    }
  }

  blessingChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      blessingChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      blessingText.value = chip.dataset.wish;
    });
  });

  function triggerBlessingShower(btnEl) {
    const rect = btnEl.getBoundingClientRect();
    spawnPetalBurst(rect.left + rect.width / 2, rect.top + 10, 32);
    const sender = blessingSender.value.trim();
    blessingToast.textContent = sender
      ? `Thank you, ${sender}! Your warm blessings are showered upon Akshar & Meha.`
      : 'Your warm blessings are showered upon Akshar & Meha!';
  }

  showerBlessingBtn.addEventListener('click', () => {
    triggerBlessingShower(showerBlessingBtn);
  });

  sendBlessingWaBtn.addEventListener('click', () => {
    triggerBlessingShower(sendBlessingWaBtn);
    const sender = blessingSender.value.trim() || 'Well-wisher';
    const wish =
      blessingText.value.trim() ||
      'Wishing Akshar & Meha Patel a lifetime of joy and togetherness!';
    const message = `🌸 Shubh Ashirwad for Akshar & Meha Patel 🌸\n\n"${wish}"\n\n— With love & blessings, ${sender}`;
    const waUrl = `https://wa.me/${DEMO_WA_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 320);
  });

  // =========================================================
  // 9. PREVIEW CONFIRMATION MODAL (Mayur & Sumit ONLY)
  // =========================================================
  const previewConfirmBtn = document.getElementById('previewConfirmBtn');
  const confirmModal = document.getElementById('confirmModal');
  const closeConfirmModal = document.getElementById('closeConfirmModal');

  previewConfirmBtn.addEventListener('click', () => {
    confirmModal.hidden = false;
  });

  closeConfirmModal.addEventListener('click', () => {
    confirmModal.hidden = true;
  });

  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) confirmModal.hidden = true;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      confirmModal.hidden = true;
      lightboxModal.hidden = true;
    }
  });
})();
