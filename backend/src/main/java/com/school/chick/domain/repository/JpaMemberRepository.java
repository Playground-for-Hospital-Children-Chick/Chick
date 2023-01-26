package com.school.chick.domain.repository;

import com.school.chick.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaMemberRepository  extends JpaRepository<User, Long> {
    User save(User memeber);
    Optional<User> findByUserEmail(String id);

    Optional<User> findByMemChName(String childName);
    @Override
    List<User> findAll();

}
