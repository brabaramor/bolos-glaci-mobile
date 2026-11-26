import FormField from './FormField';

import './ReadOnlyField.css';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
  isHighlighted?: boolean;
}

// Looks like an input but only displays a value (order details, product "Visualizar" mode).
const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, value, isHighlighted = false }) => (
  <FormField label={label}>
    <div className={`read-only-field${isHighlighted ? ' read-only-field--highlighted' : ''}`}>{value}</div>
  </FormField>
);

export default ReadOnlyField;
