"use client"

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarWithDropdownProps {
  email: string | null;
}

const AvatarWithDropdown: React.FC<AvatarWithDropdownProps> = ({ email }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef =  useRef<HTMLDivElement | null>(null);

  // Função para extrair a primeira letra do email
  const getAvatarFallback = (email: string | null) => {
    if (email) {
      const [firstLetter] = email.split("@")[0]; // Pega a primeira letra do nome do usuário (antes do @)
      return firstLetter.toUpperCase(); // Retorna a primeira letra em maiúscula
    }
    return "U"; // Se o email não estiver disponível, retorna "U" como fallback
  };

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Função de logout
  const handleLogout = () => {
    // Limpar cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/(.+?)=(.+)/, (_, name) => `${name}=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Limpar localStorage
    localStorage.clear();

    // Limpar sessionStorage
    sessionStorage.clear();

    // Redirecionar ou simular a saída
    console.log("Usuário deslogado");

    window.location.href = "/"; // Redirecionar para a página de login
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
        <Avatar>
          {/* Avatar fallback com a primeira letra do email */}
          <AvatarImage src="" alt="User Avatar" />
          <AvatarFallback>{getAvatarFallback(email)}</AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="p-2">
            <button
              onClick={handleLogout} // Função de logout
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarWithDropdown;
