package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.dto.LoginRequest;
import com.DressManager.dressmanager.dto.LoginResponse;
import com.DressManager.dressmanager.model.Role;
import com.DressManager.dressmanager.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
public class TokenController {

    private final JwtEncoder jwtEncoder;
    private final UsuarioRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public TokenController(JwtEncoder jwtEncoder,
                           UsuarioRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder){
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        var userOptional = userRepository.findByEmail(loginRequest.email());

        if (userOptional.isEmpty()) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        var user = userOptional.get();

        if (!passwordEncoder.matches(loginRequest.password(), user.getSenha())) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        var now = Instant.now();
        var expiresIn = 3600L; // Token válido por 1 hora

        var scopes = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("dressManager")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .subject(user.getUserId().toString())
                .claim("scope", scopes)
                .build();

        var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(user.getEmail(), token, expiresIn));
    }
}
