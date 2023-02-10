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
//    private final MatchingRepository matchingRepository;
    private final RoomRepository roomRepository;
    private final MatchingRepository matchingRepository;



    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, MatchingRepository matchingRepository) {
        this.roomRepository = roomRepository;
        this.matchingRepository = matchingRepository;
    }

    public String getRoomSession(String email, String gameType, String guest) {
        /*
        방의 종류로 방을 선택 후 인원 기준으로 Order by 해서 가장 인원수가 적은 방을 확안한다.
        해당 방이 없거나 인원수가 4 이상이면 새로운 세션을 만들고 그렇지 않으면 해당 방의 세션을 리턴한다
         */
        ArrayList<Room> roomArrayList = roomRepository.findByRoomTypeAndRoomGuestOrderByRoomCntAsc(gameType, guest);
        if(!roomArrayList.isEmpty() && roomArrayList.get(0).getRoomCnt() < 4) { // 참가할 수 있는 게임방이 있으면 기존 방에 참가
            Room room = roomArrayList.get(0);
            room.setRoomCnt(room.getRoomCnt() + 1); // 방의 인원수 + 1
            room.setRoomUpdateBy(email); // 마지막으로 들어온 회원의 이메일
            room.setRoomUpdateDate(LocalDateTime.now()); // 마지막으로 들어온 회원의 접속 시간
            roomRepository.save(room); // 방 정보 업데이트
            return room.getRoomSession(); // 참가할 방 세션 리턴
        }
        // 참가할 수 있는 게임방이 없으면 새로운 세션 생성
        String newSession = gameType + "Session" + roomRepository.count(); // [게임종류]Session[방번호]
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
    public void createMachingInfo(RoomSessionReq roomSessionReq, String userSession, String guest) {
        /* 데이터베이스에 매칭 정보를 저장한다 */
        String email = roomSessionReq.getEmail();
        String gameType = roomSessionReq.getGameType();
        matchingRepository.save(
                Matching.builder()
                        .matEmail(email)
                        .matGameType(gameType)
                        .matSession(userSession)
                        .matCreateBy(email)
                        .matGuest(guest)
                        .matCreateDate(LocalDateTime.now())
                        .build()
        );
    }

    public boolean disconnect(String sessionId) {
        Room room = roomRepository.findRoomByRoomSession(sessionId);
        if (room == null || room.getRoomCnt() <= 0) return false;
        room.setRoomCnt(room.getRoomCnt() - 1);
        roomRepository.save(room);
        return true;
    }
}
