import './FormField.css';

interface FormFieldProps {
  label: string;
  isRequired?: boolean;
  errorMessage?: string | null;
  children: React.ReactNode;
}

// Label (with the pink asterisk when required), the input passed as children, and its error.
const FormField: React.FC<FormFieldProps> = ({ label, isRequired = false, errorMessage, children }) => (
  <div className="form-field">
    <span className="form-field__label">
      {label}
      {isRequired && (
        <span className="form-field__required" aria-hidden="true">
          *
        </span>
      )}
    </span>
    {children}
    {errorMessage && (
      <p className="form-field__error" role="alert">
        {errorMessage}
      </p>
    )}
  </div>
);

export default FormField;
