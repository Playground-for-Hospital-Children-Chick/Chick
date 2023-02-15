package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.Matching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public interface MatchingRepository extends JpaRepository<Matching, Integer> {
    ArrayList<Matching> findByMatEmailAndMatVisit(String matEmail, String matVisit);

        @Query(value="select m.matEmail " +
            "from Matching m join Report r " +
            "on m.matEmail = r.rpReportedPeople " +
            "where m.matVisit='true' and r.rpReporter = :rpReopoter and m.matSession = :matSession")
    ArrayList<String> fineReported(String rpReopoter, String matSession);
}