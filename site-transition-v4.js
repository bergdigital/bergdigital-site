let navigationPending=false;
let navigationTimer=null;
function restoreVisiblePage(){
  navigationPending=false;
  window.clearTimeout(navigationTimer);
  if(document.body)document.body.classList.remove('leaving');
  document.documentElement.classList.remove('leaving');
}
document.querySelectorAll('a[href*=".html"]').forEach(link=>{
  link.addEventListener('click',event=>{
    if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
    const destination=new URL(link.href,window.location.href);
    if(destination.origin!==window.location.origin)return;
    event.preventDefault();
    if(navigationPending)return;
    navigationPending=true;
    destination.searchParams.set('v','lossless-png');
    if(link.pathname.endsWith('/index.html')){
      try{sessionStorage.setItem('bergDigitalIntroSeen','1')}catch{}
      destination.searchParams.set('from','products');
    }
    document.body.classList.add('leaving');
    navigationTimer=window.setTimeout(()=>window.location.assign(destination.href),130);
  });
});
window.history.scrollRestoration='auto';
window.addEventListener('pageshow',restoreVisiblePage);
window.addEventListener('popstate',restoreVisiblePage);
window.addEventListener('pagehide',restoreVisiblePage);
