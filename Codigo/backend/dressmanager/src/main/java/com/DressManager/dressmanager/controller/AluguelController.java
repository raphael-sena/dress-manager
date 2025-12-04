package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.dto.aluguel.HistoricoAluguelRequestDTO;
import com.DressManager.dressmanager.dto.aluguel.HistoricoAluguelResponseDTO;
import com.DressManager.dressmanager.dto.cliente.ClienteDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DressManager.dressmanager.model.Aluguel;
import com.DressManager.dressmanager.model.Endereco;
import com.DressManager.dressmanager.model.Item;
import com.DressManager.dressmanager.service.AluguelService;
import com.DressManager.dressmanager.service.ClienteService;
import com.DressManager.dressmanager.service.ItemService;
import com.DressManager.dressmanager.service.PdfService;

import java.io.InterruptedIOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/aluguel")
public class AluguelController {

    @Autowired
    private AluguelService aluguelService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Aluguel> getAllAlugueis() {
        return aluguelService.findAll();
    }

    @GetMapping("/{id}")
    public Aluguel getAluguelById(@PathVariable Long id) {
        return aluguelService.findById(id);
    }

    @PostMapping
    public Aluguel createAluguel(@RequestBody Aluguel aluguel) {
        return aluguelService.save(aluguel);
    }

    @PutMapping("/{id}")
    public Aluguel updateAluguel(@PathVariable Long id, @RequestBody Aluguel aluguel) {
        return aluguelService.update(id, aluguel);
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<Aluguel> finalizarAluguel(@PathVariable Long id) {
        Aluguel aluguelFinalizado = aluguelService.finalizarAluguel(id);
        return ResponseEntity.ok(aluguelFinalizado);
    }

    @PatchMapping("/{id}/devolver")
    public ResponseEntity<Aluguel> devolverAluguel(@PathVariable Long id) {
        Aluguel aluguelDevolvido = aluguelService.devolverAluguel(id);
        return ResponseEntity.ok(aluguelDevolvido);
    }

    @PatchMapping("/{id}/pagar")
    public ResponseEntity<Aluguel> pagarAluguel(@PathVariable Long id) {
        Aluguel pagamentoAluguel = aluguelService.pagarAluguel(id);
        return ResponseEntity.ok(pagamentoAluguel);
    }

    @DeleteMapping("/{id}")
    public void deleteAluguel(@PathVariable Long id) {
        aluguelService.deleteById(id);
    }

    @PostMapping("/historico")
    public ResponseEntity<Page<HistoricoAluguelResponseDTO>> getHistorico(
            @RequestBody HistoricoAluguelRequestDTO requestDTO,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        // Define uma paginação padrão se não for fornecida
        Pageable pageable = PageRequest.of(page, size);

        // Chamar o serviço e retornar os resultados paginados
        Page<HistoricoAluguelResponseDTO> historicoPage = aluguelService.getHistorico(requestDTO, pageable);
        return ResponseEntity.ok(historicoPage);
    }

    @GetMapping("/atrasados")
    public ResponseEntity<List<Aluguel>> getAlugueisAtrasados() {
        List<Aluguel> alugueis = aluguelService.alugueisAtrasados();
        return ResponseEntity.ok(alugueis);
    }

    @GetMapping("/proximos-de-devolucao")
    public ResponseEntity<List<Aluguel>> getAlugueisProximosDeDevolucao() {
            List<Aluguel> alugueis = aluguelService.algueisProximos();
            return ResponseEntity.ok(alugueis);
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadPdf(@RequestParam String dataInicio,
                                              @RequestParam String dataFim,
                                              @RequestParam String cliente,
                                              @RequestParam String item,
                                              @RequestParam String statusPagamento)
            throws InterruptedIOException, java.io.IOException {
                
                //Cliente
                Long idcliente = Long.parseLong(cliente);
                ClienteDTO clienteobj = clienteService.findById(idcliente);
                String clientenome = clienteobj.getNome();
                String clienteCpf = clienteobj.getCpf();
                String clienteRg = clienteobj.getRg();
                String clienteTel = clienteobj.getTelefone();
                String clienteEmail = clienteobj.getEmail();

                //endereco
                Endereco endereco = clienteobj.getEndereco();
                String clienteEnd = endereco.getRua() + ", " + endereco.getNumero() + " - " + endereco.getBairro() + ", " + endereco.getCidade();

                //Item
                Long idproduto = Long.parseLong(item);
                Item itemvalor = itemService.findById(idproduto).converter();
                String valorVenda =  String.format("%.2f", itemvalor.getValorVenda());
                String valorAluguel =  String.format("%.2f", itemvalor.getValorAluguel());
                String nomeItem = itemvalor.getDescricao();

                // Formatar datas (assumindo formato original yyyy-MM-dd)
                DateTimeFormatter formatoOriginal = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate dataInicioLD = LocalDate.parse(dataInicio, formatoOriginal);
                LocalDate dataFimLD = LocalDate.parse(dataFim, formatoOriginal);

                DateTimeFormatter formatoBR = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String dataRetiradaFormatada = dataInicioLD.format(formatoBR);
                String dataDevolucaoFormatada = dataFimLD.format(formatoBR);


              byte[] pdfContents = pdfService.createPdf(clientenome,clienteCpf,clienteRg,clienteEnd,clienteTel,clienteEmail,nomeItem,valorVenda,valorAluguel,dataRetiradaFormatada, dataDevolucaoFormatada);

              HttpHeaders headers = new HttpHeaders();
              headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
              headers.setContentDispositionFormData("attachment", "Alocacao.pdf");
              return new ResponseEntity<>(pdfContents, headers, HttpStatus.OK);
    }


}
