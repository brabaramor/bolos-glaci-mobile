import {
  IonContent,
  IonInput,
  IonPage,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AppButton from '../../../components/AppButton';
import AppHeader from '../../../components/AppHeader';
import DataState from '../../../components/DataState';
import FormField from '../../../components/FormField';
import ImageUploadField from '../../../components/ImageUploadField';
import SectionCard from '../../../components/SectionCard';
import { appRoutes } from '../../../config/appRoutes';
import { adminLabels, commonLabels, productFormLabels, sizeLabels } from '../../../config/labels';
import { mainMenuId } from '../../../config/navigation';
import { useAdminCakeDetail } from '../../../hooks/useAdminCakeDetail';
import { useCakeOptions } from '../../../hooks/useCakeOptions';
import { useSaveCake } from '../../../hooks/useSaveCake';
import type { Cake, CakeCategory } from '../../../models/cake';
import type { CakeSize } from '../../../models/cakeSize';
import {
  type ProductFormErrors,
  type ProductFormValues,
  createProductForm,
  toCakeFormInput,
  validateProductForm,
} from '../../../utils/productForm';

import './ProductForm.css';

interface ProductFormContentProps {
  cake?: Cake;
  sizes: CakeSize[];
  categories: CakeCategory[];
}

function ProductFormContent({ cake, sizes, categories }: ProductFormContentProps): React.JSX.Element {
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const { saveCake, isSaving, errorMessage: saveErrorMessage } = useSaveCake();

  const [formValues, setFormValues] = useState<ProductFormValues>(() => createProductForm(sizes, cake));
  const [formErrors, setFormErrors] = useState<ProductFormErrors>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  function updateField<K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]): void {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  }

  const updatePrice = (sizeId: string, value: string): void => {
    setFormValues((current) => ({ ...current, prices: { ...current.prices, [sizeId]: value } }));
    setFormErrors((current) => ({ ...current, prices: undefined }));
  };

  const goBackToList = (): void => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      router.push(appRoutes.adminProducts, 'back');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const errors = validateProductForm(formValues, sizes);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const savedCake = await saveCake(toCakeFormInput(formValues, sizes), imageFile, cake?.id);
    if (savedCake) {
      void presentToast({
        message: cake ? productFormLabels.updatedMessage : productFormLabels.createdMessage,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      goBackToList();
    }
  };

  return (
    <>
      <h1 className="product-form__title">{cake ? productFormLabels.editTitle : productFormLabels.newTitle}</h1>

      <SectionCard icon={productFormLabels.basicInfoIcon} title={productFormLabels.basicInfoTitle}>
        <FormField label={productFormLabels.nameLabel} isRequired errorMessage={formErrors.name}>
          <IonInput
            fill="outline"
            aria-label={productFormLabels.nameLabel}
            placeholder={productFormLabels.namePlaceholder}
            value={formValues.name}
            onIonInput={(event) => updateField('name', event.detail.value ?? '')}
          />
        </FormField>

        <FormField label={productFormLabels.descriptionLabel} isRequired errorMessage={formErrors.description}>
          <IonTextarea
            fill="outline"
            rows={3}
            aria-label={productFormLabels.descriptionLabel}
            placeholder={productFormLabels.descriptionPlaceholder}
            value={formValues.description}
            onIonInput={(event) => updateField('description', event.detail.value ?? '')}
          />
        </FormField>

        <FormField label={productFormLabels.categoryLabel} isRequired errorMessage={formErrors.categoryId}>
          <IonSelect
            fill="outline"
            interface="action-sheet"
            aria-label={productFormLabels.categoryLabel}
            placeholder={productFormLabels.categoryPlaceholder}
            value={formValues.categoryId || undefined}
            onIonChange={(event) => updateField('categoryId', String(event.detail.value))}
          >
            {categories.map((category) => (
              <IonSelectOption key={category.id} value={category.id}>
                {category.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </FormField>

        <ImageUploadField
          label={productFormLabels.imageLabel}
          altText={formValues.name}
          currentImageUrl={cake?.imageUrl ?? null}
          onFileChange={setImageFile}
        />
      </SectionCard>

      <SectionCard icon={productFormLabels.pricesIcon} title={productFormLabels.pricesTitle}>
        {sizes.map((size) => (
          <FormField key={size.id} label={sizeLabels.fullName(size.name, size.description)} isRequired>
            <IonInput
              fill="outline"
              inputmode="decimal"
              aria-label={sizeLabels.fullName(size.name, size.description)}
              placeholder={productFormLabels.pricePlaceholder}
              value={formValues.prices[size.id]}
              onIonInput={(event) => updatePrice(size.id, event.detail.value ?? '')}
            >
              <span slot="start">{productFormLabels.currency}</span>
            </IonInput>
          </FormField>
        ))}
        {formErrors.prices && (
          <p className="product-form__error" role="alert">
            {formErrors.prices}
          </p>
        )}
      </SectionCard>

      <SectionCard icon={productFormLabels.visibilityIcon} title={productFormLabels.visibilityTitle}>
        <IonToggle
          justify="space-between"
          checked={formValues.isPublished}
          onIonChange={(event) => updateField('isPublished', event.detail.checked)}
        >
          {productFormLabels.isPublishedLabel}
        </IonToggle>
        <IonToggle
          justify="space-between"
          checked={formValues.isFeatured}
          onIonChange={(event) => updateField('isFeatured', event.detail.checked)}
        >
          {productFormLabels.isFeaturedLabel}
        </IonToggle>
      </SectionCard>

      <div className="product-form__actions">
        {saveErrorMessage && (
          <p className="product-form__error" role="alert">
            {saveErrorMessage}
          </p>
        )}
        <AppButton expand="block" disabled={isSaving} onClick={() => void handleSubmit()}>
          {isSaving ? productFormLabels.saving : productFormLabels.save}
        </AppButton>
        <AppButton variant="outline" expand="block" disabled={isSaving} onClick={goBackToList}>
          {productFormLabels.cancel}
        </AppButton>
      </div>
    </>
  );
}

const ProductForm: React.FC = () => {
  const { cakeId } = useParams<{ cakeId?: string }>();
  const cakeDetail = useAdminCakeDetail(cakeId);
  const options = useCakeOptions();

  const retryLoading = (): void => {
    cakeDetail.reload();
    options.reload();
  };

  return (
    <IonPage>
      <AppHeader menuId={mainMenuId} variant="admin" title={adminLabels.panelTitle} />
      <IonContent>
        <div className="product-form">
          <IonRouterLink className="product-form__back" routerLink={appRoutes.adminProducts} routerDirection="back">
            {productFormLabels.backToList}
          </IonRouterLink>

          <DataState
            isLoading={cakeDetail.isLoading || options.isLoading}
            errorMessage={cakeDetail.errorMessage ?? options.errorMessage}
            isEmpty={Boolean(cakeId) && !cakeDetail.cake}
            emptyMessage={commonLabels.notFound}
            onRetry={retryLoading}
          >
            <ProductFormContent
              key={cakeDetail.cake?.id ?? 'new'}
              cake={cakeDetail.cake ?? undefined}
              sizes={options.sizes}
              categories={options.categories}
            />
          </DataState>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductForm;
