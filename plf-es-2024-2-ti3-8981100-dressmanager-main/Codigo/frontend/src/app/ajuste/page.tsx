"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { getAlugueis } from "@/services/aluguelService";
import { createAjuste, deleteAjuste, getAjustes, updateAjuste } from "@/services/ajusteService"; 
import withAuth from "../components/withAuth";

function Ajuste() {
    const [alugueis, setAlugueis] = useState([]);
    const [valor, setValor] = useState(0);
    const [ajustes, setAjustes] = useState([]);
    const [newAjuste, setNewAjuste] = useState({
        dataFim: '',
        aluguelId: '',
        finalizado: '',
        observacao: '',
        valor: ''
    });
    const [editingAjuste, setEdditingAjuste] = useState(null); 

    useEffect(() => {
        fetchAjuste();
        fetchAlugueis();
    }, []);

    const fetchAjuste = async () => {
        try {
            const data = await getAjustes();
            setAjustes(data);
        } catch (error) {
            console.error('Erro ao carregar ajustes:', error);
        }
    };

    const fetchAlugueis = async () => {
        try {
            const data = await getAlugueis();
            setAlugueis(data);
        } catch (error) {
            console.error('Erro ao carregar alugueis:', error);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Antes de enviar: ", newAjuste);  
  
      const ajusteData = {
          dataFim: newAjuste.dataFim,
          aluguel: newAjuste.aluguelId ? { id: newAjuste.aluguelId } : null,
          finalizado: newAjuste.finalizado,
          observacao: newAjuste.observacao,
          valor: newAjuste.valor

      };
  
      try {
          if (editingAjuste) {
              console.log("Atualizando ajuste...");
              await updateAjuste(editingAjuste.id, ajusteData);  
          } else {
              console.log("Criando ajuste...");
              await createAjuste(ajusteData); 
          }
          setNewAjuste({
            dataFim: '',
            aluguelId: '',
            finalizado: '',
            observacao: '',
            valor: ''
          });
          setEdditingAjuste(null);
          fetchAjuste();  
      } catch (error) {
          console.error('Erro ao salvar ajuste:', error);
      }
  };
  

    const handleDelete = async (ajusteId) => {
        try {
            await deleteAjuste(ajusteId);
            fetchAjuste(); 
        } catch (error) {
            console.error('Erro ao excluir ajuste:', error);
        }
    };

    const handleEdit = (ajuste) => {
        setNewAjuste({
            dataFim: ajuste.dataFim,
            aluguelId: ajuste.aluguel ? ajuste.aluguel.id : '',
            finalizado: ajuste.finalizado,
            observacao: ajuste.observacao,
            valor: ajuste.valor
        });
        setEdditingAjuste(ajuste); 
    };

    return (
        <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="min-h-screen flex items-center justify-center p-10">
          <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-center gap-5">
                        {/* Formulário de Aluguel */}
                        <div className="w-full lg:w-1/3 p-8 bg-white/70">
                            <h2 className="text-xl md:text-2xl font-semibold mb-6">{editingAjuste ? "Editar Ajuste" : "Novo Ajuste"}</h2>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <h3 className="font-medium text-lg">Selecione o Ajuste</h3>
                                    <select
                                        value={newAjuste.aluguelId}
                                        onChange={(e) => {
                                            const selectedId = e.target.value ? Number(e.target.value) : null;
                                            setNewAjuste({ ...newAjuste, aluguelId: selectedId });
                                        }}
                                        className="w-full p-3 border border-gray-400 rounded-md text-lg"
                                    >
                                        <option value="">Selecione um aluguel</option>
                                        {alugueis.map((aluguel) => (
                                            <option key={aluguel.id} value={aluguel.id}>
                                                {aluguel.cliente.nome + " - " + aluguel.item.descricao + " - " + aluguel.dataInicio}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-medium text-lg">Dados Gerais</h3>
                                    <Input
                                        type="date"
                                        value={newAjuste.dataFim}
                                        onChange={(e) => setNewAjuste({ ...newAjuste, dataFim: e.target.value })}
                                        placeholder="Data Final"
                                        className="w-full p-3 border border-gray-400 rounded-md"
                                    />
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={newAjuste.valor || ""}
                                        onChange={(e) => setNewAjuste({ ...newAjuste, valor: parseFloat(e.target.value) || 0 })}
                                        placeholder="Valor do ajuste"
                                        className="w-full p-3 border border-gray-400 rounded-md"
                                    />
                                    <Input
                                        value={newAjuste.observacao}
                                        onChange={(e) => setNewAjuste({ ...newAjuste, observacao: e.target.value })}
                                        placeholder="Observação:"
                                        className="w-full p-3 border border-gray-400 rounded-md"
                                    />
                                </div>
                                <Button className="w-full py-4 text-lg bg-black bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-200">
                                    {editingAjuste ? "Atualizar Ajuste" : "Novo Ajuste"}
                                </Button>
                            </form>
                        </div>

                        {/* Lista de Aluguéis */}
                        <div className="w-full lg:w-2/3 p-8 bg-white/70">
                            <h2 className="text-xl md:text-2xl font-semibold mb-6">Ajustes</h2>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="px-4 py-3 text-lg">Aluguel</TableHead>
                                            <TableHead className="px-4 py-3 text-lg">Observação</TableHead>
                                            <TableHead className="px-4 py-3 text-lg">Data Fim</TableHead>
                                            <TableHead className="px-4 py-3 text-lg">Valor</TableHead>
                                            <TableHead className="px-4 py-3 text-lg">Opções</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ajustes.map((ajuste) => (
                                            <TableRow key={ajuste.id}>
                                                <TableCell className="px-4 py-4 text-lg">{ajuste.aluguel ? ajuste.aluguel.cliente.nome : "Sem Aluguel"}</TableCell>
                                                <TableCell className="px-4 py-4 text-lg">{ajuste.observacao}</TableCell>
                                                <TableCell className="px-4 py-4 text-lg">{new Date(ajuste.dataFim).toLocaleDateString('pt-BR')}</TableCell>
                                                <TableCell className="px-4 py-4 text-lg">{ajuste.valor}</TableCell>
                                                <TableCell className="px-4 py-4 flex space-x-2">
                                                    <Button size="sm" variant="ghost" onClick={() => handleEdit(ajuste)}>
                                                        <Pencil className="h-5 w-5" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" onClick={() => handleDelete(ajuste.id)}>
                                                        <Trash className="h-5 w-5" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Ajuste, ["ADMIN", "BASIC"]);
