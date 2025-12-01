package com.DressManager.dressmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.DressManager.dressmanager.model.Ajuste;
import com.DressManager.dressmanager.service.AjusteService;

import java.util.List;

@RestController
@RequestMapping("/ajuste")
public class AjusteController {

    @Autowired
    private AjusteService ajusteService;

    @GetMapping
    public List<Ajuste> getAllAjustes() {
        return ajusteService.findAll();
    }

    @GetMapping("/{id}")
    public Ajuste getAjusteById(@PathVariable Long id) {
        return ajusteService.findById(id);
    }

    @PostMapping
    public Ajuste createAjuste(@RequestBody Ajuste ajuste) {
        return ajusteService.save(ajuste);
    }

    @PutMapping("/{id}")
    public Ajuste updateAjuste(@PathVariable Long id, @RequestBody Ajuste ajuste) {
        return ajusteService.update(id, ajuste);
    }

    @DeleteMapping("/{id}")
    public void deleteAluguel(@PathVariable Long id) {
        ajusteService.deleteById(id);
    }
}