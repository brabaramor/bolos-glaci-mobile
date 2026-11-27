import './InfoBox.css';

interface InfoBoxProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon, title, children }) => (
  <section className="info-box">
    <h2 className="info-box__title">
      {icon && <span aria-hidden="true">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

export default InfoBox;
