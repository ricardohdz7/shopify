// --- Safe Swiper init helper (evita crashes y dobles inits)
function safeInitSwiper(selector, options, onErrorLabel) {
  try {
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return null; // no hay contenedor en DOM

    // Estructura mínima requerida por Swiper
    var wrapper = el.querySelector('.swiper-wrapper');
    var slide = el.querySelector('.swiper-slide');
    if (!wrapper || !slide) return null; // contenedor inválido → no iniciar

    // Evitar doble inicialización
    if (el.__swiper_inited__) return el.__swiper_instance__ || null;

    var instance = new Swiper(typeof selector === 'string' ? selector : el, options);
    el.__swiper_inited__ = true;
    el.__swiper_instance__ = instance;
    return instance;
  } catch (err) {
    console.warn(onErrorLabel || '[Swiper] init error', err); // no bloquea el resto
    return null;
  }
}
safeInitSwiper(
  '.carma-header-swiper',
  {
    direction: 'horizontal',
    loop: true,
    slidesPerView: '1',
    autoplay: true,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-custom-next', prevEl: '.swiper-custom-prev' },
    scrollbar: { el: '.swiper-scrollbar' },
  },
  '[Swiper] .carma-header-swiper init error'
);

safeInitSwiper(
  '.baner',
  {
    direction: 'horizontal',
    loop: true,
    slidesPerView: '1',
    autoplay: true,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  },
  '[Swiper] .baner init error'
);

safeInitSwiper(
  '.marquee-swiper',
  {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    speed: 4000,
    spaceBetween: 30,
    autoplay: { delay: 1, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  },
  '[Swiper] .marquee-swiper init error'
);

safeInitSwiper(
  '.swiper-recomendations',
  {
    direction: 'horizontal',
    loop: true,
    slidesPerView: '1',
    autoplay: false,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-custom-siguiente', prevEl: '.swiper-custom-anterior' },
  },
  '[Swiper] .swiper-recomendations init error'
);
if (document.querySelector('.baner')) {
  try {
    const baner = new Swiper('.baner', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: '1',
      autoplay: true,
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  } catch (err) {
    console.error('[Swiper] .baner init error', err);
  }
}
if (document.querySelector('.marquee-swiper')) {
  try {
    const features = new Swiper('.marquee-swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      speed: 4000,
      spaceBetween: 30,
      autoplay: { delay: 1, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  } catch (err) {
    console.error('[Swiper] .marquee-swiper init error', err);
  }
}
if (document.querySelector('.swiper-recomendations')) {
  try {
    const recomendations = new Swiper('.swiper-recomendations', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: '1',
      autoplay: false,
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-custom-siguiente', prevEl: '.swiper-custom-anterior' },
    });
  } catch (err) {
    console.error('[Swiper] .swiper-recomendations init error', err);
  }
}
if (window.innerWidth >= 992) {
  var header = document.querySelector('.carma-header');
  if (header) {
    // Mostrar megamenú al pasar por desktop-level
    header.addEventListener(
      'mouseenter',
      function (e) {
        var desktopLevel = e.target.closest('.desktop-level');
        if (!desktopLevel || !header.contains(desktopLevel)) return;
        var megamenuNum = desktopLevel.getAttribute('data-hover');
        if (!megamenuNum) return;
        console.log('[menu] mouseover on .desktop-level →', megamenuNum);

        document.querySelectorAll('.megamenu-item').forEach(function (menu) {
          if (!menu.classList.contains('position-' + megamenuNum)) menu.classList.remove('show');
        });
        var showMenu = document.querySelector('.megamenu-item.position-' + CSS.escape(megamenuNum));
        if (showMenu) showMenu.classList.add('show');
        showMenu.addEventListener('mouseleave', function handler() {
          showMenu.classList.remove('show');
          showMenu.removeEventListener('mouseleave', handler);
        });
      },
      true
    );
  } else {
    console.warn('[menu] .carma-header not found');
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var qtyInput = document.querySelector('input[name="quantity"]');
  if (!qtyInput) return;

  // Impide ingresar caracteres no numéricos
  qtyInput.addEventListener('input', function (e) {
    // Solo permite dígitos, elimina todo lo que no sea número
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  // Evita pegar caracteres no numéricos
  qtyInput.addEventListener('paste', function (e) {
    var paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^\d+$/.test(paste)) {
      e.preventDefault();
    }
  });

  // Opcional: Impide arrastrar texto no numérico
  qtyInput.addEventListener('drop', function (e) {
    var data = e.dataTransfer.getData('text');
    if (!/^\d+$/.test(data)) {
      e.preventDefault();
    }
  });

  // Opcional: No permite seleccionar texto dentro del input (estético)
  qtyInput.addEventListener('selectstart', function (e) {
    // Si no quieres permitir selección, descomenta:
    // e.preventDefault();
  });
});
/* ---------- Ajuste de altura para columnas de thumbnails ---------- */
(function () {
  function applyThumbMaxHeight() {
    document.querySelectorAll('.product-gallery').forEach((gallery) => {
      const featured = gallery.querySelector('.featured-image');
      const thumbsCol = gallery.querySelector('.column-thumbnails');
      if (featured) {
        if (thumbsCol) thumbsCol.style.maxHeight = `${featured.offsetHeight}px`;
      }
    });
  }
  // Ejecutar una vez que todo esté cargado
  window.addEventListener('load', applyThumbMaxHeight);
  // Reaplicar al redimensionar
  window.addEventListener('resize', applyThumbMaxHeight);

  // Observar cambios dinámicos (e.g., AJAX)
  const observer = new MutationObserver(applyThumbMaxHeight);
  observer.observe(document.body, { childList: true, subtree: true });
})();
document.addEventListener(
  'mouseenter',
  (e) => {
    // ¿El puntero ha entrado en una miniatura?
    if (!(e.target instanceof Element) || !e.target.matches('.thumbnail-image')) return;

    const thumb = e.target; // la miniatura real
    const card = thumb.closest('.product-gallery'); // su tarjeta padre
    if (!card) return;
    const gallery = card.querySelectorAll('.imagen-producto');
    const key = thumb.dataset.image;

    gallery.forEach((img) => img.classList.toggle('active', img.dataset.image === key));
  },
  true // fase de captura → dispara antes que Bubbling y capta todos los hovers
);
/* ---------- Selector de valores de variante (click) ---------- */
document.addEventListener('click', (e) => {
  // ¿Se hizo clic en un elemento .value dentro de .product-form?
  const valueBtn = e.target.closest('.product-form .value');
  if (!valueBtn) return;

  const form = valueBtn.closest('.product-form');
  if (!form) return;

  const optionName = valueBtn.dataset.option; // ej. "Talla del calzado"
  const optionValue = valueBtn.dataset.value;

  // Actualiza el select oculto correspondiente
  const select = form.querySelector(`select[name="options[${optionName}]"]`);
  if (select) {
    select.value = optionValue;
    // Dispara el evento change para que Shopify cambie la variante
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Marca la tarjeta .option correspondiente
  form
    .querySelectorAll(`.value[data-option="${optionName}"]`)
    .forEach((el) => el.closest('.option')?.classList.toggle('active', el === valueBtn));
});
document.addEventListener('DOMContentLoaded', () => {
  // 1) Recorre cada formulario de producto que tenga JSON de variantes
  document.querySelectorAll('.product-form').forEach((form) => {
    const addBtn = form.querySelector('.add-to-cart-btn');
    if (!addBtn) return;

    // Guardar el texto original del botón (para cuando sí hay stock)
    const originalText = addBtn.textContent.trim();

    // Objeto con TODAS las variantes (inyéctalo en data-attr o busca en <script type="application/json">)
    let productData = null;
    try {
      productData = JSON.parse(form.dataset.productJson); // → { variants:[...] }
      if (!productData || !Array.isArray(productData.variants)) return;
    } catch (_) {
      return;
    }

    // ¿Hay al menos una variante disponible?
    const anyVariantAvailable = productData.variants.some((v) => !!v && v.available === true);

    function toggleAddButton() {
      const selects = form.querySelectorAll('select[name^="options"]');
      const chosen = Array.from(selects).map((s) => (s.value || '').trim());

      let variant = null;

      if (selects.length === 0) {
        // Producto "simple": sólo la variante Default Title
        variant = productData.variants[0] || null;

        if (!variant) {
          // Sin variante: deshabilitar y decidir texto por disponibilidad global
          addBtn.disabled = true;
          addBtn.textContent = anyVariantAvailable ? originalText : 'Agotado';
          const variantInput = form.querySelector('.selected-variant-id');
          if (variantInput) variantInput.value = '';
          return;
        }
      } else {
        // Si falta alguna opción, no habilites (y no muestres “Agotado” todavía si hay stock en otras variantes)
        if (chosen.some((v) => v === '')) {
          addBtn.disabled = true;
          addBtn.textContent = anyVariantAvailable ? originalText : 'Agotado';
          const variantInput = form.querySelector('.selected-variant-id');
          if (variantInput) variantInput.value = '';
          return;
        }
        // Busca la variante que coincide con todas las opciones elegidas
        variant =
          productData.variants.find(
            (v) => v && Array.isArray(v.options) && v.options.every((opt, idx) => opt === chosen[idx])
          ) || null;

        // Si la combinación no existe, deshabilita con texto original (aún puede haber stock en otras)
        if (!variant) {
          addBtn.disabled = true;
          addBtn.textContent = anyVariantAvailable ? originalText : 'Agotado';
          const variantInput = form.querySelector('.selected-variant-id');
          if (variantInput) variantInput.value = '';
          return;
        }
      }

      // A partir de aquí sí hay una variante determinada
      if (variant.available === true) {
        addBtn.disabled = false;
        addBtn.textContent = originalText;
      } else {
        addBtn.disabled = true;
        addBtn.textContent = 'Agotado';
      }

      // Actualizar input oculto con el ID de la variante seleccionada
      const variantInput = form.querySelector('.selected-variant-id');
      if (variantInput) variantInput.value = variant && variant.id ? variant.id : '';
    }

    // Ejecuta una vez al cargar (por si hay valores preseleccionados)
    toggleAddButton();

    // y cada vez que cambie algún <select>
    form.addEventListener('change', (e) => {
      if (e.target.matches('select[name^="options"]')) toggleAddButton();
    });
  });
});
/* ---------- Aumentar o disminuir campo de cantidad ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // Para cada formulario de producto...
  document.querySelectorAll('.product-form').forEach(function (form) {
    const cantidadGroup = form.querySelector('.cantidad');
    if (!cantidadGroup) return;

    const input = cantidadGroup.querySelector('input[name="quantity"]');
    const btnMinus = cantidadGroup.querySelector('.input-group-text.minus');
    const btnPlus = cantidadGroup.querySelector('.input-group-text.plus');
    if (!input || !btnMinus || !btnPlus) return;

    // Obtén inventario máximo dinámicamente, según variante seleccionada (o producto simple)
    function getMaxQty() {
      const selectedInput = form.querySelector('.selected-variant-id');
      if (!selectedInput) return null;

      const variantId = selectedInput.value;
      const variantDiv = form.querySelector(`.variant-inventory-data [data-variant-id="${variantId}"]`);
      if (!variantDiv) return null;

      // Si inventory_management es null o vacío, significa que es "ilimitado"
      const inventoryManagement = variantDiv.getAttribute('data-inventory-management');
      if (!inventoryManagement) return null;

      // Lee el inventario, si existe
      const qty = parseInt(variantDiv.getAttribute('data-inventory'), 10);
      return isNaN(qty) ? null : qty;
    }

    // Limpiar input: sólo números mayores a cero
    function sanitizeInput() {
      let val = parseInt(input.value.replace(/[^0-9]/g, ''), 10);
      if (isNaN(val) || val < 1) val = 1;
      input.value = val;
    }

    btnMinus.addEventListener('click', function () {
      sanitizeInput();
      let val = parseInt(input.value, 10) || 1;
      val = Math.max(val - 1, 1);
      input.value = val;
    });

    btnPlus.addEventListener('click', function () {
      sanitizeInput();
      let val = parseInt(input.value, 10) || 1;
      const maxQty = getMaxQty();
      if (maxQty === null) {
        val = val + 1; // Sin límite
      } else {
        val = Math.min(val + 1, maxQty);
      }
      input.value = val;
    });

    input.addEventListener('input', function () {
      sanitizeInput();
      const maxQty = getMaxQty();
      let val = parseInt(input.value, 10) || 1;
      if (maxQty !== null && val > maxQty) input.value = maxQty;
    });

    // Cuando se cambie variante, ajusta cantidad si es mayor al inventario de la variante nueva
    form.addEventListener('change', function (e) {
      if (e.target.matches('select[name^="options"]')) {
        const maxQty = getMaxQty();
        let val = parseInt(input.value, 10) || 1;
        if (maxQty !== null && val > maxQty) input.value = maxQty;
      }
    });
  });
});
function fetchCartModal(abrir_modal = false) {
  const modalEl = document.getElementById('cartModal');
  const modalContent = modalEl ? modalEl.querySelector('.modal-content') : null;
  const isOpen = modalEl ? modalEl.classList.contains('show') : false;
  const modalInstance = modalEl ? bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: true }) : null;

  fetch('/?section_id=carma-cart-drawer')
    .then((response) => response.text())
    .then((html) => {
      if (modalContent) {
        // Reemplaza el contenido del modal
        modalContent.innerHTML = html;

        // Cargar recomendaciones dentro del modal
        cargarRecomendacionesCarrito();

        // --- ACTUALIZA EL HEADER ---
        // 1. Crea un DOM temporal para leer el span.cantidad que llega por AJAX
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const spanCantidad = tempDiv.querySelector('span.cantidad');
        if (spanCantidad) {
          // 2. Actualiza el header (ajusta el selector si es necesario)
          const headerSpan = document.querySelector('.cart-header > span');
          if (headerSpan) headerSpan.textContent = spanCantidad.textContent;
        }
        // --- /ACTUALIZA EL HEADER ---

        // Si ya está abierto, NO vuelvas a abrir (evita apilar modales)
        if (abrir_modal) {
          if (!isOpen && modalInstance) {
            modalInstance.show();
          }
          // Si ya estaba abierto, mantenerlo sin duplicar backdrops/handlers
        }
      }
    })
    .catch((err) => {
      console.error('[cartModal] fetch error', err);
    });
}
fetchCartModal();
function cargarRecomendacionesCarrito() {
  const recosContainer = document.querySelector('.carma-cart-recommendations');
  const productIdsDiv = document.getElementById('carma-cart-product-ids');
  if (!recosContainer || !productIdsDiv) return;

  const ids = productIdsDiv.getAttribute('data-product-ids').split(',').filter(Boolean);
  const productId = ids.length ? ids[ids.length - 1] : null;
  if (!productId) return;

  fetch(`/recommendations/products?product_id=${productId}&limit=2&section_id=carma-product-recommendations`)
    .then((res) => res.text())
    .then((html) => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const section = temp.querySelector('.carma-recommendations');
      recosContainer.innerHTML = section ? section.innerHTML : html;
    })
    .catch(console.error);
}
// Remover artículo del carrito
document.addEventListener('click', function (e) {
  if (e.target.closest('.remove-cart-item')) {
    e.preventDefault();

    var removeBtn = e.target.closest('.remove-cart-item');
    var line = removeBtn.getAttribute('data-line');
    var cartProduct = removeBtn.closest('.cart-product');
    if (cartProduct) cartProduct.classList.add('loading');

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ line: Number(line), quantity: 0 }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCartModal();
      })
      .catch((err) => {
        alert('Error al eliminar el artículo');
        console.error(err);
      });
  }
});

// Cambiar cantidad
document.addEventListener('click', function (e) {
  const plusBtn = e.target.closest('.input-group-text.plus');
  const minusBtn = e.target.closest('.input-group-text.minus');
  if (!plusBtn && !minusBtn) return;

  const cantidadGroup = (plusBtn || minusBtn).closest('.cantidad');
  if (!cantidadGroup) return;

  const input = cantidadGroup.querySelector('input[name="quantity"]');
  if (!input) return;

  const cartProduct = cantidadGroup.closest('.cart-product');
  if (!cartProduct) return;

  const removeBtn = cartProduct.querySelector('.remove-cart-item');
  if (!removeBtn) return;

  const line = removeBtn.getAttribute('data-line');
  if (!line) return;

  let val = parseInt(input.value.replace(/[^0-9]/g, ''), 10) || 1;
  if (plusBtn) {
    val += 1;
  } else if (minusBtn) {
    val = Math.max(val - 1, 1);
  }
  input.value = val;

  cartProduct.classList.add('loading');

  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ line: Number(line), quantity: val }),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchCartModal();
    })
    .catch((err) => {
      alert('Error al actualizar la cantidad');
      console.error(err);
    });
});
// --- Maneja el envío AJAX para formularios de productos secundarios (tarjetas en catálogo, colección, etc.) dentro de .carma-product-card ---
// Captura el evento submit para formularios que agregan productos al carrito desde tarjetas.
// - Previene el envío tradicional del formulario.
// - Deshabilita el botón y le agrega la clase .loading mientras espera la respuesta de Shopify.
// - Al terminar, vuelve a habilitar el botón y remueve la clase .loading.
// - Llama a fetchCartModal(true) para mostrar el modal del carrito actualizado.
document.addEventListener('submit', function (e) {
  const form = e.target.closest('.carma-product-card form[action*="/cart/add"]');
  if (!form) return;

  e.preventDefault();

  // Extrae datos del formulario
  const formData = new FormData(form);

  // Estado visual: deshabilita botón y agrega .loading
  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.classList.add('loading');
  }

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Error al añadir el producto');
      return res.json();
    })
    .then(function (data) {
      // Restablece el botón
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('loading');
      }
      fetchCartModal(true);
    })
    .catch(function (err) {
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('loading');
      }
      alert('Hubo un problema al añadir el producto al carrito');
      console.error(err);
    });
});

// --- Maneja el envío AJAX para el formulario de producto principal (página de producto) ---
// Similar al anterior, pero solo para el formulario principal dentro de .carma-main-product.
// - Si el botón está deshabilitado, no envía el formulario.
// - Deshabilita y muestra .loading en el botón durante la petición AJAX.
// - Vuelve a habilitar y remueve .loading al terminar.
document.addEventListener('DOMContentLoaded', function () {
  var productForm = document.querySelector('.carma-main-product .product-form[action="/cart/add"]');
  if (!productForm) return;

  productForm.addEventListener('submit', function (e) {
    var btn = productForm.querySelector('button[type="submit"]');
    // Si el botón está deshabilitado, NO envía
    if (btn && btn.disabled) {
      e.preventDefault();
      return false;
    }
    e.preventDefault();

    // Estado visual: deshabilita y agrega .loading
    if (btn) {
      btn.disabled = true;
      btn.classList.add('loading');
    }

    var formData = new FormData(productForm);

    fetch(productForm.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Error al añadir el producto');
        return res.json();
      })
      .then(function (data) {
        if (btn) {
          btn.disabled = false;
          btn.classList.remove('loading');
        }
        fetchCartModal(true);
      })
      .catch(function (err) {
        if (btn) {
          btn.disabled = false;
          btn.classList.remove('loading');
        }
        alert('Hubo un problema al añadir el producto al carrito');
        console.error(err);
      });
  });
});
// Maneja el input directo en el carrito (en el input de cantidad)
document.addEventListener(
  'blur',
  function (e) {
    // Solo nos interesa el input de cantidad DENTRO del carrito
    if (!e.target.matches('.cart-product input[name="quantity"]')) return;

    const input = e.target;
    const cantidadGroup = input.closest('.cantidad');
    if (!cantidadGroup) return;
    const cartProduct = cantidadGroup.closest('.cart-product');
    if (!cartProduct) return;
    const removeBtn = cartProduct.querySelector('.remove-cart-item');
    if (!removeBtn) return;

    const line = removeBtn.getAttribute('data-line');
    if (!line) return;

    let val = parseInt(input.value.replace(/[^0-9]/g, ''), 10) || 1;
    // Opcional: podrías validar máximo de stock aquí si quieres.
    input.value = val; // Sanitiza

    cartProduct.classList.add('loading');

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ line: Number(line), quantity: val }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCartModal();
      })
      .catch((err) => {
        alert('Error al actualizar la cantidad');
        console.error(err);
      });
  },
  true
); // usa captura para que funcione incluso si se renderiza por AJAX
document.addEventListener(
  'keydown',
  function (e) {
    if (e.target.matches('.cart-product input[name="quantity"]') && (e.key === 'Enter' || e.keyCode === 13)) {
      e.target.blur(); // Forzamos blur para que el listener anterior dispare el envío AJAX
    }
  },
  true
);
/**
 * Aplica un efecto marquee infinito a un contenedor de elementos hijos.
 * @param {string|Element} containerSelector - Selector o elemento padre.
 * @param {Object} [options] - Opciones: {speed: px/segundo, gap: px entre duplicados}
 */
function makeMarquee(containerSelector, options = {}) {
  const speed = options.speed || 80; // píxeles por segundo
  const gap = options.gap || 0;

  // Consigue el contenedor
  const container =
    typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;

  // --- Crea el wrapper de hijos originales ---
  const originalContent = document.createElement('div');
  originalContent.className = 'marquee-track';

  // Extrae y mueve los hijos al track
  while (container.firstChild) {
    originalContent.appendChild(container.firstChild);
  }

  container.appendChild(originalContent);

  // Duplica el contenido para loop infinito
  const clone = originalContent.cloneNode(true);
  clone.classList.add('marquee-track-clone');
  container.appendChild(clone);

  let width = 0;

  // Crea la animación
  function animate() {
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      let elapsed = (ts - start) / 1000;
      let shift = (elapsed * speed) % width;
      originalContent.style.transform = `translateX(${-shift}px)`;
      clone.style.transform = `translateX(${-shift}px)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Espera render y mide
  setTimeout(() => {
    width = originalContent.scrollWidth;
    console.log('ancho: ' + width);
    animate();
  }, 50);
}
makeMarquee('.carma-sobre-nosotros-innovacion-features', { speed: 100, gap: 30 });
makeMarquee('.carma-sobre-nosotros-innovacion-logos', { speed: 100, gap: 30 });
safeInitSwiper(
  '.personal.swiper',
  {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-customized-next',
      prevEl: '.swiper-customized-prev',
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
    },
  },
  '[Swiper] .personal.swiper init error'
);

safeInitSwiper(
  '.galeria',
  {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: '.galeria.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  },
  '[Swiper] .galeria init error'
);

safeInitSwiper(
  '.blog',
  {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 1 },
      992: { slidesPerView: 2 },
    },
  },
  '[Swiper] .blog init error'
);

safeInitSwiper(
  '.servicio-recomendados',
  {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  },
  '[Swiper] .servicio-recomendados init error'
);
document.addEventListener('click', function (e) {
  const trigger = e.target.closest('.service-link');
  if (!trigger) return;

  const posicion = trigger.getAttribute('data-posicion');

  // Oculta todas las secciones con la clase utilitaria de Bootstrap
  document.querySelectorAll('.carma-servicio-necesitas').forEach((el) => {
    el.classList.add('d-none');
  });

  // Muestra la sección seleccionada removiendo d-none
  const target = document.querySelector('.carma-servicio-necesitas.position-' + CSS.escape(posicion));
  if (target) target.classList.remove('d-none');
});
document.querySelectorAll('.carma-necesitas-swiper').forEach(function (el) {
  safeInitSwiper(el, { slidesPerView: 'auto', spaceBetween: 20 }, '[Swiper] .carma-necesitas-swiper init error');
});
safeInitSwiper(
  '.carma-sobre-nosotros-servicios-swiper',
  {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  },
  '[Swiper] .carma-sobre-nosotros-servicios-swiper init error'
);
// Hover to open/close Bootstrap Collapse — reusable
function attachHoverCollapse(rootSelector, opts) {
  var ROOT = typeof rootSelector === 'string' ? document.querySelector(rootSelector) : rootSelector;
  if (!ROOT || !window.bootstrap || !bootstrap.Collapse) return;

  var HOVER_IN_DELAY = (opts && opts.hoverInDelay) || 120; // ms
  var HOVER_OUT_DELAY = (opts && opts.hoverOutDelay) || 180; // ms
  var timers = new WeakMap();

  function getTargetSelector(trigger) {
    return trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
  }
  function getCollapse(trigger) {
    var sel = getTargetSelector(trigger);
    if (!sel) return null;
    var el = document.querySelector(sel);
    if (!el) return null;
    return bootstrap.Collapse.getOrCreateInstance(el, { toggle: false });
  }
  function show(trigger) {
    var c = getCollapse(trigger);
    if (c) c.show();
  }
  function hide(trigger) {
    var c = getCollapse(trigger);
    if (c) c.hide();
  }

  // Vincula a cada trigger con .has-submenu dentro del contenedor raíz
  ROOT.querySelectorAll('.has-submenu').forEach(function (anchor) {
    var sel = getTargetSelector(anchor);
    var panel = sel ? document.querySelector(sel) : null;

    // Entrar al trigger
    anchor.addEventListener('mouseenter', function () {
      clearTimeout(timers.get(anchor));
      timers.set(
        anchor,
        setTimeout(function () {
          show(anchor);
        }, HOVER_IN_DELAY)
      );
    });

    // Salir del trigger (si entras al panel, no cierres)
    anchor.addEventListener('mouseleave', function (e) {
      if (panel && panel.contains(e.relatedTarget)) return;
      clearTimeout(timers.get(anchor));
      timers.set(
        anchor,
        setTimeout(function () {
          hide(anchor);
        }, HOVER_OUT_DELAY)
      );
    });

    // Mantener abierto si pasas el mouse al panel
    if (panel) {
      panel.addEventListener('mouseenter', function () {
        clearTimeout(timers.get(anchor));
        show(anchor);
      });
      panel.addEventListener('mouseleave', function (e) {
        if (anchor.contains(e.relatedTarget)) return;
        clearTimeout(timers.get(anchor));
        timers.set(
          anchor,
          setTimeout(function () {
            hide(anchor);
          }, HOVER_OUT_DELAY)
        );
      });
    }
  });

  // (Opcional) Cerrar otros cuando se abre uno (comportamiento tipo acordeón dentro del mismo root)
  ROOT.addEventListener('shown.bs.collapse', function (ev) {
    ROOT.querySelectorAll('.collapse.show').forEach(function (el) {
      if (el !== ev.target) bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).hide();
    });
  });
}

// Llamada para tu menú superior actual
document.addEventListener('DOMContentLoaded', function () {
  attachHoverCollapse('.top-menu');
});

// === Mobile submenu wiring (<992px) — vanilla, resize-safe ===
(function () {
  var mq = window.matchMedia('(max-width: 991.98px)');
  var calledHoverForMenuPrincipal = false;

  function applyMobileSubmenus() {
    var isMobile = mq.matches;
    var nodes = document.querySelectorAll('.submenu-mobile');

    nodes.forEach(function (el) {
      var idx = el.getAttribute('data-hover');
      if (!idx) return; // necesita data-hover para apuntar al panel
      var targetId = 'collapseMobile-' + idx;

      if (isMobile) {
        // Añade atributos sólo una vez
        if (el.getAttribute('data-mobile-init') === '1') return;
        el.setAttribute('data-bs-toggle', 'collapse');
        el.setAttribute('data-bs-target', '#' + targetId);
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-controls', targetId);
        el.setAttribute('data-mobile-init', '1');

        // (Opcional) aviso si no existe el panel destino
        if (!document.getElementById(targetId)) {
          console.warn('[submenu-mobile] Panel destino no encontrado:', '#' + targetId);
        }
      } else {
        // Desktop: limpia atributos si fueron añadidos en móvil
        if (el.getAttribute('data-mobile-init') === '1') {
          el.removeAttribute('data-bs-toggle');
          el.removeAttribute('data-bs-target');
          el.removeAttribute('aria-expanded');
          el.removeAttribute('aria-controls');
          el.removeAttribute('data-mobile-init');
        }
      }
    });

    // Llama una vez a la funcionalidad de hover para `.menu-principal` si está disponible.
    // (Aunque en móvil no tendrá efecto por ser hover, lo dejamos solicitado por requisitos.)
    if (typeof attachHoverCollapse === 'function' && !calledHoverForMenuPrincipal) {
      try {
        attachHoverCollapse('.menu-principal');
        calledHoverForMenuPrincipal = true;
      } catch (e) {
        console.debug('[submenu-mobile] attachHoverCollapse no disponible todavía');
      }
    }
  }

  // Ejecuta al cargar
  document.addEventListener('DOMContentLoaded', applyMobileSubmenus);

  // Reaccionar a cambios de viewport (resize/orientación)
  if (mq.addEventListener) {
    mq.addEventListener('change', applyMobileSubmenus);
  } else if (mq.addListener) {
    // Safari/iOS antiguos
    mq.addListener(applyMobileSubmenus);
  }
})();
(function () {
  // breakpoint móvil
  var mq = window.matchMedia('(max-width: 767.98px)');
  var ROOT_SELECTOR = '#collection-filters';

  function collapseAllFiltersIfMobile() {
    if (!mq.matches) return; // solo actuamos en <= 767px

    var root = document.querySelector(ROOT_SELECTOR);
    if (!root) return;

    // Recorre cada botón del acordeón
    root.querySelectorAll('.accordion-button[data-bs-toggle="collapse"]').forEach(function (btn) {
      var targetSel = btn.getAttribute('data-bs-target') || btn.getAttribute('href');
      if (!targetSel) return;

      var panel = document.querySelector(targetSel);
      if (!panel) return;

      // 1) Marcar el botón como colapsado
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.add('collapsed');

      // 2) Ocultar el panel (clases)
      panel.classList.remove('show');

      // 3) Si está Bootstrap, usar su API para asegurarlo
      if (window.bootstrap && bootstrap.Collapse) {
        var inst = bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false });
        try {
          inst.hide();
        } catch (_) {}
      }
    });
  }

  // Ejecuta al cargar y ante cambios de tamaño
  document.addEventListener('DOMContentLoaded', collapseAllFiltersIfMobile);
  if (mq.addEventListener) mq.addEventListener('change', collapseAllFiltersIfMobile);
  else if (mq.addListener) mq.addListener(collapseAllFiltersIfMobile); // Safari viejo
})();
/* ---------- Filtros responsivos (sin jQuery) ---------- */
(function () {
  // Desactivado: los filtros ahora se abren en una ventana modal.
  return;
  // Breakpoint de móvil: < 768 px
  const mql = window.matchMedia('(max-width: 767.98px)');

  // Inicializa el comportamiento para cada contenedor de colección
  function initContainer(container) {
    const header = container.querySelector('.encabezado');
    const filters = container.querySelector('.collapsible');
    if (!header || !filters) return;

    // Estado interno para evitar múltiples listeners
    let isBound = false;

    // Helpers de visibilidad
    const hide = () => {
      filters.style.display = 'none';
    };
    const show = () => {
      filters.style.display = '';
    };
    const isHidden = () =>
      // Considera tanto 'none' explícito como el caso inicial (por si el CSS lo oculta)
      getComputedStyle(filters).display === 'none';

    // Handler único para el header
    const onHeaderClick = () => {
      if (isHidden()) {
        show();
      } else {
        hide();
      }
    };

    // Aplica la UI según el breakpoint
    const apply = () => {
      if (mql.matches) {
        // Móvil: oculto por defecto y habilito el toggle
        hide();
        if (!isBound) {
          header.addEventListener('click', onHeaderClick);
          isBound = true;
        }
      } else {
        // Desktop: siempre visible y sin toggle
        show();
        if (isBound) {
          header.removeEventListener('click', onHeaderClick);
          isBound = false;
        }
      }
    };

    // Primera aplicación
    apply();

    // Reaccionar a cambios de viewport
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', apply);
    } else {
      // Safari viejo
      mql.addListener(apply);
    }

    // Opcional: reforzar ante cambios de layout que alteren display
    window.addEventListener('resize', apply);
  }

  // Soporta múltiples colecciones en la página
  document.querySelectorAll('.carma-collection-main').forEach(initContainer);
})();
// --- Sucursales: en móvil, al cambiar de tab, hacer scroll a tab-content ---
(function () {
  var mq = window.matchMedia('(max-width: 767.98px)');

  function bindMobileTabScroll() {
    if (!mq.matches) return;

    var root = document.querySelector('.carma-sucursales-main-v2');
    if (!root) return;

    var tabContent = root.querySelector('.tab-content');
    if (!tabContent) return;

    // Delegación: funciona aunque los tabs se re-rendericen
    root.addEventListener(
      'click',
      function (e) {
        var link = e.target.closest('.nav-link');
        if (!link || !root.contains(link)) return;

        // Espera un tick para que el tab cambie (Bootstrap/JS)
        setTimeout(function () {
          try {
            tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (_) {
            // fallback
            window.scrollTo(0, tabContent.getBoundingClientRect().top + window.pageYOffset);
          }
        }, 50);
      },
      true
    );
  }

  document.addEventListener('DOMContentLoaded', bindMobileTabScroll);
})();
(function () {
  // Delegación: funciona aunque el offcanvas/render cambie el DOM
  document.addEventListener('change', function (e) {
    var radio = e.target;
    if (!radio || radio.name !== 'sort_by_radio') return;

    var formMobile = radio.closest('#FacetSortFormMobile');
    if (!formMobile) return;

    var desktopSelect = document.getElementById('SortByDesktop');
    if (!desktopSelect) return;

    // 1) Refleja el valor en el select desktop
    desktopSelect.value = radio.value;

    // 2) Dispara change para que facets.js haga el fetch y actualice URL/grid
    desktopSelect.dispatchEvent(new Event('change', { bubbles: true }));
  });
})();
(function () {
  document.addEventListener('change', function (e) {
    var sel = e.target;
    if (!sel || sel.id !== 'SortByDesktop') return;

    var value = sel.value;
    document.querySelectorAll('#FacetSortFormMobile input[name="sort_by_radio"]').forEach(function (r) {
      r.checked = r.value === value;
    });
  });
})();
// --- Sync product count (desktop -> mobile/offcanvas) for Dawn facets AJAX updates ---
(function () {
  function parseFirstInt(text) {
    if (!text) return null;
    var m = String(text).match(/\d+/);
    return m ? parseInt(m[0], 10) : null;
  }

  function formatCount(n) {
    if (typeof n !== 'number' || isNaN(n)) return null;
    return n + (n === 1 ? ' producto' : ' productos');
  }

  function applyCountFromText(text) {
    var n = parseFirstInt(text);
    var label = formatCount(n);
    if (!label) return;

    // Mobile count
    var mobile = document.getElementById('ProductCountMobile') || document.querySelector('.result-count');
    if (mobile) mobile.textContent = label;

    // Offcanvas CTA
    var btn = document.getElementById('OffcanvasResultsBtn') || document.querySelector('.offcanvas-footer button');
    if (btn) btn.textContent = 'Ver resultados (' + n + ')';
  }

  function init() {
    var desktop = document.getElementById('ProductCount');
    if (!desktop) return;

    // Initial sync
    applyCountFromText(desktop.textContent);

    // Observe changes done by facets.js (AJAX)
    var obs = new MutationObserver(function () {
      applyCountFromText(desktop.textContent);
    });

    obs.observe(desktop, { childList: true, characterData: true, subtree: true });

    // Safety: also resync after product grid gets swapped
    var grid = document.getElementById('ProductGridContainer');
    if (grid) {
      var gridObs = new MutationObserver(function () {
        // facets.js usually updates ProductCount too, but this covers edge cases
        applyCountFromText(desktop.textContent);
      });
      gridObs.observe(grid, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
