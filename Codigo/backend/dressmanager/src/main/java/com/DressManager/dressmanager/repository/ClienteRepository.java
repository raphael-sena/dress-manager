package com.DressManager.dressmanager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.DressManager.dressmanager.model.Cliente;
import com.DressManager.dressmanager.model.Usuario;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Transactional(readOnly = true)
    Optional<Cliente> findByCpf(String cpf);
}
