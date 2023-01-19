package com.school.chick.domain.repository;

import com.school.chick.domain.dto.MemberDto;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    MemberDto save(MemberDto memeber);
    Optional<MemberDto> findByMemId(Long id);//Null을 반환할때 Optional을 많이쓴다
    Optional<MemberDto> findByMemChName(String childName);
    List<MemberDto> findAll();

}
