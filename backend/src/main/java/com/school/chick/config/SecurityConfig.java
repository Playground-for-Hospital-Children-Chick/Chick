package com.school.chick.config;

import com.school.chick.service.UserService;
import com.school.chick.util.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserService userService;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/webjars/**",
            "/users/*",
            "/*/*",
    };
    @Override

    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable().csrf().disable() // swagger API 호출시 403 에러 발생 방지
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT 토큰 기반 인증 설정
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService))
                .authorizeRequests()//보호된 리소스 uri에 접근할 수 있는 권한 설정
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers("/auth/login*/**").permitAll()
                .anyRequest().authenticated()
                .and().cors()
                .and().headers().addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN));
    }
}
