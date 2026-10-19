/** Small site-wide behaviours: scroll reveal, count-up stats, accordions, lite YouTube embeds. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

// Count-up numbers (final value is in the HTML, so no-JS and reduced-motion users see it as is)
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const format = (n: number, decimals: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
const runCount = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = format(target * eased, decimals);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if (!reduceMotion && 'IntersectionObserver' in window) {
  const co = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCount(entry.target as HTMLElement);
          co.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => {
    // Only reset numbers that are still below the fold, so nothing visibly flashes
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.textContent = format(0, Number(el.dataset.decimals || 0));
      co.observe(el);
    }
  });
}

// Accordions
document.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]').forEach((trigger) => {
  const panel = document.getElementById(trigger.getAttribute('aria-controls') || '');
  if (!panel) return;
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    panel.dataset.open = String(!open);
    if (open) panel.setAttribute('inert', '');
    else panel.removeAttribute('inert');
  });
});

// Lite YouTube: swap the thumbnail for an iframe only when clicked
document.querySelectorAll<HTMLButtonElement>('[data-yt]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.yt!;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = btn.dataset.title || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'absolute inset-0 h-full w-full border-0';
    btn.replaceWith(iframe);
    iframe.focus();
  });
});
