"use client";

import React, { useReducer, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "../components/multiSelect";
import { getClients } from "../../services/clienteService";
import { fetchHistoricoAluguel } from "../../services/consultaHistoricoService";
import axios from "axios";
import { DataTable } from "@/components/DataTable";
import { HistoricoAluguelRequest, HistoricoAluguelItem } from "../../Models/HistoricoAluguel";
import { ColumnDef } from "@tanstack/react-table";
import { Aluguel, ExportPDF } from "@/services/aluguelService";
import { FaFileContract } from "react-icons/fa";
import urlApi from "../../../urlService";

// Tipo para ações do reducer
type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof HistoricoAluguelRequest; value: any };

// Estado inicial do formulário
const initialState: HistoricoAluguelRequest = {
  nomeCliente: [],
  nomeItem: "",
  modelo: [],
  dataInicio: "",
  dataFim: "",
  valorInicial: 0,
  valorFinal: 0,
  page: 0,
  size: 10,
};

// Função redutora para atualizar o estado do formulário
function formReducer(state: HistoricoAluguelRequest, action: FormAction): HistoricoAluguelRequest {
  return action.type === "UPDATE_FIELD" ? { ...state, [action.field]: action.value } : state;
}

export default function HistoricoAluguel() {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [clientOptions, setClientOptions] = useState<{ value: string; label: string }[]>([]);
  const [modelOptions, setModelOptions] = useState<{ value: string; label: string }[]>([]);
  const [results, setResults] = useState<HistoricoAluguelItem[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [totalResults, setTotalResults] = useState(0);

  // Configuração das colunas
  const columns: ColumnDef<HistoricoAluguelItem>[] = [
    { accessorKey: "nomeCliente", header: "Nome do Cliente" },
    { accessorKey: "emailCliente", header: "Email" },
    { accessorKey: "nomeItem", header: "Nome do Item" },
    { accessorKey: "dataInicio", header: "Data Início" },
    { accessorKey: "dataFim", header: "Data Fim" },
    { accessorKey: "valorAluguel", header: "Valor Aluguel" },
    { accessorKey: "cor", header: "Cor" },
  ];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getClients();
        setClientOptions(clients.map((client: { id: string; nome: string }) => ({ value: client.nome, label: client.nome })));
      } catch (error) {
        console.error("Erro ao obter clientes:", error);
      }
    };

    const fetchModelos = async () => {
      try {
        const response = await axios.get(`${urlApi}` + "/itens/modelos");
        setModelOptions(response.data.map((model: string) => ({ value: model, label: model })));
      } catch (error) {
        console.error("Erro ao obter modelos:", error);
      }
    };

    fetchClients();
    fetchModelos();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchHistoricoAluguel({ ...formState, page: pagination.pageIndex, size: pagination.pageSize });
      setResults(response.content);
      setTotalResults(response.totalElements);
    } catch (error) {
      console.error("Erro ao buscar o histórico de aluguel:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center">
      <div className="w-full">
        <div className="flex-1 md:flex gap-3 rounded-lg">

          {/* Card Pesquisar */}
          <Card className="w-full md:w-1/2 bg-muted/70 shadow-2xl rounded-md flex-grow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-black">Pesquisar Aluguéis</CardTitle>
            </CardHeader>
            <CardContent className="pt-10">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4 w-full">
                    <Label htmlFor="nomeCliente" className="text-lg font-semibold text-black text-opacity-90">
                      Selecione o Cliente
                    </Label>
                    <MultiSelect
                      options={clientOptions}
                      onValueChange={(selected) => dispatch({ type: "UPDATE_FIELD", field: "nomeCliente", value: selected })}
                      placeholder="Selecione Clientes"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="modelo" className="text-lg font-semibold text-black text-opacity-90">
                      Modelo
                    </Label>
                    <MultiSelect
                      options={modelOptions}
                      onValueChange={(selected) => dispatch({ type: "UPDATE_FIELD", field: "modelo", value: selected })}
                      placeholder="Selecione Modelos"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="nomeItem" className="text-lg font-semibold text-black text-opacity-90">
                      Nome do Item
                    </Label>
                    <Input
                      id="nomeItem"
                      name="nomeItem"
                      value={formState.nomeItem}
                      onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "nomeItem", value: e.target.value })}
                      placeholder="Digite o nome do item"
                      className="w-full border-gray-400 focus:border-black focus:ring-black bg-white bg-opacity-60"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="valorInicial" className="text-lg font-semibold text-black text-opacity-90">
                      Preço Inicial
                    </Label>
                    <Input
                      id="valorInicial"
                      name="valorInicial"
                      type="number"
                      value={formState.valorInicial}
                      onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "valorInicial", value: e.target.value })}
                      className="w-full border-gray-400 focus:border-black focus:ring-black bg-white bg-opacity-60"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="valorFinal" className="text-lg font-semibold text-black text-opacity-90">
                      Preço Final
                    </Label>
                    <Input
                      id="valorFinal"
                      name="valorFinal"
                      type="number"
                      value={formState.valorFinal}
                      onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "valorFinal", value: e.target.value })}
                      className="w-full border-gray-400 focus:border-black focus:ring-black bg-white bg-opacity-60"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="dataInicio" className="text-lg font-semibold text-black text-opacity-90">
                      Data Início
                    </Label>
                    <Input
                      id="dataInicio"
                      name="dataInicio"
                      type="date"
                      value={formState.dataInicio}
                      onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "dataInicio", value: e.target.value })}
                      className="w-full border-gray-400 focus:border-black focus:ring-black bg-white bg-opacity-60"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="dataFim" className="text-lg font-semibold text-black text-opacity-90">
                      Data Fim
                    </Label>
                    <Input
                      id="dataFim"
                      name="dataFim"
                      type="date"
                      value={formState.dataFim}
                      onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "dataFim", value: e.target.value })}
                      className="w-full border-gray-400 focus:border-black focus:ring-black bg-white bg-opacity-60"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200">
                  Pesquisar
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Card Resultados */}
          <Card className="my-3 md:my-0 w-full md:w-1/2 bg-muted/70 shadow-2xl rounded-md flex-grow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-black">Resultados da Pesquisa</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-nowrap">
              <DataTable
                columns={columns}
                data={results}
                totalResults={totalResults}
                pagination={pagination}
                setPagination={setPagination}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}