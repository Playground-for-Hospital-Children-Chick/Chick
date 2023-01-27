package com.school.chick.domain.repository;

import com.school.chick.domain.entity.AuthRefreshSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface AuthRefreshSaveRepository extends JpaRepository<AuthRefreshSave, Long> {
    AuthRefreshSave findByRefreshToken(String refreshToken);
}
