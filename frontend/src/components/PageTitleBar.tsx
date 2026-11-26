import './PageTitleBar.css';

interface PageTitleBarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageTitleBar: React.FC<PageTitleBarProps> = ({ title, subtitle, action }) => (
  <div className="page-title-bar">
    <div>
      <h1 className="page-title-bar__title">{title}</h1>
      {subtitle && <p className="page-title-bar__subtitle">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageTitleBar;
