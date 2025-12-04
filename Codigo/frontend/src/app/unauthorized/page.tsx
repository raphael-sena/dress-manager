"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/dashboard'); // Redireciona para a página inicial ou outra rota desejada
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center text-white" style={{ backgroundImage: 'url("/bg.jpeg")' }}>
      <div className="bg-black bg-opacity-60 p-10 rounded-lg text-center max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="mb-6">Você não tem permissão para acessar esta página.</p>
        <button
          onClick={handleGoHome}
          className="px-5 py-2 bg-white text-black rounded transition duration-300 hover:bg-black hover:text-white"
        >
          Voltar à Página Inicial
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
