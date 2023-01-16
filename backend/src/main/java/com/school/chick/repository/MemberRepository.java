package com.school.chick.repository;

import com.school.chick.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member memeber);
    Optional<Member> findById(Long id);//Null을 반환할때 Optional을 많이쓴다
    Optional<Member> findByChildName(String childName);
    List<Member> findAll();
}
