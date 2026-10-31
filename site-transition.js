document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    event.preventDefault();
    if (link.pathname.endsWith('/index.html')) {
      try { sessionStorage.setItem('bergDigitalIntroSeen', '1'); } catch {}
    }
    document.body.classList.add('leaving');
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 130);
  });
});
