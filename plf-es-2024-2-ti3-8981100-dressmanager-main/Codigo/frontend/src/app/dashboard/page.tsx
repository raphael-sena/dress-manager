"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import AvatarWithDropdown from "../components/AvatarWithDropDown";
import withAuth from "../components/withAuth";
import axios from "axios";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import urlApi from "../../../urlService";

function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [revenueData, setRevenueData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const [weeklyRentals, setWeeklyRentals] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [isRevenueLoading, setIsRevenueLoading] = useState(true);
  const [isRentalLoading, setIsRentalLoading] = useState(true);
  const [isWeeklyLoading, setIsWeeklyLoading] = useState(true);
  const [isTopClientsLoading, setIsTopClientsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const containerRef = useRef(null);


  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c", "#8dd1e1"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email) {
          setUserEmail(parsedUser.email);
        }
      } catch (error) {
        console.error("Erro ao parsear os dados do localStorage", error);
      }
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await axios.get(`${urlApi}` + "/relatorios/receita-mensal");
        const formattedData = response.data.map((item: { mes: number; receita: number }) => ({
          name: new Date(0, item.mes - 1).toLocaleString("default", { month: "short" }),
          value: item.receita,
        }));
        setRevenueData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar receita mensal:", error);
      } finally {
        setIsRevenueLoading(false);
      }
    }

    async function fetchRentalData() {
      try {
        const response = await axios.get(`${urlApi}` + "/relatorios/alugueis-mensais");
        const formattedData = response.data.map(
          (item: { mes: number; pagos: number; pendentes: number }) => ({
            name: new Date(0, item.mes - 1).toLocaleString("default", { month: "short" }),
            pagos: item.pagos,
            pendentes: item.pendentes,
          })
        );
        setRentalData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados de aluguéis mensais:", error);
      } finally {
        setIsRentalLoading(false);
      }
    }




    async function fetchWeeklyRentals() {
      try {
        const response = await axios.get(`${urlApi}` + "/relatorios/alugueis-semanais");
        setWeeklyRentals(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de aluguéis semanais:", error);
      } finally {
        setIsWeeklyLoading(false);
      }
    }

    async function fetchTopClients() {
      try {
        const response = await axios.get(`${urlApi}` + "/relatorios/top-clientes");
        setTopClients(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de TOP clientes:", error);
      } finally {
        setIsTopClientsLoading(false);
      }
    }

    fetchRevenueData();
    fetchRentalData();
    fetchWeeklyRentals();
    fetchTopClients();
  }, []);

  const handleExportToPDF = async () => {
    try {
      if (containerRef.current) {
        // Captura o conteúdo da div como uma imagem
        const canvas = await html2canvas(containerRef.current, {
          scale: 1, // Reduz a escala para diminuir o tamanho
          useCORS: true,
        });
  
        // Converte o canvas para uma imagem em formato JPEG de menor qualidade
        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Qualidade de 70%
  
        // Cria um novo documento PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        // Calcula as dimensões para ajustar a imagem na página
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        // Se a imagem for maior que a página, divide em várias páginas
        const pageHeight = pdf.internal.pageSize.getHeight();
        let position = 0;
  
        while (position < pdfHeight) {
          pdf.addImage(imgData, 'JPEG', 0, -position, pdfWidth, pdfHeight);
          position += pageHeight;
          if (position < pdfHeight) {
            pdf.addPage();
          }
        }
  
        // Converte o PDF para um blob
        const pdfBlob = pdf.output('blob');
  
        // Verifica o tamanho do PDF
        console.log('Tamanho do PDF em bytes:', pdfBlob.size);
  
        // Cria um objeto FormData para enviar o arquivo
        const formData = new FormData();
        formData.append('email', recipientEmail);
        formData.append('file', pdfBlob, 'relatorio.pdf');
  
        // Envia o PDF para o backend
        const response = await axios.post(`${urlApi}` + '/relatorios/exportar', formData);
  
        if (response.status === 200) {
          alert('Relatório enviado com sucesso!');
          setIsModalOpen(false);
        } else {
          alert('Erro ao enviar o relatório.');
        }
      } else {
        alert('Erro ao capturar o conteúdo do relatório.');
      }
    } catch (error) {
      console.error('Erro ao exportar o relatório:', error);
      alert('Ocorreu um erro ao tentar enviar o relatório. Tente novamente.');
    }
  };
  

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}>

      <div className="min-h-screen p-8"> 
       <div id="container-pdf" ref={containerRef}>
        <div className="grid gap-8 xl:grid-cols-2">
          {/* Receita Mensal */}
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              {isRevenueLoading ? (
                <div className="text-center">Carregando dados...</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Aluguéis Mensais (Pagos vs Pendentes) */}
          <Card>
            <CardHeader>
              <CardTitle>Aluguéis Mensais (Pagos vs Pendentes)</CardTitle>
            </CardHeader>
            <CardContent>
              {isRentalLoading ? (
                <div className="text-center">Carregando dados...</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rentalData} stackOffset="expand">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pagos" stackId="a" fill="#4caf50" name="Pagos" />
                    <Bar dataKey="pendentes" stackId="a" fill="#f44336" name="Pendentes" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 xl:grid-cols-2 mt-8">
          {/* Aluguéis Semanais */}
          <Card>
            <CardHeader>
              <CardTitle>Aluguéis Semanais</CardTitle>
            </CardHeader>
            <CardContent>
              {isWeeklyLoading ? (
                <div className="text-center">Carregando dados...</div>
              ) : (
                <ul>
                  {weeklyRentals.map(
                    (
                      rental: {
                        nomeCliente: string;
                        dataInicio: string;
                        dataFim: string;
                        valorAluguel: number;
                        nomeItem: string;
                        statusPagamento: string;
                      },
                      index: number
                    ) => (
                      <li key={index} className="mb-4 border-b pb-2">
                        <p>
                          <strong>Cliente:</strong> {rental.nomeCliente}
                        </p>
                        <p>
                          <strong>Item:</strong> {rental.nomeItem}
                        </p>
                        <p>
                          <strong>Período:</strong> {rental.dataInicio} - {rental.dataFim}
                        </p>
                        <p>
                          <strong>Valor:</strong> R$ {rental.valorAluguel.toFixed(2)}
                        </p>
                        <p>
                          <strong>Status:</strong> {rental.statusPagamento}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* TOP 6 Clientes */}
          <Card>
            <CardHeader>
              <CardTitle>Top 6 Clientes - Aluguéis Anuais</CardTitle>
            </CardHeader>
            <CardContent>
              {isTopClientsLoading ? (
                <div className="text-center">Carregando dados...</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topClients}
                      dataKey="quantidadeAlugueis"
                      nameKey="nomeCliente"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {topClients.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        </div>

        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Exportar Relatório
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Enviar Relatório</h2>
              <p className="mb-4">Insira o e-mail para onde o relatório será enviado:</p>
              <input
                type="email"
                className="border border-gray-300 p-2 rounded w-full mb-4"
                placeholder="Digite o e-mail"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleExportToPDF}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default withAuth(Dashboard, ["ADMIN"]);
