package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;
import com.ssafy.api.service.EmailService;
import com.ssafy.api.service.UserService;
import com.ssafy.api.util.jwt.JwtTokenUtil;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final EmailService emailService;
    @Autowired
    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    @PostMapping("/register")
    @ApiOperation(value="회원 가입", notes = "이메일, 비밀번호, 자녀이름, 부모님 이름, 성별, 출생일을 통해 회원가입 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "가입 실패"),
            @ApiResponse(code = 404, message = "반환값 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
        if(userService.createUser(registerInfo)) {
            // 가입 성공시 성공 리턴
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        // 가입 실패시 실패 리턴
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴", notes = "아이디와 패스워드를 확인하고 회원 탈퇴한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> withdrawal(@RequestBody @ApiParam(value = "회원탈퇴 정보", required = true) UserLoginPostReq deleteInfo) {
        User user = userService.getUserByEmail(deleteInfo.getEmail());
        if(user!=null){
            if(userService.deleteUser(deleteInfo)){
                // 회원 탈퇴 성공
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            // 인증 실패
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
        }
        // 사용자 없음
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Not Exist"));
    }

    @PostMapping("/emailConfirm")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일로 토큰 전송"),
    })
    @ApiOperation(value = "이메일 인증", notes = "이메일에 인증 코드를 보내준다")
    public ResponseEntity<? extends BaseResponseBody> emailConfirm(@RequestParam String email, HttpServletResponse response) throws Exception {
        String confirm = emailService.sendSimpleMessage(email);
        Cookie cookie=new Cookie("emailConfirmToken", confirm); // refresh 담긴 쿠키 생성
        cookie.setMaxAge(300); // 쿠키의 유효시간을 refresh 유효시간만큼 설정(5분 설정)
        cookie.setSecure(true); // 클라이언트가 HTTPS가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 하는 설정
        cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 하는 설정
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/emailToken")
    @ApiOperation(value = "이메일토큰인증", notes = "이메일로 보낸 토큰으로 이메일을 인증한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일 인증 성공"),
            @ApiResponse(code = 401, message = "이메일 인증 실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> emailConfirm(@CookieValue("emailConfirmToken") String emailConfirmToken, String userToken) {
        if (emailConfirmToken.equals(userToken)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
    }

    @GetMapping("/find/email")
    @ApiOperation(value="이메일 찾기", notes = "부모이름, 아이이름, 생일로 유저 이메일을 찾는다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일 반환"),
            @ApiResponse(code = 404, message = "회원정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends PwdFindPosRes> findEmail(@RequestBody @ApiParam(value="이메일 찾기 위한 정보", required = true) UserFindEmailReq userFindEmailReq) {
        String email = userService.findEmail(userFindEmailReq).getUserEmail();
        if(email!=null && !email.equals("")){
            String[] splitMail = email.split("@");
            String front = splitMail[0].substring(0, splitMail[0].length()-2)+"**";
            return ResponseEntity.status(200).body(PwdFindPosRes.of(200, "Success", front+"@"+splitMail[1]));
        }
        return ResponseEntity.status(401).body(PwdFindPosRes.of(404, "Failure", null));
    }

    @GetMapping("/find/password")
    @ApiOperation(value="비밀번호 찾기", notes = "유저 비밀번호를 찾는다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일 반환"),
            @ApiResponse(code = 404, message = "회원정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> findPassword(@RequestParam String email) throws Exception {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            String result = userService.sendPwdMessage(email);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "회원정보 없음"));
    }
}
