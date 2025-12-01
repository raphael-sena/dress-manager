package com.DressManager.dressmanager.repository;

import com.DressManager.dressmanager.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Transactional(readOnly = true)
    Optional<Usuario> findByEmail(String email);
}
