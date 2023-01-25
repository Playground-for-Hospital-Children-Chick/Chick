package com.school.chick.config;

import com.school.chick.domain.repository.UserRepository;
import com.school.chick.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final UserRepository userRepositoryy;

    @Autowired
    public SpringConfig(UserRepository userRepository) {
        this.userRepositoryy = userRepository;
    }

    @Bean
    public UserServiceImpl memberService(){
        return new UserServiceImpl(userRepositoryy);
    }

}
