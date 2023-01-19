package com.school.chick.service;

import com.school.chick.domain.dto.MemberDto;
import com.school.chick.domain.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface MemberService {

        public String join(MemberDto member);
        public List<MemberDto> findMemberes();
        public Optional<MemberDto> findOne(Long memberId);


}
