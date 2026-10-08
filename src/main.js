import './style.css';
import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initHeroParallax();
  initMascotTracking();
  initServicesFilter();
  initServicesModal();
  initCaseStudyModal();
  initRoiCalculator();
  initProcessAccordion();
  initTestimonialsSlider();
  initContactForm();
  initConsultationModal();
  initAnnouncementBar();
});

/* ==========================================================================
   1. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, #mobileConsultBtn');

  if (!mobileToggle || !mobileDrawer) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    mobileToggle.classList.toggle('is-active', shouldOpen);
    mobileDrawer.classList.toggle('is-open', shouldOpen);
    mobileToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  mobileToggle.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   3. Hero Megaphone 3D Tilt Parallax
   ========================================================================== */
function initHeroParallax() {
  const heroVisual = document.getElementById('heroVisual');
  const megaphone = document.getElementById('megaphoneGraphic');
  if (!heroVisual || !megaphone) return;

  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (y / rect.height) * -18;
    const rotY = (x / rect.width) * 22;

    megaphone.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    megaphone.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   4. Mascot Pupil Tracking
   ========================================================================== */
function initMascotTracking() {
  const mascotSphere = document.getElementById('mascotSphere');
  const pupilLeft = document.getElementById('pupilLeft');
  const pupilRight = document.getElementById('pupilRight');

  if (!mascotSphere || !pupilLeft || !pupilRight) return;

  window.addEventListener('mousemove', (e) => {
    const rect = mascotSphere.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const maxDistance = 5; // max pupil offset in px

    const moveX = Math.cos(angle) * maxDistance;
    const moveY = Math.sin(angle) * maxDistance;

    pupilLeft.style.transform = `translate(${moveX}px, ${moveY}px)`;
    pupilRight.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

/* ==========================================================================
   5. Services Filtering
   ========================================================================== */
function initServicesFilter() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.service-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Service Detail Modal
   ========================================================================== */
const SERVICE_DATA = {
  seo: {
    title: 'Search Engine Optimization (SEO)',
    tag: 'Organic Search Authority',
    badgeClass: 'bg-lime',
    desc: 'Dominate high-intent search terms, capture sustainable organic buyer traffic, and insulate your business from rising paid ads costs.',
    kpis: ['+240% Average Organic Traffic Growth', 'Top 3 Keyword Dominance', '8.4x Average 12-Month Organic ROAS'],
    deliverables: [
      'Technical SEO architecture overhaul & core web vitals optimization',
      'Data-driven keyword cluster mapping & content gap taxonomy',
      'Authority backlink acquisition via digital PR and tier-1 publications',
      'Conversion-focused schema markup & Rich Snippet dominance'
    ],
    timeline: '6-12 Months Ongoing Scale'
  },
  ppc: {
    title: 'Pay-Per-Click Advertising (PPC)',
    tag: 'Precision Paid Acquisition',
    badgeClass: 'bg-white',
    desc: 'Deploy hyper-targeted ad campaigns across Google Ads, Bing, Meta, and LinkedIn that systematically drive profitable customer acquisition.',
    kpis: ['4.8x Average Return on Ad Spend (ROAS)', '-38% Decrease in Cost Per Acquisition (CPA)', 'Real-Time Bid & Budget Optimization'],
    deliverables: [
      'High-intent search keyword bidding & negative keyword sculpting',
      'Predictive algorithmic bidding strategies & audience segmentation',
      'High-converting landing page creation & multivariate split testing',
      'Omnichannel retargeting funnels with dynamic creative optimization'
    ],
    timeline: 'Immediate Launch (First results within 7-14 days)'
  },
  social: {
    title: 'Social Media Marketing (SMM)',
    tag: 'Brand Affinity & Viral Reach',
    badgeClass: 'bg-white',
    desc: 'Turn casual scrollers into passionate brand advocates through viral short-form media, community incubation, and influencer collaborations.',
    kpis: ['3.2x Community Engagement Increase', '+180% Follower Growth Velocity', 'Direct Social Commerce Funnel Integration'],
    deliverables: [
      'Short-form vertical video production (TikTok, Reels, Shorts)',
      'Community management, reply workflows, and active advocacy',
      'Micro-influencer matchmaking and co-branded distribution',
      'Social listening, sentiment analysis, and competitor tracking'
    ],
    timeline: 'Monthly Content Cadence'
  },
  email: {
    title: 'E-mail Marketing & Retention',
    tag: 'High-LTV Customer Nurture',
    badgeClass: 'bg-lime',
    desc: 'Monetize your existing database with hyper-personalized email workflows, SMS drop sequences, and automated behavioral triggers.',
    kpis: ['35%+ Average Open Rates', '42% of Total Store Revenue from Owned Media', 'Zero Relying on Algorithm Fluctuations'],
    deliverables: [
      'Klaviyo / HubSpot lifecycle automation flow architecture',
      'Welcome series, browse abandonment, and win-back sequences',
      'Predictive RFM (Recency, Frequency, Monetary) cohort segmentation',
      'Deliverability monitoring and dedicated IP warming protocols'
    ],
    timeline: 'Setup in 2 Weeks, Continuous Optimization'
  },
  content: {
    title: 'Content Creation & Copywriting',
    tag: 'Thought Leadership & Storytelling',
    badgeClass: 'bg-lime',
    desc: 'Craft compelling editorial essays, interactive whitepapers, conversion copy, and viral multimedia that establish market authority.',
    kpis: ['Top 1% Industry Authority Positioning', '4x Dwell Time on Pillar Content', 'High-Converting Sales Collateral'],
    deliverables: [
      'Long-form editorial pillar guides and thought leadership research',
      'Interactive ROI calculators, playbooks, and downloadable assets',
      'Direct-response landing page copy and video scripts',
      'Multi-channel content atomization (1 pillar = 20 assets)'
    ],
    timeline: 'Bi-weekly Editorial Deliveries'
  },
  analytics: {
    title: 'Analytics & Conversion Tracking',
    tag: 'Data Infrastructure & Insights',
    badgeClass: 'bg-lime',
    desc: 'Eliminate guesswork with server-side tracking, multi-touch attribution models, and crystal-clear executive performance dashboards.',
    kpis: ['100% Data Integrity & First-Party Compliance', 'Multi-Touch Attribution Visibility', 'Executive Decision Velocity'],
    deliverables: [
      'Server-side Google Tag Manager (sGTM) and GA4 implementation',
      'Offline conversion tracking and CRM (HubSpot/Salesforce) synchronization',
      'Live custom Looker Studio / Metabase analytics dashboards',
      'Heuristic UX audits and qualitative heatmap recording analysis'
    ],
    timeline: 'Initial Setup 10 Business Days'
  }
};

function initServicesModal() {
  const modal = document.getElementById('serviceModal');
  const modalContent = document.getElementById('serviceModalContent');
  const closeBtn = document.getElementById('serviceModalClose');
  const cards = document.querySelectorAll('.service-card');

  if (!modal || !modalContent) return;

  function openServiceModal(serviceKey) {
    const data = SERVICE_DATA[serviceKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header-block">
        <span class="badge-pill ${data.badgeClass}">${data.tag}</span>
        <h3 class="modal-heading">${data.title}</h3>
        <p class="modal-subheading">${data.desc}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 12px; color: var(--clr-dark);">Key Impact Metrics:</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${data.kpis.map(kpi => `
            <div style="display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--clr-dark);">
              <span style="color: #10B981; font-size: 1.2rem;">&#10003;</span> ${kpi}
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 12px; color: var(--clr-dark);">What's Included:</h4>
        <ul style="list-style: disc; padding-left: 20px; color: var(--clr-text-muted); line-height: 1.6;">
          ${data.deliverables.map(del => `<li style="margin-bottom: 6px;">${del}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <button type="button" class="btn btn-dark btn-block" id="modalGetStartedBtn">
          Request Custom Proposal for ${data.title.split(' ')[0]}
        </button>
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Hook the inner CTA
    document.getElementById('modalGetStartedBtn')?.addEventListener('click', () => {
      closeServiceModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('contactName');
        if (nameInput) nameInput.focus();
      }
    });
  }

  function closeServiceModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service-id');
      if (serviceId) openServiceModal(serviceId);
    });
  });

  closeBtn?.addEventListener('click', closeServiceModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeServiceModal();
  });
}

/* ==========================================================================
   7. Case Study Modal
   ========================================================================== */
const CASE_DATA = {
  restaurant: {
    client: 'Local Gourmet Restaurant Chain (8 Locations)',
    sector: 'Hospitality & Food Service',
    results: [
      { num: '+50%', label: 'Website Reservation Traffic' },
      { num: '+25%', label: 'Direct Online Sales' },
      { num: '3.9x', label: 'Campaign ROAS' }
    ],
    challenge: 'High dependency on third-party food delivery apps cutting 30% commission per order, low direct online bookings, and fragmented local search listings.',
    solution: 'We executed a hyper-local geo-targeted Google Local Services & Meta ad strategy with location-specific promos and direct reservation incentives.',
    testimonial: '"WizardZ shifted our revenue back into our own pocket. Our table bookings are fully saturated every weekend."'
  },
  b2b: {
    client: 'CloudFlow Technologies (B2B SaaS)',
    sector: 'Enterprise Software',
    results: [
      { num: 'Page #1', label: '14 Core High-Intent Keywords' },
      { num: '+200%', label: 'Organic Inbound Leads' },
      { num: '$180k', label: 'Saved Monthly PPC Budget Equivalent' }
    ],
    challenge: 'Struggling against massive competitors in high-CPC keywords ($45+ per click), suffering from duplicate technical taxonomy and thin programmatic pages.',
    solution: 'Complete architectural migration, programmatic hub-and-spoke SEO taxonomy, and technical indexing optimization alongside authoritativeness backlinks.',
    testimonial: '"We overtook public tech giants on search result pages within 6 months. Our demo pipeline has never been healthier."'
  },
  retail: {
    client: 'Aura Lifestyle Apparel (DTC Brand)',
    sector: 'National Fashion Retail',
    results: [
      { num: '+25%', label: 'Engaged Brand Followers' },
      { num: '+20%', label: 'Direct E-Commerce GMV' },
      { num: '14.2M', label: 'Organic Video Views' }
    ],
    challenge: 'Stagnant social media presence with low audience retention, high customer acquisition costs on paid social, and low organic repeat purchases.',
    solution: 'Creator-driven TikTok & Instagram Reels content machine, synchronized with automated VIP SMS drop sequences and influencer lookalike seeding.',
    testimonial: '"WizardZ turned our social channels into our most predictable, high-margin revenue engine."'
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('caseModal');
  const modalContent = document.getElementById('caseModalContent');
  const closeBtn = document.getElementById('caseModalClose');
  const buttons = document.querySelectorAll('[data-case-modal]');

  if (!modal || !modalContent) return;

  function openCaseModal(caseKey) {
    const data = CASE_DATA[caseKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header-block">
        <span class="badge-pill bg-lime">${data.sector}</span>
        <h3 class="modal-heading">${data.client}</h3>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background-color: var(--clr-dark); padding: 24px; border-radius: 20px; color: var(--clr-white); margin-bottom: 24px; text-align: center;">
        ${data.results.map(r => `
          <div>
            <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; color: var(--clr-lime);">${r.num}</div>
            <div style="font-size: 0.85rem; color: #B3B3B7;">${r.label}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: var(--clr-dark); margin-bottom: 6px;">The Challenge:</h4>
        <p style="color: var(--clr-text-muted); line-height: 1.6;">${data.challenge}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: var(--clr-dark); margin-bottom: 6px;">Our Strategy & Execution:</h4>
        <p style="color: var(--clr-text-muted); line-height: 1.6;">${data.solution}</p>
      </div>

      <blockquote style="background-color: var(--clr-bg-gray); border-left: 4px solid var(--clr-lime); padding: 18px 24px; border-radius: 12px; font-style: italic; color: var(--clr-dark); margin-bottom: 28px;">
        ${data.testimonial}
      </blockquote>

      <button type="button" class="btn btn-lime btn-block" id="replicateStrategyBtn">
        Replicate This Strategy For Your Business &rarr;
      </button>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    document.getElementById('replicateStrategyBtn')?.addEventListener('click', () => {
      closeCaseModal();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function closeCaseModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const caseKey = btn.getAttribute('data-case-modal');
      if (caseKey) openCaseModal(caseKey);
    });
  });

  closeBtn?.addEventListener('click', closeCaseModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCaseModal();
  });
}

/* ==========================================================================
   8. Interactive ROI Growth Calculator
   ========================================================================== */
function initRoiCalculator() {
  const trafficSlider = document.getElementById('trafficSlider');
  const crSlider = document.getElementById('crSlider');
  const aovSlider = document.getElementById('aovSlider');

  const trafficVal = document.getElementById('trafficValueDisplay');
  const crVal = document.getElementById('crValueDisplay');
  const aovVal = document.getElementById('aovValueDisplay');

  const revenueBoostDisplay = document.getElementById('revenueBoostDisplay');
  const newCustomersDisplay = document.getElementById('newCustomersDisplay');
  const annualImpactDisplay = document.getElementById('annualImpactDisplay');
  const applyBtn = document.getElementById('calcApplyBtn');

  if (!trafficSlider || !crSlider || !aovSlider) return;

  function updateCalculations() {
    const traffic = parseInt(trafficSlider.value, 10);
    const cr = parseFloat(crSlider.value);
    const aov = parseInt(aovSlider.value, 10);

    trafficVal.textContent = `${traffic.toLocaleString()} visitors`;
    crVal.textContent = `${cr.toFixed(1)}%`;
    aovVal.textContent = `$${aov.toLocaleString()}`;

    // Base vs Projected: We model a conservative 45% lift in conversion + 30% organic traffic lift
    const currentOrders = traffic * (cr / 100);
    const currentMonthlyRevenue = currentOrders * aov;

    const improvedTraffic = traffic * 1.35;
    const improvedCR = cr * 1.45;
    const improvedOrders = improvedTraffic * (improvedCR / 100);
    const improvedMonthlyRevenue = improvedOrders * aov;

    const monthlyBoost = Math.round(improvedMonthlyRevenue - currentMonthlyRevenue);
    const newCustomers = Math.round(improvedOrders - currentOrders);
    const annualBoost = Math.round(monthlyBoost * 12);

    revenueBoostDisplay.textContent = `+$${monthlyBoost.toLocaleString()}`;
    newCustomersDisplay.textContent = `+${newCustomers.toLocaleString()}`;
    annualImpactDisplay.textContent = `+$${annualBoost.toLocaleString()}`;
  }

  [trafficSlider, crSlider, aovSlider].forEach(input => {
    input.addEventListener('input', updateCalculations);
  });

  updateCalculations();

  applyBtn?.addEventListener('click', () => {
    showToast('Growth forecast locked in! Opening scheduling calendar...');
    openConsultModal();
  });
}

/* ==========================================================================
   9. Process Accordion
   ========================================================================== */
function initProcessAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(otherItem => {
        otherItem.classList.remove('is-open');
        otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   10. Testimonials Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    currentIndex = index;
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn?.addEventListener('click', () => {
    stopAutoplay();
    showSlide(currentIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    stopAutoplay();
    showSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      showSlide(i);
      startAutoplay();
    });
  });

  const card = document.getElementById('testimonialsCard');
  card?.addEventListener('mouseenter', stopAutoplay);
  card?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

/* ==========================================================================
   11. Contact Form & Proposal Generator
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const radioButtons = document.querySelectorAll('input[name="inquiryType"]');
  const quoteServicesGroup = document.getElementById('quoteServicesGroup');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!form) return;

  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'get-quote') {
        quoteServicesGroup.style.display = 'block';
        submitBtn.querySelector('.btn-text').textContent = 'Get Custom Proposal';
      } else {
        quoteServicesGroup.style.display = 'none';
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let hasError = false;

    if (!name) {
      document.getElementById('nameError').textContent = 'Please provide your name.';
      hasError = true;
    } else {
      document.getElementById('nameError').textContent = '';
    }

    if (!email || !email.includes('@')) {
      document.getElementById('emailError').textContent = 'Please enter a valid work email address.';
      hasError = true;
    } else {
      document.getElementById('emailError').textContent = '';
    }

    if (!message) {
      document.getElementById('messageError').textContent = 'Please tell us about your goals.';
      hasError = true;
    } else {
      document.getElementById('messageError').textContent = '';
    }

    if (hasError) return;

    // Simulate submission state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Generating Proposal...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      form.reset();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B9FF66', '#191A23', '#FFFFFF']
      });

      showToast(`Thank you, ${name}! Your growth blueprint is being assembled. We'll be in touch within 2 hours.`);
    }, 900);
  });
}

/* ==========================================================================
   12. Consultation Scheduler Modal
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('consultationModalClose');
  const triggers = [
    document.getElementById('heroConsultBtn'),
    document.getElementById('headerQuoteBtn'),
    document.getElementById('mobileConsultBtn'),
    document.getElementById('bannerProposalBtn')
  ];
  const form = document.getElementById('consultationForm');
  const dateChips = document.querySelectorAll('.date-slot-chip');

  if (!modal) return;

  window.openConsultModal = function() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openConsultModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  dateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dateChips.forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultWorkEmail').value.trim();

    if (!name || !email) return;

    closeModal();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#B9FF66', '#191A23', '#10B981']
    });

    showToast(`Call confirmed for ${name}! Calendar invite dispatched to ${email}.`);
    form.reset();
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    if (emailInput.value) {
      showToast('Subscribed! Welcome to the WizardZ Growth Insider.');
      emailInput.value = '';
    }
  });

  // See all team members
  document.getElementById('seeAllTeamBtn')?.addEventListener('click', () => {
    showToast('Our full 18+ person specialist roster is available upon proposal request.');
  });
}

/* ==========================================================================
   13. Top Announcement Playbook Modal / Trigger
   ========================================================================== */
function initAnnouncementBar() {
  document.getElementById('readPlaybookBtn')?.addEventListener('click', () => {
    showToast('Downloading 2026 B2B & E-commerce Growth Playbook (PDF)...');
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}
