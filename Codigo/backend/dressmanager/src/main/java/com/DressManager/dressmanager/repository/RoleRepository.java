package com.DressManager.dressmanager.repository;

import com.DressManager.dressmanager.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
