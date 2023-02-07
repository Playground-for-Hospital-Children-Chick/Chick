package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;
import com.ssafy.api.domain.repository.UserRepository;
import com.ssafy.api.service.UserService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByUserEmail(email);
        return user;
    }

    static int getAge(String birth) { // 만 나이를 계산하여 리턴
        int userYear = Integer.parseInt(birth.substring(0, 4)); // 회원 출생년도
        int userMonth = Integer.parseInt(birth.substring(4, 6)); // 회원 출생월
        int userDay = Integer.parseInt(birth.substring(6, 8)); // 회원 출생일
        LocalDateTime now = LocalDateTime.now(); // 현재 시간
        int userAge = now.getYear() - userYear; // 회원 나이 := 현재년도 - 출생년도
        if (userMonth < now.getMonthValue()) { // 달이 지났으면
            userAge++; // 회원 나이 한살 추가
        } else if (userMonth == now.getMonthValue() && userDay >= now.getDayOfMonth()) { // 달은 같고 일이 지났으면
            userAge++; // 회원 나이 한살 추가
        }
        return userAge;
    }

    public UserInfoRes getUserInfo(String email) {
        User user = userRepository.findByUserEmail(email);
        if (user != null) { // 회원이 존재하면
            // 회원 정보 넣기
            UserInfoRes userInfoRes = new UserInfoRes(); // Response 객체 생성
            userInfoRes.setUserName(user.getUserChName()); // 회원 이름
            userInfoRes.setUserAge(getAge(user.getUserBirth())); // 회원 만나이
            userInfoRes.setUserBirth(user.getUserBirth()); // 회원 출생일
            userInfoRes.setUserSex(user.getUserSex()); // 회원 성별
            userInfoRes.setUserEmail(user.getUserEmail()); // 회원 이메일
            return userInfoRes; // 회원 정보 Response 리턴
        }
        return null;
    }

    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
        String pattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
        if ((userRepository.findByUserEmail(userRegisterInfo.getUser_email()) != null)
        ||(!userRegisterInfo.getUser_email().matches(pattern))) {
            return false;
        }

        userRepository.save(User.builder()
                .userEmail(userRegisterInfo.getUser_email().toString())
                .userPwd(passwordEncoder.encode(userRegisterInfo.getUser_password()).toString())
                .userChName(userRegisterInfo.getUser_child_name().toString())
                .userParentName(userRegisterInfo.getUser_parent_name().toString())
                .userSex(userRegisterInfo.getUser_sex().toString())
                .userBirth(userRegisterInfo.getUser_birth().toString())
                .userState("0")
                .userNumberOfReports(0)
                .userServiceTerm("Y")
                .userPrivacyTerm("Y")
                .userRole(UserRole.ROLE_USER)
                .userCreateBy(userRegisterInfo.getUser_email())
                .userCreateDate(LocalDateTime.now())
                .userUpdateBy(userRegisterInfo.getUser_email())
                .userUpdateDate(LocalDateTime.now())
                .build());

        return true;
    }

    @Override
    public UserLoginInfo getUserLoginInfo(User user) {
        UserLoginInfo userLoginInfo = new UserLoginInfo();
        userLoginInfo.setUserEmail(user.getUserEmail());
        userLoginInfo.setUserChName(user.getUserChName());
        userLoginInfo.setUserRole(user.getUserRole());
        return userLoginInfo;
    }

    @Override
    public User findEmail(UserFindEmailReq userFindEmailReq) {
        User user = userRepository.findByUserParentNameAndUserChNameAndUserBirth(userFindEmailReq.getUserParentName(),
                userFindEmailReq.getUserChName(), userFindEmailReq.getUserBirth());
        return user;
    }

    @Override
    public boolean deleteUser(UserLoginPostReq deleteInfo) {
        if (passwordEncoder.matches(deleteInfo.getPassword(), userRepository.findByUserEmail(deleteInfo.getEmail()).getUserPwd())) {
            userRepository.deleteByEmail(deleteInfo.getEmail());
            return true;
        }
        return false;
    }
}
