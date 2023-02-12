package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.YoutubeKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface YoutubeRepository extends JpaRepository<YoutubeKey,Long> {
}
