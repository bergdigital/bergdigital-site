document.querySelectorAll('a[href*=".html"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    event.preventDefault();
    const destination = new URL(link.href);
    destination.searchParams.set('v', '6f0e048');
    if (link.pathname.endsWith('/index.html')) {
      try { sessionStorage.setItem('bergDigitalIntroSeen', '1'); } catch {}
      destination.searchParams.set('from', 'products');
    }
    document.body.classList.add('leaving');
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 130);
  });
});
