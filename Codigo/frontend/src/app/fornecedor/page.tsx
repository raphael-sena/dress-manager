"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Phone, Pencil, Trash } from "lucide-react";
import { getFornecedores, createFornecedor, updateFornecedor, deleteFornecedor } from "@/services/fornecedorService";
import withAuth from "../components/withAuth";
import Pagination from "@/components/Pagination"; // Importa o componente de paginação
import { debounce } from "lodash";
import axios from "axios";
import { MaskedInput } from "@/components/ui/masked-input";

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [pageable, setPageable] = useState({
    pageNumber: 0,
    pageSize: 9,
    totalPages: 1,
    totalElements: 0,
  });
  const [newFornecedor, setNewFornecedor] = useState({
    nome: "",
    endereco: { rua: "", numero: "", bairro: "", cidade: "", estado: "", cep: "" },
    telefone: "",
    itens: [],
  });
  const [editingFornecedor, setEditingFornecedor] = useState(null);

  useEffect(() => {
    fetchFornecedores(pageable.pageNumber, pageable.pageSize);
  }, [pageable.pageNumber, pageable.pageSize]);

  const fetchFornecedores = async (page: number, size: number) => {
    try {
      const data = await getFornecedores(page, size); // Ajuste na API
      setFornecedores(data.content);
      setPageable({
        pageNumber: data.pageable.pageNumber,
        pageSize: data.pageable.pageSize,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      });
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const telefone = newFornecedor.telefone;
      const telefoneValido = /^\(\d{2}\) \d{9}$/.test(telefone);

      if (!telefoneValido) {
        throw new Error("O número de telefone deve estar no formato (XX) XXXXXXXXX");
      }

      if (editingFornecedor) {
        await updateFornecedor(editingFornecedor.id, newFornecedor);
      } else {
        await createFornecedor(newFornecedor);
      }
      setNewFornecedor({
        nome: '',
        endereco: { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' },
        telefone: '',
        itens: [],
      });
      setEditingFornecedor(null);
      fetchFornecedores(pageable.pageNumber, pageable.pageSize);
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  const handleDelete = async (fornecedorId) => {
    try {
      await deleteFornecedor(fornecedorId);
      fetchFornecedores(pageable.pageNumber, pageable.pageSize);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleEdit = (fornecedor) => {
    setNewFornecedor(fornecedor);
    setEditingFornecedor(fornecedor);
  };

  const handlePageChange = (page: number) => {
    setPageable({ ...pageable, pageNumber: page - 1 });
  };

  const debouncedHandleCepChange = debounce(async (cep: string) => {
    if (cep.length === 9) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;

            setNewFornecedor((prev) => ({
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
    setNewFornecedor({ ...newFornecedor, endereco: { ...newFornecedor.endereco, cep } });
    debouncedHandleCepChange(cep);
};

  return (
    <div className="sm:w-full w-screen overflow-x-hidden">
      <div className="flex items-start justify-start w-full">
        <div className="mx-auto w-full max-w-full overflow-hidden box-border ">
          <div className="flex flex-col xl:flex-row gap-3 p-4 box-border" style={{ minHeight: `calc(100vh - 81px)` }}>
            {/* Formulário de Cadastro */}
            <div className="w-full xl:w-1/3 p-8 bg-white/70 rounded-lg shadow-2xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">
                {editingFornecedor
                  ? "Editar Fornecedor"
                  : "Cadastrar Fornecedor"}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Dados Fornecedor</h3>
                  <div className="relative">
                    <Input
                      value={newFornecedor.nome}
                      onChange={(e) =>
                        setNewFornecedor({
                          ...newFornecedor,
                          nome: e.target.value,
                        })
                      }
                      placeholder="Digite o nome do fornecedor"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Endereço</h3>
                  <MaskedInput
                      mask="99999-999"
                      value={newFornecedor.endereco.cep}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleCepChange(e.target.value)}
                      placeholder="Digite o CEP"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      value={newFornecedor.endereco.cidade}
                      onChange={(e) =>
                        setNewFornecedor({
                          ...newFornecedor,
                          endereco: {
                            ...newFornecedor.endereco,
                            cidade: e.target.value,
                          },
                        })
                      }
                      placeholder="Cidade"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                    <Input
                      value={newFornecedor.endereco.estado}
                      onChange={(e) =>
                        setNewFornecedor({
                          ...newFornecedor,
                          endereco: {
                            ...newFornecedor.endereco,
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
                      value={newFornecedor.endereco.numero}
                      onChange={(e) =>
                        setNewFornecedor({
                          ...newFornecedor,
                          endereco: {
                            ...newFornecedor.endereco,
                            numero: e.target.value,
                          },
                        })
                      }
                      placeholder="Número"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                    <Input
                      value={newFornecedor.endereco.bairro}
                      onChange={(e) =>
                        setNewFornecedor({
                          ...newFornecedor,
                          endereco: {
                            ...newFornecedor.endereco,
                            bairro: e.target.value,
                          },
                        })
                      }
                      placeholder="Bairro"
                      className="bg-white text-black placeholder-gray-700 border-0"
                    />
                  </div>
                  <Input
                    value={newFornecedor.endereco.rua}
                    onChange={(e) =>
                      setNewFornecedor({
                        ...newFornecedor,
                        endereco: {
                          ...newFornecedor.endereco,
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
                      mask="(99) 999999999"
                      value={newFornecedor.telefone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const valor = e.target.value;
                    
                        // Garante que o número tenha o espaço após o código de área
                        const telefoneComEspaco = valor.replace(/^(\(\d{2}\))(\d)/, '$1 $2');
                    
                        setNewFornecedor({
                          ...newFornecedor,
                          telefone: telefoneComEspaco,
                        });
                      }}
                      placeholder="Digite o telefone do fornecedor"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                      as={Input}
                    />
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <Button className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200">
                  {editingFornecedor ? "Confirmar Edição" : "Salvar dados"}
                </Button>
              </form>
            </div>

            {/* Lista de Fornecedores */}
            <div className="w-full xl:w-2/3 p-8 bg-white/70 rounded-lg shadow-2xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">
                Fornecedores
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-3 text-lg">Cod.</TableHead>
                      <TableHead className="px-4 py-3 text-lg">Nome</TableHead>
                      <TableHead className="px-4 py-3 text-lg">
                        Endereço
                      </TableHead>
                      <TableHead className="px-4 py-3 text-lg">
                        Telefone
                      </TableHead>
                      <TableHead className="px-4 py-3 text-lg">
                        Opções
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fornecedores.map((fornecedor, i) => (
                      <TableRow key={i}>
                        <TableCell className="px-4 py-4 text-lg">
                          {fornecedor.id}
                        </TableCell>
                        <TableCell className="px-4 py-4 text-lg">
                          {fornecedor.nome}
                        </TableCell>
                        <TableCell className="px-4 py-4 text-lg">
                          {fornecedor.endereco.cidade +
                            " - " +
                            fornecedor.endereco.estado}
                        </TableCell>
                        <TableCell className="px-4 py-4 text-lg">
                          {fornecedor.telefone}
                        </TableCell>
                        <TableCell className="px-4 py-4 flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(fornecedor)}
                          >
                            <Pencil className="h-5 w-5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(fornecedor.id)}
                          >
                            <Trash className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Componente de Paginação */}
              <div className="flex justify-center items-end">
                <Pagination
                  currentPage={pageable.pageNumber + 1}
                  totalItems={pageable.totalElements}
                  pageSize={pageable.pageSize}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Fornecedor, ["ADMIN", "BASIC"]);