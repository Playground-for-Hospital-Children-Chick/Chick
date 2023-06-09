package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.AuthRefreshSave;
import com.ssafy.api.domain.entity.User;
import com.ssafy.api.domain.repository.AuthRefreshSaveRepository;
import com.ssafy.api.service.EmailService;
import com.ssafy.api.service.UserService;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@AllArgsConstructor
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final EmailService emailService;
    AuthRefreshSaveRepository authRefreshSaveRepository;
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

    @GetMapping("/distinctemail")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일이 db에 없음"),
            @ApiResponse(code = 401, message = "인증실패,db에 이메일 존재"),
    })
    @ApiOperation(value = "중복된 이메일 확인", notes = "db에 저장된 이메일인지 확인한다.")
    public ResponseEntity<? extends BaseResponseBody> EmailDuplicteCheck(@RequestParam String email) throws Exception {
        User user = userService.getUserByEmail(email);
        if(user ==null){
            // 이메일 중복이 없으면 성공
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        // 중복된 이메일 존재시 실패
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }
    @PostMapping("/emailConfirm")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일로 토큰 전송"),
            @ApiResponse(code = 405, message = "탈퇴한 이메일 입니다."),
            @ApiResponse(code = 401, message = "인증실패, 중복된 이메일이 존재합니다."),
    })
    @ApiOperation(value = "이메일토큰발송", notes = "이메일에 인증 코드를 보내준다")
    public ResponseEntity<? extends BaseResponseBody> emailConfirm(@RequestParam String email, HttpServletResponse response) throws Exception {
        User user = userService.getUserByEmail(email);
        if(user==null){
            String confirm = emailService.sendSimpleMessage(email);
            Cookie cookie=new Cookie("emailConfirmToken", confirm); // refresh 담긴 쿠키 생성
            cookie.setMaxAge(180); // 쿠키의 유효시간을 refresh 유효시간만큼 설정(3분 설정)
            cookie.setSecure(true); // 클라이언트가 HTTPS가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 하는 설정
            cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 하는 설정
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        if(user.getUserState().equals("1")){// 탈퇴한 계정일 시 실패
            return ResponseEntity.status(405).body(BaseResponseBody.of(405, "Failure"));
        }
        //중복된 이메일이 존재 시 실패
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
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
        //이메일 토큰과 이메일로 인증받은 value가 다를 시 실패
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
    }

    @GetMapping("/find/email")
    @ApiOperation(value="이메일 찾기", notes = "부모이름, 아이이름, 생일로 유저 이메일을 찾는다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일 반환"),
            @ApiResponse(code = 404, message = "회원정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends PwdFindPosRes> findEmail(@RequestParam String userParentName, @RequestParam String userChName, @RequestParam String userBirth) {
        User user = userService.findEmail(userParentName,   userChName,  userBirth);
        if(user!=null){
            String[] splitMail = user.getUserEmail().split("@");
            String front = splitMail[0].substring(0, splitMail[0].length()-3)+"***";//@ 앞에 3글자 주석처리
            return ResponseEntity.status(200).body(PwdFindPosRes.of(200, "Success", front+"@"+splitMail[1]));
        }
        //존재 하지 않는 계정일시 실패
        return ResponseEntity.status(401).body(PwdFindPosRes.of(404, "Failure", null));
    }

    @PostMapping("/find/password")
    @ApiOperation(value="비밀번호 찾기", notes = "유저 비밀번호를 찾는다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일 반환"),
            @ApiResponse(code = 404, message = "회원정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> findPassword(@RequestParam String email) throws Exception {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            userService.sendPwdMessage(email);// 이메일로 임시 비밀번호 발급`
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        //존재하지 않는 이메일 일 시 요청 실패
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "회원정보 없음"));
    }
    @PutMapping("/profile/change")
    @ApiOperation(value="프로필 변경", notes = "프로필을 변경한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일 반환"),
            @ApiResponse(code = 404, message = "회원정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> changeProfile(@RequestParam @ApiParam(value="사용자를 찾기 위한 이메일 정보", required = true) String email, @RequestParam @ApiParam(value="file_path: /assets/characters/chick_01.svg", required = true) String filePath) throws Exception {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            userService.profileUpdate(email, filePath);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        //존재 하지 않는 계정일시 요청실패
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "회원정보 없음"));
    }

    @GetMapping("/profile")
    @ApiOperation(value="프로필 사진 가져오기", notes = "설정된 프로필 사진을 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 사진 가져오기 성공"),
            @ApiResponse(code = 404, message = "등록된 회원이 아닙니다"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<UserProfileRes> getProfile(@RequestParam @ApiParam(value="사용자를 찾기 위한 이메일 정보", required = true) String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            String filePath = userService.getProfile(email);
            return ResponseEntity.status(200).body(UserProfileRes.of(200, "Success", filePath));
        }
        //존재 하지 않는 계정일시 요청실패
        return ResponseEntity.status(404).body(UserProfileRes.of(404, "회원정보 없음", null));
    }
    
    @PostMapping("/updateUserInfo")
    @ApiOperation(value="회원 정보 수정", notes = "회원의 이름과 출생을 변경한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "등록한 회원이 아닙니다")
    })
    public ResponseEntity<UserUpdatePostRes> getProfile(@RequestBody @ApiParam(value="업데이트할 유저 정보", required = true) UserUpdatePostReq userUpdatePostReq) {
        UserLoginInfo userLoginInfo = userService.updateUser(userUpdatePostReq);
        if (userLoginInfo != null) {
            return ResponseEntity.status(200).body(UserUpdatePostRes.of(200, "회원 정보 수정 성공", userLoginInfo));
        }
        //존재 하지 않는 계정일시 요청실패
        return ResponseEntity.status(404).body(UserUpdatePostRes.of(404, "회원정보 없음", null));
    }

    @PutMapping("/pwd/change")
    @ApiOperation(value="비밀번호 변경", notes = "비밀번호를 변경한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공 및 이메일로 비밂번호 반환"),
            @ApiResponse(code = 401, message = "토큰이 유효하지 않음"),
            @ApiResponse(code = 404, message = "refreshtoken 없음"),
            @ApiResponse(code = 405, message = "refreshtoken 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> pwdChange(HttpServletRequest request, @RequestBody @ApiParam(value="비밀번호 수정을 위한 회원 정보", required = true) UserPwChangeReq changePwInfo) throws Exception {
        String refreshToken=null;
        Cookie[] cookies = request.getCookies();
        if(cookies==null) {
            //쿠키값이 존재 하지않으면 요청 실패
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Cookies is null"));
        }

        for(Cookie cookie : cookies){
            if("refreshToken".equals(cookie.getName())){
                refreshToken=cookie.getValue();
            }
        }

        // 쿠키 목록에 refreshToken 이 없으면 요청 실패 에러
        if(refreshToken==null) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Not Exist refreshToken"));
        }
        AuthRefreshSave token = authRefreshSaveRepository.findByRefreshToken(refreshToken);
        if(token!=null){
            if(userService.changePassword(changePwInfo)){
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            //계정의 기존 비밀번호가 일치하지 않으면 요청 실패
            return ResponseEntity.status(405).body(BaseResponseBody.of(405, "비밀번호가 일치 하지않음"));
        }
        //Token값이 없는 값이 요청 실패
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Token"));
    }
}
