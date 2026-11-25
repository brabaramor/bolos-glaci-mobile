import { appConfig } from '../config/appConfig';

import AppButton from './AppButton';

import './CallToActionFooter.css';

interface CallToActionFooterProps {
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
}

const CallToActionFooter: React.FC<CallToActionFooterProps> = ({ title, description, actionLabel, actionPath }) => (
  <footer className="cta-footer">
    <h2 className="cta-footer__title">{title}</h2>
    <p className="cta-footer__description">{description}</p>
    <AppButton variant="light" className="cta-footer__action" routerLink={actionPath}>
      {actionLabel}
    </AppButton>
    <div className="cta-footer__contact">
      {appConfig.contact.phone && <span>{appConfig.contact.phone}</span>}
      {appConfig.contact.socialHandle && <span>{appConfig.contact.socialHandle}</span>}
    </div>
  </footer>
);

export default CallToActionFooter;
