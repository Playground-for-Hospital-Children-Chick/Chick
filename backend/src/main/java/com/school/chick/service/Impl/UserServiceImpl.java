package com.school.chick.service.Impl;

import com.school.chick.domain.dto.UserDto;
import com.school.chick.domain.repository.UserRepository;
import com.school.chick.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *  회원 가입
     * */
    public String join(UserDto user) {
//        validateDuplicateMember(member);//중복 회원검증
        userRepository.save(user);
        return user.getMemId();
    }


    /**
     * 전체 화면 조회
     */
    public List<UserDto> findUsers(){
        return userRepository.findAll();
    }

    public Optional<UserDto> findOne(Long userEmail){
        return userRepository.findByUserEmail(userEmail);
    }

//    private void validateDuplicateMember(Member member) {
//        memberRepository.save(member);
//        memberRepository.findByChildName(member.getId()).ifPresent(member1 -> {
//            throw  new IllegalStateException("존재");
//        });
//    }
}
