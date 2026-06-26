/* ===========================
   BotAcademy Xal — Shared JS
   Cart, drawer, FAQ, mobile nav
   Prices are always stored in MXN; display converts via BotAcademyI18N.
   =========================== */

(function(){

  const CART_KEY = 'botacademy_cart';

  function I18N(){ return window.BotAcademyI18N || {
    getCurrency: ()=>'MXN', getLang: ()=>'es',
    convertPrice: (mxn)=>({ value: mxn, symbol:'$', suffix:'MXN' }),
    formatPrice: (mxn)=>'$'+mxn+' MXN'
  }; }

  const T = {
    cart_title: { es:'Tu carrito', en:'Your cart', 'en-gb':'Your basket' },
    cart_empty: { es:'Tu carrito está vacío.<br>Explora los kits y arma tu primer robot.', en:'Your cart is empty.<br>Explore the kits and build your first robot.', 'en-gb':'Your basket is empty.<br>Explore the kits and build your first robot.' },
    cart_view_kits: { es:'Ver kits', en:'View kits', 'en-gb':'View kits' },
    cart_subtotal: { es:'Subtotal', en:'Subtotal', 'en-gb':'Subtotal' },
    cart_checkout: { es:'Finalizar compra', en:'Checkout', 'en-gb':'Checkout' },
    toast_added: { es:'se agregó al carrito', en:'was added to your cart', 'en-gb':'was added to your basket' },
    toast_sent: { es:'Mensaje enviado. Te contactaremos pronto.', en:'Message sent. We will contact you soon.', 'en-gb':'Message sent. We will contact you soon.' },
    reduce_qty: { es:'Reducir cantidad', en:'Decrease quantity', 'en-gb':'Decrease quantity' },
    increase_qty: { es:'Aumentar cantidad', en:'Increase quantity', 'en-gb':'Increase quantity' },
    remove_item: { es:'Eliminar', en:'Remove', 'en-gb':'Remove' }
  };

  function t(key){
    const lang = I18N().getLang();
    const entry = T[key];
    if(!entry) return key;
    return entry[lang] || entry.en || entry.es;
  }

  function getCart(){
    try{
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }catch(e){ return []; }
  }

  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartCount();
    renderCartDrawer();
  }

  function addToCart(product){
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    showToast(`${product.name} ${t('toast_added')}`);
  }

  function updateQty(id, delta){
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if(!item) return;
    item.qty += delta;
    const next = item.qty <= 0 ? cart.filter(i => i.id !== id) : cart;
    saveCart(next);
  }

  function removeFromCart(id){
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
  }

  function cartTotalMXN(cart){
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function cartCountTotal(cart){
    return cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function renderCartCount(){
    const cart = getCart();
    const count = cartCountTotal(cart);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function renderCartDrawer(){
    const itemsWrap = document.querySelector('.cart-items');
    const footWrap = document.querySelector('.cart-foot');
    if(!itemsWrap) return;

    const cart = getCart();
    const currCode = I18N().getCurrency();

    const titleEl = document.querySelector('.cart-head h3');
    if(titleEl) titleEl.textContent = t('cart_title');
    const subtotalLabel = document.querySelector('.cart-subtotal span:first-child');
    if(subtotalLabel) subtotalLabel.textContent = t('cart_subtotal');
    const checkoutBtn = document.querySelector('.cart-foot .btn-primary');
    if(checkoutBtn) checkoutBtn.textContent = t('cart_checkout');

    if(cart.length === 0){
      itemsWrap.innerHTML = '<div class="cart-empty"><i class="ti ti-shopping-cart-off" style="font-size:32px;" aria-hidden="true"></i><p>' + t('cart_empty') + '</p><a href="kits.html" class="btn btn-outline btn-sm">' + t('cart_view_kits') + '</a></div>';
      if(footWrap) footWrap.style.display = 'none';
      return;
    }

    if(footWrap) footWrap.style.display = 'block';

    itemsWrap.innerHTML = cart.map(function(item){
      const priceLabel = I18N().formatPrice(item.price, currCode);
      const imgHtml = item.img ? ('<img src="' + item.img + '" alt="' + item.name + '">') : '<i class="ti ti-cpu" aria-hidden="true"></i>';
      return '' +
        '<div class="cart-item" data-id="' + item.id + '">' +
          '<div class="cart-item-thumb">' + imgHtml + '</div>' +
          '<div>' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-price">' + priceLabel + '</div>' +
            '<div class="qty-control">' +
              '<button type="button" class="qty-minus" aria-label="' + t('reduce_qty') + '">\u2212</button>' +
              '<span>' + item.qty + '</span>' +
              '<button type="button" class="qty-plus" aria-label="' + t('increase_qty') + '">+</button>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="cart-item-remove" aria-label="' + t('remove_item') + ' ' + item.name + '">' +
            '<i class="ti ti-trash" aria-hidden="true"></i>' +
          '</button>' +
        '</div>';
    }).join('');

    const subtotalEl = document.querySelector('.cart-subtotal .value');
    if(subtotalEl) subtotalEl.textContent = I18N().formatPrice(cartTotalMXN(cart), currCode);

    itemsWrap.querySelectorAll('.qty-minus').forEach(function(btn){
      btn.addEventListener('click', function(e){
        const id = e.target.closest('.cart-item').dataset.id;
        updateQty(id, -1);
      });
    });
    itemsWrap.querySelectorAll('.qty-plus').forEach(function(btn){
      btn.addEventListener('click', function(e){
        const id = e.target.closest('.cart-item').dataset.id;
        updateQty(id, 1);
      });
    });
    itemsWrap.querySelectorAll('.cart-item-remove').forEach(function(btn){
      btn.addEventListener('click', function(e){
        const id = e.target.closest('.cart-item').dataset.id;
        removeFromCart(id);
      });
    });
  }

  window.renderCartUI = function(){
    renderCartDrawer();
  };

  let toastTimeout;
  function showToast(message){
    let toast = document.querySelector('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="ti ti-check" aria-hidden="true"></i> ' + message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function(){ toast.classList.remove('show'); }, 2600);
  }
  window.showToast = showToast;

  function initCartDrawer(){
    const overlay = document.querySelector('.cart-overlay');
    const drawer = document.querySelector('.cart-drawer');
    const openBtns = document.querySelectorAll('[data-cart-open]');
    const closeBtns = document.querySelectorAll('[data-cart-close]');

    function open(){
      overlay && overlay.classList.add('open');
      drawer && drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close(){
      overlay && overlay.classList.remove('open');
      drawer && drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    openBtns.forEach(function(b){ b.addEventListener('click', open); });
    closeBtns.forEach(function(b){ b.addEventListener('click', close); });
    overlay && overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
  }

  function initProductButtons(){
    document.querySelectorAll('[data-add-cart]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const product = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          img: btn.dataset.img || ''
        };
        addToCart(product);
      });
    });

    document.querySelectorAll('[data-buy-now]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const product = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          img: btn.dataset.img || ''
        };
        addToCart(product);
        const openBtn = document.querySelector('[data-cart-open]');
        if(openBtn) openBtn.click();
      });
    });
  }

  function initFilters(){
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('[data-category]');
    if(!chips.length) return;

    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('active'); });
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        cards.forEach(function(card){
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  function initFaq(){
    document.querySelectorAll('.faq-item').forEach(function(item){
      const q = item.querySelector('.faq-q');
      if(q){
        q.addEventListener('click', function(){
          const isOpen = item.classList.contains('open');
          item.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
          if(!isOpen) item.classList.add('open');
        });
      }
    });
  }

  function initMobileNav(){
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if(!toggle || !links) return;
    toggle.addEventListener('click', function(){
      const isOpen = links.style.display === 'flex';
      if(isOpen){
        links.style.display = 'none';
      } else {
        links.style.display = 'flex';
        links.style.position = 'absolute';
        links.style.top = '72px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = 'var(--carbon)';
        links.style.borderBottom = '1px solid var(--line)';
        links.style.flexDirection = 'column';
        links.style.padding = '20px 24px';
        links.style.gap = '18px';
      }
    });
  }

  function initContactForm(){
    const form = document.querySelector('#contact-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      showToast(t('toast_sent'));
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderCartCount();
    renderCartDrawer();
    initCartDrawer();
    initProductButtons();
    initFilters();
    initFaq();
    initMobileNav();
    initContactForm();
  });

})();
