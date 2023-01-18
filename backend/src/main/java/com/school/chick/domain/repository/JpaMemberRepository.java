package com.school.chick.domain.repository;

import com.school.chick.domain.dto.MemberDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaMemberRepository  extends JpaRepository<MemberDto, Long>, MemberRepository{
    @Override
    MemberDto save(MemberDto memeber);
    @Override
    Optional<MemberDto> findByMemId(Long id);
    @Override
    Optional<MemberDto> findByMemChName(String childName);
    @Override
    List<MemberDto> findAll();

}
