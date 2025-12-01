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

export default function sidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }}>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-center w-full">
            <Link
              href="/"
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
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                  href="/users"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <User2Icon className="h-5 w-5" />
                  Cadastro de Usuario
                </Link>
                <Link
                  href="/client"
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
                  href="/Alugueis"
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
                <Link
                  href="/ConsultaHistorico"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <FolderCheckIcon className="h-5 w-5" />
                  Consultar Historico
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
    </div>
  );
}
