import { ArrowRight, BookOpen, GraduationCap, HeartPulse, Leaf, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import { impact } from '../content';

const focusAreas = [
  [Users, 'Women Empowerment'],
  [HeartPulse, 'Community Health'],
  [BookOpen, 'Education'],
  [GraduationCap, 'Youth & Skills'],
  [Leaf, 'Environment'],
];

const homeValues = [
  [Users, 'Community Driven', 'Programs planned with local communities for lasting impact.'],
  [HeartPulse, 'Holistic Approach', 'Focusing on education, health, skills and environment.'],
  [ShieldCheck, 'Transparent & Accountable', 'Committed to openness, integrity and responsible stewardship.'],
  [Users, 'Create Lasting Change', 'Empowering individuals and communities to build a better tomorrow.'],
];

export default function Home(){
  return <>
    <section className="home-focus-strip">
      <div className="container focus-nav">
        {focusAreas.map(([Icon, label]) => (
          <Link key={label} to="/programs" className="focus-item">
            <Icon size={24} strokeWidth={1.7}/><span>{label}</span>
          </Link>
        ))}
      </div>
    </section>

    <section className="hero hero-reference">
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>
      <div className="hero-decor hero-decor-left"></div>
      <div className="hero-decor hero-decor-right"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><i></i>Community-led change since inception</span>
          <h1>Building a future<br/>of <span className="word-blue">hope</span>, <span className="word-green">dignity</span><br/>and <span className="word-gold">opportunity.</span></h1>
          <p>Gandhi Foundation works alongside rural communities to strengthen education, health, women’s leadership, youth development and sustainable livelihoods.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/programs">Explore Our Work <ArrowRight size={18}/></Link>
            <Link className="btn btn-secondary hero-story" to="/about">Our Story <ArrowRight size={17}/></Link>
          </div>
        </div>

        <div className="hero-visual hero-reference-visual">
          <div className="visual-card main-card"><HeroSlideshow/></div>
          <div className="float-card card-a"><strong>230+</strong><span>Self-help groups<br/>promoted*</span></div>
          <div className="float-card card-b"><strong>150+</strong><span>Young students<br/>supported*</span></div>
          <div className="hero-ribbon"><span></span><b></b></div>
          <div className="hero-note">*Historical figures from Foundation annual reports.</div>
        </div>
      </div>
    </section>

    <section className="home-values">
      <div className="container home-values-grid">
        {homeValues.map(([Icon, title, text]) => (
          <article key={title} className="home-value-card">
            <span className="value-icon"><Icon size={28} strokeWidth={1.8}/></span>
            <div><h3>{title}</h3><p>{text}</p><span className="value-line"></span></div>
          </article>
        ))}
      </div>
    </section>

    <section className="section"><div className="container split"><div className="section-heading"><span className="eyebrow">Where we work</span><h2>Rooted in the villages we serve.</h2><Link className="text-link" to="/transparency">See our registrations <ArrowRight size={15}/></Link></div><div className="about-copy"><p>The Foundation works close to the people it serves — in villages, schools and neighbourhood groups across Tiruvallur district, Tamil Nadu. Programmes are planned with local participants rather than delivered to them, so decisions stay with the community long after a project ends.</p><div className="contact-facts facts-split"><div><span>Base</span><strong>Tiruvallur district, Tamil Nadu</strong></div><div><span>We work with</span><strong>Villages, schools and self-help groups</strong></div><div><span>Alongside</span><strong>Civil society, corporate and government partners</strong></div><div><span>Registered under</span><strong>12A and 80G of the Income Tax Act</strong></div></div></div></div></section>
    <section className="section section-soft"><div className="container"><div className="section-heading center"><span className="eyebrow">How we work</span><h2>Change that communities lead for themselves.</h2><p>The same method sits behind every programme, whether the subject is health, schooling, livelihoods or the environment.</p></div><div className="values-grid method-grid"><article><h3>Listen first</h3><p>Time spent in the village before any plan is written. Needs are named by the people who live with them, not assumed from outside.</p></article><article><h3>Build local groups</h3><p>Self-help groups, school links and village institutions that can hold responsibility and carry work forward on their own.</p></article><article><h3>Deliver together</h3><p>Camps, training and learning support run alongside community members rather than delivered to them as recipients.</p></article><article><h3>Hand it over</h3><p>Ownership stays local, so activity continues after a project cycle closes and the Foundation steps back.</p></article></div><div className="center-action"><Link className="btn btn-primary" to="/programs">See the programmes this shapes <ArrowRight size={17}/></Link></div></div></section>
    <section className="section impact"><div className="container"><div className="impact-head"><div><span className="eyebrow light">Impact on record</span><h2>The work in numbers.</h2></div><p>Figures published in the Foundation’s annual reports. These are historical totals, not current-year results.</p></div><ol className="roadmap">{impact.map(([n,t,short],i)=><li className="roadmap-item" key={n+t}><span className="roadmap-node">{String(i+1).padStart(2,'0')}</span><article className="roadmap-card"><strong>{n}</strong><span>{short||t}</span></article></li>)}</ol></div></section>
    <section className="support"><div className="container support-grid"><div><span className="eyebrow light">Stand with communities</span><h2>Your support can help create lasting local change.</h2></div><div className="support-card"><p>Support can strengthen learning access, health awareness, women’s development, youth skills and village-led initiatives.</p><Link className="btn btn-light" to="/contact">Partner / Support Gandhi Foundation</Link></div></div></section>
  </>;
}
