const intro = document.querySelector('#intro');
const site = document.querySelector('#site');
const video = document.querySelector('#logo-video');
let finished = false;

function showSite() {
  if (finished) return;
  finished = true;
  intro.classList.add('done');
  site.inert = false;
  requestAnimationFrame(() => site.classList.add('is-visible'));
  window.setTimeout(() => intro.remove(), 800);
}

async function startIntro() {
  intro.classList.add('playing');
  video.currentTime = 0;
  video.playbackRate = 1.15;
  video.muted = false;

  try {
    await video.play();
    document.querySelector('#sound-hint').hidden = true;
  } catch {
    video.muted = true;
    try {
      await video.play();
    } catch {
      showSite();
      return;
    }
  }

}

document.querySelector('#skip-intro').addEventListener('click', showSite);
video.addEventListener('ended', showSite);
video.addEventListener('error', showSite);
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('#skip-intro') || finished) return;
  video.muted = false;
  video.play().catch(() => {});
  document.querySelector('#sound-hint').hidden = true;
}, { once: true });

let introSeen = false;
try {
  introSeen = sessionStorage.getItem('bergDigitalIntroSeen') === '1';
} catch {}
introSeen = introSeen || new URLSearchParams(window.location.search).get('from') === 'products';

if (introSeen) {
  finished = true;
  intro.classList.add('done', 'quick-exit');
  site.inert = false;
  requestAnimationFrame(() => site.classList.add('is-visible'));
  window.setTimeout(() => intro.remove(), 320);
} else {
  try {
    sessionStorage.setItem('bergDigitalIntroSeen', '1');
  } catch {}
  startIntro();
}
