import { programs } from '../content';
export default function ProgramsGrid() {
  return <div className="program-grid">{programs.map(({icon: Icon,title,text}) => <article className="program-card" key={title}><span className="icon"><Icon size={20}/></span><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
