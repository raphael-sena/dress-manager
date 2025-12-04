import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/useAuth"; // Certifique-se de que o caminho está correto

const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const { isLoggedIn, getRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        router.push("/");
      } else {
        const role = getRole();
        if (!allowedRoles.includes(role || "")) {
          router.push("/unauthorized");
        }
      }
    }, [isLoggedIn, getRole, router]);

    // Verificação de autenticação e autorização
    if (!isLoggedIn()) {
      return null; // Pode retornar um componente de carregamento ou mensagem de acesso negado
    }

    if (!allowedRoles.includes(getRole() || "")) {
      router.push("/unauthorized"); // Redireciona para página de "Não autorizado"
      return null;
    }

    // Se o usuário está autenticado e autorizado, renderiza o componente
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
