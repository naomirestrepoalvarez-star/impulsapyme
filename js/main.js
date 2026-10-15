/**
 * Impulsapyme - Main Interactive Script
 * Publicidad y Gestión de Redes Sociales
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLiveSchedule();
  initBudgetCalculator();
  initGallery();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  menuBtn.addEventListener('click', toggleMenu);
  if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* ==========================================================================
   2. Horario de Atención en Vivo (Live Schedule)
   ========================================================================== */
function initLiveSchedule() {
  const badgeEl = document.getElementById('live-status-badge');
  const textEl = document.getElementById('live-status-text');
  const detailEl = document.getElementById('live-status-detail');

  if (!badgeEl && !textEl) return;

  function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60;

    let isOpen = false;
    let statusText = '';
    let statusDetail = '';

    if (day >= 1 && day <= 5) {
      // Lunes a Viernes: 8:00 AM a 7:00 PM (19:00)
      if (currentTime >= 8 && currentTime < 19) {
        isOpen = true;
        statusText = 'Abierto ahora';
        statusDetail = 'Atendiendo consultas en vivo hasta las 7:00 PM';
      } else {
        isOpen = false;
        statusText = 'Cerrado por hoy';
        statusDetail = currentTime < 8 
          ? 'Abrimos a las 8:00 AM · Déjanos tu mensaje en WhatsApp' 
          : 'Abrimos mañana a las 8:00 AM · Escríbenos en WhatsApp';
      }
    } else if (day === 6) {
      // Sábado: 9:00 AM a 2:00 PM (14:00)
      if (currentTime >= 9 && currentTime < 14) {
        isOpen = true;
        statusText = 'Abierto ahora';
        statusDetail = 'Atendiendo consultas hasta las 2:00 PM';
      } else {
        isOpen = false;
        statusText = 'Cerrado por hoy';
        statusDetail = currentTime < 9
          ? 'Abrimos hoy a las 9:00 AM'
          : 'Abrimos el lunes a las 8:00 AM · WhatsApp 24/7 activo';
      }
    } else {
      // Domingo
      isOpen = false;
      statusText = 'Guardia Digital Activa';
      statusDetail = 'Abrimos el lunes a las 8:00 AM · Deja tu mensaje y te responderemos a primera hora';
    }

    if (badgeEl) {
      badgeEl.className = isOpen
        ? 'w-2.5 h-2.5 rounded-full bg-emerald-500 live-indicator inline-block'
        : 'w-2.5 h-2.5 rounded-full bg-amber-400 inline-block';
    }

    if (textEl) {
      textEl.textContent = statusText;
      textEl.className = isOpen ? 'font-semibold text-emerald-800' : 'font-semibold text-amber-800';
    }

    if (detailEl) {
      detailEl.textContent = statusDetail;
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Actualiza cada minuto
}

/* ==========================================================================
   3. Cotizador Dinámico / Calculadora de Presupuesto ($20 - $40,000)
   ========================================================================== */
function initBudgetCalculator() {
  const slider = document.getElementById('budget-slider');
  const amountDisplay = document.getElementById('budget-amount');
  const planTag = document.getElementById('budget-plan-tag');
  const planTitle = document.getElementById('budget-plan-title');
  const planDesc = document.getElementById('budget-plan-desc');
  const planFeaturesList = document.getElementById('budget-features-list');
  const whatsappCta = document.getElementById('budget-whatsapp-btn');

  if (!slider) return;

  // Escala de presupuestos (valores reales que mapean el slider de 0 a 100)
  const budgetTiers = [
    { min: 0, max: 15, value: 20, label: '$20.00 USD', plan: 'Pieza Express / Semilla', badge: 'Entrada Accesible', desc: 'Ideal para validar ideas, promociones relámpago o actualizar la imagen de tu negocio sin compromisos a largo plazo.', features: ['1 Pieza publicitaria de alto impacto (Feed/Story)', 'Copywriting profesional con llamado a la acción', 'Formato listo para publicar en Instagram/Facebook', 'Entrega exprés en 48 horas'] },
    { min: 16, max: 35, value: 75, label: '$75.00 USD', plan: 'Impulso PyME Mensual', badge: 'Más Recomendado', desc: 'La dosis ideal de contenido mensual para mantener tu negocio visible, activo y profesional.', features: ['8 a 10 Piezas publicitarias personalizadas', 'Plan y calendario de contenidos del mes', 'Optimización de perfil de Instagram/Facebook', 'Guion sugerido para 2 Reels o historias clave', 'Soporte vía WhatsApp'] },
    { min: 36, max: 55, value: 220, label: '$220.00 USD', plan: 'Crecimiento & Pauta Activa', badge: 'Mayor Retorno (ROI)', desc: 'Combina contenido orgánico de alto valor con campañas de anuncios pagados en Meta Ads para atraer clientes nuevos.', features: ['16 Piezas gráficas profesionales', '4 Guiones para videos cortos / Reels', 'Configuración de Campañas en Meta Ads (Facebook & Instagram)', 'Segmentación avanzada de público objetivo', 'Informe mensual de alcance, clics y prospectos'] },
    { min: 56, max: 75, value: 850, label: '$850.00 USD', plan: 'Escalamiento PyME Pro', badge: 'Tracción Total', desc: 'Estrategia integral multicanal: contenidos, pauta publicitaria, diseño de página web landing de alta conversión y embudo de ventas.', features: ['Gestión integral de 2 a 3 redes sociales', 'Diseño de Landing Page o Web corporativa optimizada', 'Estrategia de contenidos + pauta publicitaria activa', 'Producción de piezas audiovisuales y estáticas', 'Reunión mensual de análisis de métricas y optimización'] },
    { min: 76, max: 90, value: 4500, label: '$4,500.00 USD', plan: 'Expansión de Marca & Performance', badge: 'Alto Impacto', desc: 'Para empresas consolidadas que buscan dominar su nicho, escalar ventas exponencialmente y renovar su identidad corporativa.', features: ['Branding e identidad visual completa', 'Ecosistema digital (Web, CRM, Embudos de conversión)', 'Pauta publicitaria en Meta Ads, Google Ads y TikTok Ads', 'Contenido premium semanal y estrategia de influencers', 'Equipo dedicado y reportes semanales'] },
    { min: 91, max: 100, value: 40000, label: 'Hasta $40,000 USD', plan: 'Plan Corporativo 360° a Medida', badge: 'Solución Enterprise', desc: 'Despliegue integral de marketing, publicidad masiva, desarrollo tecnológico avanzado y posicionamiento omnicanal a gran escala.', features: ['Estrategia 360° omnicanal a nivel nacional/internacional', 'Producción audiovisual publicitaria de nivel comercial', 'Desarrollo web y aplicaciones a la medida', 'Campañas masivas de performance marketing con analítica avanzada', 'Director de cuenta dedicado y consultoría estratégica continua'] }
  ];

  function getTier(sliderValue) {
    return budgetTiers.find(t => sliderValue >= t.min && sliderValue <= t.max) || budgetTiers[0];
  }

  function updateCalculator() {
    const val = parseInt(slider.value, 10);
    const tier = getTier(val);

    amountDisplay.textContent = tier.label;
    planTag.textContent = tier.badge;
    planTitle.textContent = tier.plan;
    planDesc.textContent = tier.desc;

    // Actualizar lista de beneficios
    planFeaturesList.innerHTML = '';
    tier.features.forEach(f => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-stone-700';
      li.innerHTML = `
        <svg class="w-5 h-5 text-emerald-700 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${f}</span>
      `;
      planFeaturesList.appendChild(li);
    });

    // Enlace de WhatsApp con el mensaje personalizado
    const message = encodeURIComponent(`¡Hola Impulsapyme! Estuve probando el cotizador de su sitio web y me interesa el plan "${tier.plan}" con un presupuesto de ${tier.label}. ¿Me podrían brindar más información para mi negocio?`);
    whatsappCta.href = `https://wa.me/57312458911?text=${message}`;
  }

  slider.addEventListener('input', updateCalculator);
  updateCalculator(); // Inicializar
}

/* ==========================================================================
   4. Galería de Piezas Publicitarias y Lightbox
   ========================================================================== */
const galleryData = [
  {
    id: 1,
    title: 'Reminder: Más Que Marketing, Creamos Resultados',
    category: 'creatividad',
    categoryLabel: 'Creatividad & Impacto',
    src: 'assets/piezas/1.png',
    desc: 'Pieza publicitaria en formato notificación móvil de alto engagement. Diseñada para capturar la atención en los primeros 2 segundos de visualización en el feed.',
    objective: 'Recordar el valor real de trabajar con metas claras de ventas y no solo métricas de vanidad.'
  },
  {
    id: 2,
    title: 'Según mis cálculos... necesitas meterle al contenido',
    category: 'creatividad',
    categoryLabel: 'Contenido Orgánico',
    src: 'assets/piezas/2.png',
    desc: 'Creativo publicitario con estética retro-vintage (calculadora verde). Humor inteligente aplicado a la necesidad urgente de los negocios de generar presencia digital.',
    objective: 'Motivar a emprendedores a invertir en creación periódica de contenido visual atractivo.'
  },
  {
    id: 3,
    title: 'Paso 2: Objetivos Claros para tu Empresa',
    category: 'estrategia',
    categoryLabel: 'Metodología & Estrategia',
    src: 'assets/piezas/3.png',
    desc: 'Pieza pedagógica que explica la importancia de definir metas concretas: aumentar ventas, dar a conocer la empresa y mejorar la presencia digital.',
    objective: 'Alinear las necesidades específicas del cliente antes de disparar cualquier anuncio.'
  },
  {
    id: 4,
    title: 'Paso 3: Plan de Acción y Público Objetivo',
    category: 'estrategia',
    categoryLabel: 'Metodología & Estrategia',
    src: 'assets/piezas/4.png',
    desc: 'Infografía publicitaria enfocada en la segmentación: tipo de contenido, mensajes principales y determinación precisa del cliente ideal.',
    objective: 'Evitar el desperdicio de presupuesto dirigiéndose exactamente al comprador correcto.'
  },
  {
    id: 5,
    title: 'Paso 4: Creación de Contenido, Videos y Web',
    category: 'branding',
    categoryLabel: 'Producción & Diseño',
    src: 'assets/piezas/5.png',
    desc: 'Muestra de la fase creativa: diseño de piezas, guiones, videos promocionales, investigación de tendencias y desarrollo de páginas web.',
    objective: 'Presentar el abanico integral de servicios de producción publicitaria.'
  },
  {
    id: 6,
    title: 'Paso 5: Informes y Métricas Reales',
    category: 'estrategia',
    categoryLabel: 'Analítica & Crecimiento',
    src: 'assets/piezas/6.png',
    desc: 'Reporte de resultados entregables: alcances, impresiones, interacciones y el crecimiento cuantificable de la empresa tras la campaña publicitaria.',
    objective: 'Garantizar transparencia total sobre el rendimiento de cada campaña.'
  },
  {
    id: 7,
    title: 'Tu Marca + Tu Contenido + Tu Producto',
    category: 'branding',
    categoryLabel: 'Ecosistema de Marca',
    src: 'assets/piezas/7.png',
    desc: 'Pieza de cierre conceptual: cada elemento cumple un rol diferente pero complementario. Incluye los canales directos de atención de Impulsapyme.',
    objective: 'Conectar identidad, valor de producto y llamados a la acción claros hacia WhatsApp e Instagram.'
  }
];

let currentLightboxIndex = 0;

function initGallery() {
  const container = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  if (!container) return;

  function renderGallery(filter = 'all') {
    container.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === filter);

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 cursor-pointer group flex flex-col';
      card.innerHTML = `
        <div class="relative overflow-hidden bg-stone-100 aspect-[4/5] flex items-center justify-center">
          <img 
            src="${item.src}" 
            alt="${item.title}" 
            class="gallery-img w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/95 text-stone-900 rounded-full font-semibold text-xs tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <svg class="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              Ver Pieza Completa
            </span>
          </div>
          <span class="absolute top-3 left-3 bg-white/90 backdrop-blur text-emerald-950 font-medium text-xs px-2.5 py-1 rounded-full shadow-sm">
            ${item.categoryLabel}
          </span>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-800 transition-colors">
              ${item.title}
            </h4>
            <p class="text-xs text-stone-500 mt-2 line-clamp-2">
              ${item.desc}
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
            <span>Explorar detalle</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(galleryData.findIndex(g => g.id === item.id));
      });

      container.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-900', 'text-white', 'shadow-sm');
        b.classList.add('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');
      });
      btn.classList.add('bg-emerald-900', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');

      const filter = btn.dataset.filter;
      renderGallery(filter);
    });
  });

  renderGallery('all');
  initLightboxControls();
}

function initLightboxControls() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => changeLightboxImage(-1));
  nextBtn?.addEventListener('click', () => changeLightboxImage(1));

  // Cerrar al dar click en el fondo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Atajos de teclado
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
  });
}

function openLightbox(index) {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  currentLightboxIndex = index;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

function changeLightboxImage(step) {
  currentLightboxIndex = (currentLightboxIndex + step + galleryData.length) % galleryData.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = galleryData[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const badge = document.getElementById('lightbox-badge');
  const desc = document.getElementById('lightbox-desc');
  const obj = document.getElementById('lightbox-objective');
  const counter = document.getElementById('lightbox-counter');
  const quoteBtn = document.getElementById('lightbox-quote-btn');

  if (img) img.src = item.src;
  if (title) title.textContent = item.title;
  if (badge) badge.textContent = item.categoryLabel;
  if (desc) desc.textContent = item.desc;
  if (obj) obj.textContent = item.objective;
  if (counter) counter.textContent = `${currentLightboxIndex + 1} de ${galleryData.length}`;

  if (quoteBtn) {
    const text = encodeURIComponent(`Hola Impulsapyme, vi en su galería la pieza publicitaria "${item.title}" y me gustaría cotizar una propuesta similar para mi negocio.`);
    quoteBtn.href = `https://wa.me/57312458911?text=${text}`;
  }
}

/* ==========================================================================
   5. Acordeón de Preguntas Frecuentes (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const content = i.querySelector('.faq-content');
        const icon = i.querySelector('.faq-icon');
        if (content) content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   6. Formulario de Contacto Interactivo
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const sendWhatsappBtn = document.getElementById('send-whatsapp-direct');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  function getFormData() {
    return {
      name: document.getElementById('contact-name')?.value.trim() || '',
      company: document.getElementById('contact-company')?.value.trim() || '',
      phone: document.getElementById('contact-phone')?.value.trim() || '',
      service: document.getElementById('contact-service')?.value || 'Plan General',
      budget: document.getElementById('contact-budget')?.value || '$20 - $100',
      message: document.getElementById('contact-message')?.value.trim() || ''
    };
  }

  // Enviar directamente por WhatsApp
  sendWhatsappBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!data.name || !data.message) {
      alert('Por favor completa al menos tu nombre y tu mensaje antes de enviar.');
      return;
    }
    const text = `¡Hola Impulsapyme! Mi nombre es ${data.name}${data.company ? ` de la empresa ${data.company}` : ''}. Me comunico desde la web para consultar sobre: ${data.service}. Presupuesto estimado: ${data.budget}. Mi consulta: ${data.message}. Mi contacto: ${data.phone}`;
    window.open(`https://wa.me/57312458911?text=${encodeURIComponent(text)}`, '_blank');
  });

  // Envío tradicional / simulación con feedback
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    
    if (!data.name || !data.message) {
      if (statusMsg) {
        statusMsg.textContent = 'Por favor completa todos los campos requeridos.';
        statusMsg.className = 'text-sm font-semibold text-rose-600 block mt-3';
      }
      return;
    }

    if (statusMsg) {
      statusMsg.textContent = '¡Gracias por contactarnos! Tu mensaje fue recibido. Si deseas respuesta inmediata, haz clic en el botón de WhatsApp abajo.';
      statusMsg.className = 'text-sm font-semibold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 block mt-3';
    }

    // Auto-generar link mailto como respaldo
    const mailto = `mailto:naomirestrepoalvrez@gmail.com?subject=Consulta Web Impulsapyme - ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`Nombre: ${data.name}\nEmpresa: ${data.company}\nTeléfono: ${data.phone}\nServicio: ${data.service}\nPresupuesto: ${data.budget}\nMensaje: ${data.message}`)}`;
    
    setTimeout(() => {
      const openMail = confirm('¿Deseas enviar también una copia por correo electrónico a naomirestrepoalvrez@gmail.com?');
      if (openMail) {
        window.location.href = mailto;
      }
    }, 400);

    form.reset();
  });
}

/* ==========================================================================
   7. Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
