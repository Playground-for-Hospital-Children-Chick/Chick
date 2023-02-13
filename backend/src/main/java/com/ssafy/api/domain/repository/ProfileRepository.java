package com.ssafy.api.domain.repository;

import com.querydsl.core.annotations.QueryInit;
import com.ssafy.api.domain.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Profile findById(int profid);//Null을 반환할때 Optional을 많이쓴다
    Profile findByProfPath(String profPath);
    @Modifying
    @Transactional
    @Query(value = "update User u SET  u.profile.id=?1 where u.userEmail=?2")
    void updateProfile(int profId, String userEmail);

    @Query(nativeQuery = true, value ="select prof_path from profile as pf join  user_info as ui on pf.id = ui.prof_id where ui.user_email= :userEmail" )
    String getProfileImages(String userEmail);

}
