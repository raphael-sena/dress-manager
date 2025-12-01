package com.DressManager.dressmanager.service.exceptions;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class ClienteComAlugueisException extends RuntimeException {
    public ClienteComAlugueisException(String message) {
        super(message);
    }
}
