package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.Matching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface MatchingRepository extends JpaRepository<Matching, Integer> {
}
