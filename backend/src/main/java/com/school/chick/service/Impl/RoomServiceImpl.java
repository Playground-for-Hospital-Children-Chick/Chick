package com.school.chick.service.Impl;

import com.school.chick.domain.entity.Matching;
import com.school.chick.domain.entity.Room;
import com.school.chick.domain.repository.MatchingRepository;
import com.school.chick.domain.repository.RoomRepository;
import com.school.chick.service.RoomService;
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

    public String getRoomSession(String gameType) {
        /*
        방의 종류로 방을 선택 후 인원 기준으로 Order by 해서 가장 인원수가 적은 방을 확안한다.
        해당 방이 없거나 인원수가 4 이상이면 새로운 세션을 만들고 그렇지 않으면 해당 방의 세션을 리턴한다
         */
        ArrayList<Room> roomArrayList = roomRepository.findByRoomTypeOrderByRoomCntDesc(gameType);
        if(!roomArrayList.isEmpty() && roomArrayList.get(0).getRoomCnt() < 4) { // 참가할 수 있는 게임방이 있으면 기존 방에 참가
            return roomArrayList.get(0).getRoomSession();
        }
        // 참가할 수 있는 게임방이 없으면 새로운 세션 생성
        return "Session"+roomRepository.count();
    }

    @Override
    public void createMachingInfo(Map<String, Object> params, String userSession) {
        /* 데이터베이스에 매칭 정보를 저장한다 */
        String email = (String)params.get("email");
        String gameType = (String)params.get("gameType");
        matchingRepository.save(
                Matching.builder()
                        .matEmail(email)
                        .matGameType(gameType)
                        .matSession(userSession)
                        .matCreateBy(email)
                        .matCreateDate(LocalDateTime.now())
                        .build()
        );
    }
}
