export default function PageHero({ eyebrow, title, text, image }) {
  return (
    <section
      className={image ? 'page-hero has-image' : 'page-hero'}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="container">
        <div className="narrow">
          <span className="eyebrow light">{eyebrow}</span>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
      </div>
    </section>
  );
}