const intro = document.querySelector('#intro');
const site = document.querySelector('#site');
const video = document.querySelector('#logo-video');
let finished = false;

function showSite() {
  if (finished) return;
  finished = true;
  intro.classList.add('done');
  site.inert = false;
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

startIntro();

