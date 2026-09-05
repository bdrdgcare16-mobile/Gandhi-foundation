import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  ['/', 'Home'], ['/about', 'About'], ['/programs', 'Programs'],
  ['/gallery', 'Gallery'], ['/transparency', 'Transparency'], ['/contact', 'Contact'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);

  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Serving communities in Tiruvallur, Tamil Nadu</span><Link to="/transparency">Registered charitable organisation</Link></div></div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/"><img className="brand-mark" src="/assets/logo.png" alt=""/><span className="brand-copy"><strong>Gandhi Foundation</strong><small>Hope • Dignity • Social Justice</small></span></Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {navItems.map(([to, label]) => <NavLink key={to} to={to} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}
          <Link className="nav-cta" to="/contact">Support Us</Link>
        </nav>
      </div>
    </header>
    <main><Outlet /></main>
    <footer>
      <div className="container footer-grid">
        <div><Link className="brand footer-brand" to="/"><img className="brand-mark" src="/assets/logo.png" alt=""/><span className="brand-copy"><strong>Gandhi Foundation</strong><small>Community development with dignity</small></span></Link></div>
        <div><strong>Explore</strong><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/programs">Programs</Link><Link to="/gallery">Gallery</Link><Link to="/transparency">Transparency</Link><Link to="/contact">Contact</Link></div>
        <div><strong>Focus Areas</strong><span>Women & Youth</span><span>Education</span><span>Health</span><span>Village Development</span></div>
        <div><strong>Connect</strong><span>Tiruvallur District</span><span>Tamil Nadu, India</span><Link to="/contact">Send an enquiry</Link></div>
      </div>
      <div className="container copyright"><span>© {new Date().getFullYear()} Gandhi Foundation. All rights reserved.</span><span>Website prepared from Foundation records.</span></div>
    </footer>
  </>;
}