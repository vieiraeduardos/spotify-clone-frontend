import "./Pagination.css";

interface PaginationProps<T> {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    onPageChange: (newOffset: number) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export default function Pagination<T>({
    items,
    total,
    limit,
    offset,
    onPageChange,
    renderItem,
    className = ""
}: PaginationProps<T>) {
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    
    const hasNextPage = offset + limit < total;
    const hasPreviousPage = offset > 0;

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            onPageChange(offset - limit);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            onPageChange(offset + limit);
        }
    };

    const handlePageClick = (page: number) => {
        const newOffset = (page - 1) * limit;
        onPageChange(newOffset);
    };

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            if (totalPages > 1) {
                rangeWithDots.push(totalPages);
            }
        }

        return rangeWithDots;
    };

    return (
        <div className="pagination-container">
            <div className={`pagination-items ${className}`}>
                {items.map((item: T, index: number) => renderItem(item, index))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-controls">
                    <div className="pagination-info">
                        Mostrando {offset + 1}-{Math.min(offset + limit, total)} de {total} itens
                    </div>
                    
                    <div className="pagination-buttons">
                        <button 
                            onClick={handlePreviousPage}
                            disabled={!hasPreviousPage}
                            className="pagination-btn"
                        >
                            ‹ Anterior
                        </button>

                        <div className="pagination-numbers">
                            {getVisiblePages().map((page, index) => (
                                <span key={index}>
                                    {page === '...' ? (
                                        <span className="pagination-dots">...</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePageClick(page as number)}
                                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>

                        <button 
                            onClick={handleNextPage}
                            disabled={!hasNextPage}
                            className="pagination-btn"
                        >
                            Próximo ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}