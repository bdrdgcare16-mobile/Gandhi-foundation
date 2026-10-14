import { useState } from 'react';
import PageHero from '../components/PageHero';import GalleryLightbox from '../components/GalleryLightbox';import {gallery, educationPhotos} from '../content';

export default function Gallery(){
  const [lightbox, setLightbox] = useState(null);
  return <><PageHero image="/assets/gallery-hero.jpg" position="center center" eyebrow="Gallery" title="Moments from community programs." text="Selected photographs reproduced from Gandhi Foundation’s historical records and annual reports."/><section className="section"><div className="container"><div className="gallery-grid gallery-page">{gallery.map(([img,tag,title])=>tag==='Education'
      ? <figure key={img} className="is-openable"><button type="button" className="gallery-open" onClick={()=>setLightbox(0)} aria-label={`${title} — open ${educationPhotos.length} photos`}><img src={img} alt={title}/></button><figcaption><span>{tag}</span><strong>{title}</strong></figcaption></figure>
      : <figure key={img}><img src={img} alt={title}/><figcaption><span>{tag}</span><strong>{title}</strong></figcaption></figure>)}</div></div></section>
    {lightbox !== null && <GalleryLightbox photos={educationPhotos} tag="Education" index={lightbox} onIndex={setLightbox} onClose={()=>setLightbox(null)}/>}
  </>;
}
