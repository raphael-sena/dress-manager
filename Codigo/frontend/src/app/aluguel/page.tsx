"use client";

import { useState, useEffect, ReactHTMLElement } from "react";
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
import { Pencil, Trash } from "lucide-react";
import { getClients } from "@/services/clienteService";
import { getItens } from "@/services/itemService";
import {
  Aluguel,
  createAluguel,
  deleteAluguel,
  devolverAluguel,
  ExportPDF,
  finalizarAluguel,
  getAlugueis,
  getAlugueisAtrasados,
  getAlugueisProximosDeDevolucao,
  updateAluguel,
} from "@/services/aluguelService"; // Serviços de aluguel, clientes e itens
import withAuth from "../components/withAuth";
import HistoricoAluguel from "../ConsultaHistorico/page";
import { FaExclamationTriangle, FaFileContract } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Aluguel() {
  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);
  const [alugueis, setAlugueis] = useState([]);
  const [proximosDevolucao, setProximosDevolucao] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const PageSize = 5;
  const [editingAluguel, setEditingAluguel] = useState(null); // Estado para controle de edição
  const [newAluguel, setNewAluguel] = useState({
    clienteId: "",
    itemId: "",
    dataInicio: "",
    dataFim: "",
    statusPagamento: "PENDENTE",
    dataDevolucao: null,
    devolvido: false,
    finalizado: false,
  });

  const [currentPageAtrasados, setCurrentPageAtrasados] = useState(1);
  const [currentPageProximos, setCurrentPageProximos] = useState(1);

  const paginatedAtrasados = atrasados.slice(
    (currentPageAtrasados - 1) * PageSize,
    currentPageAtrasados * PageSize
  );

  const paginatedProximos = proximosDevolucao.slice(
    (currentPageProximos - 1) * PageSize,
    currentPageProximos * PageSize
  );

  const handleNextPageAtrasados = () => {
    if (currentPageAtrasados * PageSize < atrasados.length) {
      setCurrentPageAtrasados(currentPageAtrasados + 1);
    }
  };

  const handlePrevPageAtrasados = () => {
    if (currentPageAtrasados > 1) {
      setCurrentPageAtrasados(currentPageAtrasados - 1);
    }
  };

  const handleNextPageProximos = () => {
    if (currentPageProximos * PageSize < proximosDevolucao.length) {
      setCurrentPageProximos(currentPageProximos + 1);
    }
  };

  const handlePrevPageProximos = () => {
    if (currentPageProximos > 1) {
      setCurrentPageProximos(currentPageProximos - 1);
    }
  };

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await getItens();
      setItems(data);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  const fetchAlugueis = async () => {
    try {
      const data = await getAlugueis();
      console.log("Alugueis carregados:", data); // Verifique os dados aqui
      setAlugueis(data);
    } catch (error) {
      console.error("Erro ao carregar alugueis:", error);
    }
  };

  const fetchAlugueisAtrasados = async () => {
    try {
      const data = await getAlugueisAtrasados();
      console.log("Alugueis atrasados:", data);
      setAtrasados(data);
    } catch (error) {
      console.error("Erro ao carregar alugueis prixmos de devolucao:", error);
    }
  };

  const fetchAlugueisProximosDeDevolucao = async () => {
    try {
      const data = await getAlugueisProximosDeDevolucao();
      console.log("Alugueis próximos:", data);
      setProximosDevolucao(data);
    } catch (error) {
      console.error("Erro ao carregar alugueis prixmos de devolucao:", error);
    }
  };

  useEffect(() => {
    // Obtenha os clientes, itens e alugueis da API ao carregar o componente
    fetchClients();
    fetchItems();
    fetchAlugueis();
    fetchAlugueisAtrasados();
    fetchAlugueisProximosDeDevolucao();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Antes de enviar: ", newAluguel); // Adicione o log para verificar os dados

    // Estrutura correta do objeto para o backend
    const aluguelData = {
      dataInicio: newAluguel.dataInicio,
      dataFim: newAluguel.dataFim,
      cliente: { id: newAluguel.clienteId }, // Passando o id do cliente
      item: { id: newAluguel.itemId }, // Passando o id do item
      statusPagamento: newAluguel.statusPagamento, // Adicionado o status do pagamento
      dataDevolucao: newAluguel.dataDevolucao,
      devolvido: newAluguel.devolvido,
      finalizado: newAluguel.finalizado,
    };

    try {
      if (editingAluguel) {
        console.log("Atualizando aluguel...");
        await updateAluguel(editingAluguel.id, aluguelData); // Atualizando com o novo formato
      } else {
        console.log("Criando aluguel...");
        await ExportPDF(aluguelData);
        await createAluguel(aluguelData); // Criando com o novo formato
      }
      setNewAluguel({
        clienteId: "",
        itemId: "",
        dataInicio: "",
        dataFim: "",
        statusPagamento: "PENDENTE", // Reset para o status padrão
        dataDevolucao: null,
        devolvido: false,
        finalizado: false,
      });
      setEditingAluguel(null);
      fetchAlugueis();
      fetchAlugueisAtrasados();
      fetchAlugueisProximosDeDevolucao();
    } catch (error) {
      console.error("Erro ao salvar aluguel:", error);
    }
  };

  const handleDelete = async (aluguelId: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este aluguel?"
    );

    if (confirmDelete) {
      try {
        await deleteAluguel(aluguelId);
        fetchAlugueis();
        fetchAlugueisAtrasados();
        fetchAlugueisProximosDeDevolucao();
      } catch (error) {
        console.error("Erro ao excluir aluguel:", error);
      }
    } else {
      console.log("Exclusão cancelada.");
    }
  };

  const handleDevolver = async (aluguelId: number) => {
    const confirmDevolver = window.confirm(
      "Tem certeza que deseja devolver este aluguel?"
    );

    if (confirmDevolver) {
      try {
        await devolverAluguel(aluguelId);
        fetchAlugueis();
        fetchAlugueisAtrasados();
        fetchAlugueisProximosDeDevolucao();
      } catch (error) {
        console.error("Erro ao devolver aluguel:", error);
      }
    } else {
      console.log("Devolução cancelada.");
    }
  };

  const handleFinalizar = async (aluguelId: number) => {
    const confirmDevolver = window.confirm(
      "Tem certeza que deseja finalizar este aluguel?"
    );

    if (confirmDevolver) {
      try {
        await finalizarAluguel(aluguelId);
        fetchAlugueis();
        fetchAlugueisAtrasados();
        fetchAlugueisProximosDeDevolucao();
      } catch (error) {
        alert("Erro ao finalizar aluguel, pois ele não foi pago ou devolvido");
      }
    } else {
      console.log("Finalização cancelada.");
    }
  };

  const handleEmitirContrato= async (aluguel: Aluguel) => {
    const confirmDevolver = window.confirm(
      "Tem certeza que deseja emitir o contrato deste aluguel?"
    );

    if (confirmDevolver) {

      try {
        await ExportPDF(aluguel);
        fetchAlugueis();
        fetchAlugueisAtrasados();
        fetchAlugueisProximosDeDevolucao();
      } catch (error) {
        console.error("Erro ao finalizar aluguel:", error);
      }
    } else {
      console.log("Finalização cancelada.");
    }
  };

  const handleEdit = (aluguel) => {
    setNewAluguel({
      clienteId: aluguel.cliente.id,
      itemId: aluguel.item.id,
      dataInicio: aluguel.dataInicio,
      dataFim: aluguel.dataFim,
      statusPagamento: aluguel.statusPagamento, // Carregar o status do pagamento
      dataDevolucao: aluguel.dataDevolucao,
      devolvido: aluguel.devolvido,
      finalizado: aluguel.finalizado,
    });
    setEditingAluguel(aluguel); // Marcar que estamos editando este aluguel
  };

  return (
    <div className="sm:w-full w-screen min-h-screen bg-cover bg-center overflow-x-hidden">
      <div className="flex items-start justify-start w-full">
        <div className="mx-auto w-full max-w-full overflow-hidden box-border">
          <div className="flex flex-col gap-3 p-4 box-border">
            {/* Novo Aluguel, Aluguéis Próximos de Devolução e Aluguéis Atrasados */}
            <div className="flex flex-col xl:flex-row gap-3">
              {/* Formulário de Aluguel */}
              <div className="w-full xl:w-1/3 p-4 px-6 bg-white/70 rounded-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  {editingAluguel ? "Editar Aluguel" : "Novo Aluguel"}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Selecione o Cliente</h3>
                    <select
                      value={newAluguel.clienteId}
                      onChange={(e) =>
                        setNewAluguel({
                          ...newAluguel,
                          clienteId: Number(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-gray-400 rounded-md text-lg"
                    >
                      <option value="">Selecione um cliente</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Selecione o Item</h3>
                    <select
                      value={newAluguel.itemId}
                      onChange={(e) =>
                        setNewAluguel({
                          ...newAluguel,
                          itemId: Number(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-gray-400 rounded-md text-lg"
                    >
                      <option value="">Selecione um item</option>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.descricao}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Status do Pagamento</h3>
                    <select
                      value={newAluguel.statusPagamento}
                      onChange={(e) =>
                        setNewAluguel({
                          ...newAluguel,
                          statusPagamento: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-400 rounded-md text-lg"
                    >
                      <option value="PENDENTE">Pendente</option>
                      <option value="PAGO">Pago</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Datas do Aluguel</h3>
                    <Input
                      type="date"
                      value={newAluguel.dataInicio}
                      onChange={(e) =>
                        setNewAluguel({
                          ...newAluguel,
                          dataInicio: e.target.value,
                        })
                      }
                      placeholder="Data de Início"
                      className="w-full p-3 border border-gray-400 rounded-md"
                    />
                    <Input
                      type="date"
                      value={newAluguel.dataFim}
                      onChange={(e) =>
                        setNewAluguel({
                          ...newAluguel,
                          dataFim: e.target.value,
                        })
                      }
                      placeholder="Data de Fim"
                      className="w-full p-3 border border-gray-400 rounded-md"
                    />
                  </div>
                  <Button className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200">
                    {editingAluguel ? "Atualizar Aluguel" : "Criar Aluguel"}
                  </Button>
                </form>
              </div>

              {/* Aluguéis Atrasados e Aluguéis Próximos */}
              <div className="xl:w-2/3 flex flex-wrap gap-3">
                {/* Lista de Aluguéis Atrasados */}
                <div className="w-full p-4 bg-white/70 rounded-lg">
                  <div className="flex justify-between ">
                    <div className="flex items center justify center">
                      <h2 className="text-xl md:text-2xl font-semibold mb-6">
                        Aluguéis Atrasados
                      </h2>
                      <div className="px-4 py-2 text-red-600">
                        <FaExclamationTriangle />
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between items-center mt-2 gap-2">
                      <button
                        onClick={handlePrevPageAtrasados}
                        disabled={currentPageAtrasados === 1}
                        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
                      >
                        Página Anterior
                      </button>
                      <button
                        onClick={handleNextPageAtrasados}
                        disabled={
                          currentPageAtrasados * PageSize >= atrasados.length
                        }
                        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
                      >
                        Próxima Página
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table className="whitespace-nowrap">
                      <TableRow>
                        <TableHead className="py-3 px-3 text-lg">Id</TableHead>
                        <TableHead className="py-3 px-3 text-lg">
                          Cliente
                        </TableHead>
                        <TableHead className="py-3 px-3 text-lg">
                          Telefone
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Item
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Data Retirada
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Data Fim
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Pagamento
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Devolvido
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Opções
                        </TableHead>
                      </TableRow>
                      <TableBody className="text-lg font-bold">
                        {paginatedAtrasados.map((aluguel) => (
                          <TableRow key={aluguel.id}>
                            <TableCell className="px-4 py-4">
                              {aluguel.id}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              {aluguel.cliente
                                ? aluguel.cliente.nome
                                : "Cliente não encontrado"}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              {aluguel.cliente
                                ? aluguel.cliente.telefone
                                : "Telefone não disponível"}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              {aluguel.item.descricao}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              {new Date(aluguel.dataInicio).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell className="px-4 py-4">
                              {new Date(aluguel.dataFim).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-lg">
                              {aluguel.statusPagamento}
                            </TableCell>
                            <TableCell>
                              {aluguel.devolvido ? "Sim" : "Não"}
                            </TableCell>
                            {/* Exibe o status */}
                            <TableCell className="px-4 py-4 flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEmitirContrato(aluguel)}
                                title="Contrato"
                              >
                                <FaFileContract className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(aluguel)}
                                title="Editar"
                              >
                                <Pencil className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDevolver(aluguel.id)}
                                title="Marcar/Desmarcar devolução"
                              >
                                <RiArrowGoBackFill className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleFinalizar(aluguel.id)}
                                title="Finalizar"
                              >
                                <IoCheckmarkDoneSharp className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(aluguel.id)}
                                title="Excluir"
                              >
                                <Trash className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <span className="m-2">
                    Página {currentPageAtrasados} de{" "}
                    {Math.ceil(atrasados.length / PageSize)}
                  </span>
                </div>

                {/* Lista de Aluguéis Próximos */}
                <div className="w-full p-4 px-6 bg-white/70 rounded-lg">
                  <div className="flex justify-between items center">
                    <div className="flex items center justify center">
                      <h2 className="text-xl md:text-2xl font-semibold mb-6">
                        Aluguéis Próximos de Devolução
                      </h2>
                      <div className="px-4 py-2 text-yellow-400">
                        <FaExclamationTriangle />
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between items-center p-2 gap-2">
                      <button
                        onClick={handlePrevPageProximos}
                        disabled={currentPageProximos === 1}
                        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
                      >
                        Página Anterior
                      </button>
                      <button
                        onClick={handleNextPageProximos}
                        disabled={
                          currentPageProximos * PageSize >=
                          proximosDevolucao.length
                        }
                        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
                      >
                        Próxima Página
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table className="whitespace-nowrap">
                      <TableRow>
                        <TableHead className="py-3 px-3 text-lg">Id</TableHead>
                        <TableHead className="py-3 px-3 text-lg">
                          Cliente
                        </TableHead>
                        <TableHead className="py-3 px-3 text-lg">
                          Telefone
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Item
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Data Retirada
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Data Fim
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Pagamento
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Devolvido
                        </TableHead>
                        <TableHead className="px-4 py-3 text-lg">
                          Opções
                        </TableHead>
                      </TableRow>
                      <TableBody className="text-lg font-bold">
                        {paginatedProximos.map((aluguel) => (
                          <TableRow key={aluguel.id}>
                            <TableCell className="px-4 py-4">
                              {aluguel.id}
                            </TableCell>
                            <TableCell>{aluguel.cliente.nome}</TableCell>
                            <TableCell>{aluguel.cliente.telefone}</TableCell>
                            <TableCell>{aluguel.item.descricao}</TableCell>
                            <TableCell>
                              {new Date(aluguel.dataInicio).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(aluguel.dataFim).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell>{aluguel.statusPagamento}</TableCell>
                            <TableCell>
                              {aluguel.devolvido ? "Sim" : "Não"}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEmitirContrato(aluguel)}
                                title="Contrato"
                              >
                                <FaFileContract className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(aluguel)}
                                title="Editar"
                              >
                                <Pencil className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDevolver(aluguel.id)}
                                title="Marcar/Desmarcar devolução"
                              >
                                <RiArrowGoBackFill className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleFinalizar(aluguel.id)}
                                title="Finalizar"
                              >
                                <IoCheckmarkDoneSharp className="h-5 w-5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(aluguel.id)}
                                title="Excluir"
                              >
                                <Trash className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <span className="m-2">
                    Página {currentPageAtrasados} de{" "}
                    {Math.ceil(proximosDevolucao.length / PageSize)}
                  </span>
                </div>
              </div>
            </div>

            <HistoricoAluguel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Aluguel, ["ADMIN", "BASIC"]);
