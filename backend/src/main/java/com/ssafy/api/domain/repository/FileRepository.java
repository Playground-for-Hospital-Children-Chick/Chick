package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface FileRepository extends JpaRepository<FileEntity, Long> {

}
