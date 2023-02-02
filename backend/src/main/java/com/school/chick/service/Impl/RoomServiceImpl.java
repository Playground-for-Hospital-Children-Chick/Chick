package com.school.chick.service.Impl;

import com.school.chick.domain.entity.DailyLog;
import com.school.chick.domain.entity.Room;
import com.school.chick.domain.repository.DailyLogRepository;
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
    private final DailyLogRepository dailyLogRepository;


    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, DailyLogRepository dailyLogRepository) {
        this.roomRepository = roomRepository;
        this.dailyLogRepository = dailyLogRepository;
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
    public void createLog(Map<String, Object> params) {
        /* 데이터베이스에 로그를 저장한다 */
        String email = (String)params.get("email");
        String gameType = (String)params.get("gameType");
        dailyLogRepository.save(
                DailyLog.builder()
                        .logEmail(email)
                        .logGameType(gameType)
                        .logCreateBy(email)
                        .logCreateDate(LocalDateTime.now())
                        .build()
        );
    }
}
