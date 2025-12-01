package com.DressManager.dressmanager.service;

import com.DressManager.dressmanager.dto.aluguel.AluguelSemanaDTO;
import com.DressManager.dressmanager.dto.aluguel.HistoricoAluguelRequestDTO;
import com.DressManager.dressmanager.dto.aluguel.HistoricoAluguelResponseDTO;
import com.DressManager.dressmanager.dto.aluguel.TopClientesDTO;
import com.DressManager.dressmanager.model.Aluguel;
import com.DressManager.dressmanager.model.enums.StatusPagamento;
import com.DressManager.dressmanager.repository.AluguelRepository;
import com.DressManager.dressmanager.specification.AluguelSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AluguelService {

    @Autowired
    private AluguelRepository aluguelRepository;

    public Page<HistoricoAluguelResponseDTO> getHistorico(HistoricoAluguelRequestDTO requestDTO, Pageable pageable) {

        // Criação da Specification com os filtros
        Specification<Aluguel> spec = Specification.where(AluguelSpecifications.hasClienteNomes(requestDTO.nomeCliente()))
                .and(AluguelSpecifications.hasItemDescricao(requestDTO.nomeItem()))
                .and(AluguelSpecifications.hasModelos(requestDTO.modelo()))
                .and(AluguelSpecifications.dataFimBetween(requestDTO.dataInicio(), requestDTO.dataFim()))
                .and(AluguelSpecifications.valorBetween(requestDTO.valorInicial(), requestDTO.valorFinal()))
                .and(AluguelSpecifications.isFinalizado());

        // Busca paginada de Aluguel
        Page<Aluguel> aluguelPage = aluguelRepository.findAll(spec, pageable);

        // Converte a página de Aluguel para a página de HistoricoAluguelResponseDTO
        Page<HistoricoAluguelResponseDTO> responsePage = aluguelPage.map(this::toHistoricoAluguelResponseDTO);

        return responsePage;
    }


    // Método para converter Aluguel em HistoricoAluguelResponseDTO

    private HistoricoAluguelResponseDTO toHistoricoAluguelResponseDTO(Aluguel aluguel) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String dataInicioFormatada = aluguel.getDataInicio().format(formatter);
        String dataFimFormatada = aluguel.getDataFim().format(formatter);

        return new HistoricoAluguelResponseDTO(
                aluguel.getCliente().getNome(),
                aluguel.getCliente().getEmail(),
                aluguel.getItem().getDescricao(),
                dataInicioFormatada,
                dataFimFormatada,
                aluguel.getItem().getValorAluguel(),
                aluguel.getItem().getCor().toString()
        );
    }


    // Outros métodos de CRUD
    public Aluguel findById(Long id) {
        return aluguelRepository.findById(id).orElseThrow();
    }

    public Aluguel save(Aluguel aluguel) {
        return aluguelRepository.save(aluguel);
    }

    public Aluguel update(Long id, Aluguel aluguel) {
        aluguel.setId(id);
        return aluguelRepository.save(aluguel);
    }

    public List<Aluguel> findAll() {
        return aluguelRepository.findAll();
    }

    public List<Aluguel> findAllByCliente(Long clienteId) {
        return aluguelRepository.findByClienteId(clienteId);
    }

    public void deleteById(Long id) {
        aluguelRepository.deleteById(id);
    }

    public List<Aluguel> alugueisAtrasados() {
        List<Aluguel> alugueis = findAll();

        return alugueis.stream()
                .filter(aluguel -> aluguel.getDataFim().isBefore(LocalDate.now()) && !aluguel.isFinalizado())
                .toList();
    }

    public List<Aluguel> algueisProximos() {
        List<Aluguel> alugueis = findAll();

        return alugueis.stream()
                .filter(aluguel ->
                        !aluguel.isFinalizado()
                                && aluguel.getDataFim().isAfter(LocalDate.now())
                                && !aluguel.getDataFim().isAfter(LocalDate.now().plusDays(3)
                        )
                )
                .toList();
    }

    public List<Map<String, Object>> getReceitaPorMes() {
        List<Object[]> results = aluguelRepository.findReceitaPorMes();

        return results.stream()
                .map(obj -> Map.of(
                        "mes", obj[0],            // Número do mês (1 a 12)
                        "receita", obj[1]         // Receita total do mês
                ))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAlugueisPorMes() {
        List<Object[]> results = aluguelRepository.findAlugueisPorMes();

        return results.stream()
                .map(obj -> Map.of(
                        "mes", obj[0],
                        "pagos", obj[1],
                        "pendentes", obj[2]
                ))
                .collect(Collectors.toList());
    }

    public List<AluguelSemanaDTO> getAlugueisDaSemanaAtual() {
        LocalDate hoje = LocalDate.now();
        LocalDate inicioSemana = hoje.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate fimSemana = hoje.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));

        List<Aluguel> alugueis = aluguelRepository.findByDataInicioBetween(inicioSemana, fimSemana);

        return alugueis.stream()
                .map(aluguel -> new AluguelSemanaDTO(
                        aluguel.getCliente().getNome(),
                        aluguel.getDataInicio(),
                        aluguel.getDataFim(),
                        aluguel.getItem().getValorAluguel(),
                        aluguel.getItem().getDescricao(),
                        aluguel.getStatusPagamento()
                ))
                .collect(Collectors.toList());
    }

    public List<TopClientesDTO> getTop6ClientesByAlugueisAnuais() {
        return aluguelRepository.findTop6ClientesByAlugueisAnuais();
    }

    public Aluguel finalizarAluguel(Long id) {
        Aluguel aluguel = findById(id);

        if (!aluguel.isFinalizado()) {
            try {
                if (aluguel.isDevolvido() && aluguel.getStatusPagamento().equals(StatusPagamento.PAGO)) {
                    aluguel.setFinalizado(true);
                    System.out.println("Aluguel finalizado com sucesso.");
                } else {
                    throw new IllegalStateException("Aluguel Pendente de devolução ou pagamento.");
                }
            } catch (Exception e) {
                throw new RuntimeException("Ocorreu um erro ao finalizar o aluguel.");
            }
        } else {
            throw new IllegalStateException("O aluguel já foi finalizado.");
        }

        return aluguelRepository.save(aluguel);
    }

    public Aluguel devolverAluguel(Long id) {
        Aluguel aluguel = findById(id);

        if (!aluguel.isDevolvido()) {
            aluguel.setDevolvido(true);
            aluguel.setDataDevolucao(LocalDate.now());
        } else if (aluguel.isDevolvido()) {
            aluguel.setDevolvido(false);
            aluguel.setDataDevolucao(null);
        }

        return aluguelRepository.save(aluguel);
    }

    public Aluguel pagarAluguel(Long id) {
        Aluguel aluguel = findById(id);

        if (aluguel.getStatusPagamento().equals(StatusPagamento.PENDENTE)) {
            aluguel.setStatusPagamento(StatusPagamento.PAGO);
            System.out.println("Aluguel pago com sucesso.");
        } else if (aluguel.getStatusPagamento().equals(StatusPagamento.PAGO)) {
            aluguel.setStatusPagamento(StatusPagamento.PENDENTE);
        }

        return aluguelRepository.save(aluguel);
    }
}
