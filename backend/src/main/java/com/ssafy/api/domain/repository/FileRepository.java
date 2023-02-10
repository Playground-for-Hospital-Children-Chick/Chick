package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM FILE_ENTITY AS f WHERE f.EMAIL IN (:email)")
    List<FileEntity> findImagesByEmail(@Param("email") String email);
}
