const tapDemoItems = [
 {name:"Sahibinden İlan Kartı",title:"İlanına anında ulaş.",description:"Tek dokunuşla Sahibinden ilanına geçiş yap.",image:"assets/products/high-quality/sahibinden.png",alt:"Sahibinden NFC kartı",screen:'<div class="screen-market"><div class="screen-market-header"><b>sahibinden</b><span>⌕</span></div><p class="screen-kicker">İLAN BAĞLANTISI</p><div class="screen-market-card"><img src="assets/products/high-quality/sahibinden.png" alt=""><div><small>BERG DIGITAL</small><strong>İlanını tek dokunuşla aç</strong><span>İlanı görüntüle</span></div></div><div class="screen-market-footer">Bağlantı hazır <b>●</b></div></div>'},
 {name:"WhatsApp İletişim Kartı",title:"Sohbet tek dokunuşta açılsın.",description:"Müşterin WhatsApp üzerinden Berg Digital ile iletişime geçsin.",image:"assets/products/high-quality/whatsapp-iletisim.png",alt:"WhatsApp NFC iletişim kartı",screen:'<div class="screen-whatsapp"><div class="screen-wa-header"><span class="screen-wa-avatar">BD</span><div><b>Berg Digital</b><small>WhatsApp iletişimi</small></div><span class="screen-wa-call">⌕</span></div><div class="screen-wa-date">BUGÜN</div><div class="screen-wa-bubble">Merhaba Berg Digital, NFC kartlar hakkında bilgi almak istiyorum.<small>09:41 ✓✓</small></div><div class="screen-wa-reply">Merhaba! Size nasıl yardımcı olabiliriz?<small>09:41 ✓✓</small></div><div class="screen-wa-compose"><span>Mesaj yaz</span><b>➤</b></div></div>'},
 {name:"IBAN Kartı",title:"Ödeme bilgileri hazır.",description:"Telefon karta dokununca Berg Digital hesap bilgisi ekranda belirir.",image:"assets/products/high-quality/iban.png",alt:"IBAN NFC kartı",screen:'<div class="screen-iban"><div class="screen-bank-brand"><span>BD</span><b>Berg Digital</b></div><p>HESAP BİLGİSİ</p><small>Hesap sahibi</small><strong class="screen-account-name">Berg Digital</strong><small>IBAN</small><strong class="screen-iban-number">TR00 4817 3902 6541 8723 0916 52</strong><div class="screen-iban-copy">IBAN bilgisi</div><div class="screen-bank-footer">Bilgiler tek dokunuşla ekranda</div></div>'},
 {name:"Instagram Kartı",title:"Profilin hemen açılsın.",description:"Instagram hesabını paylaş; müşterilerin Berg Digital profilini kolayca bulsun.",image:"assets/products/high-quality/instagram.png",alt:"Instagram NFC kartı",screen:'<div class="screen-instagram"><div class="screen-ig-header"><b>Instagram</b><span>＋　☰</span></div><div class="screen-ig-profile"><div class="screen-ig-avatar"><img src="assets/bergdigital-instagram-profile.png" alt="Berg Digital Instagram profil fotoğrafı"></div><div><strong>berg.digitall</strong><small>Berg Digital</small></div></div><div class="screen-ig-bio">NFC kartlar · Dijital bağlantılar<br>Karacabey / Bursa</div><div class="screen-ig-actions"><a href="https://www.instagram.com/berg.digitall/" target="_blank" rel="noopener noreferrer">Profili görüntüle</a><a href="https://www.instagram.com/berg.digitall/" target="_blank" rel="noopener noreferrer">Mesaj</a></div><div class="screen-ig-grid"><img src="assets/products/high-quality/sahibinden.png" alt=""><img src="assets/products/high-quality/whatsapp-iletisim.png" alt=""><img src="assets/products/high-quality/iban.png" alt=""></div></div>'},
 {name:"Google Yorum Kartı",title:"Görüşünü paylaş.",description:"Memnun müşterin tek dokunuşla Berg Digital değerlendirme sayfasına ulaşsın.",image:"assets/products/high-quality/google-yorum.png",alt:"Google yorum NFC kartı",screen:'<div class="screen-google"><div class="screen-google-brand"><b><i>G</i>oogle</b><span>⋮</span></div><div class="screen-google-place"><div class="screen-google-avatar">B</div><div><strong>Berg Digital</strong><small>Karacabey, Bursa</small></div></div><div class="screen-google-rule"></div><p>Deneyiminizi paylaşın</p><small>Değerlendirmeniz başkalarına yardımcı olur.</small><div class="screen-google-stars">☆　☆　☆　☆　☆</div><div class="screen-google-input">Deneyiminizi anlatın</div><div class="screen-google-button">Yorum yaz</div><div class="screen-google-footer">Google değerlendirmeleri</div></div>'}
];
const section=document.querySelector("#tek-dokunus");
if(section){
 const stage=section.querySelector("#tap-demo-stage"),image=section.querySelector("#tap-demo-card-image"),screen=section.querySelector("#tap-demo-phone-screen");
 const count=section.querySelector("#tap-demo-count"),title=section.querySelector("#tap-demo-title"),description=section.querySelector("#tap-demo-description");
 const tabs=[...section.querySelectorAll(".tap-demo-tab")];let active=0,changing=false,timer=null,started=false,step=0;
 function stop(){if(timer)window.clearInterval(timer);timer=null;}
 function select(index,manual){
  if(changing)return;const next=(index+tapDemoItems.length)%tapDemoItems.length;if(next===active)return;
  if(manual)stop();changing=true;const item=tapDemoItems[next];stage.classList.add("is-scanning");
  window.setTimeout(()=>{active=next;image.src=item.image;image.alt=item.alt;screen.innerHTML=item.screen;
   count.textContent=String(active+1).padStart(2,"0")+" / 05 — TEMASSIZ BAĞLANTI";title.textContent=item.title;description.textContent=item.description;
   tabs.forEach((tab,i)=>{const on=i===active;tab.classList.toggle("is-active",on);tab.setAttribute("aria-pressed",on?"true":"false");});
   stage.classList.remove("is-scanning");stage.classList.add("is-revealing");
   window.setTimeout(()=>{stage.classList.remove("is-revealing");changing=false;},760);
  },360);
 }
 tabs.forEach(tab=>tab.addEventListener("click",()=>select(Number(tab.dataset.demoIndex),true)));
 if("IntersectionObserver"in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting||started)return;started=true;
   timer=window.setInterval(()=>{if(step>=tapDemoItems.length-1){stop();return;}select(active+1,false);step++;if(step>=tapDemoItems.length-1)stop();},4800);
   observer.disconnect();
  },{threshold:.32});observer.observe(section);
 }
}
