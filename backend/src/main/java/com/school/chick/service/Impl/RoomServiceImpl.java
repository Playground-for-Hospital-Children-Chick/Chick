package com.school.chick.service.Impl;

import com.school.chick.domain.dto.MatchingReq;
import com.school.chick.domain.entity.Matching;
import com.school.chick.domain.entity.Room;
import com.school.chick.domain.repository.MatchingRepository;
import com.school.chick.domain.repository.RoomRepository;
import com.school.chick.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RoomServiceImpl implements RoomService {
//    private final MatchingRepository matchingRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
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
}
