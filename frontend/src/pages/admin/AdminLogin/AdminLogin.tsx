import { IonContent, IonInput, IonInputPasswordToggle, IonPage, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import AppButton from '../../../components/AppButton';
import FormField from '../../../components/FormField';
import PageBanner from '../../../components/PageBanner';
import { appConfig } from '../../../config/appConfig';
import { appRoutes } from '../../../config/appRoutes';
import { adminLoginLabels, validationLabels } from '../../../config/labels';
import { useLogin } from '../../../hooks/useLogin';
import { isAuthenticated } from '../../../services/authService';

import './AdminLogin.css';

interface LoginFieldErrors {
  email?: string;
  password?: string;
}

const AdminLogin: React.FC = () => {
  const router = useIonRouter();
  const { submitLogin, isSubmitting, errorMessage } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});

  // Already logged in: skip the form.
  if (isAuthenticated()) {
    return <Navigate to={appRoutes.adminOrders} replace />;
  }

  const handleSubmit = async (): Promise<void> => {
    const errors: LoginFieldErrors = {
      email: email.trim() ? undefined : validationLabels.required,
      password: password ? undefined : validationLabels.required,
    };
    setFieldErrors(errors);
    if (errors.email || errors.password) return;

    const isLoggedIn = await submitLogin({ email: email.trim(), password });
    if (isLoggedIn) {
      // replace: "voltar" in the panel must not return to the login form.
      router.push(appRoutes.adminOrders, 'root', 'replace');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <PageBanner icon={adminLoginLabels.bannerIcon} title={appConfig.appName} subtitle={adminLoginLabels.subtitle} />

        {/* A real form, so the keyboard "Ir/Enter" key also submits. */}
        <form
          className="admin-login"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <div>
            <h2 className="admin-login__title">{adminLoginLabels.welcomeTitle}</h2>
            <p className="admin-login__text">{adminLoginLabels.welcomeText}</p>
          </div>

          <FormField label={adminLoginLabels.emailLabel} errorMessage={fieldErrors.email}>
            <IonInput
              fill="outline"
              type="email"
              inputmode="email"
              autocomplete="email"
              aria-label={adminLoginLabels.emailLabel}
              placeholder={adminLoginLabels.emailPlaceholder}
              value={email}
              onIonInput={(event) => {
                setEmail(event.detail.value ?? '');
                setFieldErrors((current) => ({ ...current, email: undefined }));
              }}
            />
          </FormField>

          <FormField label={adminLoginLabels.passwordLabel} errorMessage={fieldErrors.password}>
            <IonInput
              fill="outline"
              type="password"
              autocomplete="current-password"
              aria-label={adminLoginLabels.passwordLabel}
              placeholder={adminLoginLabels.passwordPlaceholder}
              value={password}
              onIonInput={(event) => {
                setPassword(event.detail.value ?? '');
                setFieldErrors((current) => ({ ...current, password: undefined }));
              }}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </FormField>

          {errorMessage && (
            <p className="admin-login__error" role="alert">
              {errorMessage}
            </p>
          )}

          <AppButton type="submit" expand="block" disabled={isSubmitting}>
            {isSubmitting ? adminLoginLabels.submitting : adminLoginLabels.submit}
          </AppButton>
          <AppButton variant="outline" expand="block" routerLink={appRoutes.home} routerDirection="back">
            {adminLoginLabels.backToSite}
          </AppButton>

          <p className="admin-login__footer">
            {adminLoginLabels.secureFooter(appConfig.appName, new Date().getFullYear())}
          </p>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
