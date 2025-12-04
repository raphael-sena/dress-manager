package com.DressManager.dressmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DressManager.dressmanager.model.Ajuste;
import com.DressManager.dressmanager.repository.AjusteRepository;

import java.util.List;

@Service
public class AjusteService {

    @Autowired
    private AjusteRepository ajusteRepository;

    public List<Ajuste> findAll() {
        return ajusteRepository.findByOrderByDataFimAsc();
    }

    public Ajuste findById(Long id) {
        return ajusteRepository.findById(id).orElse(null);
    }

    public Ajuste save(Ajuste ajuste) {
        if (ajuste.getAluguel() != null && ajuste.getAluguel().getId() == null) {
            ajuste.setAluguel(null);  
        }
        if (ajuste.getAluguel() != null && ajuste.getAluguel().getDataInicio() != null) {
            ajuste.setDataFim(ajuste.getAluguel().getDataInicio());
        }
        System.out.println("Aluguel: " + ajuste.getAluguel());
        System.out.println("Data Inicio do Aluguel: " + (ajuste.getAluguel() != null ? ajuste.getAluguel().getDataInicio() : "Aluguel é nulo"));

        return ajusteRepository.save(ajuste);
    }
    

    public Ajuste update(Long id, Ajuste ajuste) {
        Ajuste existingAjuste = findById(id);
        if (existingAjuste != null) {
            existingAjuste.setDataFim(ajuste.getDataFim());
            existingAjuste.setAluguel(ajuste.getAluguel());
            existingAjuste.setFinalizado(ajuste.isFinalizado());
            existingAjuste.setObservacao(ajuste.getObservacao());
            existingAjuste.setValor(ajuste.getValor());
            return ajusteRepository.save(existingAjuste);
        } else {
            return null; 
        }
    }

    public void deleteById(Long id) {
        ajusteRepository.deleteById(id);
    }
}