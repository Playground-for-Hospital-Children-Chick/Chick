package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.AuthRefreshSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface AuthRefreshSaveRepository extends JpaRepository<AuthRefreshSave, Integer> {
    AuthRefreshSave findByRefreshToken(String refreshToken);
}
