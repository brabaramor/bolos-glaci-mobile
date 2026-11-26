import { paginationLabels } from '../config/labels';

import './Pagination.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Numbered page buttons. Hidden when everything fits on one page.
const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label={paginationLabels.ariaLabel}>
      {pageNumbers.map((pageNumber) => {
        const isCurrent = pageNumber === page;
        return (
          <button
            key={pageNumber}
            type="button"
            className={`pagination__page${isCurrent ? ' pagination__page--current' : ''}`}
            aria-label={paginationLabels.goToPage(pageNumber)}
            aria-current={isCurrent ? 'page' : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
