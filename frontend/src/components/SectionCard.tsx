import './SectionCard.css';

interface SectionCardProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
}

// White block with an icon + title, used to group parts of a long admin screen.
const SectionCard: React.FC<SectionCardProps> = ({ icon, title, children }) => (
  <section className="section-card">
    <h2 className="section-card__title">
      {icon && <span aria-hidden="true">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

export default SectionCard;
