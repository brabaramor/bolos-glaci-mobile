import './PageBanner.css';

interface PageBannerProps {
  icon: string;
  title: string;
  subtitle?: string;
  variant?: 'brand' | 'success';
}

const PageBanner: React.FC<PageBannerProps> = ({ icon, title, subtitle, variant = 'brand' }) => (
  <header className={`page-banner page-banner--${variant}`}>
    <span className="page-banner__icon" aria-hidden="true">
      {icon}
    </span>
    <h1 className="page-banner__title">{title}</h1>
    {subtitle && <p className="page-banner__subtitle">{subtitle}</p>}
  </header>
);

export default PageBanner;
