"use client";

import {
  BoxIcon,
  CircleUser,
  FolderCheckIcon,
  Home,
  Menu,
  Package2,
  ReceiptCentIcon,
  ScissorsIcon,
  TruckIcon,
  TvIcon,
  User2Icon,
  UserCheckIcon,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { DashboardIcon, DotIcon } from "@radix-ui/react-icons";
import AvatarWithDropdown from "../components/AvatarWithDropDown";
import { useEffect, useState } from "react";

export default function sidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Recupera o objeto do localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        // Parse do objeto JSON armazenado
        const parsedUser = JSON.parse(storedUser);

        // Verifica se o campo 'email' existe no objeto e atualiza o estado
        if (parsedUser.email) {
          setUserEmail(parsedUser.email);
        }
      } catch (error) {
        console.error("Erro ao parsear os dados do localStorage", error);
      }
    }
  }, []);

  return (
    <div
      className="w-full max-w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpeg')" }}
    >
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-white/90 md:block shadow-lg">
          <div className="flex max-h-screen flex-col gap-2 items-center justify-center">
            
            {/* Logo */}
            <div className="flex m-4 lg:h-[60px] w-full">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold w-full justify-center"
              >
                <Image
                  src="/logo.svg"
                  alt="Dress Manager"
                  width={42}
                  height={42}
                />
              </Link>
            </div>
            
            {/* Nav */}
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <DashboardIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/user"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <User2Icon className="h-5 w-5" />
                  Gestão de Usuários
                </Link>
                <Link
                  href="/customer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserCheckIcon className="h-5 w-5" />
                  Gestão de Clientes
                </Link>

                <Link
                  href="/fornecedor"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <TruckIcon className="h-5 w-5" />
                  Gestão de Fornecedores
                </Link>

                <Link
                  href="/Estoque"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <BoxIcon className="h-5 w-5" />
                  Gestão de Estoque
                </Link>

                <Link
                  href="/aluguel"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary"
                >
                  <ReceiptCentIcon className="h-5 w-5" />
                  Gestão de Alugueis
                </Link>

                <Link
                  href="/ajuste"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ScissorsIcon className="h-5 w-5" />
                  Gestão de Ajuste
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-white/90 py-10 lg:h-[60px] lg:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black py-6 md:py-8">
              Gestão de Aluguéis
            </h1>
            <div className="ml-auto">
              <AvatarWithDropdown email={userEmail} />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <DashboardIcon className=" h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/user"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <User2Icon className="h-5 w-5" />
                    Cadastro de Usuario
                  </Link>
                  <Link
                    href="/customer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <UserCheckIcon className="h-5 w-5" />
                    Gestão de Clientes
                  </Link>
                  <Link
                    href="/Estoque"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <BoxIcon className="h-5 w-5" />
                    Gestão de Estoque
                  </Link>
                  <Link
                    href="/alugueis"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <UserCheckIcon className="h-5 w-5" />
                    Gestão de Aluguéis
                  </Link>
                  <Link
                    href="/ajuste"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <ScissorsIcon className="h-5 w-5" />
                    Gestão de Ajuste
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex flex-1 flex-col gap-4 w-full max-w-full box-border">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
