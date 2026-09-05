import { useEffect, useState } from 'react';

const slides = [
  '/assets/hero-5.jpg',
  '/assets/hero-2.jpg',
  '/assets/hero-3.jpg',
  '/assets/hero-4.jpg',
  '/assets/hero-1.jpg',
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex(n => (n + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="hero-slides"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((src, n) => (
        <img key={src} src={src} alt="" aria-hidden="true" loading={n === 0 ? 'eager' : 'lazy'} className={n === index ? 'is-active' : ''} />
      ))}
      <span className="hero-slides-scrim" />
      <div className="hero-slides-dots">
        {slides.map((src, n) => (
          <button
            key={src}
            type="button"
            className={n === index ? 'is-active' : ''}
            aria-label={`Show image ${n + 1} of ${slides.length}`}
            aria-current={n === index}
            onClick={() => setIndex(n)}
          />
        ))}
      </div>
    </div>
  );
}