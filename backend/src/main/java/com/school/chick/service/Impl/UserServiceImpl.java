package com.school.chick.service.Impl;

import com.school.chick.domain.dto.UserRegisterPostReq;
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
        user.setProfNo(new Profile(1L, "chick", "/click.jpg", "ssafy", LocalDateTime.now(), "ssafy", LocalDateTime.now()));
        user.setUserPwd(userRegisterInfo.getUser_password());
        user.setUserChName(userRegisterInfo.getUser_child_name());
        user.setUserParentName(userRegisterInfo.getUser_parent_name());
        user.setUserSex(userRegisterInfo.getUser_sex());
        user.setUserBirth(userRegisterInfo.getUser_birth());
        user.setUserState(userRegisterInfo.getUser_state());
        user.setUserNumberOfReports(userRegisterInfo.getUser_reported());
        user.setUserServiceTerm(userRegisterInfo.getUser_service_term());
        user.setUserPrivacyTerm(userRegisterInfo.getUser_privacy_term());
        user.setUserRole(userRegisterInfo.getUser_role());
        user.setUserCreateBy(userRegisterInfo.getUser_create_by());
        user.setUserCreateDate(LocalDateTime.now());
        user.setUserUpdateBy(userRegisterInfo.getUser_upadate_by());
        user.setUserUpdateDate(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }
}
