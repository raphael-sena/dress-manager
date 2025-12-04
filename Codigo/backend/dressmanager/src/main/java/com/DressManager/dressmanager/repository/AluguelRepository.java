package com.DressManager.dressmanager.repository;

import com.DressManager.dressmanager.dto.aluguel.TopClientesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.DressManager.dressmanager.model.Aluguel;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> , JpaSpecificationExecutor {

    @Query("""
    SELECT EXTRACT(MONTH FROM a.dataInicio) AS mes, SUM(i.valorAluguel) AS receita
    FROM Aluguel a
    JOIN a.item i
    WHERE EXTRACT(YEAR FROM a.dataInicio) = EXTRACT(YEAR FROM CURRENT_DATE) AND a.statusPagamento = 'PAGO'
    GROUP BY EXTRACT(MONTH FROM a.dataInicio)
    ORDER BY mes
""")
    List<Object[]> findReceitaPorMes();

    @Query("""
    SELECT EXTRACT(MONTH FROM a.dataInicio) AS mes,
           SUM(CASE WHEN a.statusPagamento = 'PAGO' THEN 1 ELSE 0 END) AS pagos,
           SUM(CASE WHEN a.statusPagamento = 'PENDENTE' THEN 1 ELSE 0 END) AS pendentes
    FROM Aluguel a
    WHERE EXTRACT(YEAR FROM a.dataInicio) = EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY EXTRACT(MONTH FROM a.dataInicio)
    ORDER BY mes
""")
    List<Object[]> findAlugueisPorMes();


    List<Aluguel> findByDataInicioBetween(LocalDate inicioSemana, LocalDate fimSemana);

    @Query("""
           SELECT new com.DressManager.dressmanager.dto.aluguel.TopClientesDTO(
               a.cliente.nome,
               COUNT(a.id)
           )
           FROM Aluguel a
           WHERE YEAR(a.dataInicio) = YEAR(CURRENT_DATE)
           GROUP BY a.cliente.nome
           ORDER BY COUNT(a.id) DESC
           LIMIT 6
           """)
    List<TopClientesDTO> findTop6ClientesByAlugueisAnuais();

    @Query("SELECT a FROM Aluguel a WHERE a.cliente.id = :clienteId")
    List<Aluguel> findByClienteId(Long clienteId);
}
