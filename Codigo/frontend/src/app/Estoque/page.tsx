"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag, Hash, DollarSign, Folder, Pencil, Trash2 } from "lucide-react";
import withAuth from "../components/withAuth";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import urlApi from "../../../urlService";

// Interfaces para tipagem
export interface Item {
  id: number;
  descricao: string;
  modelo: string;
  quantidade: number;
  valorVenda: number;
  valorAluguel: number;
  observacao: string;
  cor: string;
  fornecedorId: number;
  imagemBase64: string;
}

export interface Fornecedor {
  id: number;
  nome: string;
}

interface Cor {
  value: string;
  label: string;
}

function Estoque() {
  const [itens, setItens] = useState<Item[]>([]);
  const [descricao, setDescricao] = useState("");
  const [modelo, setModelo] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [valorVenda, setValorVenda] = useState(0);
  const [valorAluguel, setValorAluguel] = useState(0);
  const [observacao, setObservacao] = useState("");
  const [cor, setCor] = useState("");
  const [fornecedorId, setFornecedorId] = useState<number | "">("");
  const [fornecedores, setFornecedores] = useState<[]>([]);
  const [itemIdEdit, setItemIdEdit] = useState<number | null>(null);
  const [imagem, setImagem] = useState<File | null>(null);
  const [pageable, setPageable] = useState({
    currentPage: 1,
    totalItems: 0,
    pageSize: 5,
  });

  const cores: Cor[] = [
    { value: "VERMELHO", label: "Vermelho" },
    { value: "AZUL", label: "Azul" },
    { value: "VERDE", label: "Verde" },
    { value: "AMARELO", label: "Amarelo" },
    { value: "PRETO", label: "Preto" },
    { value: "BRANCO", label: "Branco" },
    { value: "CINZA", label: "Cinza" },
    { value: "LARANJA", label: "Laranja" },
    { value: "ROXO", label: "Roxo" },
    { value: "ROSA", label: "Rosa" },
  ];

  // Função para buscar itens do backend com paginação
  const fetchItens = async (page = 1, size = 5) => {
    try {
      const response = await axios.get(`${urlApi}` + "/itens", {
        params: { page: page - 1, size },
      });
      const data = response.data;
      setItens(data.content);
      setPageable({
        currentPage: data.pageable.pageNumber + 1,
        totalItems: data.totalElements,
        pageSize: data.pageable.pageSize,
      });
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get(`${urlApi}` + "/fornecedores/all");
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao buscar os fornecedores:", error);
    }
  };

  useEffect(() => {
    fetchItens();
    fetchFornecedores();
  }, []);

  const handleAddOrEditItem = async () => {
    const newItem = {
      descricao,
      modelo,
      quantidade,
      valorVenda,
      valorAluguel,
      observacao,
      cor,
      fornecedor: { id: fornecedorId },
    };

    try {
      let createdOrUpdatedItemId = null;

      if (itemIdEdit !== null) {
        await axios.put(`${urlApi}` + `/itens/${itemIdEdit}`, newItem);
        fetchItens(pageable.currentPage, pageable.pageSize);
        createdOrUpdatedItemId = itemIdEdit;
        setItemIdEdit(null);
      } else {
        const response = await axios.post(`${urlApi}` + "/itens", newItem);
        fetchItens(pageable.currentPage, pageable.pageSize);
        createdOrUpdatedItemId = response.data.id;
      }

      if (imagem && createdOrUpdatedItemId !== null) {
        await handleUploadImage(createdOrUpdatedItemId);
      }

      setDescricao("");
      setModelo("");
      setQuantidade(0);
      setValorVenda(0);
      setValorAluguel(0);
      setObservacao("");
      setCor("");
      setFornecedorId("");
      setImagem(null);
    } catch (error) {
      console.error("Erro ao adicionar ou editar o item:", error);
    }
  };

  const handleUploadImage = async (itemId: number) => {
    if (!imagem) return;

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      await axios.post(
        `${urlApi}` + `/itens/${itemId}/imagem`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Imagem carregada com sucesso!");
    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };

  const handleEditItem = (item: Item) => {
    setDescricao(item.descricao);
    setModelo(item.modelo);
    setQuantidade(item.quantidade);
    setValorVenda(item.valorVenda);
    setValorAluguel(item.valorAluguel);
    setObservacao(item.observacao);
    setCor(item.cor);
    setFornecedorId(item.fornecedorId);
    setItemIdEdit(item.id);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`${urlApi}` + `/itens/${id}`);
      fetchItens(pageable.currentPage, pageable.pageSize);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handlePageChange = (page: number) => {
    fetchItens(page, pageable.pageSize);
  };

  const getBase64Image = (base64: string) => {
    return `data:image/png;base64,${base64}`;
  };

  return (
    <div className="sm:w-full w-screen min-h-screen bg-cover bg-center overflow-x-hidden">
      <div className="flex items-start justify-start w-full">
        <div className="mx-auto w-full max-w-full overflow-hidden box-border">
          <div className="flex flex-col xl:flex-row gap-3 p-4 box-border">
            {/* Formulário de Cadastro */}
            <div className="w-full xl:w-3/7 bg-white/70 rounded-lg p-8 shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">
                {itemIdEdit ? "Editar Item" : "Cadastrar Item"}
              </h2>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Descrição do item"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <Tag
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                      placeholder="Digite o modelo"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <Folder
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      type="number"
                      value={quantidade === 0 ? "" : quantidade}
                      onChange={(e) =>
                        setQuantidade(parseInt(e.target.value) || 0)
                      }
                      placeholder="Quantidade"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <Hash
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={valorVenda === 0 ? "" : valorVenda}
                      onChange={(e) =>
                        setValorVenda(parseFloat(e.target.value) || 0)
                      }
                      placeholder="Valor de venda"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={valorAluguel === 0 ? "" : valorAluguel}
                      onChange={(e) =>
                        setValorAluguel(parseFloat(e.target.value) || 0)
                      }
                      placeholder="Valor de aluguel"
                      className="pl-10 bg-white text-black placeholder-gray-700 border-0"
                    />
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={fornecedorId}
                      onChange={(e) => setFornecedorId(e.target.value)}
                      className="w-full p-3 border border-gray-400 rounded-md text-lg"
                    >
                      <option value="">Selecione um fornecedor</option>
                      {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-md text-lg"
                  >
                    <option value="">Selecione uma cor</option>
                    {cores.map((cor) => (
                      <option key={cor.value} value={cor.value}>
                        {cor.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-400 rounded-md text-lg"
                  />
                </div>
                <div className="relative">
                  <textarea
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Observação"
                    className="w-full p-3 bg-white text-black placeholder-gray-700 border-0 h-24 rounded-md"
                  />
                </div>
                <Button
                  className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200"
                  onClick={handleAddOrEditItem}
                >
                  {itemIdEdit ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </div>

            {/* Tabela de Itens */}
            <div className="w-full xl:w-4/7 overflow-auto bg-white/70 rounded-lg shadow-lg p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-black">
                Lista de Itens
              </h2>
              <Table className="whitespace-nowrap p-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor de Venda</TableHead>
                    <TableHead>Valor de Aluguel</TableHead>
                    <TableHead>Observação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={`data:image/png;base64,${item.imagemBase64}`}
                          alt={`Imagem de ${item.descricao}`}
                          width={80}
                          height={80}
                          className="object-cover rounded-md"
                          unoptimized
                        />
                      </TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>{item.modelo}</TableCell>
                      <TableCell>{item.quantidade}</TableCell>
                      <TableCell>{item.valorVenda}</TableCell>
                      <TableCell>{item.valorAluguel}</TableCell>
                      <TableCell>{item.observacao}</TableCell>
                      <TableCell className="px-4 py-4 flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditItem(item)}
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={pageable.currentPage}
                totalItems={pageable.totalItems}
                pageSize={pageable.pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Estoque, ["ADMIN", "BASIC"]);
