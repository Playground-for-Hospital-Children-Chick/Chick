package com.school.chick.domain.repository;

import com.school.chick.domain.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Profile findById(int profid);//Null을 반환할때 Optional을 많이쓴다
}
