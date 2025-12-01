"use client"; // Diretriz para indicar que este é um Client Component

import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/Context/useAuth";
import { useRouter } from "next/navigation"; // Usando o hook useRouter correto para navegação no Next.js App Router
import Link from "next/link";
import urlApi from "../../urlService";

type Props = {};
type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email().required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const router = useRouter(); // Hook para navegação no Next.js
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormsInputs>({
    resolver: yupResolver(validation),
  });

  console.log(urlApi)

  const handleLogin = async (form: LoginFormsInputs) => {
    try {
      await loginUser(form.email, form.password);
      router.push("/dashboard"); // Redireciona o usuário para o dashboard após o login
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
      }}
    >
      <section className="h-[700px] sm:w-[400px] md:w-[500px] mx-4 rounded-3xl bg-[#00000050] flex justify-center items-center flex-col">
        <Image
          width={128}
          height={128}
          src="/logo.svg"
          alt="logo"
          className=""
        />
        <h1 className="text-4xl font-black text-center text-white mt-12">
          Bem-vindo(a)
        </h1>
        <div className="flex justify-center items-center mt-8 w-3/5 flex-col">
          <form onSubmit={handleSubmit(handleLogin)}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="px-4 py-4 rounded-lg w-full mb-4"
              required
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <input
              type="password"
              placeholder="Digite sua senha"
              className="px-4 py-4 rounded-lg w-full mb-4"
              required
              {...register("password")}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <button type="submit" className="bg-zinc-800 w-full text-white px-8 py-4 rounded-lg">
              Entrar
            </button>
            <Link  href="/passwordReset" className="text-red-900 mt-4">Esqueceu sua senha?</Link>
      
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
