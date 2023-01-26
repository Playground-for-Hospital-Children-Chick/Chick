package com.school.chick.domain.repository;

import com.school.chick.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    User findByUserEmail(String userEmail);//Null을 반환할때 Optional을 많이쓴다
    Optional<User> findByMemChName(String childName);
    List<User> findAll();

}
