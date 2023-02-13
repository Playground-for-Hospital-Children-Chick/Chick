package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Optional;

@Component
public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "Delete from report  where rp_reporter= :rpReporter and rp_reported_people= :rpReportedPeople")
    void unblockPeople(String rpReporter, String rpReportedPeople);

    Report findByRpReporterAndRpReportedPeople(String rpReporter, String rpReportedPeople);
}