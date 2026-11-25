import { IonSpinner } from '@ionic/react';

import { commonLabels } from '../config/labels';

import AppButton from './AppButton';

import './DataState.css';

interface DataStateProps {
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  emptyMessage?: string;
  onRetry: () => void;
  children: React.ReactNode;
}

const DataState: React.FC<DataStateProps> = ({
  isLoading,
  errorMessage,
  isEmpty,
  emptyMessage = commonLabels.emptyList,
  onRetry,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="data-state">
        <IonSpinner name="crescent" />
        <p>{commonLabels.loading}</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="data-state data-state--error" role="alert">
        <p>{errorMessage}</p>
        <AppButton variant="secondary" size="small" onClick={onRetry}>
          {commonLabels.retry}
        </AppButton>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="data-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataState;
