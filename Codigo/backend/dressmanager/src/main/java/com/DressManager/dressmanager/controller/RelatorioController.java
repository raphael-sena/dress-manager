package com.DressManager.dressmanager.controller;


import com.DressManager.dressmanager.dto.aluguel.AluguelSemanaDTO;
import com.DressManager.dressmanager.dto.aluguel.TopClientesDTO;
import com.DressManager.dressmanager.service.AluguelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    AluguelService aluguelService;

    @GetMapping("/receita-mensal")
    public ResponseEntity<List<Map<String, Object>>> getReceitaPorMes() {
        List<Map<String, Object>> receitaPorMes = aluguelService.getReceitaPorMes();
        return ResponseEntity.ok(receitaPorMes);
    }

    // Endpoint para aluguéis mensais pagos e pendentes
    @GetMapping("/alugueis-mensais")
    public ResponseEntity<List<Map<String, Object>>> getAlugueisPorMes() {
        List<Map<String, Object>> alugueisPorMes = aluguelService.getAlugueisPorMes();
        return ResponseEntity.ok(alugueisPorMes);
    }

    @GetMapping("/alugueis-semanais")
    public ResponseEntity<List<AluguelSemanaDTO>> getAlugueisDaSemanaAtual() {
        List<AluguelSemanaDTO> alugueis = aluguelService.getAlugueisDaSemanaAtual();
        return ResponseEntity.ok(alugueis);
    }


    @GetMapping("/top-clientes")
    public ResponseEntity<List<TopClientesDTO>> getTop6ClientesByAlugueisAnuais() {
        List<TopClientesDTO> topClientes = aluguelService.getTop6ClientesByAlugueisAnuais();
        return ResponseEntity.ok(topClientes);
    }

}
