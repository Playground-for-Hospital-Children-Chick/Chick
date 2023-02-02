package com.school.chick.domain.repository;

import com.school.chick.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
