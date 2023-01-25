package com.school.chick.domain.repository;

import com.school.chick.domain.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaMemberRepository  extends JpaRepository<UserDto, Long>, UserRepository {
    @Override
    UserDto save(UserDto memeber);
    @Override
    Optional<UserDto> findByUserEmail(Long id);
    @Override
    Optional<UserDto> findByMemChName(String childName);
    @Override
    List<UserDto> findAll();

}
