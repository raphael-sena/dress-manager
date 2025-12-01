package com.DressManager.dressmanager.dto;

public record LoginResponse(String email,String accessToken, Long expiresIn) {
}
