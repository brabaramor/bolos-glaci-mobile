import { IonContent, IonPage, IonSelect, IonSelectOption, useIonAlert, useIonRouter, useIonToast } from '@ionic/react';
import { useState } from 'react';

import AdminCakeCard from '../../../components/AdminCakeCard';
import AppButton from '../../../components/AppButton';
import AppHeader from '../../../components/AppHeader';
import DataState from '../../../components/DataState';
import PageTitleBar from '../../../components/PageTitleBar';
import Pagination from '../../../components/Pagination';
import SearchFilterBar from '../../../components/SearchFilterBar';
import { appRoutes } from '../../../config/appRoutes';
import { adminLabels, adminProductsLabels } from '../../../config/labels';
import { mainMenuId } from '../../../config/navigation';
import { useAdminCakes } from '../../../hooks/useAdminCakes';
import { useCakeActions } from '../../../hooks/useCakeActions';
import { useCakeOptions } from '../../../hooks/useCakeOptions';
import { useReloadOnReturn } from '../../../hooks/useReloadOnReturn';
import type { Cake } from '../../../models/cake';

import './ProductList.css';

const ALL_CATEGORIES = 'all';

const ProductList: React.FC = () => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const [searchText, setSearchText] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { cakes, totalItems, totalPages, isLoading, errorMessage, reload } = useAdminCakes(
    searchText || undefined,
    categoryId,
    page,
  );
  const { categories } = useCakeOptions();
  const { toggleVisibility, removeCake, busyCakeId, errorMessage: actionErrorMessage } = useCakeActions();

  useReloadOnReturn(reload);

  const handleSearchChange = (nextSearchText: string): void => {
    setSearchText(nextSearchText);
    setPage(1);
  };

  const handleCategoryChange = (value: string): void => {
    setCategoryId(value === ALL_CATEGORIES ? undefined : value);
    setPage(1);
  };

  const showToast = (message: string): void => {
    void presentToast({ message, duration: 2000, position: 'bottom', color: 'success' });
  };

  const handleToggleVisibility = async (cake: Cake): Promise<void> => {
    const isDone = await toggleVisibility(cake);
    if (!isDone) return;
    showToast(cake.isPublished ? adminProductsLabels.unpublishedMessage : adminProductsLabels.publishedMessage);
    reload();
  };

  const handleDelete = (cake: Cake): void => {
    void presentAlert({
      header: adminProductsLabels.deleteConfirmTitle,
      message: adminProductsLabels.deleteConfirmMessage(cake.name),
      buttons: [
        { text: adminProductsLabels.deleteConfirmNo, role: 'cancel' },
        {
          text: adminProductsLabels.deleteConfirmYes,
          role: 'destructive',
          handler: () => {
            void removeCake(cake).then((isDone) => {
              if (!isDone) return;
              showToast(adminProductsLabels.deletedMessage);
              if (cakes.length === 1 && page > 1) {
                setPage(page - 1);
              } else {
                reload();
              }
            });
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <AppHeader menuId={mainMenuId} variant="admin" title={adminLabels.panelTitle} />
      <IonContent>
        <PageTitleBar
          title={adminProductsLabels.title}
          subtitle={isLoading ? undefined : adminProductsLabels.count(totalItems)}
          action={<AppButton routerLink={appRoutes.adminProductNew}>{adminProductsLabels.newProduct}</AppButton>}
        />

        <div className="product-list">
          <SearchFilterBar
            variant="card"
            searchText={searchText}
            searchPlaceholder={adminProductsLabels.searchPlaceholder}
            onSearchChange={handleSearchChange}
          >
            <IonSelect
              className="search-filter-bar__select"
              fill="outline"
              interface="popover"
              aria-label={adminProductsLabels.categoryFilterLabel}
              value={categoryId ?? ALL_CATEGORIES}
              onIonChange={(event) => handleCategoryChange(String(event.detail.value))}
            >
              <IonSelectOption value={ALL_CATEGORIES}>{adminProductsLabels.allCategories}</IonSelectOption>
              {categories.map((category) => (
                <IonSelectOption key={category.id} value={category.id}>
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </SearchFilterBar>

          {actionErrorMessage && (
            <p className="product-list__error" role="alert">
              {actionErrorMessage}
            </p>
          )}

          <div className="product-list__items">
            <DataState
              isLoading={isLoading}
              errorMessage={errorMessage}
              isEmpty={cakes.length === 0}
              emptyMessage={adminProductsLabels.emptyList}
              onRetry={reload}
            >
              {cakes.map((cake) => (
                <AdminCakeCard
                  key={cake.id}
                  cake={cake}
                  isBusy={busyCakeId === cake.id}
                  onView={(selectedCake) => router.push(appRoutes.adminProductView(selectedCake.id))}
                  onEdit={(selectedCake) => router.push(appRoutes.adminProductEdit(selectedCake.id))}
                  onToggleVisibility={(selectedCake) => void handleToggleVisibility(selectedCake)}
                  onDelete={handleDelete}
                />
              ))}
            </DataState>
          </div>

          {!isLoading && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductList;
