package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
