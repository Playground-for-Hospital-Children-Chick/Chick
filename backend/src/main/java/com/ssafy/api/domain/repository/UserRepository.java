package com.ssafy.api.domain.repository;

import com.ssafy.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserEmail(String userEmail);//Null을 반환할때 Optional을 많이쓴다
    User findByUserChName(String userEmail);

    User findByUserParentNameAndUserChNameAndUserBirth(String userParentName, String userChName, String userBirth);

    @Modifying
    @Transactional
    @Query(value="UPDATE User u SET u.userState=1 where u.userEmail=?1")
    void deleteByEmail(String userEmail);

}
