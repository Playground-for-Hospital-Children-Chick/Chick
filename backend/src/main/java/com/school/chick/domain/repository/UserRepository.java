package com.school.chick.domain.repository;

import com.school.chick.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserEmail(String userEmail);//Null을 반환할때 Optional을 많이쓴다
    List<User> findAll();

}
