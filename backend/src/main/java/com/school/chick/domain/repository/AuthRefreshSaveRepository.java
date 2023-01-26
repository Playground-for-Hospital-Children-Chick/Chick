package com.school.chick.domain.repository;

import com.school.chick.domain.entity.AuthRefreshSave;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRefreshSaveRepository extends JpaRepository<AuthRefreshSave, Long> {
    AuthRefreshSave findByRefreshToken(String refreshToken);
}
