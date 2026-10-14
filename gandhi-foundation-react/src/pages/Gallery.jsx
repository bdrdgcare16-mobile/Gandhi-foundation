import { useState } from 'react';
import PageHero from '../components/PageHero';import GalleryLightbox from '../components/GalleryLightbox';import {gallery, galleryPhotos} from '../content';

export default function Gallery(){
  const [open, setOpen] = useState(null); // { tag, index } of the tile being viewed
  return <><PageHero image="/assets/gallery-hero.jpg" position="center center" eyebrow="Gallery" title="Moments from community programs." text="Selected photographs reproduced from Gandhi Foundation’s historical records and annual reports."/><section className="section"><div className="container"><div className="gallery-grid gallery-page">{gallery.map(([img,tag,title])=>{
      const photos = galleryPhotos[tag];
      return photos
        ? <figure key={img} className="is-openable"><button type="button" className="gallery-open" onClick={()=>setOpen({tag,index:0})} aria-label={`${title} — open ${photos.length} photos`}><img src={img} alt={title}/></button><figcaption><span>{tag}</span><strong>{title}</strong></figcaption></figure>
        : <figure key={img}><img src={img} alt={title}/><figcaption><span>{tag}</span><strong>{title}</strong></figcaption></figure>;
    })}</div></div></section>
    {open && <GalleryLightbox photos={galleryPhotos[open.tag]} tag={open.tag} index={open.index} onIndex={i=>setOpen({...open,index:i})} onClose={()=>setOpen(null)}/>}
  </>;
}
