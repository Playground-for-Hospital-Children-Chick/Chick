package com.school.chick.controller;

import com.school.chick.domain.dto.BaseResponseBody;
import com.school.chick.domain.dto.UserRegisterPostReq;
import com.school.chick.service.EmailService;
import com.school.chick.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/users")
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
    @ApiOperation(value="회원 가입", notes = "아이디와 패스워드를 통해 회원가입 한다")
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

    @PostMapping("/emailConfirm")
    public String emailConfirm(@RequestParam String email) throws Exception {

        String confirm = emailService.sendSimpleMessage(email);

        return confirm;
    }


}
