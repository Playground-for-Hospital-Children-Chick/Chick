package com.ssafy.api.controller;

import com.ssafy.api.service.RoomService;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController()
public class SessionController {
    @Autowired
    private RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("세션 요청입니다다");
        System.out.println("세션 요청입니다");
        System.out.println("세션 요청입니다");
        System.out.println("params: " + params.toString());
//        String userSession = roomService.getRoomSession((String)params.get("email"), (String)params.get("gameType")); // 회원에 참여할 세션을 새로 생성 혹은 기존 새션에서 가져온다
        String userSession = "Session0";
        roomService.createMachingInfo(params, userSession); // 매칭에 대한 로그를 데이터베이스에 저장한다
        Map<String, Object> sessionParam = new HashMap<>(); // 유저 새션 정보를 저장할 변수
        sessionParam.put("customSessionId", userSession); // // 유저 새션 정보를 저장
        System.out.println("sessionParam: " + sessionParam.toString());
        SessionProperties properties = SessionProperties.fromJson(sessionParam).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("연결 요청입니다다");
        System.out.println("연결 요청입니다");
        System.out.println("연결 요청입니다");
        System.out.println("sessionId :" + sessionId);
        System.out.println("params: " + params.toString());
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        System.out.println("properties: " + properties.toString());
        Connection connection = session.createConnection(properties);
        System.out.println("connection "+connection.getConnectionId()+"  "+connection.getRtspUri()+"    "+connection.getToken());
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
