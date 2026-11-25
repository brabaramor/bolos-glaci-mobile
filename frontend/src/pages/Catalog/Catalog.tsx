import { IonContent, IonPage, IonSelect, IonSelectOption, useIonRouter } from '@ionic/react';
import { useState } from 'react';

import AppHeader from '../../components/AppHeader';
import CakeCard from '../../components/CakeCard';
import DataState from '../../components/DataState';
import SearchFilterBar from '../../components/SearchFilterBar';
import { appRoutes } from '../../config/appRoutes';
import { type CakeSortOption, cakeSortLabels, catalogLabels } from '../../config/labels';
import { customerMenuId } from '../../config/navigation';
import { useCakeCatalog } from '../../hooks/useCakeCatalog';
import { useCakeOptions } from '../../hooks/useCakeOptions';
import { useCategoryPicker } from '../../hooks/useCategoryPicker';
import type { Cake } from '../../models/cake';

import './Catalog.css';

// Built once from the labels file, so a new sort option needs no change here.
const sortOptions = Object.entries(cakeSortLabels) as [CakeSortOption, string][];

const Catalog: React.FC = () => {
  const router = useIonRouter();
  const [searchText, setSearchText] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<CakeSortOption>('popular');

  // An empty search box means "no search", not "search for nothing".
  const { cakes, isLoading, errorMessage, reload } = useCakeCatalog(searchText || undefined, categoryId, sort);
  const { categories } = useCakeOptions();
  const openCategoryPicker = useCategoryPicker(categories, setCategoryId);

  const handleOrder = (cake: Cake): void => {
    router.push(appRoutes.placeOrderForCake(cake.id));
  };

  return (
    <IonPage>
      <AppHeader menuId={customerMenuId} />
      <IonContent>
        <SearchFilterBar
          searchText={searchText}
          searchPlaceholder={catalogLabels.searchPlaceholder}
          onSearchChange={setSearchText}
          onFilterClick={openCategoryPicker}
          isFilterActive={categoryId !== undefined}
        />

        <div className="catalog-summary">
          <div>
            <h1 className="catalog-summary__title">{catalogLabels.title}</h1>
            {!isLoading && !errorMessage && (
              <p className="catalog-summary__count">{catalogLabels.availableCount(cakes.length)}</p>
            )}
          </div>
          <IonSelect
            className="catalog-summary__sort"
            interface="popover"
            fill="outline"
            value={sort}
            aria-label={catalogLabels.sortLabel}
            onIonChange={(event) => setSort(event.detail.value as CakeSortOption)}
          >
            {sortOptions.map(([value, label]) => (
              <IonSelectOption key={value} value={value}>
                {label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <div className="catalog-list">
          <DataState
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={cakes.length === 0}
            emptyMessage={catalogLabels.noResults}
            onRetry={reload}
          >
            {cakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onOrder={handleOrder} />
            ))}
          </DataState>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Catalog;
