package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;
import com.ssafy.api.domain.repository.UserRepository;
import com.ssafy.api.service.UserService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    JavaMailSender emailSender;

    public static final String ePw = createKey();
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

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 12; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }
    private MimeMessage pwdFindMessage(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();
        message.setSubject("[병아리] 비밀번호 재설정 안내메일입니다.");
        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 안녕하세요 병아리입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 비밀번호를 복사해 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>임시 비밀번호가 발급되었습니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("kimchick207@gmail.com","kimchick"));//보내는 사람

        return message;
    }
    @Override
    public String sendPwdMessage(String to)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = pwdFindMessage(to);
        User user = userRepository.findByUserEmail(to);
        if(user!=null){
            try{//예외처리
                emailSender.send(message);
            }catch(MailException es){
                es.printStackTrace();
                throw new IllegalArgumentException();
            }
            user.setUserPwd(passwordEncoder.encode(ePw));
            userRepository.save(user);
            return ePw;
        }
        return "";
    }
}
