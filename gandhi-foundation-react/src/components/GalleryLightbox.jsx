import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GalleryLightbox({ photos, tag, index, onClose, onIndex }) {
  const count = photos.length;

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + count) % count);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, count, onClose, onIndex]);

  const [src, caption] = photos[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${tag} photos`} onClick={onClose}>
      <div className="lightbox-panel" onClick={e => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <img src={src} alt={caption} />

        {count > 1 && (
          <>
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={() => onIndex((index - 1 + count) % count)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={() => onIndex((index + 1) % count)}
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <figcaption className="lightbox-caption">
          <span>{tag}</span>
          <strong>{caption}</strong>
          {count > 1 && <small>{index + 1} / {count}</small>}
        </figcaption>
      </div>
    </div>
  );
}
