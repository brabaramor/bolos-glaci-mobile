import { useIonActionSheet } from '@ionic/react';

import { commonLabels, filterLabels } from '../config/labels';
import type { CakeCategory } from '../models/cake';

export function useCategoryPicker(
  categories: CakeCategory[],
  onSelect: (categoryId: string | undefined) => void,
): () => void {
  const [presentActionSheet] = useIonActionSheet();

  return () => {
    void presentActionSheet({
      header: filterLabels.filterTitle,
      buttons: [
        { text: filterLabels.allCategories, handler: () => onSelect(undefined) },
        ...categories.map((category) => ({
          text: category.name,
          handler: () => onSelect(category.id),
        })),
        { text: commonLabels.cancel, role: 'cancel' },
      ],
    });
  };
}
