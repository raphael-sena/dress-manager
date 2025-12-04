"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tag, Hash, DollarSign, Folder, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  getAlugueisPorCliente,
  getClienteById,
} from "@/services/clienteService";
import { Card } from "@/components/ui/card";
import withAuth from "@/app/components/withAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StarRating from "@/app/components/StarRating";

function AlugueisCliente() {
  const { id } = useParams(); // Obtém o parâmetro clientId da URL
  const [alugueis, setAlugueis] = useState([]);
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Verifica o valor de clientId
  const [hasFetched, setHasFetched] = useState(false);

  const fetchAlugueis = async (id: number) => {
    setLoading(true);
    try {
      const data = await getAlugueisPorCliente(id);
      setAlugueis(data);
      console.log("Imagens", data.map(aluguel => aluguel.item.imagem));
    } catch (error) {
      console.log("Erro ao buscar aluguéis do cliente.", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCliente = async (id: number) => {
    setLoading(true);
    try {
      const data = await getClienteById(id);
      setClient(data);
    } catch (error) {
      console.log;
    }
  };

  useEffect(() => {
    if (id && !hasFetched) {
      console.log("Chamada para buscar aluguéis, id:", id);
      fetchCliente(id);
      fetchAlugueis(id);

      setHasFetched(true);
    }
  }, [id, hasFetched]);

  const getBase64Image = (base64: string) => {
    return `data:image/png;base64,${base64}`;
  };

  if (!id) {
    return <p>Esperando o clientId...</p>;
  }

  return (
    <Card className="bg-white/70 p-4 m-4">
      
      {/* Título */}
      <div className="text-3xl font-bold p-2 mb-4">
        <h1 className="flex">Aluguéis de {client.nome} - {client.cpf} - 
          <div className="ml-4">
            <StarRating 
              rating={client.avaliacao}
            />
          </div>
        </h1>
      </div>

      {/* Conteúdo */}
      <div>
        {loading && <p>Carregando aluguéis...</p>}
        {error && <p>{error}</p>}
        {alugueis.length > 0 ? (
          <Table className="whitespace-nowrap">
            <TableRow>
              <TableHead className="py-3 px-3 text-lg">Id</TableHead>
              <TableHead className="px-4 py-3 text-lg">Imagem</TableHead>
              <TableHead className="px-4 py-3 text-lg">Item</TableHead>
              <TableHead className="px-4 py-3 text-lg">Retirada</TableHead>
              <TableHead className="px-4 py-3 text-lg">Devolução</TableHead>
              <TableHead className="px-4 py-3 text-lg">Opções</TableHead>
            </TableRow>
            <TableBody className="text-lg font-bold">
              {alugueis.map((aluguel) => (
                <TableRow key={aluguel.id}>
                  <TableCell>{aluguel.id}</TableCell>
                  <TableCell>
                    <Image
                      src={
                        aluguel.item.imagem
                          ? `data:image/png;base64,${aluguel.item.imagem}`
                          : '/default_img.jpg'
                      }
                      alt={`Imagem de ${aluguel.item.descricao}`}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                      unoptimized
                    />
                  </TableCell>
                  <TableCell>{aluguel.item.descricao}</TableCell>
                  <TableCell>
                    {new Date(aluguel.dataInicio).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {new Date(aluguel.dataFim).toLocaleDateString("pt-BR")}
                  </TableCell>
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
        ) : (
          !loading && <p>Não há aluguéis para este cliente.</p>
        )}
      </div>
    </Card>
  );
}

export default withAuth(AlugueisCliente, ["ADMIN", "BASIC"]);
