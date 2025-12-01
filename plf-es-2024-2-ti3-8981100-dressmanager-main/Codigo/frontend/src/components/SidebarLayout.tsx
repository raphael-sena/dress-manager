import Link from "next/link";
import { BoxIcon, ReceiptCentIcon, User2Icon, UserCheckIcon } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function SidebarLayout() {
  return (
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
              <ReceiptCentIcon className="h-5 w-5" />
              Gestão de Alugueis
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
