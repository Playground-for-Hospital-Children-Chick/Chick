package com.school.chick.service.Impl;

import com.school.chick.domain.dto.MatchingReq;
import com.school.chick.domain.entity.Matching;
import com.school.chick.domain.repository.MatchingRepository;
import com.school.chick.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MatchingServiceImpl implements MatchingService {
    private final MatchingRepository matchingRepository;

    @Autowired
    public MatchingServiceImpl(MatchingRepository matchingRepository) {
        this.matchingRepository = matchingRepository;
    }

    public boolean createMatching(MatchingReq matchingReq) {
        Matching matching= new Matching();
//        matching.set(matchingReq.getUserEmail());
        matching.setMatGameType(matchingReq.getWaitGameType());
//        matching.setMatCreateDate(LocalDateTime.now());
        /*
        방의 인원 기준으로 Order by 해서 가장 인원수가 적은 방부터 선택한다.
        방의 인원수가 꽉차면 방을 만들고 그렇지 않으면 방에 입장한다.
        matching.setRoomId();
         */
        matchingRepository.save(matching);
        return true;
    }
}
