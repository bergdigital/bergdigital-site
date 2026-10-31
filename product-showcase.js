const showcaseSlides = [
  {
    title: 'Sahibinden İlan Kartı',
    category: '01 / İLANLAR',
    description: 'İlanını müşterilerine tek dokunuşla göster. Telefonu karta yaklaştır, Sahibinden ilanına kolayca ulaşsınlar.',
    image: 'assets/products/high-quality/sahibinden.png',
    alt: 'Sahibinden ilan NFC kartı',
    href: 'urun-sahibinden.html?v=lossless-png'
  },
  {
    title: 'WhatsApp İletişim Kartı',
    category: '02 / İLETİŞİM',
    description: 'Müşterilerin tek dokunuşla WhatsApp sohbetine geçsin, sana hızlıca ulaşsın.',
    image: 'assets/products/high-quality/whatsapp-iletisim.png',
    alt: 'WhatsApp iletişim NFC kartı',
    href: 'urun-whatsapp.html?v=lossless-png'
  },
  {
    title: 'IBAN Kartı',
    category: '03 / ÖDEME',
    description: 'Ödeme bilgilerini paylaşmayı kolaylaştır. Telefonu karta dokundur, ilgili sayfa açılsın.',
    image: 'assets/products/high-quality/iban.png',
    alt: 'IBAN NFC kartı',
    href: 'urun-iban.html?v=lossless-png'
  },
  {
    title: 'Instagram Kartı',
    category: '04 / SOSYAL MEDYA',
    description: 'Profilini tek dokunuşla paylaş; müşterilerin seni ve çalışmalarını kolayca bulsun.',
    image: 'assets/products/high-quality/instagram.png',
    alt: 'Instagram NFC kartı',
    href: 'urun-instagram.html?v=lossless-png'
  },
  {
    title: 'Google Yorum Kartı',
    category: '05 / GERİ BİLDİRİM',
    description: 'Memnun müşterilerin Google değerlendirme sayfana kolayca ulaşsın.',
    image: 'assets/products/high-quality/google-yorum.png',
    alt: 'Google yorum NFC kartı',
    href: 'urun-google-yorum.html?v=lossless-png'
  }
];

const showcase = document.querySelector('.home-showcase');

if (showcase) {
  const layout = showcase.querySelector('.showcase-layout');
  const stage = showcase.querySelector('#showcase-stage');
  const card = showcase.querySelector('#showcase-card');
  const image = showcase.querySelector('#showcase-image');
  const category = showcase.querySelector('#showcase-category');
  const title = showcase.querySelector('#showcase-title');
  const description = showcase.querySelector('#showcase-description');
  const detailLink = showcase.querySelector('#showcase-link');
  const currentCount = showcase.querySelector('#showcase-current');
  const dots = [...showcase.querySelectorAll('.showcase-dot')];
  let activeIndex = 0;
  let pointerStart = null;
  let dragMoved = false;
  let suppressCardClick = false;
  let switching = false;

  function displayProduct(nextIndex) {
    if (switching) return;
    switching = true;
    activeIndex = (nextIndex + showcaseSlides.length) % showcaseSlides.length;
    layout.classList.add('is-changing');

    window.setTimeout(() => {
      const product = showcaseSlides[activeIndex];
      image.src = product.image;
      image.alt = product.alt;
      category.textContent = product.category;
      title.textContent = product.title;
      description.textContent = product.description;
      detailLink.href = product.href;
      card.href = product.href;
      card.setAttribute('aria-label', `${product.title} ürün detaylarını aç`);
      currentCount.textContent = String(activeIndex + 1).padStart(2, '0');
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === activeIndex;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      layout.classList.remove('is-changing');
      switching = false;
    }, 110);
  }

  function resetCardTilt() {
    card.classList.remove('is-dragging');
    stage.classList.remove('is-dragging');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    dragMoved = false;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) {
      dragMoved = true;
      card.classList.add('is-dragging');
      stage.classList.add('is-dragging');
    }
    const tiltY = Math.max(-27, Math.min(27, -7 + dx * 0.14));
    const tiltX = Math.max(-22, Math.min(22, 2 - dy * 0.14));
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
  });

  function finishPointer(event) {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    resetCardTilt();

    if (!dragMoved) return;
    suppressCardClick = true;
    window.setTimeout(() => { suppressCardClick = false; }, 350);

    if (Math.abs(dx) > 54 && Math.abs(dx) > Math.abs(dy) * 1.12) {
      displayProduct(activeIndex + (dx > 0 ? 1 : -1));
    }
  }

  stage.addEventListener('pointerup', finishPointer);
  stage.addEventListener('pointercancel', finishPointer);
  card.addEventListener('click', (event) => {
    if (!suppressCardClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  showcase.querySelector('#showcase-previous').addEventListener('click', () => displayProduct(activeIndex - 1));
  showcase.querySelector('#showcase-next').addEventListener('click', () => displayProduct(activeIndex + 1));
  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => displayProduct(dotIndex)));
}
