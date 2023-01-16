package com.school.chick.repository;

import com.school.chick.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaMemberRepository  extends JpaRepository<Member, Long>, MemberRepository{
    @Override
    Member save(Member memeber);
    @Override
    Optional<Member> findById(Long id);
    @Override
    Optional<Member> findByChildName(String childName);
    @Override
    List<Member> findAll();

}
