package com.school.chick.domain.repository;

import com.school.chick.domain.entity.Matching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface MatchingRepository extends JpaRepository<Matching, Long> {
}
