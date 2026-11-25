import './InfoList.css';

export interface InfoListItem {
  label: string;
  value: string;
}

const InfoList: React.FC<{ items: InfoListItem[] }> = ({ items }) => (
  <dl className="info-list">
    {items.map((item) => (
      <div key={item.label} className="info-list__row">
        <dt className="info-list__label">{item.label}</dt>
        <dd className="info-list__value">{item.value}</dd>
      </div>
    ))}
  </dl>
);

export default InfoList;
