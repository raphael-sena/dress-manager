package com.DressManager.dressmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.DressManager.dressmanager.model.Ajuste;

@Repository
public interface AjusteRepository extends JpaRepository<Ajuste, Long> {

    List<Ajuste> findByFinalizadoFalseOrderByDataFimAsc();

    List<Ajuste> findByOrderByDataFimAsc();


}