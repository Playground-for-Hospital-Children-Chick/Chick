package com.school.chick.domain.repository;

import com.school.chick.domain.entity.DailyLog;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface DailyLogRepository extends JpaRepository<DailyLog, Integer> {

}
