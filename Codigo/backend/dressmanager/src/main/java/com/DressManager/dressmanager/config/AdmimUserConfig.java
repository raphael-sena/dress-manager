package com.DressManager.dressmanager.config;


import com.DressManager.dressmanager.model.Role;
import com.DressManager.dressmanager.model.Usuario;
import com.DressManager.dressmanager.repository.RoleRepository;
import com.DressManager.dressmanager.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@Configuration
public class AdmimUserConfig implements CommandLineRunner {

    private RoleRepository roleRepository;

    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder;

    public AdmimUserConfig(RoleRepository roleRepository,
                           UsuarioRepository usuarioRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String ... args) throws Exception{
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());

        var userAdmin = usuarioRepository.findByEmail("admin@gmail.com");

        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("admin ja existe");
                },
                () -> {
                    var user = new Usuario();
                    user.setEmail("admin@gmail.com");
                    user.setNome("admin");
                    user.setTelefone("(31) 912345678");
                    user.setSenha(passwordEncoder.encode("12345678"));
                    user.setRoles(Set.of(roleAdmin));
                    usuarioRepository.save(user);
                }
        );
    }
}
