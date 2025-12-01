"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Save, User, Lock, Edit, Trash } from "lucide-react";
import { createUser, getUsers, deleteUser } from "@/services/userService";
import withAuth from "../components/withAuth";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from "@/components/ui/card";
// Validação do formulário usando Yup
const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(5, "O nome deve ter pelo menos 5 caracteres")
    .max(200, "O nome deve ter no máximo 200 caracteres")
    .required("O nome é obrigatório"),
  senha: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(60, "A senha deve ter no máximo 60 caracteres")
    .required("A senha é obrigatória"),
  telefone: Yup.string()
    .matches(/^(\(\d{2}\)) \d{9}$/, "O telefone deve estar no formato (XX) XXXXXXXX")
    .required("O telefone é obrigatório"),
  email: Yup.string()
    .email("O email deve ser válido")
    .required("O email é obrigatório"),
  role: Yup.string().required("O papel do usuário é obrigatório"),
});

function UserRegistration() {
  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Função para buscar os usuários cadastrados
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      console.log("Usuários carregados com sucesso:", response);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Buscar usuários ao carregar o componente
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await createUser(data);
      console.log("Usuário criado com sucesso:", response);

      // Limpar os dados do formulário
      reset();

      fetchUsers(); // Recarregar a lista de usuários
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  };

  // Função para excluir usuário
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // Recarregar após exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Função para editar usuário
  const handleEdit = (user: any) => {
    reset({
      nome: user.nome,
      senha: "", // Senha geralmente não deve ser exibida ao editar
      telefone: user.telefone,
      email: user.email,
      role: user.role, // Preencher o papel ao editar, se disponível
    });
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center rounded-lg">
      <div className="w-full justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row gap-5 p-4">
          {/* Formulário de Cadastro - à esquerda */}
          <div className="w-full lg:w-2/4 xl:w-1/3 bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-2xl text-strong">
            <h2 className="text-3xl font-bold mb-8 text-center text-black drop-shadow-lg">Cadastrar</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Dados Sensíveis</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <div className="flex items-center bg-transparent border border-gray-400 text-black rounded-lg">
                      <User className="ml-4 text-black" size={24} />
                      <Input
                        {...register("nome")}
                        placeholder="Digite o nome do Usuário"
                        className="bg-transparent placeholder-opacity-80 placeholder-gray-600 flex-1 pr-4 py-3"
                      />
                    </div>
                    {errors.nome && <p className="text-red-600 mt-1">{errors.nome.message}</p>}
                  </div>
                  <div className="relative">
                    <div className="flex items-center bg-transparent border border-gray-400 text-black rounded-lg">
                      <Lock className="ml-4 text-black" size={24} />
                      <Input
                        {...register("senha")}
                        type="password"
                        placeholder="Digite a senha do Usuário"
                        className="bg-transparent placeholder-opacity-80 placeholder-gray-600 flex-1 pr-4 py-3"
                      />
                    </div>
                    {errors.senha && <p className="text-red-600 mt-1">{errors.senha.message}</p>}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Dados de Contato</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <div className="flex items-center bg-transparent border border-gray-400 text-black rounded-lg">
                      <Phone className="ml-4 text-black" size={24} />
                      <Controller
                        name="telefone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <InputMask
                            {...field}
                            mask="(99) 999999999"
                            className="bg-transparent placeholder-opacity-80 placeholder-gray-600 flex-1 pr-4 py-3"
                            placeholder="(XX) XXXXXXXXX"
                          >
                            {(props: any) => (
                              <Input {...props} />
                            )}
                          </InputMask>
                        )}
                      />
                    </div>
                    {errors.telefone && <p className="text-red-600 mt-1">{errors.telefone.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="flex items-center bg-transparent border border-gray-400 text-black rounded-lg">
                      <Mail className="ml-4 text-black" size={24} />
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Digite o email do Usuário"
                        className="bg-transparent placeholder-opacity-80 placeholder-gray-600 flex-1 pr-4 py-3"
                      />
                    </div>
                    {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              {/* Select para escolher o papel do usuário */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Papel do Usuário</h3>
                <select
                  {...register("role")}
                  className="w-full bg-transparent border border-gray-400 text-black placeholder-opacity-80 placeholder-gray-600 pl-4 py-3 rounded-lg"
                >
                  <option className="text-black" value="" disabled>
                    Selecione o papel do usuário
                  </option>
                  <option className="text-black" value="BASIC">Vendedor</option>
                  <option className="text-black" value="ADMIN">Administrador</option>
                </select>
                {errors.role && <p className="text-red-600 mt-1">{errors.role.message}</p>}
              </div>

              <Button type="submit" className="w-full py-4 bg-black text-white hover:bg-opacity-90 text-lg transition-all duration-200">
                <Save className="mr-2 text-white" size={24} />
                Salvar dados
              </Button>
            </form>
          </div>

          {/* Lista de usuários - à direita */}
          <Card className="w-full lg:w-2/4 xl:w-2/3 bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-black">Usuários Cadastrados</h3>
            <div className="mt-8 overflow-x-auto">
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Nome</TableHead>
                    <TableHead className="text-left">E-mail</TableHead>
                    <TableHead className="text-left">Telefone</TableHead>
                    <TableHead className="text-left">Papel</TableHead>
                    <TableHead className="text-left">Opções</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-black">{user.nome}</TableCell>
                      <TableCell className="text-black">{user.email}</TableCell>
                      <TableCell className="text-black">{user.telefone}</TableCell>
                      <TableCell className="text-black">
                        {(user.roles[0].name === 'ADMIN' && 'Administrador') ||
                          (user.roles[0].name === 'BASIC' && 'Vendedor') ||
                          user.roles[0].name}
                      </TableCell>

                      <TableCell className="text-left">
                        <div className="flex space-x-2">
                          <Button variant="ghost" onClick={() => handleEdit(user)} className="text-black">
                            <Edit size={20} />
                          </Button>
                          <Button variant="ghost" onClick={() => handleDelete(user.id)} className="text-black">
                            <Trash size={20} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(UserRegistration, ["ADMIN"]);
