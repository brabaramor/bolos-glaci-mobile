import { IonIcon, IonInput } from '@ionic/react';
import { funnelOutline } from 'ionicons/icons';

import { filterLabels } from '../config/labels';

import AppButton from './AppButton';

import './SearchFilterBar.css';

interface SearchFilterBarProps {
  searchText: string;
  searchPlaceholder: string;
  onSearchChange: (searchText: string) => void;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
  children?: React.ReactNode;
  variant?: 'divider' | 'card';
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchText,
  searchPlaceholder,
  onSearchChange,
  onFilterClick,
  isFilterActive = false,
  children,
  variant = 'divider',
}) => (
  <div className={`search-filter-bar search-filter-bar--${variant}`}>
    <IonInput
      className="search-filter-bar__input"
      type="search"
      fill="outline"
      value={searchText}
      placeholder={searchPlaceholder}
      aria-label={searchPlaceholder}
      debounce={400}
      onIonInput={(event) => onSearchChange(event.detail.value ?? '')}
    />
    {children ??
      (onFilterClick && (
        <AppButton variant="secondary" className="search-filter-bar__filter" onClick={onFilterClick}>
          <IonIcon slot="start" icon={funnelOutline} aria-hidden="true" />
          {filterLabels.filterButton}
          {isFilterActive && filterLabels.activeFilterIndicator}
        </AppButton>
      ))}
  </div>
);

export default SearchFilterBar;
