/* ===========================
   BotAcademy Xal — i18n + currency engine
   =========================== */

(function(){

  const LANG_KEY = 'botacademy_lang';
  const CURR_KEY = 'botacademy_currency';

  /* ---------- Currency config ----------
     Tasas fijas de referencia (junio 2026):
     1 USD = 17.50 MXN | 1 EUR = 19.90 MXN
  */
  const RATES = {
    MXN: { rate: 1,        symbol: '$',  suffix: 'MXN' },
    USD: { rate: 1/17.50,  symbol: '$',  suffix: 'USD' },
    EUR: { rate: 1/19.90,  symbol: '€',  suffix: 'EUR' }
  };

  function getCurrency(){
    return localStorage.getItem(CURR_KEY) || 'MXN';
  }
  function setCurrency(code){
    localStorage.setItem(CURR_KEY, code);
  }
  function getLang(){
    return localStorage.getItem(LANG_KEY) || 'es';
  }
  function setLang(code){
    localStorage.setItem(LANG_KEY, code);
  }

  function convertPrice(mxnAmount, currCode){
    const cfg = RATES[currCode] || RATES.MXN;
    const converted = mxnAmount * cfg.rate;
    const rounded = currCode === 'MXN' ? Math.round(converted) : Math.round(converted * 100) / 100;
    return { value: rounded, symbol: cfg.symbol, suffix: cfg.suffix };
  }

  function formatPrice(mxnAmount, currCode){
    const { value, symbol, suffix } = convertPrice(mxnAmount, currCode);
    const formatted = currCode === 'MXN'
      ? value.toLocaleString('es-MX', { minimumFractionDigits: 0 })
      : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formatted} ${suffix}`;
  }

  /* expose for cart.js */
  window.BotAcademyI18N = { getCurrency, setCurrency, getLang, setLang, convertPrice, formatPrice, RATES };

  /* ---------- Translation dictionary ----------
     Key: data-i18n value. Value: { es, en, en-gb }
     en-gb only stores entries that actually differ from en (spelling/vocab);
     falls back to en otherwise.
  */
  const DICT = {
    /* Nav */
    nav_home: { es:'Inicio', en:'Home', 'en-gb':'Home' },
    nav_kits: { es:'Kits', en:'Kits', 'en-gb':'Kits' },
    nav_memberships: { es:'Membresías', en:'Memberships', 'en-gb':'Memberships' },
    nav_about: { es:'Nosotros', en:'About', 'en-gb':'About' },
    nav_contact: { es:'Contacto', en:'Contact', 'en-gb':'Contact' },
    nav_view_kits: { es:'Ver kits', en:'View kits', 'en-gb':'View kits' },
    nav_contact_us: { es:'Contáctanos', en:'Contact us', 'en-gb':'Contact us' },

    /* Hero (home) */
    hero_eyebrow: { es:'Academia de robótica de competencia', en:'Competitive robotics academy', 'en-gb':'Competitive robotics academy' },
    hero_title_1: { es:'Aprende a controlar la tecnología,', en:'Learn to control technology,', 'en-gb':'Learn to control technology,' },
    hero_title_2: { es:'no a depender de ella.', en:'not to depend on it.', 'en-gb':'not to depend on it.' },
    hero_sub: { es:'Kits de robots de fútbol, sumo, seguidores de línea y RC. Construye, programa y compite — con mentores reales guiándote en cada paso.', en:'Soccer, sumo, line-following and RC robot kits. Build, program and compete — with real mentors guiding you every step of the way.', 'en-gb':'Football, sumo, line-following and RC robot kits. Build, program and compete — with real mentors guiding you every step of the way.' },
    hero_btn_explore: { es:'Explorar kits', en:'Explore kits', 'en-gb':'Explore kits' },
    hero_btn_memberships: { es:'Ver membresías', en:'View memberships', 'en-gb':'View memberships' },
    hero_stat1_label: { es:'Categorías de robots', en:'Robot categories', 'en-gb':'Robot categories' },
    hero_stat2_label: { es:'Kits disponibles', en:'Kits available', 'en-gb':'Kits available' },
    hero_stat3_label: { es:'Mentoría humana', en:'Human mentorship', 'en-gb':'Human mentorship' },
    hero_panel_caption: { es:'Foto: robot de competencia armado', en:'Photo: assembled competition robot', 'en-gb':'Photo: assembled competition robot' },
    hero_tag: { es:'EN DESARROLLO — UNIDAD 04', en:'IN PROGRESS — UNIT 04', 'en-gb':'IN PROGRESS — UNIT 04' },

    /* Especialidades (home) */
    spec_eyebrow: { es:'Nuestras especialidades', en:'Our specialties', 'en-gb':'Our specialities' },
    spec_title: { es:'Cuatro disciplinas, un mismo principio: entender antes de competir', en:'Four disciplines, one principle: understand before you compete', 'en-gb':'Four disciplines, one principle: understand before you compete' },
    spec_sub: { es:'Cada categoría enseña un set distinto de habilidades de ingeniería, programación y estrategia.', en:'Each category teaches a different set of engineering, programming and strategy skills.', 'en-gb':'Each category teaches a different set of engineering, programming and strategy skills.' },
    spec1_title: { es:'Robots futbolistas', en:'Soccer robots', 'en-gb':'Football robots' },
    spec1_desc: { es:'Estrategia, sensores y velocidad de reacción en tiempo real sobre la cancha.', en:'Strategy, sensors and real-time reaction speed on the field.', 'en-gb':'Strategy, sensors and real-time reaction speed on the pitch.' },
    spec2_title: { es:'Seguidores de línea', en:'Line followers', 'en-gb':'Line followers' },
    spec2_desc: { es:'Lógica de control y calibración de sensores para trazar la ruta perfecta.', en:'Control logic and sensor calibration to trace the perfect path.', 'en-gb':'Control logic and sensor calibration to trace the perfect path.' },
    spec3_title: { es:'Robots sumo', en:'Sumo robots', 'en-gb':'Sumo robots' },
    spec3_desc: { es:'Diseño mecánico, torque y estrategias de empuje para dominar el ring.', en:'Mechanical design, torque and pushing strategies to dominate the ring.', 'en-gb':'Mechanical design, torque and pushing strategies to dominate the ring.' },
    spec4_title: { es:'Robots RC', en:'RC robots', 'en-gb':'RC robots' },
    spec4_desc: { es:'Control remoto, electrónica y ajuste fino para circuitos de alta velocidad.', en:'Remote control, electronics and fine-tuning for high-speed circuits.', 'en-gb':'Remote control, electronics and fine-tuning for high-speed circuits.' },
    spec5_title: { es:'Kits para todo nivel', en:'Kits for every level', 'en-gb':'Kits for every level' },
    spec5_desc: { es:'Desde tu primer circuito hasta arquitecturas avanzadas de microcontroladores.', en:'From your first circuit to advanced microcontroller architectures.', 'en-gb':'From your first circuit to advanced microcontroller architectures.' },
    spec6_title: { es:'Mentorías 1 a 1', en:'1-on-1 mentorships', 'en-gb':'1-to-1 mentorships' },
    spec6_desc: { es:'Acompañamiento personalizado con especialistas en cada disciplina.', en:'Personalized guidance from specialists in each discipline.', 'en-gb':'Personalised guidance from specialists in each discipline.' },

    /* Story block (home + nosotros) */
    story_eyebrow: { es:'Por qué existimos', en:'Why we exist', 'en-gb':'Why we exist' },
    story_quote: { es:'"Vimos un vacío en la educación tecnológica: se enseña a usar, no a entender. Eso nos hace dependientes."', en:'"We saw a gap in tech education: it teaches you to use, not to understand. That makes us dependent."', 'en-gb':'"We saw a gap in tech education: it teaches you to use, not to understand. That makes us dependent."' },
    story_body: { es:'En BotAcademy Xal creemos lo contrario — que para dominar el futuro hay que comprender cómo funciona desde sus bases. No usuarios de la tecnología: creadores de ella.', en:'At BotAcademy Xal we believe the opposite — that mastering the future means understanding how it works from the ground up. Not users of technology: creators of it.', 'en-gb':'At BotAcademy Xal we believe the opposite — that mastering the future means understanding how it works from the ground up. Not users of technology: creators of it.' },
    story_btn: { es:'Conoce nuestra historia', en:'Discover our story', 'en-gb':'Discover our story' },
    story_media_caption: { es:'Foto: estudiante construyendo un kit', en:'Photo: student building a kit', 'en-gb':'Photo: student building a kit' },

    /* Membership preview (home) */
    memb_preview_eyebrow: { es:'Membresías', en:'Memberships', 'en-gb':'Memberships' },
    memb_preview_title: { es:'Mentoría personal con quienes ya recorrieron el camino', en:'Personal mentorship from those who already walked the path', 'en-gb':'Personal mentorship from those who already walked the path' },
    memb_preview_sub: { es:'Nuestras membresías te dan acceso directo a mentores especializados en cada categoría de robot.', en:'Our memberships give you direct access to mentors specialized in each robot category.', 'en-gb':'Our memberships give you direct access to mentors specialised in each robot category.' },
    cta_home_title: { es:'¿Listo para ir más allá de armar un kit?', en:'Ready to go beyond building a kit?', 'en-gb':'Ready to go beyond building a kit?' },
    cta_home_sub: { es:'Compara los tres planes de membresía y elige el acompañamiento que necesitas.', en:'Compare the three membership plans and choose the support you need.', 'en-gb':'Compare the three membership plans and choose the support you need.' },
    cta_home_btn: { es:'Ver planes de membresía', en:'View membership plans', 'en-gb':'View membership plans' },

    /* Footer (shared) */
    footer_tagline: { es:'Aprende a controlar la tecnología, no a depender de ella.', en:'Learn to control technology, not to depend on it.', 'en-gb':'Learn to control technology, not to depend on it.' },
    footer_explore: { es:'Explorar', en:'Explore', 'en-gb':'Explore' },
    footer_kits_link: { es:'Catálogo de kits', en:'Kit catalog', 'en-gb':'Kit catalogue' },
    footer_memberships_link: { es:'Membresías', en:'Memberships', 'en-gb':'Memberships' },
    footer_about_link: { es:'Nuestra historia', en:'Our story', 'en-gb':'Our story' },
    footer_categories: { es:'Categorías', en:'Categories', 'en-gb':'Categories' },
    footer_cat1: { es:'Robots futbolistas', en:'Soccer robots', 'en-gb':'Football robots' },
    footer_cat2: { es:'Seguidores de línea', en:'Line followers', 'en-gb':'Line followers' },
    footer_cat3: { es:'Robots sumo', en:'Sumo robots', 'en-gb':'Sumo robots' },
    footer_cat4: { es:'Robots RC', en:'RC robots', 'en-gb':'RC robots' },
    footer_contact: { es:'Contacto', en:'Contact', 'en-gb':'Contact' },
    footer_contact_link: { es:'Escríbenos', en:'Write to us', 'en-gb':'Write to us' },
    footer_rights: { es:'© 2026 BotAcademy Xal. Todos los derechos reservados.', en:'© 2026 BotAcademy Xal. All rights reserved.', 'en-gb':'© 2026 BotAcademy Xal. All rights reserved.' },
    footer_made: { es:'Hecho con', en:'Made with', 'en-gb':'Made with' },
    footer_made_2: { es:'para creadores', en:'for creators', 'en-gb':'for creators' },

    /* Cart */
    cart_title: { es:'Tu carrito', en:'Your cart', 'en-gb':'Your basket' },
    cart_empty: { es:'Tu carrito está vacío.<br>Explora los kits y arma tu primer robot.', en:'Your cart is empty.<br>Explore the kits and build your first robot.', 'en-gb':'Your basket is empty.<br>Explore the kits and build your first robot.' },
    cart_view_kits: { es:'Ver kits', en:'View kits', 'en-gb':'View kits' },
    cart_subtotal: { es:'Subtotal', en:'Subtotal', 'en-gb':'Subtotal' },
    cart_checkout: { es:'Finalizar compra', en:'Checkout', 'en-gb':'Checkout' },
    toast_added: { es:'se agregó al carrito', en:'was added to your cart', 'en-gb':'was added to your basket' },

    /* Kits page */
    kits_eyebrow: { es:'Catálogo', en:'Catalog', 'en-gb':'Catalogue' },
    kits_title: { es:'Kits para construir tu propio robot', en:'Kits to build your own robot', 'en-gb':'Kits to build your own robot' },
    kits_sub: { es:'Cada kit incluye piezas, componentes electrónicos y una guía de armado. Elige tu categoría y empieza a construir.', en:'Each kit includes parts, electronic components and a build guide. Choose your category and start building.', 'en-gb':'Each kit includes parts, electronic components and a build guide. Choose your category and start building.' },
    filter_all: { es:'Todos', en:'All', 'en-gb':'All' },
    filter_futbol: { es:'Futbolistas', en:'Soccer', 'en-gb':'Football' },
    filter_linea: { es:'Seguidores de línea', en:'Line followers', 'en-gb':'Line followers' },
    filter_sumo: { es:'Sumo', en:'Sumo', 'en-gb':'Sumo' },
    filter_rc: { es:'RC', en:'RC', 'en-gb':'RC' },
    badge_bestseller: { es:'Más vendido', en:'Best seller', 'en-gb':'Best seller' },
    badge_new: { es:'Nuevo', en:'New', 'en-gb':'New' },
    cat_futbol: { es:'Robots futbolistas', en:'Soccer robots', 'en-gb':'Football robots' },
    cat_linea: { es:'Seguidores de línea', en:'Line followers', 'en-gb':'Line followers' },
    cat_sumo: { es:'Robots sumo', en:'Sumo robots', 'en-gb':'Sumo robots' },
    cat_rc: { es:'Robots RC', en:'RC robots', 'en-gb':'RC robots' },
    spec_motors4: { es:'4 motores DC', en:'4 DC motors', 'en-gb':'4 DC motors' },
    spec_motors2: { es:'2 motores DC', en:'2 DC motors', 'en-gb':'2 DC motors' },
    spec_sensor_ir: { es:'Sensor IR', en:'IR sensor', 'en-gb':'IR sensor' },
    spec_level_intermediate: { es:'Nivel: intermedio', en:'Level: intermediate', 'en-gb':'Level: intermediate' },
    spec_level_beginner: { es:'Nivel: principiante', en:'Level: beginner', 'en-gb':'Level: beginner' },
    spec_level_advanced: { es:'Nivel: avanzado', en:'Level: advanced', 'en-gb':'Level: advanced' },
    spec_chassis_light: { es:'Chasis ligero', en:'Lightweight chassis', 'en-gb':'Lightweight chassis' },
    spec_sensors5: { es:'5 sensores IR', en:'5 IR sensors', 'en-gb':'5 IR sensors' },
    spec_microcontroller: { es:'Microcontrolador', en:'Microcontroller', 'en-gb':'Microcontroller' },
    spec_sensors8: { es:'8 sensores IR', en:'8 IR sensors', 'en-gb':'8 IR sensors' },
    spec_pid: { es:'PID configurable', en:'Configurable PID', 'en-gb':'Configurable PID' },
    spec_motor_torque: { es:'Motor alto torque', en:'High-torque motor', 'en-gb':'High-torque motor' },
    spec_chassis_reinforced: { es:'Chasis reforzado', en:'Reinforced chassis', 'en-gb':'Reinforced chassis' },
    spec_low_base: { es:'Base baja', en:'Low base', 'en-gb':'Low base' },
    spec_control_24: { es:'Control 2.4GHz', en:'2.4GHz remote control', 'en-gb':'2.4GHz remote control' },
    spec_suspension: { es:'Suspensión ajustable', en:'Adjustable suspension', 'en-gb':'Adjustable suspension' },
    spec_tires: { es:'Llantas slick', en:'Slick tires', 'en-gb':'Slick tyres' },
    btn_add_cart: { es:'Agregar al carrito', en:'Add to cart', 'en-gb':'Add to basket' },
    btn_buy_now: { es:'Comprar ahora', en:'Buy now', 'en-gb':'Buy now' },
    cta_kits_title: { es:'¿No sabes cuál kit elegir?', en:"Not sure which kit to choose?", 'en-gb':"Not sure which kit to choose?" },
    cta_kits_sub: { es:'Una membresía incluye mentoría personalizada para guiarte en tu primera compra.', en:'A membership includes personalized mentorship to guide your first purchase.', 'en-gb':'A membership includes personalised mentorship to guide your first purchase.' },
    cta_kits_btn: { es:'Ver membresías', en:'View memberships', 'en-gb':'View memberships' },

    /* Memberships page */
    memb_eyebrow: { es:'Membresías', en:'Memberships', 'en-gb':'Memberships' },
    memb_title: { es:'Mentoría personalizada con quienes ya recorrieron el camino', en:'Personalized mentorship from those who already walked the path', 'en-gb':'Personalised mentorship from those who already walked the path' },
    memb_sub: { es:'Cada plan incluye acceso a mentores especializados en robótica de competencia, además de beneficios exclusivos en kits y eventos.', en:'Each plan includes access to mentors specialized in competitive robotics, plus exclusive benefits on kits and events.', 'en-gb':'Each plan includes access to mentors specialised in competitive robotics, plus exclusive benefits on kits and events.' },
    plan1_name: { es:'Constructor', en:'Builder', 'en-gb':'Builder' },
    plan1_title: { es:'Básica', en:'Basic', 'en-gb':'Basic' },
    plan1_desc: { es:'Para quienes empiezan a explorar la robótica por su cuenta.', en:'For those starting to explore robotics on their own.', 'en-gb':'For those starting to explore robotics on their own.' },
    plan1_f1: { es:'1 sesión de mentoría grupal al mes', en:'1 group mentorship session per month', 'en-gb':'1 group mentorship session per month' },
    plan1_f2: { es:'Acceso a la comunidad en Discord', en:'Access to the Discord community', 'en-gb':'Access to the Discord community' },
    plan1_f3: { es:'5% de descuento en kits', en:'5% discount on kits', 'en-gb':'5% discount on kits' },
    plan1_f4: { es:'Guías de armado en PDF', en:'PDF build guides', 'en-gb':'PDF build guides' },
    plan_btn_start: { es:'Empezar', en:'Get started', 'en-gb':'Get started' },
    plan_badge_popular: { es:'Más popular', en:'Most popular', 'en-gb':'Most popular' },
    plan2_name: { es:'Ingeniero', en:'Engineer', 'en-gb':'Engineer' },
    plan2_title: { es:'Pro', en:'Pro', 'en-gb':'Pro' },
    plan2_desc: { es:'Para quienes quieren competir en serio con guía constante.', en:'For those who want to compete seriously with constant guidance.', 'en-gb':'For those who want to compete seriously with constant guidance.' },
    plan2_f1: { es:'2 mentorías personales 1 a 1 al mes', en:'2 personal 1-on-1 mentorships per month', 'en-gb':'2 personal 1-to-1 mentorships per month' },
    plan2_f2: { es:'Revisión de código y diseño', en:'Code and design review', 'en-gb':'Code and design review' },
    plan2_f3: { es:'15% de descuento en kits', en:'15% discount on kits', 'en-gb':'15% discount on kits' },
    plan2_f4: { es:'Acceso prioritario a torneos internos', en:'Priority access to internal tournaments', 'en-gb':'Priority access to internal tournaments' },
    plan2_f5: { es:'Acceso a la comunidad en Discord', en:'Access to the Discord community', 'en-gb':'Access to the Discord community' },
    plan3_name: { es:'Especialista', en:'Specialist', 'en-gb':'Specialist' },
    plan3_title: { es:'Elite', en:'Elite', 'en-gb':'Elite' },
    plan3_desc: { es:'Acompañamiento intensivo para equipos que van a competencias.', en:'Intensive support for teams heading to competitions.', 'en-gb':'Intensive support for teams heading to competitions.' },
    plan3_f1: { es:'Mentorías ilimitadas 1 a 1', en:'Unlimited 1-on-1 mentorships', 'en-gb':'Unlimited 1-to-1 mentorships' },
    plan3_f2: { es:'Mentor asignado fijo', en:'Dedicated assigned mentor', 'en-gb':'Dedicated assigned mentor' },
    plan3_f3: { es:'25% de descuento en kits', en:'25% discount on kits', 'en-gb':'25% discount on kits' },
    plan3_f4: { es:'Preparación específica para torneos', en:'Specific tournament preparation', 'en-gb':'Specific tournament preparation' },
    plan3_f5: { es:'Acceso anticipado a nuevos kits', en:'Early access to new kits', 'en-gb':'Early access to new kits' },
    period_month: { es:'/ mes', en:'/ month', 'en-gb':'/ month' },

    mentors_eyebrow: { es:'Nuestros mentores', en:'Our mentors', 'en-gb':'Our mentors' },
    mentors_title: { es:'Especialistas formados, no solo entusiastas', en:'Trained specialists, not just enthusiasts', 'en-gb':'Trained specialists, not just enthusiasts' },
    mentors_sub: { es:'Cada mentor está enfocado en una disciplina específica para darte una guía realmente experta.', en:'Each mentor focuses on a specific discipline to give you truly expert guidance.', 'en-gb':'Each mentor focuses on a specific discipline to give you truly expert guidance.' },
    mentor1_role: { es:'Robots futbolistas', en:'Soccer robots', 'en-gb':'Football robots' },
    mentor1_bio: { es:'Ingeniero en mecatrónica, 6 años diseñando estrategias para torneos de robótica de fútbol.', en:'Mechatronics engineer with 6 years designing strategies for soccer robotics tournaments.', 'en-gb':'Mechatronics engineer with 6 years designing strategies for football robotics tournaments.' },
    mentor2_role: { es:'Seguidores de línea', en:'Line followers', 'en-gb':'Line followers' },
    mentor2_bio: { es:'Especialista en control y sensórica, enfocada en optimización de algoritmos PID.', en:'Control and sensing specialist, focused on optimizing PID algorithms.', 'en-gb':'Control and sensing specialist, focused on optimising PID algorithms.' },
    mentor3_role: { es:'Robots sumo y RC', en:'Sumo and RC robots', 'en-gb':'Sumo and RC robots' },
    mentor3_bio: { es:'Diseñador mecánico con experiencia en competencias nacionales de combate robótico.', en:'Mechanical designer with experience in national robot combat competitions.', 'en-gb':'Mechanical designer with experience in national robot combat competitions.' },

    faq_eyebrow: { es:'Preguntas frecuentes', en:'Frequently asked questions', 'en-gb':'Frequently asked questions' },
    faq_title: { es:'Lo que más nos preguntan', en:'What people ask us most', 'en-gb':'What people ask us most' },
    faq1_q: { es:'¿Necesito experiencia previa para unirme a una membresía?', en:'Do I need prior experience to join a membership?', 'en-gb':'Do I need prior experience to join a membership?' },
    faq1_a: { es:'No. El plan Constructor está diseñado para quienes empiezan desde cero, con mentorías que te guían paso a paso.', en:'No. The Builder plan is designed for those starting from scratch, with mentorships that guide you step by step.', 'en-gb':'No. The Builder plan is designed for those starting from scratch, with mentorships that guide you step by step.' },
    faq2_q: { es:'¿Puedo cambiar de plan en cualquier momento?', en:'Can I change my plan at any time?', 'en-gb':'Can I change my plan at any time?' },
    faq2_a: { es:'Sí, puedes subir o bajar de plan cuando quieras desde tu cuenta, sin penalizaciones.', en:'Yes, you can upgrade or downgrade your plan anytime from your account, with no penalties.', 'en-gb':'Yes, you can upgrade or downgrade your plan anytime from your account, with no penalties.' },
    faq3_q: { es:'¿La membresía incluye los kits?', en:'Does the membership include the kits?', 'en-gb':'Does the membership include the kits?' },
    faq3_a: { es:'Los kits se compran por separado, pero cada membresía incluye un descuento exclusivo sobre el precio del catálogo.', en:'Kits are purchased separately, but each membership includes an exclusive discount on the catalog price.', 'en-gb':'Kits are purchased separately, but each membership includes an exclusive discount on the catalogue price.' },
    faq4_q: { es:'¿Cómo funcionan las mentorías 1 a 1?', en:'How do the 1-on-1 mentorships work?', 'en-gb':'How do the 1-to-1 mentorships work?' },
    faq4_a: { es:'Se agendan por videollamada con tu mentor asignado, donde revisan juntos tu progreso, código y diseño físico del robot.', en:'They are scheduled by video call with your assigned mentor, where you review your progress, code and physical robot design together.', 'en-gb':'They are scheduled by video call with your assigned mentor, where you review your progress, code and physical robot design together.' },

    /* Nosotros page */
    about_eyebrow: { es:'Nuestra historia', en:'Our story', 'en-gb':'Our story' },
    about_title: { es:'No usuarios de la tecnología: creadores de ella', en:'Not users of technology: creators of it', 'en-gb':'Not users of technology: creators of it' },
    about_sub: { es:'Así nació BotAcademy Xal y así pensamos cada kit, cada mentoría y cada clase que damos.', en:'This is how BotAcademy Xal was born, and how we think about every kit, mentorship and class we offer.', 'en-gb':'This is how BotAcademy Xal was born, and how we think about every kit, mentorship and class we offer.' },
    about_media_caption: { es:'Foto: equipo BotAcademy Xal en el taller', en:'Photo: BotAcademy Xal team at the workshop', 'en-gb':'Photo: BotAcademy Xal team at the workshop' },
    about_body2: { es:'Por eso elegimos la robótica de competencia como punto de entrada: porque construir un robot que juega fútbol, sigue una línea o gana un combate de sumo obliga a entender mecánica, electrónica y lógica al mismo tiempo — no solo a seguir instrucciones.', en:'That is why we chose competitive robotics as the entry point: building a robot that plays soccer, follows a line or wins a sumo match forces you to understand mechanics, electronics and logic at the same time — not just follow instructions.', 'en-gb':'That is why we chose competitive robotics as the entry point: building a robot that plays football, follows a line or wins a sumo match forces you to understand mechanics, electronics and logic at the same time — not just follow instructions.' },

    values_eyebrow: { es:'Lo que nos guía', en:'What guides us', 'en-gb':'What guides us' },
    values_title: { es:'Cuatro principios detrás de cada kit y cada mentoría', en:'Four principles behind every kit and every mentorship', 'en-gb':'Four principles behind every kit and every mentorship' },
    value1_title: { es:'Entender antes que usar', en:'Understand before using', 'en-gb':'Understand before using' },
    value1_desc: { es:'Cada producto se explica desde su funcionamiento, no solo desde su resultado.', en:'Every product is explained through how it works, not just what it does.', 'en-gb':'Every product is explained through how it works, not just what it does.' },
    value2_title: { es:'Mentoría humana', en:'Human mentorship', 'en-gb':'Human mentorship' },
    value2_desc: { es:'Detrás de cada plan hay una persona real acompañando tu proceso, no solo contenido grabado.', en:'Behind every plan there is a real person supporting your process, not just recorded content.', 'en-gb':'Behind every plan there is a real person supporting your process, not just recorded content.' },
    value3_title: { es:'Construir con las manos', en:'Build with your hands', 'en-gb':'Build with your hands' },
    value3_desc: { es:'Se aprende armando, programando y fallando — no solo leyendo o viendo videos.', en:'You learn by building, programming and failing — not just by reading or watching videos.', 'en-gb':'You learn by building, programming and failing — not just by reading or watching videos.' },
    value4_title: { es:'Acceso para todos', en:'Access for everyone', 'en-gb':'Access for everyone' },
    value4_desc: { es:'Sin requisitos previos. Cualquier persona con curiosidad puede empezar desde cero.', en:'No prior requirements. Anyone with curiosity can start from zero.', 'en-gb':'No prior requirements. Anyone with curiosity can start from zero.' },

    timeline_eyebrow: { es:'Cómo empezamos', en:'How we started', 'en-gb':'How we started' },
    timeline_title: { es:'El camino hasta hoy', en:'The road so far', 'en-gb':'The road so far' },
    tl1_title: { es:'La idea', en:'The idea', 'en-gb':'The idea' },
    tl1_desc: { es:'Identificamos que la educación tecnológica enseña a operar herramientas, pero rara vez explica cómo funcionan por dentro.', en:'We identified that tech education teaches you to operate tools, but rarely explains how they work inside.', 'en-gb':'We identified that tech education teaches you to operate tools, but rarely explains how they work inside.' },
    tl2_title: { es:'Los primeros kits', en:'The first kits', 'en-gb':'The first kits' },
    tl2_desc: { es:'Diseñamos los primeros kits de robots seguidores de línea y futbolistas, pensados para quienes nunca habían tocado electrónica.', en:'We designed the first line-following and soccer robot kits, made for people who had never touched electronics.', 'en-gb':'We designed the first line-following and football robot kits, made for people who had never touched electronics.' },
    tl3_title: { es:'Las mentorías', en:'The mentorships', 'en-gb':'The mentorships' },
    tl3_desc: { es:'Sumamos especialistas en cada disciplina para que el aprendizaje no dependiera solo de un manual, sino de una guía real.', en:'We brought in specialists in each discipline so learning would not depend only on a manual, but on real guidance.', 'en-gb':'We brought in specialists in each discipline so learning would not depend only on a manual, but on real guidance.' },
    tl4_title: { es:'BotAcademy Xal hoy', en:'BotAcademy Xal today', 'en-gb':'BotAcademy Xal today' },
    tl4_desc: { es:'Una academia con kits, membresías y una comunidad creciendo alrededor de la robótica de competencia.', en:'An academy with kits, memberships and a growing community around competitive robotics.', 'en-gb':'An academy with kits, memberships and a growing community around competitive robotics.' },

    cta_about_title: { es:'¿Quieres ser parte de esta comunidad?', en:'Want to be part of this community?', 'en-gb':'Want to be part of this community?' },
    cta_about_sub: { es:'Empieza con un kit o súmate a una membresía con mentoría incluida.', en:'Start with a kit or join a membership with mentorship included.', 'en-gb':'Start with a kit or join a membership with mentorship included.' },
    cta_about_btn: { es:'Explorar kits', en:'Explore kits', 'en-gb':'Explore kits' },

    /* Contacto page */
    contact_eyebrow: { es:'Contacto', en:'Contact', 'en-gb':'Contact' },
    contact_title: { es:'Hablemos de tu próximo robot', en:"Let's talk about your next robot", 'en-gb':"Let's talk about your next robot" },
    contact_sub: { es:'¿Tienes dudas sobre un kit, una membresía o quieres una mentoría? Escríbenos y te respondemos pronto.', en:'Questions about a kit, a membership, or want a mentorship? Write to us and we will get back to you soon.', 'en-gb':'Questions about a kit, a membership, or want a mentorship? Write to us and we will get back to you soon.' },
    label_name: { es:'Nombre completo', en:'Full name', 'en-gb':'Full name' },
    ph_name: { es:'Tu nombre', en:'Your name', 'en-gb':'Your name' },
    label_email: { es:'Correo electrónico', en:'Email address', 'en-gb':'Email address' },
    label_phone: { es:'Teléfono (opcional)', en:'Phone (optional)', 'en-gb':'Phone (optional)' },
    label_topic: { es:'¿En qué te podemos ayudar?', en:'How can we help you?', 'en-gb':'How can we help you?' },
    topic_kits: { es:'Información sobre kits', en:'Information about kits', 'en-gb':'Information about kits' },
    topic_memberships: { es:'Membresías y mentorías', en:'Memberships and mentorships', 'en-gb':'Memberships and mentorships' },
    topic_visit: { es:'Quiero visitar la academia', en:'I want to visit the academy', 'en-gb':'I want to visit the academy' },
    topic_other: { es:'Otro', en:'Other', 'en-gb':'Other' },
    label_message: { es:'Mensaje', en:'Message', 'en-gb':'Message' },
    ph_message: { es:'Cuéntanos qué necesitas...', en:'Tell us what you need...', 'en-gb':'Tell us what you need...' },
    btn_send: { es:'Enviar mensaje', en:'Send message', 'en-gb':'Send message' },
    toast_sent: { es:'Mensaje enviado. Te contactaremos pronto.', en:'Message sent. We will contact you soon.', 'en-gb':'Message sent. We will contact you soon.' },
    info_location: { es:'Ubicación', en:'Location', 'en-gb':'Location' },
    info_email: { es:'Correo', en:'Email', 'en-gb':'Email' },
    info_phone: { es:'Teléfono', en:'Phone', 'en-gb':'Phone' },
    info_hours: { es:'Horario', en:'Hours', 'en-gb':'Opening hours' },
    info_hours_val: { es:'Lun – Sáb, 10:00 – 19:00', en:'Mon – Sat, 10:00 AM – 7:00 PM', 'en-gb':'Mon – Sat, 10:00 – 19:00' },
    map_caption: { es:'Mapa: ubicación de la academia en Xalapa', en:'Map: academy location in Xalapa', 'en-gb':'Map: academy location in Xalapa' },
    follow_us: { es:'Síguenos', en:'Follow us', 'en-gb':'Follow us' },

    /* Selectors */
    lang_label: { es:'Idioma', en:'Language', 'en-gb':'Language' },
    currency_label: { es:'Moneda', en:'Currency', 'en-gb':'Currency' }
  };

  function applyTranslations(lang){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const entry = DICT[key];
      if(!entry) return;
      const text = entry[lang] || entry['en'] || entry['es'];
      if(text === undefined) return;
      if(el.hasAttribute('data-i18n-html')){
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      const entry = DICT[key];
      if(!entry) return;
      el.setAttribute('placeholder', entry[lang] || entry['en'] || entry['es']);
    });
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }

  function applyCurrencyToProducts(currCode){
    document.querySelectorAll('[data-price-mxn]').forEach(el=>{
      const mxn = parseFloat(el.getAttribute('data-price-mxn'));
      if(isNaN(mxn)) return;
      const { value, symbol } = window.BotAcademyI18N.convertPrice(mxn, currCode);
      const main = el.querySelector('.price-amount');
      const curr = el.querySelector('.price-currency-tag');
      if(main){
        main.textContent = currCode === 'MXN'
          ? value.toLocaleString('es-MX')
          : value.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
      }
      const symEl = el.querySelector('.price-symbol');
      if(symEl) symEl.textContent = symbol;
      if(curr) curr.textContent = currCode;
    });

    document.querySelectorAll('[data-plan-price-mxn]').forEach(el=>{
      const mxn = parseFloat(el.getAttribute('data-plan-price-mxn'));
      if(isNaN(mxn)) return;
      const { value, symbol } = window.BotAcademyI18N.convertPrice(mxn, currCode);
      const main = el.querySelector('.amount-value');
      const symEl = el.querySelector('.amount-symbol');
      if(main){
        main.textContent = currCode === 'MXN'
          ? value.toLocaleString('es-MX')
          : value.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
      }
      if(symEl) symEl.textContent = symbol;
    });

    document.querySelectorAll('.price-currency-suffix').forEach(el=> el.textContent = currCode);

    document.querySelectorAll('[data-add-cart],[data-buy-now]').forEach(btn=>{
      const mxn = parseFloat(btn.dataset.price);
      if(isNaN(mxn)) return;
    });

    document.querySelectorAll('.cur-pill').forEach(p=>{
      p.classList.toggle('active', p.dataset.curr === currCode);
    });
    document.querySelectorAll('.lang-pill').forEach(p=>{
      p.classList.toggle('active', p.dataset.lang === window.BotAcademyI18N.getLang());
    });
  }

  function initSelectors(){
    const lang = getLang();
    const curr = getCurrency();
    applyTranslations(lang);
    applyCurrencyToProducts(curr);

    document.querySelectorAll('.lang-pill').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        setLang(btn.dataset.lang);
        applyTranslations(btn.dataset.lang);
        document.querySelectorAll('.lang-pill').forEach(p=>p.classList.toggle('active', p===btn));
        if(window.renderCartUI) window.renderCartUI();
      });
    });
    document.querySelectorAll('.cur-pill').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        setCurrency(btn.dataset.curr);
        applyCurrencyToProducts(btn.dataset.curr);
        document.querySelectorAll('.cur-pill').forEach(p=>p.classList.toggle('active', p===btn));
        if(window.renderCartUI) window.renderCartUI();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initSelectors);

})();
