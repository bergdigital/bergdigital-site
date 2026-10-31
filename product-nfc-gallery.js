(()=>{
const root=document.querySelector('.product-detail-image');if(!root)return;
const img=root.querySelector('img');if(!img)return;
const title=(document.querySelector('.product-detail-copy h1')?.innerText||document.title).replace(/\\s+/g,' ').trim();
const target=title.replace(/\\s*\\|.*$/,'').replace(/NFC Kartı/i,'').trim()||'Bağlantı';
const initials=target.split(/\\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
const style=document.createElement('style');style.textContent=`
.product-detail-image{position:relative;aspect-ratio:1;min-height:360px;background:#0d0d0d;isolation:isolate}
.product-detail-image>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .6s ease,transform .8s cubic-bezier(.2,.7,.2,1);padding:0}
.product-detail-image.gallery-phone-active>img{opacity:0;transform:scale(.96)}
.product-gallery-scene{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;background:radial-gradient(ellipse at 55% 48%,#241810,#111 57%,#090909 100%);opacity:0;transform:scale(1.025);transition:opacity .65s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
.product-detail-image.gallery-phone-active .product-gallery-scene{opacity:1;transform:scale(1)}
.product-gallery-scene:before{content:"";position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:38px 38px;mask-image:radial-gradient(ellipse,#000,transparent 78%);opacity:.5}
.product-gallery-layout{position:relative;z-index:1;width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:clamp(18px,5vw,55px);padding:32px}
.product-gallery-card{width:min(35%,210px);aspect-ratio:1;overflow:hidden;border-radius:12px;outline:1px solid #ffffff2b;box-shadow:0 24px 55px #000b;transform:rotate(-7deg);animation:product-card-float 4s ease-in-out infinite}
.product-gallery-card img{display:block;width:100%;height:100%;object-fit:cover}
.product-gallery-phone{position:relative;width:clamp(154px,38%,210px);height:min(76%,420px);min-height:290px;padding:9px;border:1px solid #595959;border-radius:30px;background:linear-gradient(145deg,#252525,#050505 38%,#191919);box-shadow:0 28px 65px #000c;transform:rotate(3deg);overflow:hidden}
.product-gallery-island{position:absolute;z-index:4;top:13px;left:50%;width:57px;height:15px;border-radius:20px;background:#050505;transform:translateX(-50%)}
.product-gallery-screen{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:28px 12px 14px;border-radius:22px;background:linear-gradient(155deg,#fff,#f4f2ef);color:#161616;text-align:center}
.product-gallery-app-icon{width:53px;height:53px;display:grid;place-items:center;margin-bottom:17px;border:1px solid #ff57224a;border-radius:17px;background:#ff5722;color:#101010;font-size:15px;font-weight:800;box-shadow:0 8px 22px #ff572233}
.product-gallery-screen strong{font-size:clamp(12px,1.5vw,16px);line-height:1.2}.product-gallery-screen p{margin:8px 0 17px;color:#777;font-size:9px;line-height:1.5}
.product-gallery-open{padding:9px 14px;border-radius:7px;background:#101010;color:#fff;font-size:8px;font-weight:600}
.product-gallery-notice{position:absolute;z-index:6;top:7px;left:16px;right:16px;min-height:48px;display:flex;align-items:center;gap:8px;padding:7px 9px;border:1px solid #ffffff1c;border-radius:14px;background:#242426f5;color:#fff;text-align:left;box-shadow:0 8px 22px #0007;opacity:0;transform:translateY(-145%);transition:transform .55s cubic-bezier(.18,.82,.24,1),opacity .3s ease;backdrop-filter:blur(12px)}
.product-gallery-notice.is-visible{opacity:1;transform:translateY(0)}
.product-gallery-notice-icon{width:29px;height:29px;flex:0 0 29px;display:grid;place-items:center;border-radius:9px;background:#ff5722;color:#111;font-size:7px;font-weight:800}
.product-gallery-notice span:last-child{display:grid;gap:3px}.product-gallery-notice b{font-size:8px;font-weight:600}.product-gallery-notice small{font-size:7px;color:#b7b7bb}
.product-gallery-waves{position:absolute;z-index:2;left:calc(50% - 15px);top:50%;width:28px;height:28px;border:1px solid #ff5722aa;border-radius:50%;opacity:0;transform:translate(-50%,-50%)}
.product-detail-image.gallery-phone-active .product-gallery-waves{animation:product-nfc-wave 1.1s ease-out infinite}.product-gallery-waves:nth-of-type(2){animation-delay:.25s}.product-gallery-waves:nth-of-type(3){animation-delay:.5s}
.product-gallery-label{position:absolute;z-index:3;left:18px;bottom:17px;color:#b8b3ad;font-size:8px;letter-spacing:.16em}
.product-gallery-controls{position:absolute;z-index:8;left:50%;bottom:15px;display:flex;align-items:center;gap:7px;transform:translateX(-50%)}
.product-gallery-controls button{display:flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid #ffffff32;border-radius:20px;background:#080808d9;color:#c9c4be;font:500 8px 'DM Sans',Arial,sans-serif;cursor:pointer;transition:background .2s,border-color .2s,color .2s}
.product-gallery-controls button:before{content:"";width:5px;height:5px;border-radius:50%;background:#777}.product-gallery-controls button[aria-pressed=true]{border-color:#ff572288;background:#ff572220;color:#fff}.product-gallery-controls button[aria-pressed=true]:before{background:#ff5722}
@keyframes product-nfc-wave{0%{opacity:.75;transform:translate(-50%,-50%) scale(.8)}100%{opacity:0;transform:translate(-50%,-50%) scale(3.8)}}
@keyframes product-card-float{0%,100%{translate:0 0}50%{translate:0 -7px}}
@media(max-width:620px){.product-detail-image{min-height:0}.product-gallery-layout{gap:13px;padding:22px 14px 45px}.product-gallery-card{width:32%;border-radius:8px}.product-gallery-phone{width:42%;height:76%;min-height:0;border-radius:25px;padding:7px}.product-gallery-screen{border-radius:18px}.product-gallery-notice{left:11px;right:11px;min-height:42px;padding:6px;border-radius:12px}.product-gallery-notice-icon{width:25px;height:25px;flex-basis:25px}.product-gallery-notice b{font-size:7px}.product-gallery-notice small{font-size:6px}.product-gallery-label{font-size:7px;left:10px;bottom:14px}.product-gallery-controls{bottom:11px}.product-gallery-controls button{font-size:7px;padding:7px 9px}}
@media(prefers-reduced-motion:reduce){.product-detail-image>img,.product-gallery-scene,.product-gallery-notice{transition:none!important}.product-gallery-card{animation:none!important}.product-detail-image.gallery-phone-active .product-gallery-waves{animation:none!important}}
`;
document.head.appendChild(style);
const scene=document.createElement('div');scene.className='product-gallery-scene';scene.setAttribute('aria-label','NFC kartın telefonla kullanımı');
scene.innerHTML='<div class="product-gallery-layout"><div class="product-gallery-card"><img src="'+img.src+'" alt="'+img.alt+'"></div><span class="product-gallery-waves"></span><span class="product-gallery-waves"></span><span class="product-gallery-waves"></span><div class="product-gallery-phone"><div class="product-gallery-island"></div><div class="product-gallery-screen"><span class="product-gallery-app-icon">'+initials+'</span><strong>'+target+'</strong><p>Tek dokunuşla bağlantı<br>hazır</p><span class="product-gallery-open">Bağlantıyı aç</span><div class="product-gallery-notice"><i class="product-gallery-notice-icon">NFC</i><span><b>NFC etiketi okundu</b><small>'+target+' bağlantısı açılıyor</small></span></div></div></div></div><span class="product-gallery-label">TELEFONUNU YAKLAŞTIR</span>';
const controls=document.createElement('div');controls.className='product-gallery-controls';controls.innerHTML='<button type="button" aria-pressed="true">Kart tasarımı</button><button type="button" aria-pressed="false">NFC ile kullanım</button>';
root.appendChild(scene);root.appendChild(controls);
const buttons=[...controls.querySelectorAll('button')];let active=0,timer;
function show(index){active=index;root.classList.toggle('gallery-phone-active',active===1);buttons.forEach((b,i)=>b.setAttribute('aria-pressed',i===active?'true':'false'));if(active===1){scene.querySelector('.product-gallery-notice').classList.remove('is-visible');window.setTimeout(()=>scene.querySelector('.product-gallery-notice')?.classList.add('is-visible'),360)}else scene.querySelector('.product-gallery-notice').classList.remove('is-visible')}
buttons.forEach((b,i)=>b.addEventListener('click',()=>{show(i);reset()}));
function reset(){window.clearInterval(timer);timer=window.setInterval(()=>show(active?0:1),4800)}
window.setTimeout(()=>{show(1);reset()},3800);
})();
