package com.school.chick.domain.repository;

import com.school.chick.domain.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    UserDto save(UserDto user);
    Optional<UserDto> findByUserEmail(Long userEmail);//Null을 반환할때 Optional을 많이쓴다
    Optional<UserDto> findByMemChName(String childName);
    List<UserDto> findAll();

}
