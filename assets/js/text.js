const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const yearElement = document.getElementById("year");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.getAttribute("data-target")) || 0;
      const suffix = target === 100 ? "%" : "";
      const duration = 1200;
      const start = performance.now();

      const animateCounter = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = `${Math.floor(progress * target)}${suffix}`;
        if (progress < 1) requestAnimationFrame(animateCounter);
      };

      requestAnimationFrame(animateCounter);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}
