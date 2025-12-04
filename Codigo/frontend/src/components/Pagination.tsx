import React from "react";

interface PaginationProps {
  currentPage: number; // Página atual
  totalItems: number; // Total de itens
  pageSize: number; // Itens por página
  onPageChange: (page: number) => void; // Função para alterar a página
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {/* Botão Página Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
      >
        Página Anterior
      </button>

      {/* Informação de Página */}
      <span className="text-lg font-medium">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botão Próxima Página */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
      >
        Próxima Página
      </button>
    </div>
  );
};

export default Pagination;
