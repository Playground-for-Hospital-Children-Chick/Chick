package com.school.chick.service.Impl;

import com.school.chick.domain.dto.UserRegisterPostReq;
import com.school.chick.domain.dto.UserRole;
import com.school.chick.domain.entity.Profile;
import com.school.chick.domain.entity.User;
import com.school.chick.domain.repository.ProfileRepository;
import com.school.chick.domain.repository.UserRepository;
import com.school.chick.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
//    private final ProfileRepository profileRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByUserEmail(email);
        return user;
    }

    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
//        if (userRepository.findByPhone(userRegisterInfo.getPhone()) != null) {
//            return false;
//        }

        User user = new User();
        user.setProfNo(1L);
        user.setUserEmail(userRegisterInfo.getUser_email());
        user.setUserPwd(userRegisterInfo.getUser_password());
        user.setUserChName(userRegisterInfo.getUser_child_name());
        user.setUserParentName(userRegisterInfo.getUser_parent_name());
        user.setUserSex(userRegisterInfo.getUser_sex());
        user.setUserBirth(userRegisterInfo.getUser_birth());
        user.setUserState(userRegisterInfo.getUser_state());
        user.setUserNumberOfReports(userRegisterInfo.getUser_reported());
        user.setUserServiceTerm(userRegisterInfo.getUser_service_term());
        user.setUserPrivacyTerm(userRegisterInfo.getUser_privacy_term());
        user.setUserRole(UserRole.ROLE_USER);
        user.setUserCreateBy(userRegisterInfo.getUser_email());
        user.setUserCreateDate(LocalDateTime.now());
        user.setUserUpdateBy(userRegisterInfo.getUser_email());
        user.setUserUpdateDate(LocalDateTime.now());

////        user.setUserNo(1L);
//        user.setProfNo(1L);
//        user.setUserEmail("ssafy4@ssafy.com");
//        user.setUserPwd("your_password");
//        user.setUserChName("ssafy");
//        user.setUserParentName("ssafy");
//        user.setUserSex("M");
//        user.setUserBirth("19970707");
//        user.setUserState("0");
//        user.setUserNumberOfReports(0);
//        user.setUserServiceTerm("Y");
//        user.setUserPrivacyTerm("Y");
//        user.setUserRole("user");
//        user.setUserCreateBy("ssafy");
//        user.setUserCreateDate(LocalDateTime.now());
//        user.setUserUpdateBy("ssafy");
//        user.setUserUpdateDate(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }
}
