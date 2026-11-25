import { IonContent, IonInput, IonPage, IonSelect, IonSelectOption, IonTextarea, useIonRouter } from '@ionic/react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AppButton from '../../components/AppButton';
import ConsentCheckbox from '../../components/ConsentCheckbox';
import DataState from '../../components/DataState';
import FormField from '../../components/FormField';
import PageBanner from '../../components/PageBanner';
import { type OrderConfirmationRouteState, appRoutes } from '../../config/appRoutes';
import { placeOrderLabels } from '../../config/labels';
import { useCakeCatalog } from '../../hooks/useCakeCatalog';
import { useCakeOptions } from '../../hooks/useCakeOptions';
import { usePlaceOrder } from '../../hooks/usePlaceOrder';
import type { Cake } from '../../models/cake';
import type { CakeSize } from '../../models/cakeSize';
import { getMinimumDeliveryDate } from '../../utils/date';
import {
  type OrderFormErrors,
  type OrderFormValues,
  createEmptyOrderForm,
  toCreateOrderInput,
  validateOrderForm,
} from '../../utils/orderForm';
import { formatPrice } from '../../utils/price';

import './PlaceOrder.css';

// The price only shows once a cake is chosen
function getSizeOptionLabel(size: CakeSize, selectedCake?: Cake): string {
  const sizePrice = selectedCake?.sizePrices.find((price) => price.sizeId === size.id);
  const baseLabel = `${size.name} - ${size.description}`;
  return sizePrice ? `${baseLabel} · ${formatPrice(sizePrice.price)}` : baseLabel;
}

const PlaceOrder: React.FC = () => {
  const router = useIonRouter();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const catalog = useCakeCatalog();
  const options = useCakeOptions();
  const { submitOrder, isSubmitting, errorMessage: submitErrorMessage } = usePlaceOrder();

  // "Pedir" on a card opens this screen with ?cakeId=..., so the cake comes preselected.
  const [formValues, setFormValues] = useState<OrderFormValues>(() =>
    createEmptyOrderForm(searchParams.get('cakeId') ?? ''),
  );
  const [formErrors, setFormErrors] = useState<OrderFormErrors>({});
  const minimumDeliveryDate = useMemo(() => getMinimumDeliveryDate(), []);

  const selectedCake = catalog.cakes.find((cake) => cake.id === formValues.cakeId);

  function updateField<K extends keyof OrderFormValues>(field: K, value: OrderFormValues[K]): void {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  }

  const handleSubmit = async (): Promise<void> => {
    const errors = validateOrderForm(formValues, minimumDeliveryDate);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const order = await submitOrder(toCreateOrderInput(formValues));
    if (order) {
      const routeState: OrderConfirmationRouteState = { order };

      // replace: "voltar" on the confirmation must not reopen the filled form
      navigate(appRoutes.orderConfirmation, { replace: true, state: routeState });
    }
  };

  const handleCancel = (): void => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      router.push(appRoutes.home, 'back');
    }
  };

  const retryLoading = (): void => {
    catalog.reload();
    options.reload();
  };

  return (
    <IonPage>
      <IonContent>
        <PageBanner
          icon={placeOrderLabels.bannerIcon}
          title={placeOrderLabels.title}
          subtitle={placeOrderLabels.subtitle}
        />

        <DataState
          isLoading={catalog.isLoading || options.isLoading}
          errorMessage={catalog.errorMessage ?? options.errorMessage}
          isEmpty={false}
          onRetry={retryLoading}
        >
          <div className="place-order-form">
            <FormField label={placeOrderLabels.cakeLabel} isRequired errorMessage={formErrors.cakeId}>
              <IonSelect
                fill="outline"
                interface="action-sheet"
                aria-label={placeOrderLabels.cakeLabel}
                placeholder={placeOrderLabels.cakePlaceholder}
                value={formValues.cakeId || undefined}
                onIonChange={(event) => updateField('cakeId', String(event.detail.value))}
              >
                {catalog.cakes.map((cake) => (
                  <IonSelectOption key={cake.id} value={cake.id}>
                    {cake.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </FormField>

            <FormField label={placeOrderLabels.sizeLabel} isRequired errorMessage={formErrors.sizeId}>
              <IonSelect
                fill="outline"
                interface="action-sheet"
                aria-label={placeOrderLabels.sizeLabel}
                placeholder={placeOrderLabels.sizePlaceholder}
                value={formValues.sizeId || undefined}
                onIonChange={(event) => updateField('sizeId', String(event.detail.value))}
              >
                {options.sizes.map((size) => (
                  <IonSelectOption key={size.id} value={size.id}>
                    {getSizeOptionLabel(size, selectedCake)}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </FormField>

            <FormField label={placeOrderLabels.deliveryDateLabel} isRequired errorMessage={formErrors.deliveryDate}>
              <IonInput
                fill="outline"
                type="date"
                aria-label={placeOrderLabels.deliveryDateLabel}
                min={minimumDeliveryDate}
                value={formValues.deliveryDate}
                onIonInput={(event) => updateField('deliveryDate', event.detail.value ?? '')}
              />
            </FormField>

            <FormField label={placeOrderLabels.preferredTimeLabel}>
              <IonInput
                fill="outline"
                type="time"
                aria-label={placeOrderLabels.preferredTimeLabel}
                value={formValues.preferredTime}
                onIonInput={(event) => updateField('preferredTime', event.detail.value ?? '')}
              />
            </FormField>

            <FormField label={placeOrderLabels.notesLabel}>
              <IonTextarea
                fill="outline"
                rows={4}
                aria-label={placeOrderLabels.notesLabel}
                placeholder={placeOrderLabels.notesPlaceholder}
                value={formValues.customerNotes}
                onIonInput={(event) => updateField('customerNotes', event.detail.value ?? '')}
              />
            </FormField>

            <hr className="place-order-form__divider" />
            <h2 className="place-order-form__section-title">{placeOrderLabels.customerSectionTitle}</h2>

            <FormField label={placeOrderLabels.nameLabel} isRequired errorMessage={formErrors.customerName}>
              <IonInput
                fill="outline"
                autocomplete="name"
                aria-label={placeOrderLabels.nameLabel}
                placeholder={placeOrderLabels.namePlaceholder}
                value={formValues.customerName}
                onIonInput={(event) => updateField('customerName', event.detail.value ?? '')}
              />
            </FormField>

            <FormField label={placeOrderLabels.phoneLabel} isRequired errorMessage={formErrors.customerPhone}>
              <IonInput
                fill="outline"
                type="tel"
                inputmode="tel"
                autocomplete="tel"
                aria-label={placeOrderLabels.phoneLabel}
                placeholder={placeOrderLabels.phonePlaceholder}
                value={formValues.customerPhone}
                onIonInput={(event) => updateField('customerPhone', event.detail.value ?? '')}
              />
            </FormField>

            <FormField label={placeOrderLabels.emailLabel} isRequired errorMessage={formErrors.customerEmail}>
              <IonInput
                fill="outline"
                type="email"
                inputmode="email"
                autocomplete="email"
                aria-label={placeOrderLabels.emailLabel}
                placeholder={placeOrderLabels.emailPlaceholder}
                value={formValues.customerEmail}
                onIonInput={(event) => updateField('customerEmail', event.detail.value ?? '')}
              />
            </FormField>

            <ConsentCheckbox
              title={placeOrderLabels.consentTitle}
              description={placeOrderLabels.consentDescription}
              isChecked={formValues.hasAcceptedPrivacyTerms}
              onChange={(isChecked) => updateField('hasAcceptedPrivacyTerms', isChecked)}
              errorMessage={formErrors.hasAcceptedPrivacyTerms}
            />

            <div className="place-order-form__actions">
              {submitErrorMessage && (
                <p className="place-order-form__submit-error" role="alert">
                  {submitErrorMessage}
                </p>
              )}
              <AppButton expand="block" disabled={isSubmitting} onClick={() => void handleSubmit()}>
                {isSubmitting ? placeOrderLabels.submitting : placeOrderLabels.submit}
              </AppButton>
              <AppButton variant="outline" expand="block" disabled={isSubmitting} onClick={handleCancel}>
                {placeOrderLabels.cancel}
              </AppButton>
            </div>
          </div>
        </DataState>
      </IonContent>
    </IonPage>
  );
};

export default PlaceOrder;
