package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.RoomSessionReq;
import com.ssafy.api.domain.entity.Matching;
import com.ssafy.api.domain.entity.Room;
import com.ssafy.api.domain.repository.MatchingRepository;
import com.ssafy.api.domain.repository.RoomRepository;
import com.ssafy.api.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final MatchingRepository matchingRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, MatchingRepository matchingRepository) {
        this.roomRepository = roomRepository;
        this.matchingRepository = matchingRepository;
    }

    public String getRoomSession(String email, String gameType, String guest) {
        /*
        해당 방에 유저가 이미 참여했으면 새로운 세션을 리턴한다
        방의 종류로 방을 선택 후 인원 기준으로 Order by 해서 가장 인원수가 적은 방을 확인한다.
        해당 방이 없거나 인원수가 4 이상이면 새로운 세션을 만들고 그렇지 않으면 해당 방의 세션을 리턴한다
         */
        ArrayList<Matching> matchingArrayList = matchingRepository.findByMatEmailAndMatVisit(email, "true");
        if (matchingArrayList.size() > 0) { // 이전에 참가한 방이 있으면
            return "visited";
        }
        guest = guest.equals("true") ? "guest" : "user";
        ArrayList<Room> roomArrayList = roomRepository.findByRoomTypeAndRoomGuestOrderByRoomCntAsc(gameType, guest); // 참가할려는 게임방의 정보를 가져온다
        if(!roomArrayList.isEmpty() && roomArrayList.get(0).getRoomCnt() < 4) { // 참가할 수 있는 게임방이 있으면 기존 방에 참가
            Room room = roomArrayList.get(0);
            room.setRoomCnt(room.getRoomCnt() + 1); // 방의 인원수 + 1
            room.setRoomUpdateBy(email); // 마지막으로 들어온 회원의 이메일
            room.setRoomUpdateDate(LocalDateTime.now()); // 마지막으로 들어온 회원의 접속 시간
            roomRepository.save(room); // 방 정보 업데이트
            return room.getRoomSession(); // 참가할 방 세션 리턴
        }
        // 참가할 수 있는 게임방이 없으면 새로운 세션 생성
        // newSession := [회원/게스트][게임종류]Session[방번호]
        String newSession = guest + gameType + "Session" + roomRepository.count();

        // 새로운 게임방 생성
        roomRepository.save(Room.builder()
                .roomCnt(1)
                .roomType(gameType)
                .roomSession(newSession)
                .roomStatus("open")
                .roomGuest(guest)
                .roomCreateBy(email)
                .roomCreateDate(LocalDateTime.now())
                .roomUpdateBy(email)
                .roomUpdateDate(LocalDateTime.now()).build());
        return newSession; // 참가할 방 세션 리턴
    }

    @Override
    public void createMachingInfo(RoomSessionReq roomSessionReq, String userSession) {
        /* 매칭 정보를 저장한다 */
        matchingRepository.save(
                Matching.builder()
                        .matEmail(roomSessionReq.getEmail())
                        .matGameType(roomSessionReq.getGameType())
                        .matSession(userSession)
                        .matGuest(roomSessionReq.getGuest())
                        .matVisit("true")
                        .matCreateBy(roomSessionReq.getEmail())
                        .matCreateDate(LocalDateTime.now())
                        .build());
    }

    public boolean disconnect(String email, String session) {
        Room room = roomRepository.findRoomByRoomSession(session); // session에 해당하는 방 정보
        if (room == null || room.getRoomCnt() <= 0) return false; // 방이 없으면
        room.setRoomCnt(room.getRoomCnt() - 1); // 방의 인원수 감소
        roomRepository.save(room); // 방 정보 업데이트
        ArrayList<Matching> matchingArrayList = matchingRepository.findByMatEmailAndMatVisitOrderByMatCreateDateDesc(email, session); // 회원의 매칭 정보
        Matching matching = matchingArrayList.get(0); // 가장 최근에 접속한 매칭 정보
        matching.setMatVisit("false"); // 회원은 해당 방에 입장중이 아니다
        matchingRepository.save(matching); // 매칭 정보 업데이트
        return true;
    }
}
