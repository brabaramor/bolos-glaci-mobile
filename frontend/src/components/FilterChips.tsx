import './FilterChips.css';

export interface FilterChipOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  options: FilterChipOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

// Horizontal row of pill buttons; scrolls sideways when it does not fit.
// A function (not React.FC) because the component is generic over the option values.
function FilterChips<T extends string>({
  options,
  selectedValue,
  onChange,
  ariaLabel,
}: FilterChipsProps<T>): React.JSX.Element {
  return (
    <div className="filter-chips" role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            type="button"
            className={`filter-chips__chip${isSelected ? ' filter-chips__chip--selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
