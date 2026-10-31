document.querySelectorAll('a[href*=".html"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    event.preventDefault();
    const destination = new URL(link.href);
    destination.searchParams.set('v', 'lossless-png');
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


// Restore the page's visible state when browser Back/Forward restores it from cache.
function resetPageTransition(){document.body?.classList.remove('leaving')}
window.addEventListener('pageshow',resetPageTransition);
window.addEventListener('pagehide',resetPageTransition);
window.addEventListener('popstate',resetPageTransition);
