"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Calendar, Phone, Pencil, Trash } from "lucide-react";
import { getClients, createClient, updateClient, deleteClient, getPaginatedClients } from "@/services/clienteService";
import axios from "axios";
import { MaskedInput } from "@/components/ui/masked-input";
import withAuth from "../components/withAuth";
import StarRating from "../components/StarRating";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/Pagination"; // Importa o componente de paginação
import { debounce } from "lodash";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { MdOutlineDescription } from "react-icons/md";

interface Address {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

interface Client {
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    endereco: Address;
    telefone: string;
    email: string;
    dataNascimento: string;
    avaliacao: number;
}

function Client() {
    const [clientes, setPaginatedClients] = useState([]);
    const [pageable, setPageable] = useState({
      pageNumber: 0,
      pageSize: 10,
      totalPages: 1,
      totalElements: 0,
    });
    const [clients, setClients] = useState<Client[]>([]);
    const [newClient, setNewClient] = useState<Client>({
        id: '',
        nome: '',
        cpf: '',
        rg: '',
        endereco: { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' },
        telefone: '',
        email: '',
        dataNascimento: '',
        avaliacao: 3
    });
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    useEffect(() => {
        fetchPaginatedClients(pageable.pageNumber, pageable.pageSize);
      }, [pageable.pageNumber, pageable.pageSize]);

    const fetchPaginatedClients = async (page: number, size: number) => {
      try {
        const data = await getPaginatedClients(page, size); // Ajuste na API]
        console.log("Clientes Paginados" + data.content);
        setPaginatedClients(data.content);
        setPageable({
          pageNumber: data.pageable.pageNumber,
          pageSize: data.pageable.pageSize,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        });
      } catch (error) {
        console.error("Erro ao carregar clientes paginados:", error);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCpf(newClient.cpf)) {
            alert('CPF inválido!');
            return;
        }

        try {
            if (editingClient) {
                await updateClient(editingClient.id, newClient); // Atualizar se estiver editando
            } else {
                await createClient(newClient); // Criar novo cliente
            }
            setNewClient({
                id: '',
                nome: '',
                cpf: '',
                rg: '',
                endereco: { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' },
                telefone: '',
                email: '',
                dataNascimento: '',
                avaliacao: 3
            });
            setEditingClient(null); // Limpa o estado de edição após salvar
            fetchPaginatedClients(pageable.pageNumber, pageable.pageSize);
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
        }
    };

    const handleDelete = async (clientId: string) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir este cliente?');

        if (confirmDelete) {
        try {
            await deleteClient(clientId);
            alert("Cliente apagado com sucesso.")
            fetchPaginatedClients(pageable.pageNumber, pageable.pageSize);
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        } 
      } else {
        alert('Exclusão cancelada');
    }
    };

    const handleVisualizarAlugueis = async(clientId: string) => {
      window.open(`/customer/${clientId}/alugueis`, '_blank');
    }; 

    const handleEdit = (client: Client) => {
        // Preenche o formulário com os dados do cliente
        setNewClient(client);
        setEditingClient(client); // Marca que estamos editando esse cliente
    };

    const handleRatingChange = (rating: number) => {
        setNewClient({ ...newClient, avaliacao: rating });
    };

    const handleDateClick = () => {
        const today = new Date().toISOString().split('T')[0]; // Pega a data no formato YYYY-MM-DD
        setNewClient({ ...newClient, dataNascimento: today }); // Atualiza o estado com a data de hoje
    };

    const debouncedHandleCepChange = debounce(async (cep: string) => {
      if (cep.length === 9) {
          try {
              const response = await axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
              const { logradouro, bairro, localidade, uf } = response.data;
  
              setNewClient((prev) => ({
                  ...prev,
                  endereco: {
                      ...prev.endereco,
                      rua: logradouro || "",
                      bairro: bairro || "",
                      cidade: localidade || "",
                      estado: uf || "",
                  }
              }));
          } catch (error) {
              console.error("Erro ao buscar CEP:", error);
          }
      }
  }, 400);

    const handleCepChange = (cep: string) => {
      setNewClient({ ...newClient, endereco: { ...newClient.endereco, cep } });
      debouncedHandleCepChange(cep);
  };

    const handlePageChange = (page: number) => {
      setPageable({ ...pageable, pageNumber: page - 1 });
    };

    const validateCpf = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    return (
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="flex items-center justify-center p-5">
          <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto rounded-xl overflow-hidden">
            <div className="flex flex-col max-h-auto w-full xl:flex-row justify-center gap-5" style={{ minHeight: `calc(100vh - 81px)` }}>
              {/* Formulário de Cadastro */}
              <div className="w-full lg:w-2/4 xl:w-1/3 p-8 bg-white/70 rounded-lg shadow-xl overflow-hidden">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">
                  {editingClient ? "Editar Cliente" : "Cadastrar Cliente"}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Dados Sensíveis</h3>
                    <div className="relative">
                      <MaskedInput
                        mask="999.999.999-99"
                        value={newClient.cpf}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setNewClient({ ...newClient, cpf: e.target.value })
                        }
                        placeholder="Digite o CPF do cliente"
                        className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                        as={Input}
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        value={newClient.nome}
                        onChange={(e) =>
                          setNewClient({ ...newClient, nome: e.target.value })
                        }
                        placeholder="Digite o nome do cliente"
                        className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        value={newClient.rg}
                        onChange={(e) =>
                          setNewClient({ ...newClient, rg: e.target.value })
                        }
                        placeholder="Digite o RG do cliente"
                        className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type="date"
                        value={newClient.dataNascimento}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            dataNascimento: e.target.value,
                          })
                        }
                        placeholder="Digite a data de nascimento"
                        className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                      />
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Endereço</h3>
                    <MaskedInput
                      mask="99999-999"
                      value={newClient.endereco.cep}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleCepChange(e.target.value)}
                      placeholder="Digite o CEP"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <Input
                        value={newClient.endereco.cidade}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            endereco: {
                              ...newClient.endereco,
                              cidade: e.target.value,
                            },
                          })
                        }
                        placeholder="Cidade"
                        className="bg-white text-black placeholder-gray-700 border-0"
                      />
                      <Input
                        value={newClient.endereco.estado}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            endereco: {
                              ...newClient.endereco,
                              estado: e.target.value,
                            },
                          })
                        }
                        placeholder="Estado"
                        className="bg-white text-black placeholder-gray-700 border-0"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Input
                        value={newClient.endereco.numero}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            endereco: {
                              ...newClient.endereco,
                              numero: e.target.value,
                            },
                          })
                        }
                        placeholder="Número"
                        className="bg-white text-black placeholder-gray-700 border-0"
                      />
                      <Input
                        value={newClient.endereco.bairro}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            endereco: {
                              ...newClient.endereco,
                              bairro: e.target.value,
                            },
                          })
                        }
                        placeholder="Bairro"
                        className="bg-white text-black placeholder-gray-700 border-0"
                      />
                    </div>
                    <Input
                      value={newClient.endereco.rua}
                      onChange={(e) =>
                        setNewClient({
                          ...newClient,
                          endereco: {
                            ...newClient.endereco,
                            rua: e.target.value,
                          },
                        })
                      }
                      placeholder="Rua"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Dados de Contato</h3>
                    <div className="relative">
                      <MaskedInput
                        mask="(99) 99999-9999"
                        value={newClient.telefone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setNewClient({
                            ...newClient,
                            telefone: e.target.value,
                          })
                        }
                        placeholder="Digite o telefone do cliente"
                        className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                        as={Input}
                      />
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <Input
                      value={newClient.email}
                      onChange={(e) =>
                        setNewClient({ ...newClient, email: e.target.value })
                      }
                      placeholder="Digite o email do cliente"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Avaliação do Cliente
                    </h3>
                    <StarRating
                      rating={newClient.avaliacao}
                      onChange={handleRatingChange}
                    />
                  </div>
                  <Button className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200">
                    {editingClient ? "Confirmar Edição" : "Salvar dados"}
                  </Button>
                </form>
              </div>

              {/* Lista de Clientes */}
              <Card className="w-full lg:w-2/4 xl:w-2/3 p-8 bg-white/70 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-black">Clientes</h2>
                <div className="overflow-x-auto">
                  <Table className="whitespace-nowrap">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-4 py-3 text-lg">
                          Cod.
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          CPF
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Nome
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Data Nasc.
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Endereço
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Telefone
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Email
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Avaliação
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Opções
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((client, i) => (
                        <TableRow className="text-md" key={i}>
                          <TableCell className="p-4">{client.id}</TableCell>
                          <TableCell className="p-4">{client.cpf}</TableCell>
                          <TableCell className="p-4">{client.nome}</TableCell>
                          <TableCell className="p-4">{new Date(client.dataNascimento).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="p-4">
                            {client.endereco.cidade +
                              " - " +
                              client.endereco.estado}
                          </TableCell>
                          <TableCell className="p-4">
                            {client.telefone}
                          </TableCell>
                          <TableCell className="p-4">{client.email}</TableCell>
                          <TableCell className="p-4">
                            <StarRating
                              rating={client.avaliacao}
                              onChange={() => {}}
                            />
                          </TableCell>
                          <TableCell className="p-4 flex">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(client)}
                              className="px-1"
                            >
                              <Pencil className="h-5 w-5 text-green-500" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleVisualizarAlugueis(client.id)}
                              className="px-1 "
                            >
                              <MdOutlineDescription className="h-5 w-5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(client.id)}
                              className="px-1 "
                            >
                              <Trash className="h-5 w-5 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Componente de Paginação */}
                <Pagination
                  currentPage={pageable.pageNumber + 1}
                  totalItems={pageable.totalElements}
                  pageSize={pageable.pageSize}
                  onPageChange={handlePageChange}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
}

export default withAuth(Client, ["ADMIN", "BASIC"]);
